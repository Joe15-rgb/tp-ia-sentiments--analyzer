const express = require("express");
const parser = require("./libs/parser");
const analyzeSentiment = require("./services/Analyzer");
const natural = require("natural");
const stemmer = require("natural").PorterStemmer;
const classifier = new natural.BayesClassifier();
const fs = require("node:fs");
const tokenizer = new natural.WordTokenizer();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/**
 *
 * @param {String} text
 * @returns
 */
function preprocessText(text) {
  const tokens = tokenizer.tokenize(text);
  return tokens.map((token) => stemmer.stem(token));
}
const Datasets = ["sexual-dataset", "threat-dataset", "dataset"];

Datasets.forEach((d) => {
  const arr = JSON.parse(fs.readFileSync(`./data/${d}.json`, "utf-8"));
  arr.forEach((el) => {
    classifier.addDocument(preprocessText(el.input), el.output);
  });
});

classifier.save("classifier.json", function (err, classifier) {
  // the classifier is saved to the classifier.json file!
});

classifier.train();

/**
 *
 * @param {String} message
 * @returns
 */
function ModelClassifierMessages(message) {
  const setMessages = {
    input: message,
    output: classifier.classify(preprocessText(message)),
    score: classifier.getClassifications(preprocessText(message)),
  };

  return setMessages;
}

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.post("/traitement", (req, res) => {
  const setMessages = new Set();
  let messages;
  if (req.body.messages.match(/();/) != null) {
    messages = parser.parserMessages(req.body.messages);
    messages.forEach((msg) => {
      analyzeSentiment(msg, setMessages);
    });
  } else {
    messages = JSON.parse(req.body.messages);
    messages.forEach((msg) => {
      if ("input" in msg || "content" in msg || "message" in msg) {
        if ("input" in msg) return analyzeSentiment(msg.input, setMessages);
        if ("content" in msg) return analyzeSentiment(msg.content, setMessages);
        if ("message" in msg) return analyzeSentiment(msg.message, setMessages);
      } else {
        return res.status(400).send("Bad file");
      }
    });
  }

  const sexualDatasets = new Set();
  const data = Array.from(setMessages);
  const counteSentiments = groupSentiment(data);

  data.forEach((d) => {
    sexualDatasets.add(ModelClassifierMessages(d.input));
  });

  const sexualsMessages = Array.from(sexualDatasets);

  res
    .status(201)
    .render("traitement", { data, counteSentiments, sexualsMessages });
});

/**
 *
 * @param {Array[string | object]} data
 * @returns
 */
function groupSentiment(data) {
  const counteSentiments = data.reduce((allSentiments, sentiment) => {
    const currSentiment = allSentiments[sentiment.output] ?? 0;
    allSentiments[sentiment.output] = currSentiment + 1;

    return allSentiments;
  }, Object.create(null));

  return counteSentiments;
}

app.listen(3000, () => {
  console.log("The Server is ready in port 3000");
});

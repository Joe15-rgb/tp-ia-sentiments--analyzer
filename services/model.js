var natural = require("natural");
const stemmer = require("natural").PorterStemmer;
const classifier = new natural.BayesClassifier();
const fs = require("node:fs/promises");
const tokenizer = new natural.WordTokenizer();

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
  fs.readFile();
  const arr = JSON.parse(fs.readFileSync(`../data/${d}.json`, "utf-8"));
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

console.log(ModelClassifierMessages("Test"));

// module.exports = ModelClassifierMessages;

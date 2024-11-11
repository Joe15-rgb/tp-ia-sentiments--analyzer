const natural = require("natural");
const fs = require("node:fs");
const stemmer = require("natural").PorterStemmer;
const classifier = new natural.BayesClassifier();
const tokenizer = new natural.WordTokenizer();

function preprocessText(text) {
  const tokens = tokenizer.tokenize(text);
  return tokens.map((token) => stemmer.stem(token));
}

const categoryDatasets = ["sexual-dataset", "threat-dataset", "dataset"];

categoryDatasets.forEach((d) => {
  const arr = JSON.parse(fs.readFileSync(`../data/${d}.json`, "utf-8"));
  arr.forEach((el) => {
    classifier.addDocument(preprocessText(el.input), el.output);
  });
});

classifier.train();

classifier.events.on("trainedWithDocument", function (obj) {
  console.log(obj);
  /* {
   *   total: 23 // There are 23 total documents being trained against
   *   index: 12 // The index/number of the document that's just been trained against
   *   doc: {...} // The document that has just been indexed
   *  }
   */
});
classifier.save("classifier.json", function (err, classifier) {
  // the classifier is saved to the classifier.json file!
});

const test = [];
function classifierSentiment(trainingData) {
  natural.BayesClassifier.load(
    "classifier.json",
    null,
    function (err, classifier) {
      trainingData.forEach((el) => {
        test.push(classifier.classify(preprocessText(el.input)));

        console.log(test);
      });
    }
  );
}

const data = JSON.parse(fs.readFileSync("../data/dataset.json", "utf-8"));

classifierSentiment(data);

console.log(test);

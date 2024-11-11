"use strict";
const fs = require("node:fs");
const brain = require("./js/browser");
const seralizer = require("./serialize");

function fetchData(path, encodege) {
  let data = JSON.parse(fs.readFileSync(path, encodege));

  const readyData = data.map(({ input, output }) => ({
    input,
    output: output,
  }));

  return readyData;
}

const trainingData = fetchData("./data.json", "utf-8");

const net = new brain.recurrent.LSTM();

net.train(trainingData);

const output = net.run("you are happy");
console.log(output);

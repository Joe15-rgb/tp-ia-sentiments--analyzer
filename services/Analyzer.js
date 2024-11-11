"use strict";
const natural = require("natural");
const fs = require("node:fs/promises");

const tokenizer = new natural.WordTokenizer();

const Analyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");
// getSentiment expects an array of strings

let messages = new Set();

class MessageAnalyzed {
  constructor(input, output, score) {
    this.input = input;
    this.output = output;
    this.score = score;
  }
}
/**
 *
 * @param {String} text
 * @returns String[]
 */
function preprocessText(text) {
  const tokens = tokenizer.tokenize(text);
  return tokens.map((token) => stemmer.stem(token));
}

// je suis malade
/**
 *
 * @param {String} message
 * @param {Set} setMessages
 */
function analyzeSentiment(message, setMessages) {
  const analyze = analyzer.getSentiment(preprocessText(message));
  if (analyze >= 0.5) {
    saveMessages(message, "positif", analyze, setMessages);
  } else if (analyze === 0) {
    saveMessages(message, "neutre", analyze, setMessages);
  } else {
    saveMessages(message, "negatif", analyze, setMessages);
  }
}
/**
 *
 * @param {String} message
 * @param {Object} status
 * @param {Float32List | Number} score
 * @param {Set} setMessages
 */
function saveMessages(message, status, score, setMessages) {
  const newMessageAnalyzed = new MessageAnalyzed(message, status, score);
  setMessages.add(newMessageAnalyzed);
}

module.exports = analyzeSentiment;

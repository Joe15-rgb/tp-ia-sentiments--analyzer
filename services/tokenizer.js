const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

/**
 *
 * @param {string} text
 * @returns string[]
 */
function preprocessText(text) {
  const tokens = tokenizer.tokenize(text);
  return tokens.map((token) => stemmer.stem(token));
}

module.exports = preprocessText;

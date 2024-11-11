const fs = require("node:fs");

/**
 *
 * @param {String} messages
 * @returns String[]
 */
function parserMessages(messages) {
  const bestMessage = [];

  if (messages != "" && typeof messages != "number") {
    const arrmsgs = messages.split(/();/);

    arrmsgs.filter((w) => {
      if (w !== "") {
        const bestWord = w
          .replace("\n", "")
          .replace('"', "")
          .replace('"', "")
          .replace("\n", "")
          .replace("\r", "");

        if (bestWord !== "") {
          bestMessage.push(bestWord);
        }
      }
    });
  } else {
    throw console.log("Aucun messages n'a était passé");
  }

  return bestMessage;
}

function writeFileData(data) {
  const dataJSON = JSON.stringify(data);

  path = `./data/data-${Date.now()}.json`;

  fs.writeFileSync(path, dataJSON);
}

module.exports = {
  parserMessages: parserMessages,
  writeFileData: writeFileData,
};

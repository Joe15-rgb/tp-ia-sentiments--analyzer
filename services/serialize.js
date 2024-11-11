const fixLength = (data) => {
  let maxLenInput = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].input.length > maxLenInput) {
      maxLenInput = data[i].input.length;
    }
  }
  for (i = 0; i < data.length; i++) {
    while (data[i].input.length < maxLenInput) {
      data[i].input.push(0);
    }
  }
  return data;
};

const encode = (d) => {
  const newarray = [];
  d.split("").map((c) => {
    newarray.push(c.charCodeAt(0) / 255);
  });
  return newarray;
};

const encodeData = (data) => {
  return data.map((d) => {
    return {
      input: encode(d.input),
      output: d.output,
    };
  });
};

const seralize = (data) => fixLength(encodeData(data));

module.exports = {
  seralize: seralize,
  encode: encode,
  fixLength: fixLength,
  encodeData: encodeData,
};

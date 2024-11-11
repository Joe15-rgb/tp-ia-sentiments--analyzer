const encodeTabs = [
  { n: "0", b: "0000" },
  { n: "1", b: "0001" },
  { n: "2", b: "0010" },
  { n: "3", b: "0011" },
  { n: "4", b: "0100" },
  { n: "5", b: "0101" },
  { n: "6", b: "0110" },
  { n: "7", b: "0111" },
  { n: "8", b: "1000" },
  { n: "9", b: "1001" },
  { n: "A", b: "1010" },
  { n: "B", b: "1011" },
  { n: "C", b: "1100" },
  { n: "D", b: "1101" },
  { n: "E", b: "1110" },
  { n: "F", b: "1111" },
];

function logicXOR(v, f) {
  if (v > f) {
    return v;
  } else if (v === f) {
    return 0;
  } else if (f > v) {
    return f;
  }
}

/**
 *
 * @param {string} n
 */
function encode(n) {
  const x = [];
  if (typeof n === "string") {
    for (let i = 0; i < n.length; i++) {
      const el = n[i];
      for (let j = 0; j < encodeTabs.length; j++) {
        if (encodeTabs[j].n === el) {
          x.push(encodeTabs[j].b);
        }
      }
    }
  }
  return x;
}

/**
 *
 * @param {String} a
 * @param {String} b
 * @returns
 */

function XOR(a, b) {
  let x, y;
  const r = [];

  if (typeof a === "string" && typeof b === "string" && a.length === b.length) {
    x = encode(a.toLocaleUpperCase());
    y = encode(b.toLocaleUpperCase());
  } else {
    throw console.error("Mauvais format de données");
  }

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
      r.push(logicXOR(parseInt(x[i][j]), parseInt(y[i][j])));
    }
  }

  return reconvert(r);
}

function grouperParQuatre(tableau) {
  const groupes = [];

  for (let i = 0; i < tableau.length; i += 4) {
    const groupe = tableau.slice(i, i + 4);
    groupes.push(groupe);
  }

  return groupes;
}
function reconvert(arr) {
  let s = [];
  const r = grouperParQuatre(arr);

  for (let m = 0; m < r.length; m++) {
    for (let n = 0; n < encodeTabs.length; n++) {
      if (String(r[m]).replaceAll(",", "") === encodeTabs[n].b) {
        s.push(encodeTabs[n].n);
      }
    }
  }
  return s;
}

// console.log(XOR("2196f3", "66bb6a"));

const x = 0;

console.log((x << 1) ^ (283 & -(x >> 7)));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const group = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
];

function grouperParQuatre(tableau) {
  const groupes = [];

  for (let i = 0; i < tableau.length; i += 4) {
    const groupe = tableau.slice(i, i + 4);
    groupes.push(groupe);
  }

  return groupes;
}

// Exemple d'utilisation
const resultat = grouperParQuatre(arr);
console.log(resultat);

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;

const getShift = (code, index) => {
  let shift = 0;
  switch (code[0]) {
    case 'C':
      return +code[1] ? shift = 1 : shift = -1;
    case 'R':
      return +code[1] ? shift = 8 : shift = -8;
    case 'A':
      return shift = ALPHABET_LENGTH - 1 - 2 * index;
    default:
      return shift;
  }
};

const encryption = (data, code) => {
  let newData = '';
  for (let i of data) {
    let register = false;
    if (i.toUpperCase() === i) register = true;
    let shiftered = i;
    const index = ALPHABET.indexOf(i.toLowerCase());
    if (index !== -1) {
      const shift = getShift(code, index);
      if (index + shift > ALPHABET_LENGTH - 1) {
        shiftered = ALPHABET[index + shift - ALPHABET_LENGTH];
      } else if (index + shift < 0) {
        shiftered = ALPHABET[index + shift + ALPHABET_LENGTH];
      } else shiftered = ALPHABET[index + shift];
      register ? shiftered = shiftered.toUpperCase() : shiftered = shiftered.toLowerCase();
    }
    newData += shiftered;
  }
  return newData;
};


module.exports = { getShift, encryption };
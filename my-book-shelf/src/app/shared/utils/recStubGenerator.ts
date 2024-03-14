const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const recommendedGenerator = () => {
  let line = '';

  for (let i = 0; i < 2; i++) {
    line += alphabet[Math.floor(Math.random() * 27)];
  }

  return line;
};

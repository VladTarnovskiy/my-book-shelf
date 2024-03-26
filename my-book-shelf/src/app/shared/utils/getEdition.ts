const editions = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
];

export const getEdition = (val: string): string => {
  const preview = Number(val.split('')[0]);

  if (preview && editions[preview]) {
    return editions[preview];
  } else {
    return 'first';
  }
};

export const getRandomRatingValue = (): number =>
  Number((Math.random() * (5 - 2) + 2).toFixed(1));

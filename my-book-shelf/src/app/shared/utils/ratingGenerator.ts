export const getRandomRatingValue = (): number =>
  Number((Math.random() * (5 - 3) + 3).toFixed(1));

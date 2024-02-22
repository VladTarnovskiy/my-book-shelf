export interface IBook {
  id: string;
  title: string;
  isFavorite: boolean;
  authors: string[];
  publishedDate: string;
  images: {
    small: string;
    normal: string;
  };
  categories: string[];
  ISBN: string;
}

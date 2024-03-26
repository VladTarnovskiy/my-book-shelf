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
  epub: {
    link: string | null;
    isAvailable: boolean | null;
  };
  categories: string[];
  ISBN: string | null;
  rating: number;
}

export interface IRecentBook extends IBook {
  creationDate: number;
}

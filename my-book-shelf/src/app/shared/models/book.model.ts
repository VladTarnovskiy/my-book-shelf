export interface IBook {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  images: {
    small: string;
    normal: string;
  };
}

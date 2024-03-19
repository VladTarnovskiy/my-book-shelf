export interface IReview {
  review: string;
  bookId: string;
  userId: string | null;
  id: string;
  creationDate: string;
  likes: string[];
}

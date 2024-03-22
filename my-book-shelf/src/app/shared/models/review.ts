export interface IReview {
  review: string;
  bookId: string;
  userId: string | null;
  id: string;
  creationDate: string;
  likes: ILikeInfo[];
}

export interface ILikeInfo {
  userPhoto: string;
  username: string;
  userId: string;
}

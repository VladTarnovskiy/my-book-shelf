import { ILikeInfo } from '@shared/models/review';

export interface IReviewLikesParam {
  reviewId: string;
  bookId: string;
  likes: Array<ILikeInfo>;
}

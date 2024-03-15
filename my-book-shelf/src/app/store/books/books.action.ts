import { createAction, props } from '@ngrx/store';

import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../shared/interfaces/filters';
import { IBook } from '../../shared/models/book';

const actionSource = '[Books]';

export const FetchBooks = createAction(
  `${actionSource} Fetch`,
  props<{
    searchValue: string;
    filterType: FilterTypesKeys;
    categoryFilterType: CategoryFilterKeys;
    page: number;
  }>()
);

export const FetchBooksSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ books: IBook[]; page: number; totalBooks: number }>()
);

export const FetchBooksFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: string }>()
);

export const SetFilterType = createAction(
  `${actionSource} Filter `,
  props<{ filterType: FilterTypesKeys }>()
);

export const SetCategoryFilterType = createAction(
  `${actionSource} Category Filter `,
  props<{ categoryFilterType: CategoryFilterKeys }>()
);

export const SetSearchPage = createAction(
  `${actionSource} Set Search Page`,
  props<{ page: number }>()
);

export const AddFavoriteStatus = createAction(
  `${actionSource} Add Favorite Status`,
  props<{ bookId: string }>()
);

export const RemoveFavoriteStatus = createAction(
  `${actionSource} Remove Favorite Status`,
  props<{ bookId: string }>()
);

export const FetchPreviewBook = createAction(
  `${actionSource} Fetch Preview Book`,
  props<{
    bookId: string;
  }>()
);

export const FetchPreviewBookSuccess = createAction(
  `${actionSource} Fetch Preview Book Success`,
  props<{ previewBook: IBook }>()
);

export const FetchPreviewBookFailed = createAction(
  `${actionSource} Fetch Preview Book Failed`,
  props<{ error: string }>()
);

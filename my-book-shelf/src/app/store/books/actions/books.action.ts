import { createAction, props } from '@ngrx/store';
import { IBook } from '../../../shared/models/book.model';
import {
  FilterCategoryKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';

const actionSource = '[Books]';

export const FetchBooks = createAction(
  `${actionSource} Fetch`,
  props<{
    searchValue: string;
    filterType: FilterTypesKeys;
    categoryFilterType: FilterCategoryKeys;
  }>()
);

export const FetchBooksSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ books: IBook[] }>()
);

export const FetchBooksFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: string }>()
);

export const SetFilterCategoryType = createAction(
  `${actionSource} Filter Category`,
  props<{ filterCategoryType: FilterCategoryKeys }>()
);

export const AddFavoriteStatus = createAction(
  `${actionSource} Add Favorite Status`,
  props<{ bookId: string }>()
);

export const RemoveFavoriteStatus = createAction(
  `${actionSource} Remove Favorite Status`,
  props<{ bookId: string }>()
);

export const FetchBook = createAction(
  `${actionSource} Fetch Book`,
  props<{
    bookId: string;
  }>()
);

export const FetchBookSuccess = createAction(
  `${actionSource} Fetch Book Success`,
  props<{ previewBook: IBook }>()
);

export const FetchBookFailed = createAction(
  `${actionSource} Fetch Book Failed`,
  props<{ error: string }>()
);

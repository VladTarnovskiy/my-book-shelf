import { IBook } from '@shared/models/book';

import { CategoryFilterKeys, FilterTypesKeys } from './filters';

export interface IBooksSearchParams {
  searchValue: string;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
  page: number;
}

export interface IBooksInfoData {
  books: IBook[];
  totalBooks: number;
}

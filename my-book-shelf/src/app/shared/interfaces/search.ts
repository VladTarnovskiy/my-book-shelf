import { CategoryFilterKeys, FilterTypesKeys } from './filters';

export interface ISearchOptions {
  page: number;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
  searchValue: string;
}

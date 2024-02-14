import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../core/interfaces/filters';

export interface ISearchOptions {
  page: number;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
  searchValue: string;
}

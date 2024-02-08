import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../shared/interfaces/filters';

export interface ISearchOptions {
  page: number;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
  searchValue: string;
}

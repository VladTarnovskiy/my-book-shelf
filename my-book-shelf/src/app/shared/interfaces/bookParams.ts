import { CategoryFilterKeys, FilterTypesKeys } from './filters';

export interface IBooksSearchParams {
  searchValue: string;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
  page: number;
}

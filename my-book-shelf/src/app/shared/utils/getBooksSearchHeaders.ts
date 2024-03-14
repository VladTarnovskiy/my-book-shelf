import { HttpParams } from '@angular/common/http';
import { filterCategoryTypes, filterTypes } from '../interfaces/filters';
import { IBooksSearchParams } from '../interfaces/bookParams';

export const getBooksSearchHeaders = ({
  searchValue,
  filterType,
  categoryFilterType,
  page,
}: IBooksSearchParams): {
  params: HttpParams;
} => {
  const filterTypeValue = filterTypes[filterType];
  const filterCategoryValue = filterCategoryTypes[categoryFilterType];
  let checkedFilterTypeValue: string;
  let checkedCategoryFilterValue: string;
  let options: { params: HttpParams };

  if (filterTypeValue === '') {
    checkedFilterTypeValue = '';
  } else {
    checkedFilterTypeValue = `${filterTypeValue}:`;
  }

  if (filterCategoryValue === '') {
    checkedCategoryFilterValue = '';
  } else {
    checkedCategoryFilterValue = `+${filterCategoryValue}:`;
  }

  if (searchValue === '') {
    options = {
      params: new HttpParams()
        .set('q', `${checkedFilterTypeValue}''${checkedCategoryFilterValue}`)
        .append('startIndex', `${page * 10}`),
    };
  } else {
    options = {
      params: new HttpParams()
        .set(
          'q',
          `${checkedFilterTypeValue}${searchValue}${checkedCategoryFilterValue}`
        )
        .append('startIndex', `${page * 10}`),
    };
  }

  return options;
};

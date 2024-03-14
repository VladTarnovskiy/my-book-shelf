export type FilterTypesKeys = 'All' | 'Title' | 'Author' | 'Text' | 'Subjects';
export type CategoryFilterKeys =
  | 'Browse'
  | 'Engineering'
  | 'Medical'
  | 'Arts & Science'
  | 'Architecture'
  | 'Law';

export const filterTypes: Record<FilterTypesKeys, string> = {
  All: '',
  Title: 'intitle',
  Author: 'inauthor',
  Text: 'inpublisher',
  Subjects: 'subject',
};

export const filterCategoryTypes: Record<CategoryFilterKeys, string> = {
  Browse: '',
  Engineering: 'Engineering',
  Medical: 'Medical',
  'Arts & Science': 'Arts & Science',
  Architecture: 'Architecture',
  Law: 'Law',
};

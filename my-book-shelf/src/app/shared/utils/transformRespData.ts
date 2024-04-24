import { IBookResp, ISearchResp } from '../interfaces/booksResp';
import { IBook } from '../models/book';
import { getEdition, getRandomRatingValue } from '.';

export const transformRespBooksData = (data: ISearchResp): IBook[] => {
  const transData = data.items.map((book) => {
    const transBook: IBook = {
      id: book.id,
      isFavorite: false,
      title: book.volumeInfo.title || '',
      authors: book.volumeInfo.authors || ['unknown'],
      publishedDate: book.volumeInfo.publishedDate || '',
      images: {
        small: book.volumeInfo.imageLinks?.smallThumbnail || 'assets/logo.svg',
        normal: book.volumeInfo.imageLinks?.thumbnail || 'assets/logo.svg',
      },
      epub: {
        link: book.accessInfo.epub?.acsTokenLink || null,
        isAvailable: book.accessInfo?.epub.isAvailable || null,
      },
      categories: book.volumeInfo.categories || ['unknown'],
      ISBN: book.volumeInfo.industryIdentifiers
        ? book.volumeInfo.industryIdentifiers.find(
            (item) => item.type === 'ISBN_10'
          )?.identifier || null
        : null,
      rating: getRandomRatingValue(),
      edition: getEdition(book.volumeInfo.contentVersion),
    };
    return transBook;
  });

  return transData;
};

export const transformRespBookData = (book: IBookResp): IBook => {
  const transBook: IBook = {
    id: book.id,
    isFavorite: false,
    title: book.volumeInfo.title || '',
    authors: book.volumeInfo.authors || ['unknown'],
    publishedDate: book.volumeInfo.publishedDate || '',
    images: {
      small: book.volumeInfo.imageLinks?.smallThumbnail || 'assets/logo.svg',
      normal: book.volumeInfo.imageLinks?.thumbnail || 'assets/logo.svg',
    },
    epub: {
      link: book.accessInfo.epub?.acsTokenLink || null,
      isAvailable: book.accessInfo?.epub.isAvailable || null,
    },
    categories: book.volumeInfo.categories || ['unknown'],
    ISBN: book.volumeInfo.industryIdentifiers
      ? book.volumeInfo.industryIdentifiers.find(
          (item) => item.type === 'ISBN_10'
        )?.identifier || null
      : null,
    rating: getRandomRatingValue(),
    edition: getEdition(book.volumeInfo.contentVersion),
  };

  return transBook;
};

export interface ISearchResp {
  kind: string;
  totalItems: number;
  items: IBookResp[];
}

export interface IBookResp {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    readingModes: {
      text: boolean;
      image: boolean;
    };
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
  };
  accessInfo: {
    country: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink: string;
    };
    accessViewStatus: string;
  };
  searchInfo: {
    textSnippet: string;
  };
}

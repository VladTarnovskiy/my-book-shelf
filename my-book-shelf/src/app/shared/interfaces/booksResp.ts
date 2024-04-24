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
  volumeInfo: VolumeInfo;
  saleInfo: SalesInfo;
  accessInfo: AccessInfo;
  searchInfo: {
    textSnippet: string;
  };
}

interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifiers[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface IndustryIdentifiers {
  type: string;
  identifier: string;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface SalesInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: {
    amount: number;
    currencyCode: string;
  };
  retailPrice: {
    amount: number;
    currencyCode: string;
  };
  buyLink: string;
  offers: Offers[];
}

interface Offers {
  finskyOfferType: number;
  listPrice: {
    amountInMicros: number;
    currencyCode: string;
  };
  retailPrice: {
    amountInMicros: number;
    currencyCode: string;
  };
  giftable: boolean;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
    acsTokenLink: string;
  };
  pdf: {
    isAvailable: boolean;
    acsTokenLink: string;
  };
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

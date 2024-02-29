export type ToasterType = 'success' | 'error' | 'warning';

export interface Toaster {
  type: ToasterType;
  title: string;
  message: string;
}

import type { IFirestoreMetaData } from '.';

export interface ISupportMessage extends IFirestoreMetaData {
  message: string;
  email: string;
  name: string;
  url: string;
}

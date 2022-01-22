import type { IFirestoreMetaData } from '.';

export interface IFriend extends IFirestoreMetaData {
  title: string;
  tagline: string;
  description: string;
  link: string;
  path?: string; // FireStorage logo path
  gcs?: string; // Google Cloud Storage serving url
}

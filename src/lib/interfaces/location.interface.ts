import type { IFirestoreMetaData } from '.';

export interface ILocation extends IFirestoreMetaData {
  name: string;
  coordinates?: any;
}

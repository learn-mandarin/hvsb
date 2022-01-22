import type { IFirestoreMetaData } from '.';

export interface ISeries extends IFirestoreMetaData {
  title: string;
  description?: string;
  mediaIds: string[];
  published?: boolean;
  // authors?: string[];
}

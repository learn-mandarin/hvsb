import type { IFirestoreMetaData, Languages } from '.';

export interface IMedia extends IFirestoreMetaData {
  title?: string; // TODO: ensure that title exists before saving article
  title_translations?: TranslationFields;

  bookIds: string[];
  chapterIds: string[];
  verseIds: string[];

  published?: boolean;

  seriesIds?: string[];

  // TODO: this is set in media.ts, is it still needed?
  currentVerses?: number[];
}

export type TranslationFields = {
  [bcp in Languages]?: string;
};

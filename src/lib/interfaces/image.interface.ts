import type { IMedia } from '.';
import type { TranslationFields } from './media.interface';

export interface IImage extends IMedia {
  published?: boolean;

  description?: string;
  description_translations?: TranslationFields;
  // keywords: string[];

  path: string; // FireStorage path
  gcs: string; // Google Cloud Storage serving url

  credit?: string[]; // Photographer, Author, or Permission source (e.g. museum)
  // photographer?: string; // deprecated
  location?: string[]; // Geographical or Source
  subject?: string;

  yearTaken?: number;
  sourceURL?: string; // Wikipedia public domain image for example

  genre: 'photograph' | 'drawing' | 'painting' | 'chart' | 'map'; // refactor to medium at some point
  // verse?: number; // used by notesService to extract current verse from appropriate verseId array item
  type: 'image' | 'skip';

  parents?: IImageParent[];
  // documentParentId?: string; // deprecated

  // uploadedBy?: { // deprecated
  //     uid: string,
  //     name: string
  // };
}

export interface IImageParent {
  parentId: string;
  chapterId: string;
}

import type { IImage, IDocument, IVideo } from '.';

export interface IVerse {
  content: string;
  verseNumber: number;
  endParagraph: boolean;
  poetry: boolean;
  media?: (IImage | IDocument | IVideo)[];
}

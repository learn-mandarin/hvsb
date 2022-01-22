import type { IDocument, IImage, IVideo } from '$lib/interfaces';

export interface IReferenceProps {
  version: string;
  bookId: string;
  chapter: string;
  media?: (IImage | IDocument | IVideo)[];
  content?;
  nextChapterId?;
  previousChapterId?;
  textErr?;
  mediaErr?;
}

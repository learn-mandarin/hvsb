import type { IDocument, IImage, IVideo } from '$lib/interfaces';

export function unduplicate(media: IDocument | IImage | IVideo, verseId: string) {
  // remove verseId
  const index = media.verseIds.indexOf(verseId);
  if (index !== -1) media.verseIds.splice(index, 1);

  // reset bookId and chapterId arrays
  media.bookIds = [];
  media.chapterIds = [];

  // add applicable bookIds and chapterIds for remaining verseIds
  for (const v of media.verseIds) {
    const bookId = v.split('.')[0];
    const chapter = v.split('.')[1];
    const chapterId = `${bookId}.${chapter}`;

    media.bookIds.indexOf(bookId) === -1 && media.bookIds.push(bookId);
    media.chapterIds.indexOf(chapterId) === -1 && media.chapterIds.push(chapterId);
  }

  return media;
}

// For testing
// const media = {
//     "verseIds": [
//         "MAT.1.1",
//         "GEN.1.1",
//         "GEN.1.18",
//         "GEN.18.16"
//     ],
//     "bookIds": [
//         "MAT",
//         "GEN"
//     ],
//     "chapterIds": [
//         "MAT.1",
//         "GEN.1",
//         "GEN.18"
//     ]
// }
// //@ts-ignore
// console.log(unDuplicate(media, 'GEN.1.1'));

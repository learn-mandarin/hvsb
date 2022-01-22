import { browser } from '$app/env';
import type { IDocument, IImage, IImageParent, IVideo } from '$lib/interfaces';
import { admin, user, contributor } from '$lib/stores';
import { get } from 'svelte/store';

export async function getChapterMedia(
  bookId: string,
  chapter: string
): Promise<(IImage | IDocument | IVideo)[]> {
  if (get(admin) > 0) {
    return await getCollection<IImage | IDocument | IVideo>('media', [
      where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
      orderBy('type'),
    ]);
  } else {
    let media = await getCollection<IImage | IDocument | IVideo>('media', [
      where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
      where('published', '==', true),
      orderBy('type'),
    ]);

    if (browser && get(contributor)) {
      const { uid } = get(user);
      const contributedMedia = await getCollection<IImage | IDocument | IVideo>('media', [
        where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
        where('createdBy', '==', uid),
        orderBy('type'),
      ]);
      media = media.concat(contributedMedia);
    }

    return media;
  }
}

export function prepareChapterMedia(
  media: (IImage | IDocument | IVideo)[],
  bookId: string,
  chapter: string
): (IImage | IDocument | IVideo)[] {
  media = media.map((medium) => {
    if (imageHasParentInChapter(medium, bookId, chapter)) {
      medium.type = 'skip';
    }
    medium.currentVerses = getCurrentVerses(medium.verseIds, bookId, chapter);
    return medium;
  });
  // media = media.filter(medium => {
  //   return medium.type != 'skip';
  // })
  media.sort((a, b) => a.currentVerses[0] - b.currentVerses[0]);
  return media;
}

function imageHasParentInChapter(
  medium: IImage | IDocument | IVideo,
  bookId: string,
  chapter: string
): boolean {
  if (medium.type === 'image' && medium.parents) {
    const parents: IImageParent[] = medium.parents;
    return parents.some((p) => p.chapterId === `${bookId}.${chapter}`);
  } else {
    return false;
  }
}

export function getCurrentVerses(verseIds: string[], bookId: string, chapter: string): number[] {
  return verseIds
    .filter((v) => v.includes(`${bookId}.${chapter}.`))
    .map((v) => +v.split('.').pop()) // +v.match(/(\d*)$/)[0];
    .sort((a, b) => a - b);
}

import { getBibleId } from '$lib/helpers/versions';
import { getCollection } from '$sveltefirets';
import { orderBy, where } from 'firebase/firestore';
export async function fetchBibleText(version = 'WEB', bookId: string, chapter: string) {
  try {
    const bibleId = version === 'WEB' ? '9879dbb7cfe39e4d-04' : await getBibleId(version);

    const res = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${bookId}.${chapter}`,
      {
        headers: {
          'api-key': import.meta.env.VITE_bibleApi,
        },
      }
    );
    const json = await res.json(); // { data, meta } _BAPI.t(meta.fumsId);
    return json.data;
  } catch (err) {
    throw new Error(err);
  }
}

// import { FireStoreParser } from '$lib/firebase/firestore';
// import { firebaseConfig } from '$lib/firebase/config';
// export async function fetchChapterMedia(
//   bookId: string,
//   chapter: string
// ): Promise<(IImage | IDocument | IVideo)[]> {
//   try {
//     const res = await fetch(
//       `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery`,
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           structuredQuery: {
//             where: {
//               compositeFilter: {
//                 filters: [
//                   {
//                     fieldFilter: {
//                       field: {
//                         fieldPath: 'chapterIds',
//                       },
//                       op: 'ARRAY_CONTAINS',
//                       value: {
//                         stringValue: `${bookId}.${chapter}`,
//                       },
//                     },
//                   },
//                   {
//                     fieldFilter: {
//                       field: {
//                         fieldPath: 'published',
//                       },
//                       op: 'EQUAL',
//                       value: {
//                         booleanValue: true,
//                       },
//                     },
//                   },
//                 ],
//                 op: 'AND',
//               },
//             },
//             orderBy: [
//               {
//                 field: {
//                   fieldPath: 'type',
//                 },
//               },
//             ],
//             from: [
//               {
//                 collectionId: 'media',
//               },
//             ],
//           },
//         }),
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8',
//         },
//       }
//     );
//     const json = await res.json();
//     return json.map((doc: { document: { fields: Record<string, unknown> } }) => {
//       return FireStoreParser(doc.document.fields);
//     });
//   } catch (err) {
//     throw new Error(err);
//   }
// }

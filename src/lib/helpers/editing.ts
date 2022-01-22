import type { IImageParent, IDocumentSection, IGenre, IAuthor, ILocation } from '$lib/interfaces';
import { updateOnline } from '$sveltefirets';
import { arrayRemove } from 'firebase/firestore/lite';

export async function unlinkFromParentDocument(
  bookId: string,
  chapter: string,
  imageId: string,
  documentId: string
) {
  try {
    const parentToRemove: IImageParent = {
      parentId: documentId,
      chapterId: `${bookId}.${chapter}`,
    };
    const updateImage = updateOnline(`media/${imageId}`, {
      parents: arrayRemove(parentToRemove),
    });

    const sectionToRemove: IDocumentSection = {
      contentType: 'image',
      imageId,
    };
    const updateDocument = updateOnline(`media/${documentId}`, {
      sections: arrayRemove(sectionToRemove),
    });

    await Promise.all([updateImage, updateDocument]);
  } catch (err) {
    alert('Error unlinking image from parent document. Refresh and try again.');
  }
}

import { genres } from '$lib/mappings/genres';
export function getGenres(type: 'document' | 'image'): IGenre[] {
  return genres.filter((g) => {
    return g.restrictTo && g.restrictTo.includes(type);
  });
}

export function isAddingAttributeToDB(
  attributesInDB: (IAuthor | ILocation)[],
  attributeBeingUsed: string
): boolean {
  return !!attributesInDB.filter((attribute) => attribute.name === attributeBeingUsed).length;
}

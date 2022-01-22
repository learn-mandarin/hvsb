import type { IVerse } from '$lib/interfaces';

export interface IPrevNextChapters {
  id: string;
  number: string;
  bookId: string;
}

export const parseVerses = (chapterContent: any): IVerse[] => {
  if (!chapterContent) {
    return [];
  }
  // 1: Split content by data-number markers, keeping any prepended <p> tags
  const verseStartRegex =
    /(<p class="d">.*?<\/p>)?(<p class="\w+?">)?<span data-number="(\d*)".*?<\/span>/g;
  const versePlacedAtStart = chapterContent.replace(
    verseStartRegex,
    'VERSE_$3$1$2<span class="v">$3</span>'
  );
  const arrayOfVerses = versePlacedAtStart.split(/VERSE_/);
  arrayOfVerses.shift(); // remove first empty array

  // 2: Convert string to object, pulling out verse numbers
  return arrayOfVerses.map((v: any) => {
    const parts = v.match(/(\d+)(.*)/);
    const verseNumber = parts[1];
    // const preContent = parts[2];
    let content = parts[2];
    let endParagraph = false;
    let poetry = false;

    // console.log(verseNumber)
    // if (verseNumber == 15) {
    //   console.log("yes");
    //   debugger;
    // }

    // tslint:disable-next-line:max-line-length
    // 3: If matching p.p tags w/ closing tag at end of line pull them out and set endParagraph = true to allow media to come in before paragraph ends by add paragraph break later in code.
    const nonPClassPTags = /<p class="(?!p).*?">/;
    const pClassPTagsFound = content.match(/<p class="p">/g);
    const verseEndingPTags = /(.+)<p class="p">(.+)<\/p>$/;

    const outsidePTags = /^<p class="p">(.+)<\/p>$/;
    if (nonPClassPTags.test(content) && verseEndingPTags.test(content)) {
      content = content.replace(verseEndingPTags, '$1$2');
      endParagraph = true;
    } else if (pClassPTagsFound && pClassPTagsFound.length > 1) {
      content = content.replace(verseEndingPTags, '$1$2');
      endParagraph = true;
    } else if (outsidePTags.test(content) && !nonPClassPTags.test(content)) {
      content = content.replace(outsidePTags, '$1');
      endParagraph = true;
    }

    // 4: Remove orphaned initial opening paragraph tags - nothing is needed at the beginning of a paragraph
    const beginningParagraphTag = /^<p class="p">/;
    const closingPTag = /<\/p>/;
    if (beginningParagraphTag.test(content) && !closingPTag.test(content)) {
      content = content.replace(beginningParagraphTag, '');
    }

    // 5: Look for unmatched </p> tags at end and set endParagraph = true
    const openingParagraphTag = /<p class="/;
    const closingEndParagraphTag = /<\/p>$/;
    if (!openingParagraphTag.test(content) && closingEndParagraphTag.test(content)) {
      content = content.replace(closingEndParagraphTag, '');
      endParagraph = true;
    }

    // 6: Look for any poetry/quotation tags and set poetry = true
    if (/<p class="(?![p,d]).*?">/.test(content)) {
      poetry = true;
    }

    // 7: Look for a closing </p> tag in the middle not preceeded by an opening tag
    const orphanedMiddleTag = /^(?!<p class=")(.*?)(<\/p>)/;
    if (orphanedMiddleTag.test(content)) {
      content = content.replace(orphanedMiddleTag, '$1<p class="p">$2');
    }

    // content = content + ' ';

    const verse: IVerse = {
      content,
      // preContent,
      verseNumber,
      endParagraph,
      poetry,
    };
    return verse;
  });
};

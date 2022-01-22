export function bookName(bookId: string): string {
  const matchingBook = bibleBooks.find((book) => {
    return book.id === bookId;
  });
  return (matchingBook && matchingBook.name) || bookId;
}

export function bookAbbrev(id: string): string {
  const matchingBook = bibleBooks.find((book) => {
    return book.id === id;
  });
  return (matchingBook && matchingBook.abbreviation) || id;
}

export interface IBook {
  abbreviation: string;
  name: string;
  id: string;
}

export const bibleBooks: IBook[] = [
  { abbreviation: 'Gen', name: 'Genesis', id: 'GEN' },
  { abbreviation: 'Exod', name: 'Exodus', id: 'EXO' },
  { abbreviation: 'Lev', name: 'Leviticus', id: 'LEV' },
  { abbreviation: 'Num', name: 'Numbers', id: 'NUM' },
  { abbreviation: 'Deut', name: 'Deuteronomy', id: 'DEU' },

  { abbreviation: 'Josh', name: 'Joshua', id: 'JOS' },
  { abbreviation: 'Judg', name: 'Judges', id: 'JDG' },
  { abbreviation: 'Ruth', name: 'Ruth', id: 'RUT' },
  { abbreviation: '1 Sam', name: '1 Samuel', id: '1SA' },
  { abbreviation: '2 Sam', name: '2 Samuel', id: '2SA' },
  { abbreviation: '1 Kgs', name: '1 Kings', id: '1KI' },
  { abbreviation: '2 Kgs', name: '2 Kings', id: '2KI' },
  { abbreviation: '1 Chr', name: '1 Chronicles', id: '1CH' },
  { abbreviation: '2 Chr', name: '2 Chronicles', id: '2CH' },
  { abbreviation: 'Ezra', name: 'Ezra', id: 'EZR' },
  { abbreviation: 'Neh', name: 'Nehemiah', id: 'NEH' },
  { abbreviation: 'Esth', name: 'Esther', id: 'EST' },

  { abbreviation: 'Job', name: 'Job', id: 'JOB' },
  { abbreviation: 'Ps', name: 'Psalms', id: 'PSA' },
  { abbreviation: 'Prov', name: 'Proverbs', id: 'PRO' },
  { abbreviation: 'Eccl', name: 'Ecclesiastes', id: 'ECC' },
  { abbreviation: 'Song', name: 'Song of Solomon', id: 'SNG' },

  { abbreviation: 'Isa', name: 'Isaiah', id: 'ISA' },
  { abbreviation: 'Jer', name: 'Jeremiah', id: 'JER' },
  { abbreviation: 'Lam', name: 'Lamentations', id: 'LAM' },
  { abbreviation: 'Ezek', name: 'Ezekiel', id: 'EZK' },
  { abbreviation: 'Dan', name: 'Daniel', id: 'DAN' },
  { abbreviation: 'Hos', name: 'Hosea', id: 'HOS' },
  { abbreviation: 'Joel', name: 'Joel', id: 'JOL' },
  { abbreviation: 'Amos', name: 'Amos', id: 'AMO' },
  { abbreviation: 'Obad', name: 'Obadiah', id: 'OBA' },
  { abbreviation: 'Jonah', name: 'Jonah', id: 'JON' },
  { abbreviation: 'Mic', name: 'Micah', id: 'MIC' },
  { abbreviation: 'Nah', name: 'Nahum', id: 'NAM' },
  { abbreviation: 'Hab', name: 'Habakkuk', id: 'HAB' },
  { abbreviation: 'Zeph', name: 'Zephaniah', id: 'ZEP' },
  { abbreviation: 'Hag', name: 'Haggai', id: 'HAG' },
  { abbreviation: 'Zech', name: 'Zechariah', id: 'ZEC' },
  { abbreviation: 'Mal', name: 'Malachi', id: 'MAL' },

  { abbreviation: 'Matt', name: 'Matthew', id: 'MAT' },
  { abbreviation: 'Mark', name: 'Mark', id: 'MRK' },
  { abbreviation: 'Luke', name: 'Luke', id: 'LUK' },
  { abbreviation: 'John', name: 'John', id: 'JHN' },
  { abbreviation: 'Acts', name: 'Acts', id: 'ACT' },

  { abbreviation: 'Rom', name: 'Romans', id: 'ROM' },
  { abbreviation: '1 Cor', name: '1 Corinthians', id: '1CO' },
  { abbreviation: '2 Cor', name: '2 Corinthians', id: '2CO' },
  { abbreviation: 'Gal', name: 'Galatians', id: 'GAL' },
  { abbreviation: 'Eph', name: 'Ephesians', id: 'EPH' },
  { abbreviation: 'Phil', name: 'Philippians', id: 'PHP' },
  { abbreviation: 'Col', name: 'Colossians', id: 'COL' },
  { abbreviation: '1 Thess', name: '1 Thessalonians', id: '1TH' },
  { abbreviation: '2 Thess', name: '2 Thessalonians', id: '2TH' },
  { abbreviation: '1 Tim', name: '1 Timothy', id: '1TI' },
  { abbreviation: '2 Tim', name: '2 Timothy', id: '2TI' },
  { abbreviation: 'Titus', name: 'Titus', id: 'TIT' },
  { abbreviation: 'Phlm', name: 'Philemon', id: 'PHM' },
  { abbreviation: 'Heb', name: 'Hebrews', id: 'HEB' },
  { abbreviation: 'Jas', name: 'James', id: 'JAS' },
  { abbreviation: '1 Pet', name: '1 Peter', id: '1PE' },
  { abbreviation: '2 Pet', name: '2 Peter', id: '2PE' },
  { abbreviation: '1 John', name: '1 John', id: '1JN' },
  { abbreviation: '2 John', name: '2 John', id: '2JN' },
  { abbreviation: '3 John', name: '3 John', id: '3JN' },
  { abbreviation: 'Jude', name: 'Jude', id: 'JUD' },
  { abbreviation: 'Rev', name: 'Revelation', id: 'REV' },
];

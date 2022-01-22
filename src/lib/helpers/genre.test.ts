import { genreColor, genreBgColor, genreIcon, genreTitle } from './genre';

test('genreColor should ...', () => {
  expect(genreColor('word')).toBe('text-teal-900');
  expect(genreColor('textual')).toBe('text-pink-900');
  expect(genreColor('unknown')).toBe('text-gray-800');
});

test('genreBgColor should ...', () => {
  expect(genreBgColor('word')).toBe('bg-teal-900');
  expect(genreBgColor('passage')).toBe('bg-blue-800');
  expect(genreBgColor('artifact')).toBe('bg-yellow-900');
  expect(genreBgColor('unknown')).toBe('bg-gray-800');
});

test('genreIcon should ...', () => {
  expect(genreIcon('word')).toBe('fas fa-search');
  expect(genreIcon('topical')).toBe('fas fa-info-circle');
  expect(genreIcon('')).toBe('fas fa-search');
  expect(genreIcon(undefined)).toBe('fas fa-search');
});

test('genreTitle should ...', () => {
  expect(genreTitle('word')).toBe('Word study');
  expect(genreTitle('passage')).toBe('Passage study');
  expect(genreTitle('note')).toBe('Note');
  expect(genreTitle('random')).toBe('Random');
  expect(genreTitle(undefined)).toBe('');
});

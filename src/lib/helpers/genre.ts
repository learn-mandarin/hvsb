import { genres } from '$lib/mappings/genres';

export function genreColor(input: string) {
  const matching = genres.find((genre) => {
    return genre.key === input;
  });
  return (matching && matching.color) || 'text-gray-800';
}

export function genreBgColor(input: string) {
  const matching = genres.find((genre) => {
    return genre.key === input;
  });
  return (matching && matching.bgColor) || 'bg-gray-800';
}

export function genreIcon(input: string) {
  const matching = genres.find((genre) => {
    return genre.key === input;
  });
  return (matching && matching.icon) || 'fas fa-search';
}

export function genreTitle(input: string) {
  const matching = genres.find((genre) => {
    return genre.key === input;
  });
  return (
    (matching && matching.title) || (input && input.replace(/^\w/, (c) => c.toUpperCase())) || ''
  );
  // note, biography, chart, timeline all return self
}

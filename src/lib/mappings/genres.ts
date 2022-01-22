import type { IGenre } from '$lib/interfaces';

export const genres: IGenre[] = [
  {
    key: 'default',
    title: 'Study item',
    color: 'text-gray-800',
    bgColor: 'bg-gray-800',
    icon: 'fas fa-search',
  },

  // original for document
  {
    key: 'word',
    title: 'Word study',
    restrictTo: ['document'],
    color: 'text-teal-900',
    bgColor: 'bg-teal-900',
    icon: 'fas fa-search',
  },
  {
    key: 'passage',
    title: 'Passage study',
    restrictTo: ['document', 'video'],
    color: 'text-blue-800',
    bgColor: 'bg-blue-800',
    icon: 'fas fa-scroll',
  },
  {
    key: 'topical',
    title: 'Topical study',
    restrictTo: ['document', 'video'],
    color: 'text-teal-700',
    bgColor: 'bg-teal-700',
    icon: 'fas fa-info-circle',
  },
  {
    key: 'note',
    title: 'Note',
    restrictTo: ['document'],
    color: 'text-indigo-900',
    bgColor: 'bg-indigo-900',
    icon: 'fas fa-sticky-note',
  }, // maybe pencil?
  {
    key: 'artifact',
    title: 'Artifact',
    restrictTo: ['document', 'image', 'video'],
    color: 'text-yellow-900',
    bgColor: 'bg-yellow-900',
    icon: 'fas fa-monument',
  },
  {
    key: 'site',
    title: 'Site study',
    restrictTo: ['document', 'image', 'video'],
    color: 'text-orange-900',
    bgColor: 'bg-orange-900',
    icon: 'fas fa-archway',
  },
  {
    key: 'biography',
    title: 'Biography',
    restrictTo: ['document', 'video'],
    color: 'text-gray-800',
    bgColor: 'bg-gray-800',
    icon: 'fas fa-user',
  },
  {
    key: 'textual',
    title: 'Textual study',
    restrictTo: ['document'],
    color: 'text-pink-900',
    bgColor: 'bg-pink-900',
    icon: 'fas fa-question-circle',
  },
  {
    key: 'ancient_literature',
    title: 'Parallels in Ancient Literature',
    restrictTo: ['document'],
    color: 'text-orange-800',
    bgColor: 'bg-orange-800',
    icon: 'fas fa-scroll',
  },
  {
    key: 'chart',
    title: 'Chart',
    restrictTo: ['document', 'image'],
    color: 'text-red-900',
    bgColor: 'bg-red-900',
    icon: 'fas fa-table',
  },
  {
    key: 'timeline',
    title: 'Timeline',
    restrictTo: ['document'],
    color: 'text-purple-900',
    bgColor: 'bg-purple-900',
    icon: 'fas fa-stream',
  },

  // new for document
  { key: 'apologetics', title: 'Apologetics', restrictTo: ['document'] },
  { key: 'culture', title: 'Customs & Culture', restrictTo: ['document'] },
  { key: 'application', title: 'Application & Worship', restrictTo: ['document'] },
  { key: 'exegetical', title: 'Exegetical Insight', restrictTo: ['document'] },
  { key: 'doctrine', title: 'Guide to Bible Doctrine', restrictTo: ['document'] },
  { key: 'reflection', title: "Reflection on God's Truth", restrictTo: ['document'] },
  { key: 'fathers', title: 'Teaching of Church Fathers', restrictTo: ['document'] },
  { key: 'wisdom', title: 'Words of Wisdom', restrictTo: ['document'] },

  // image
  { key: 'photograph', title: 'Photograph', restrictTo: ['image'] }, // refactor to image.displayMedium
  { key: 'drawing', title: 'Drawing', restrictTo: ['image'] }, // refactor to image.displayMedium
  { key: 'painting', title: 'Painting', restrictTo: ['image'] }, // refactor to image.displayMedium
  { key: 'map', title: 'Map', restrictTo: ['image'] }, // refactor to image.displayMedium

  { key: 'scenery', title: 'Scenery & Landscape', restrictTo: ['image', 'video'] },
  { key: 'artwork', title: 'Artwork', restrictTo: ['image'] },
  { key: 'character', title: 'Bible Character', restrictTo: ['image'] },
  { key: 'story', title: 'Bible Story', restrictTo: ['image'] },
  { key: 'culture', title: 'Culture & Life', restrictTo: ['image'] },
  { key: 'structure', title: 'Structure', restrictTo: ['image'] },
];

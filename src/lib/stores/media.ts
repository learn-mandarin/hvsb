import { writable } from 'svelte/store';
import type { IDocument, IImage, IVideo } from '$lib/interfaces';
export const chapterMedia = writable<(IDocument | IImage | IVideo)[]>([]);

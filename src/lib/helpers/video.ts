// invalid ID for testing: 413420348
import type { IVimeoVideo } from '$lib/interfaces';

export async function fetchVideoData(videoId: string): Promise<IVimeoVideo> {
  const url = `https://api.vimeo.com/videos/${videoId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `bearer ${import.meta.env.VITE_vimeoUnauthenticatedAccessToken}`,
    },
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

import { deleteDocumentOnline } from '$sveltefirets';
export async function deleteVideo(videoId: string) {
  if (confirm('Delete Video?')) {
    await deleteDocumentOnline(`media/${videoId}`);
    window.location.reload();
  }
}

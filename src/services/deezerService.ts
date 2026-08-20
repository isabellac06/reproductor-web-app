import type { Song } from "../types/song";

interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
}

interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
}

function adaptDeezerTrackToSong(track: DeezerTrack): Song {
  return {
    id: track.id.toString(),
    title: track.title,
    artist: track.artist.name,
    imageUrl: track.album.cover_medium,
    audioUrl: track.preview,
    duration: track.duration,
    album: track.album.title,
  };
}

export async function searchSongs(query: string): Promise<Song[]> {
  const response = await fetch(`/deezer/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("No se pudo conectar con Deezer");
  }

  const data: DeezerSearchResponse = await response.json();

  return data.data.map(adaptDeezerTrackToSong);
}

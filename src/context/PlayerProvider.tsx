import { useEffect, useState, type ReactNode } from "react";
import type { Song } from "../types/song";
import { PlayerContext } from "./PlayerContext";
import { mockSongs } from "../data/songs-mock";

interface Props {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: Props) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Song[]>(mockSongs);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(() => {
    const guardado = localStorage.getItem("recentlyPlayed");
    if (guardado === null) {
      return mockSongs;
    }
    return JSON.parse(guardado);
  });

  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const playSong = (song: Song, index: number) => {
    setCurrentSong(song);
    setCurrentIndex(index);
    setIsPlaying(true);

    setRecentlyPlayed((prev) => {
      const sinDuplicado = prev.filter((s) => s.id !== song.id);
      const actualizado = [song, ...sinDuplicado];
      return actualizado.slice(0, 12);
    });
  };

  const togglePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const nextSong = () => {
    if (currentSong === null) return;
    if (currentIndex === null || currentIndex === playlist.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
  };

  const previousSong = () => {
    if (currentSong === null) return;
    if (currentIndex === null || currentIndex === 0) return;
    const previousIndex = currentIndex - 1;
    setCurrentIndex(previousIndex);
    setCurrentSong(playlist[previousIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        recentlyPlayed,
        playSong,
        previousSong,
        nextSong,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
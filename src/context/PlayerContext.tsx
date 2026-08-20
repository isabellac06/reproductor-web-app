import { createContext, useContext } from "react";
import type { Song } from "../types/song";

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
  recentlyPlayed: Song[];
  playSong: (song: Song, index: number) => void;
  previousSong: () => void;
  nextSong: () => void;
  togglePlay: () => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined,
);

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer debe usarse dentro de un  PlayerProvider");
  }

  return context;
}
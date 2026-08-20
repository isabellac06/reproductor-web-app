import { useEffect, useState, type ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { Song } from "../types/song";

interface Props {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>(() => {
    const guardado = localStorage.getItem("favoriteSongs");
    if (guardado === null) {
      return [];
    }
    return JSON.parse(guardado);
  });

  useEffect(() => {
    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
  }, [favoriteSongs]);

  const isFavorite = (songId: string) => {
    return favoriteSongs.some((song) => song.id === songId);
  };

  const toggleFavorite = (song: Song) => {
    if (isFavorite(song.id)) {
      setFavoriteSongs(favoriteSongs.filter((s) => s.id !== song.id));
      return;
    }
    setFavoriteSongs([...favoriteSongs, song]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteSongs, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
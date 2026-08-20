import { createContext, useContext } from "react";
import type { Song } from "../types/song";

interface FavoritesContextType {
  favoriteSongs: Song[];
  toggleFavorite: (song: Song) => void;
  isFavorite: (songId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }

  return context;
}
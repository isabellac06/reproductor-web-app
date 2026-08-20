import { SongCard } from "../components/02-music/SongCard";
import { HorizontalScrollSection } from "../components/shared/HorizontalScrollSection";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../context/FavoritesContext";

export const Favorites = () => {
  const { playSong } = usePlayer();
  const { favoriteSongs } = useFavorites();

  return (
    <div>
      <HorizontalScrollSection title="Tus favoritos">
        {favoriteSongs.map((song, index) => (
          <SongCard
            song={song}
            position={index}
            onPlay={playSong}
            key={song.id}
          />
        ))}
      </HorizontalScrollSection>
    </div>
  );
};
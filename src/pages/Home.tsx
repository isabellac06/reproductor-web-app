import { SongCard } from "../components/02-music/SongCard";
import { HorizontalScrollSection } from "../components/shared/HorizontalScrollSection";
import { usePlayer } from "../context/PlayerContext";

export const Home = () => {
  const { playSong, recentlyPlayed } = usePlayer();
  return (
    <div>
      <HorizontalScrollSection title="Canciones escuchadas recientemente">
        {recentlyPlayed.map((song, index) => (
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
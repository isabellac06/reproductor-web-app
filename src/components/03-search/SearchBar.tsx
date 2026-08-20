import { useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import type { Song } from "../../types/song";
import { searchSongs } from "../../services/deezerService";

interface Props {
  placeholder?: string;
}

export const SearchBar = ({ placeholder = "Buscar" }: Props) => {
  const { playSong } = usePlayer();

  const [buscarTermino, setBuscarTermino] = useState<string>("");
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarTermino(event.target.value);
  };

  useEffect(() => {
    if (buscarTermino.trim() === "") {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      searchSongs(buscarTermino)
        .then((songs) => {
          setResults(songs);
          setIsLoading(false);
        })
        .catch(() => {
          setError("No se pudo conectar con Deezer");
          setIsLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [buscarTermino]);

  const onResultClick = (song: Song) => {
    playSong(song, 0);
    setShowResults(false);
    setBuscarTermino("");
  };

  return (
    <div className="search-container relative">
      <input
        type="text"
        placeholder={placeholder}
        value={buscarTermino}
        onChange={onChanged}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 150)}
        aria-label="Buscar"
        className="w-full bg-neutral-700 text-white placeholder-neutral-400 rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-neutral-500"
      />
      {showResults && buscarTermino.trim() !== "" && (
        <div className="absolute top-full left-0 w-full mt-2 bg-neutral-800 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading && (
            <p className="text-neutral-400 text-sm px-4 py-3">Buscando...</p>
          )}
          {error && (
            <p className="text-red-400 text-sm px-4 py-3">{error}</p>
          )}
          {!isLoading && !error && results.length === 0 && (
            <p className="text-neutral-400 text-sm px-4 py-3">
              Sin resultados
            </p>
          )}
          {!isLoading &&
            !error &&
            results.map((song) => (
              <div
                key={song.id}
                onClick={() => onResultClick(song)}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-neutral-700"
              >
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{song.title}</p>
                  <p className="text-neutral-400 text-xs truncate">
                    {song.artist}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
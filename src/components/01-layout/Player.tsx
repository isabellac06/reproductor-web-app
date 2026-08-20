import { Icon } from "@iconify/react";
import { ICONS } from "../../data/icons";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@heroui/react";
import { formatDuration } from "../../utils/formatDuration";
import { usePlayer } from "../../context/PlayerContext";
import { useFavorites } from "../../context/FavoritesContext";

export const Player = () => {
  const {
    currentSong: song,
    isPlaying,
    previousSong,
    nextSong,
    togglePlay,
  } = usePlayer();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [realDuration, setRealDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);

  const audioRef = useRef<HTMLAudioElement>(null);

  // ** Reiniciar slider
  useEffect(() => {
    setCurrentTime(0);
    setRealDuration(0);
    setIsSeeking(false);
  }, [song]);

  // ** Conectar los botones con el DOM de HTML
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || song === null) {
      return;
    }

    if (isPlaying) {
      if (song.audioUrl === "") {
        audio.pause();
        togglePlay();
        return;
      }

      // Es una promesa

      audio.play().catch((e) => {
        if (e.name !== "AbortError") {
          console.error(e.message);
        }
      });
      return;
    }
    audio.pause();
  }, [isPlaying, song]);

  // ** Actualizar en tiempo real el currentTime
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  // ** Tomar la duración original de la canción como componente de audio HTML
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleDuration = () => {
      setRealDuration(Math.floor(audio.duration));
    };

    // Si la metadata ya estaba cargada antes de que este efecto se ejecute,
    // el evento (loadedmetadata) ya pasó y nunca se recibe
    // por eso se comprueba el valor actual directamente acá también
    if (!isNaN(audio.duration) && audio.duration > 0) {
      handleDuration();
    }

    audio.addEventListener("loadedmetadata", handleDuration);

    return () => {
      audio.removeEventListener("loadedmetadata", handleDuration);
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  if (!song) return null;

  const { id, title, artist, imageUrl, audioUrl, album } = song;

  const iconPlayAboutState = () => {
    if (isPlaying) {
      return ICONS.pause;
    }
    return ICONS.play;
  };

  const handleSeekChange = (thumbCurrentTime: number | number[]) => {
    const nuevoValor = Array.isArray(thumbCurrentTime)
      ? thumbCurrentTime[0]
      : thumbCurrentTime; // Normalización
    setIsSeeking(true);
    setSeekTime(nuevoValor);
  };

  const onChangeEnd = (finalValue: number | number[]) => {
    const valorFinal = Array.isArray(finalValue) ? finalValue[0] : finalValue;
    if (audioRef.current) audioRef.current.currentTime = valorFinal;
    setCurrentTime(valorFinal);
    setIsSeeking(false);
  };

  const handleVolumeChange = (volumeValue: number | number[]) => {
    const valorVolumen = Array.isArray(volumeValue)
      ? volumeValue[0]
      : volumeValue;
    setVolume(valorVolumen);
  };

  const iconAboutFavorite = () => {
    if (!isFavorite(song.id)) {
      return ICONS.addFavorite;
    }
    return ICONS.favorite;
  };

  return (
    <div>
      <footer className="h-20 bg-neutral-400 grid grid-cols-3 items-center px-4 py-3 gap-4">
        <audio ref={audioRef} src={audioUrl || undefined} />
        {/*Canción y añadir a favorito*/}
        <div className="player-left flex items-center gap-3">
          <img
            className="aspect-square object-cover rounded-lg w-12"
            src={imageUrl}
            alt={title}
          />
          <div className="song-data flex flex-col">
            <h1 className="text-sm font-semibold">{title}</h1>
            <h2 className="text-xs text-neutral-600">
              {artist} • {album}
            </h2>
          </div>
          <Icon
            className="cursor-pointer"
            width="18"
            height="18"
            icon={iconAboutFavorite()}
            onClick={() => toggleFavorite(song)}
          />
        </div>
        {/*Botones de reproducción*/}
        <div className="player-center flex flex-col items-center w-full">
          <div className="playback-controls flex items-center gap-4">
            <Icon
              className="cursor-pointer"
              width="30"
              height="30"
              icon={ICONS.previous}
              onClick={previousSong}
            />
            <Icon
              className="cursor-pointer"
              width="35"
              height="35"
              icon={iconPlayAboutState()}
              onClick={togglePlay}
            />
            <Icon
              className="cursor-pointer"
              width="30"
              height="30"
              icon={ICONS.next}
              onClick={nextSong}
            />
          </div>
          <div className="progress-bar flex gap-2 items-center">
            <span className="current-time">{formatDuration(currentTime)}</span>

            <Slider
              aria-label="Progreso de la canción"
              className="w-full max-w-md"
              defaultValue={0}
              value={isSeeking ? seekTime : currentTime}
              minValue={0}
              maxValue={realDuration}
              onChange={handleSeekChange}
              onChangeEnd={onChangeEnd}
            >
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>
            <span className="duration">{formatDuration(realDuration)}</span>
          </div>
        </div>
        {/*Volumen*/}
        <div className="player-right flex items-center justify-end gap-2">
          <Icon
            className="cursor-pointer"
            width="20"
            height="20"
            icon={ICONS.volume}
          />
          <Slider
            aria-label="Volumen"
            className="w-24"
            value={volume}
            minValue={0}
            maxValue={100}
            onChange={handleVolumeChange}
          >
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
        </div>
      </footer>
    </div>
  );
};

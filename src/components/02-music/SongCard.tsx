import { Card } from "@heroui/react";
import type { Song } from "../../types/song";
import { formatDuration } from "../../utils/formatDuration";

interface Props {
  song: Song;
  position: number;
  onPlay: (song: Song, index: number) => void;
}

export const SongCard = ({ song, position, onPlay }: Props) => {
  const { title, artist, imageUrl, duration } = song;

  const onClicked = () => {
    onPlay(song, position);
  };

  return (
    <Card
      className="cursor-pointer shrink-0"
      style={{ width: "210px" }}
      onClick={onClicked}
    >
      <Card.Header>
        <img
          className="aspect-square object-cover rounded-lg w-full"
          src={imageUrl}
          alt={title}
        />
      </Card.Header>
      <Card.Content className="w-full">
        <div className="flex justify-between gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            <p className="line-clamp-2">{title}</p>
            <p className="truncate text-gray-400">{artist}</p>
          </div>
          <span className="shrink-0 whitespace-nowrap">
            {formatDuration(duration)}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};
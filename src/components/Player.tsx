"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import { PlayerContent } from "@/components";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;

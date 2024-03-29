"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "../../../../types";
import { useUser } from "@/hooks/useUser";
import { MediaItem, LikeButton } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <h2 className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Liked Songs
      </h2>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} song={song} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;

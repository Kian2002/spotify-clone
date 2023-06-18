"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import { useUser } from "@/hooks/useUser";
import { useAuthModal } from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "../../types";
import { MediaItem } from "../components";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const handleClick = () => {
    if (!user) {
      authModal.open();
    }

    return uploadModal.open();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          size={18}
          className="transition text-neutral-400 cursor-pointer hover:text-white"
          onClick={handleClick}
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem key={song.id} onClick={() => {}} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;

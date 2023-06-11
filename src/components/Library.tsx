import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
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
        />
      </div>

      <div>list goes here</div>
    </div>
  );
};

export default Library;

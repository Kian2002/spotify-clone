import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "../../types";

const useLoadSong = (song: Song) => {
  const supabase = useSupabaseClient();

  if (!song) return "";

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSong;

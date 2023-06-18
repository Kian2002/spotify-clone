import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Song } from "../../types"

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const userId = (await supabase.auth.getUser()).data.user?.id

    const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
        return []
    }

    if (!data) {
        return []
    }
    
    return data.map((item) => ({
        ...item.songs
    }))
};

export default getLikedSongs
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const body = await req.json();
        const { user_id, playlist, tracks } = body;

        // Validate input
        if (!user_id || !playlist || !tracks) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if the playlist already exists
        const { data: existingPlaylist, error: fetchError } = await supabase
            .from("user_playlists")
            .select("*")
            .eq("user_id", user_id)
            .eq("playlist", playlist)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            // Handle unexpected errors (PGRST116 indicates no record found)
            throw fetchError;
        }

        if (existingPlaylist) {
            // If the playlist exists, perform an update (PUT equivalent)
            const { data, error } = await supabase
                .from("user_playlists")
                .update({ tracks })
                .eq("user_id", user_id)
                .eq("playlist", playlist);

            if (error) {
                throw error;
            }

            return NextResponse.json(
                { success: true, message: "Playlist updated successfully", data },
                { status: 200 }
            );
        } else {
            // If the playlist does not exist, create a new one (POST equivalent)
            const { data, error } = await supabase.from("user_playlists").insert([
                {
                    user_id,
                    playlist,
                    tracks,
                },
            ]);

            if (error) {
                throw error;
            }

            return NextResponse.json(
                { success: true, message: "Playlist created successfully", data },
                { status: 201 }
            );
        }
    } catch (err) {
        console.error("Error handling playlist request:", err);
        return NextResponse.json({ error: "Failed to handle playlist request" }, { status: 500 });
    }
}

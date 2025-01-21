import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
    try {
        // Await the Supabase client
        const supabase = await createClient();

        const body = await req.json();
        const { user_id, playlist_name, playlist } = body;

        // Validate input
        if (!user_id || !playlist_name || !playlist) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Insert data into the table
        const { data, error } = await supabase.from("user_playlists").insert([
            {
                user_id,
                playlist_name,
                playlist, // Ensure this is valid JSON or JSONB format
            },
        ]);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err) {
        console.error("Error inserting playlist:", err);
        return NextResponse.json({ error: "Failed to insert playlist" }, { status: 500 });
    }
}

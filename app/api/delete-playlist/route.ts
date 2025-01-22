import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function DELETE(req: Request) {
    try {
        const supabase = await createClient();
        const body = await req.json();
        const { id } = body;

        // Validate input
        if (!id) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }

        // Delete the playlist by ID
        const { data, error } = await supabase
            .from("user_playlists")
            .delete()
            .eq("id", id);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { success: true, message: "Playlist deleted successfully", data },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error deleting playlist:", err);
        return NextResponse.json({ error: "Failed to delete playlist" }, { status: 500 });
    }
}

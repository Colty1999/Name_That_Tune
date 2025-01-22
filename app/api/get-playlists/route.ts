import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Await the Supabase client
        const supabase = await createClient();

        // Get the current user from Supabase
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user?.id) {
            return NextResponse.json(
                { error: "Unable to retrieve user ID. Please ensure you are logged in." },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Fetch playlists for the current user
        const { data, error } = await supabase
            .from("user_playlists")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err) {
        console.error("Error fetching playlists:", err);

        return NextResponse.json(
            { error: "Failed to fetch playlists. Please try again later." },
            { status: 500 }
        );
    }
}

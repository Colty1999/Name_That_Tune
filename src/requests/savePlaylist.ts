import axios from "axios";
import { createClient } from "utils/supabase/client";

export const savePlaylist = async (
    playlist: string,
    tracks: string,
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void,
    setShowModal?: (showModal: boolean) => void
) => {
    setLoading(true);
    try {
        // Validate input
        if (!playlist || !tracks) {
            throw new Error("Invalid input: playlistName and tracks are required.");
        }

        // Initialize the Supabase client
        const supabase = createClient();

        // Get the current user from Supabase
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user?.id) {
            throw new Error("Unable to retrieve user ID. Please ensure you are logged in.");
        }

        const userId = session.user.id;

        // API request
        const response = await axios.post("/api/add-playlist", {
            user_id: userId,
            playlist: playlist,
            tracks: tracks,
        });

        setLoading(false);
        if (setShowModal) setShowModal(true);

        // Return the success response
        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
        };
    } catch (error) {
        let errorMessage = "An unknown error occurred.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        if (axios.isAxiosError(error) && error.response?.data?.error) {
            errorMessage = error.response.data.error;
        }

        console.error("Error handling playlist:", error);

        setLoading(false);
        setError(errorMessage);

        // Return a failure response
        return {
            success: false,
            message: errorMessage,
        };
    }
};

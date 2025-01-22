import axios from "axios";

/**
 * Function to delete a playlist by its ID.
 * @param id - The ID of the playlist to delete.
 * @returns A promise resolving to the success or failure response.
 */
export const deletePlaylist = async (id: string) => {
    try {
        // Send DELETE request to the API
        const response = await axios.delete("/api/delete-playlist", {
            data: { id }, // Axios requires `data` field for DELETE requests
        });

        // Return success response
        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
        };
    } catch (error) {
        let errorMessage = "An unexpected error occurred.";

        // Handle Axios error responses
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error("Error deleting playlist:", errorMessage);

        // Return failure response
        return {
            success: false,
            message: errorMessage,
        };
    }
};

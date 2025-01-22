export const fetchPlaylists = async (
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void
) => {
    setLoading(true);
    try {
        const response = await fetch("/api/get-playlists");
        const result = await response.json();

        if (response.ok) {
            // setPlaylists(result.data);
            // result.data.map((playlist: any) => {
            //     console.log(JSON.parse(playlist.playlist));
            // });
            console.log(result.data);
            setLoading(false);
            return result.data;
        } else {
            setLoading(false);
            setError(result.error || "Failed to fetch playlists.");
            return [];
        }
    } catch (error) {
        setLoading(false);
        setError("An unknown error occurred.");
        return [];
    }
};
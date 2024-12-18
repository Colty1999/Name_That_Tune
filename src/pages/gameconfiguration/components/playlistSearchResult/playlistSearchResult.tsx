import { useContext, useEffect, useState } from "react";
import "./playlistSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import SpotifyWebApi from "spotify-web-api-node";
import { AppContext } from "../../../../App";
import { deleteCookie, getCookie } from "cookies-next/client";

interface PlaylistSearchResultProps {
    playlist: {
        title: string,
        description: string,
        uri: string,
        albumUrl?: string,
    }
}

const PlaylistSearchResult = ({ playlist }: PlaylistSearchResultProps) => {
    const { title, description, uri, albumUrl } = playlist;
    const accessToken = getCookie("accessToken");
    const tracks = useStorageState({ state: "tracks" });
    const { setLoading, setSongPlaying, setError } = useContext(AppContext);

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    const currentPlaylistUri = useStorageState({ state: "currentPlaylistUri" });

    const [playlistSelect, setPlaylistSelect] = useState<boolean>(false);

    const selectPlaylist = () => {
        setPlaylistSelect(true);
        currentPlaylistUri.setStorageState(uri);
        if (!accessToken) return;
        let cancel = false;
        setLoading(true);
        tracks.setStorageState(JSON.stringify([]));
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getPlaylistTracks(playlist.uri.replace("spotify:playlist:", "")) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                // console.log(res.body.items);
                const response = res.body.items;
                response.forEach((track: SpotifyApi.PlaylistTrackObject) => {
                    (track as SpotifyApi.PlaylistTrackObject & { points: number; played: boolean }).points = 100;
                    (track as SpotifyApi.PlaylistTrackObject & { points: number; played: boolean }).played = false;
                });
                tracks.setStorageState(JSON.stringify(response));
                setLoading(false);
            })
            .catch((err) => {
                deleteCookie("accessToken");
                console.error(err);
                setLoading(false);
                setError(err.message);

            })
        return () => { cancel = true };
    }

    useEffect(() => {
        if (currentPlaylistUri.store === uri) {
            setPlaylistSelect(true);
        } else {
            // setSongPlaying(false);
            setPlaylistSelect(false);
        }
    }, [currentPlaylistUri.store, uri]);

    const [loadedClassName, setLoadedClassName] = useState<string>("");
    useEffect(() => {
        setLoadedClassName("loaded");
        setSongPlaying(false); //stop music if playing
    });


    return (
        <div className="playlistSearchResult">
            <div className={`playlistElement ${playlistSelect ? "active" : ""} ${loadedClassName}`} onClick={() => selectPlaylist()}>
                <img src={albumUrl} alt={playlist.title} />
                <div className="playlistData">
                    <h3 className="playlistTitle">{title}</h3>
                    <h4 className="playlistDescription">{description}</h4>
                </div>
                {/* <FontAwesomeIcon icon={playlistSelect ? faPause : faPlay} className="playIcon" /> */}
            </div>
        </div>
    );
};

export default PlaylistSearchResult;

import { useEffect, useState } from "react";
import "./playlistSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import SpotifyWebApi from "spotify-web-api-node";

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
    let accessToken = useStorageState({ state: "accessToken" });

    let tracks = useStorageState({ state: "tracks" });
    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    let currentPlaylistUri = useStorageState({ state: "currentPlaylistUri" });

    const [playlistSelect, setPlaylistSelect] = useState<boolean>(false);

    const selectPlaylist = () => {
        setPlaylistSelect(true);
        currentPlaylistUri.setStorageState(uri);
        if (!accessToken!.store) return;
        let cancel = false;
        spotifyApi.setAccessToken(accessToken!.store);
        spotifyApi.getPlaylistTracks(playlist.uri.replace("spotify:playlist:", "")) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                // console.log(res.body.items);
                tracks.setStorageState(JSON.stringify(res.body.items));
            })
            .catch((err) => {
                console.error(err);
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
    }, []);


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

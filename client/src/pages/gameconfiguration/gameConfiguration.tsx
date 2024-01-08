import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import { useStorageState } from "../../hooks/useStorageState";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";
import TrackSearchResult from "./components/trackSearchResult/trackSearchResult";
import Player from "../../components/player/player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const GameConfiguration = () => {
    let loggedIn = useStorageState({ state: "loggedIn" });
    let accessToken = useStorageState({ state: "accessToken" });
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken!.store) return;
        let cancel = false;
        spotifyApi.setAccessToken(accessToken!.store);
        spotifyApi.searchPlaylists(search) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                setSearchResults(res.body.playlists!.items.map((playlist: any) => {

                    const smallestAlbumImage = playlist.images.reduce((smallest: any, image: any) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, playlist.images[0]);

                    return {
                        title: playlist.name,
                        description: playlist.description,
                        uri: playlist.uri,
                        albumUrl: smallestAlbumImage.url,
                    };

                })
                );
                console.log(res.body);
            })
            .catch((err) => {
                console.error(err);
            })
        return () => { cancel = true };
    }, [search, accessToken.store]);

    if (!accessToken!.store || (loggedIn ? loggedIn.store! : "false") !== "true") return <div className="spotifyLoginPrompt"><SpotifyLogin /></div>;
    return (
        <div className="gameConfigurationContainer">
            <div className="gameSettings">lalala</div>
            <div className="form">
                <div className={`searchContainer ${searchResults.length === 0 ? "" : "searchContainerActive"}`}>
                <Form.Control
                    type="search"
                    placeholder="Search Playlists"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="searchBar"
                />
                <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="searchContent">
                    {searchResults.map((track: any) => (
                        <TrackSearchResult track={track} key={track.uri} />
                    ))}
                    {(search && searchResults.length === 0) && (
                        <div className="noResults">No Results</div>
                    )}
                </div>
            </div>
            <Player uri={currentSongUri.store ? currentSongUri.store : ""} />
        </div>
    )
};

export default GameConfiguration;

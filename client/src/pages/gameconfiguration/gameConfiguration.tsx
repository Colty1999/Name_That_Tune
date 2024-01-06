import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import { useStorageState } from "../../hooks/useStorageState";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";
import TrackSearchResult from "./components/trackSearchResult/trackSearchResult";
import Player from "../../components/player/player";


const GameConfiguration = () => {
    let accessToken = useStorageState({ state: "accessToken" });
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    // useEffect(() => {
    //     if (!localStorage.getItem("accessToken")) return;
    //     if (!accessToken!.store) return;
    //     spotifyApi.setAccessToken(accessToken!.store);
    //     console.log(spotifyApi.getAccessToken());
    // }, [accessToken.store]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken!.store) return;
        let cancel = false;
        spotifyApi.setAccessToken(accessToken!.store);
        spotifyApi.searchTracks(search) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                setSearchResults(res.body.tracks!.items.map((track: any) => {

                    const smallestAlbumImage = track.album.images.reduce((smallest: any, image: any) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, track.album.images[0]);

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    };

                })
                );
                // console.log(spotifyApi.getAccessToken());
                // console.log(res);
            })
            .catch((err) => {
                // console.log(spotifyApi.getAccessToken());
                console.error(err);
            })
        return () => { cancel = true };
    }, [search, accessToken.store]);

    if (!accessToken!.store) return <div className="spotifyLoginPrompt"><SpotifyLogin /></div>;
    return (
        <div className="gameConfigurationContainer">
            <div className="form">
                <Form.Control
                    type="search"
                    placeholder="Search Songs/Playlists"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="searchBar"
                />
                <div className="searchContent">
                    {searchResults.map((track: any) => (
                        <TrackSearchResult track={track} key={track.uri} />
                    ))}
                </div>
            </div>
            <Player uri={currentSongUri.store ? currentSongUri.store : ""} />
        </div>
    )
};

export default GameConfiguration;

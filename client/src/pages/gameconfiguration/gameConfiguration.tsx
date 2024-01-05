import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import { useStorageState } from "../../hooks/useStorageState";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";


const GameConfiguration = () => {
    let accessToken = useStorageState({state: "accessToken"})
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
        spotifyApi.setAccessToken(accessToken!.store);
        spotifyApi.searchTracks(search) //, { limit: 50, offset: 1 }
            .then((res) => {
                // console.log(data.body.tracks.items);
                console.log(spotifyApi.getAccessToken());
                console.log(res);
            })
            .catch((err) => {
                console.log(spotifyApi.getAccessToken());
                console.error(err);
            });
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
                    Songs
                </div>
            </div>
        </div>
    )
};

export default GameConfiguration;

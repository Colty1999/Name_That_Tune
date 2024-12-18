"use client";

import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import { useStorageState } from "../../hooks/useStorageState";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";
import PlaylistSearchResult from "./components/playlistSearchResult/playlistSearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TrackResult from "./components/trackResult/trackResult";
import { Link } from "react-router-dom";
import ConfigurationModal from "./components/configurationModal/configurationModal";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";
import { Track, PlaylistSearchResultType } from "../../assets/common";
import { deleteCookie, getCookie } from "cookies-next/client";


const GameConfiguration = () => {
    const [t] = useTranslation();

    const { setError } = useContext(AppContext);

    const accessToken = getCookie("accessToken");
    const tracks = useStorageState({ state: "tracks" });

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<PlaylistSearchResultType[]>([]);
    const [showModal, setShowModal] = useState(false);

    // -----------------

    const team1 = useStorageState({ state: "team1" });
    const team2 = useStorageState({ state: "team2" });
    const team3 = useStorageState({ state: "team3" });
    const category = useStorageState({ state: "category" }); //compares if the song name matches to determine styling (stupid)
    const count = useStorageState({ state: "count" });
    const maxPoints = useStorageState({ state: "maxPoints" });
    const pointsIncrement = useStorageState({ state: "pointsIncrement" });
    

    //-----------------

    const pageStorage = useStorageState({ state: "currentPage" });

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    function configureGameStart() {
        pageStorage.setStorageState("0");
        category.setStorageState("");
        count.setStorageState("0");
        if (!team1.store) team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
        else team1.setStorageState(JSON.stringify({ name: JSON.parse(team1.store!).name, points: JSON.parse(team1.store!).points }));
        if (!team2.store) team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
        else team2.setStorageState(JSON.stringify({ name: JSON.parse(team2.store!).name, points: JSON.parse(team2.store!).points }));
        if (!team3.store) team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
        else team3.setStorageState(JSON.stringify({ name: JSON.parse(team3.store!).name, points: JSON.parse(team3.store!).points }));
        if (tracks.store) {
            const trackRevival = JSON.parse(tracks.store);
            trackRevival.forEach((track: Track) => {
                track.played = false;
                track.youtubePlay = false;
                track.showName = false;
            });
            tracks.setStorageState(JSON.stringify(trackRevival));
        }
        if (!maxPoints.store) maxPoints.setStorageState("400");
        if (!pointsIncrement.store) pointsIncrement.setStorageState("5");
    }

    useEffect(() => {
        if (!search) {
            if (searchResults.length !== 0) setSearchResults([]);
            return;
        }
        if (!accessToken) return;
        let cancel = false;
        // setLoading(true);
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchPlaylists(search) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                setSearchResults(res.body.playlists!.items.filter((playlist) => playlist !== null).map((playlist: SpotifyApi.PlaylistObjectSimplified ) => {

                    const smallestImage = playlist.images.reduce((smallest: SpotifyApi.ImageObject, image: SpotifyApi.ImageObject) => {
                        if (image.height && smallest.height && image.height < smallest.height) return image;
                        return smallest;
                    }, playlist.images[0]);

                    // setLoading(false);

                    return {
                        title: playlist.name,
                        description: playlist.description || "",
                        uri: playlist.uri,
                        albumUrl: smallestImage.url,
                    };

                })
                );
            })
            .catch((err) => {
                deleteCookie("accessToken");
                console.error(err);
                setError(err.message);
                // setLoading(false);
            })
        return () => { cancel = true };
    }, [search, accessToken, setError, spotifyApi]);

    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>{t('sessionexpired')}</div><SpotifyLogin /></div>;
    return (
        <div className="gameConfigurationContainer">
            <ConfigurationModal show={showModal} handleClose={() => setShowModal(false)} />
            {/* playlist search */}
            <div className="form">
                <div className={`searchContainer ${searchResults.length === 0 ? "" : "searchContainerActive"}`}>
                    <Form.Control
                        type="search"
                        placeholder={t('config.search')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="searchBar"
                    />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="searchContent">
                    {searchResults.map((playlist: PlaylistSearchResultType, key: number) => (
                        <PlaylistSearchResult playlist={playlist} key={key} />
                    ))}
                    {(search && searchResults.length === 0) && (
                        <div className="noResults">{t('config.noresults')} "{search}"
                        </div>
                    )}
                </div>
            </div>
            {/* game settings */}
            <div className="gameSettings" style={(tracks.store && tracks.store.length > 0) ? {} : { display: 'none' }}>
                <div className="gameSettingsTitle">{t('config.summary')}</div>
                <div className="gameSettingsContainer">
                    {(tracks.store && tracks.store.length > 0) && JSON.parse(tracks.store).map((track: Track, key: number) => <TrackResult track={track} id={key} key={key} />)}
                </div>
                <div className="gameButtonContainer">
                    <button className="" onClick={() => setShowModal(true)}>{t('config.settings')}</button>
                    <Link to="/spotifygamemaster" onClick={configureGameStart}><button className="gameSettingsButton">{t('config.start')}</button></Link>
                </div>
            </div>
            {/* <Player uri={currentSongUri.store ? currentSongUri.store : ""} /> */}
        </div>
    )
};

export default GameConfiguration;

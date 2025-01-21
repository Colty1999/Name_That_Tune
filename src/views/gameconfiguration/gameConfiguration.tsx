"use client";

import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";
import PlaylistSearchResult from "./components/playlistSearchResult/playlistSearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";
import { PlaylistSearchResultType } from "../../assets/common";
import { deleteCookie, getCookie } from "cookies-next/client";
import { Link } from "react-router-dom";
import { useStorageState } from "src/hooks/useStorageState";


const GameConfiguration = () => {
    const [t] = useTranslation();

    const { setError } = useContext(AppContext);

    const accessToken = getCookie("accessToken");
    const tracks = useStorageState({ state: "tracks" });
    const currentPlaylist = useStorageState({ state: "currentPlaylist" });

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<PlaylistSearchResultType[]>([]);

    // -----------------

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    useEffect(() => {
        if (!search) {
            if (searchResults.length !== 0) setSearchResults([]);
            return;
        }
        if (!accessToken) return;
        let cancel = false;
        // setLoading(true);
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchPlaylists(search, { limit: 10 }) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                setSearchResults(res.body.playlists!.items.filter((playlist) => playlist !== null).map((playlist: SpotifyApi.PlaylistObjectSimplified) => {

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

            <div className="form" style={{ height: "calc(100vh - 4.5rem)" }}>
                <div className="tracksSettingsTitle">{t('config.playlists')}</div>
                <div className="tracksButtonContainer">
                    {/* <button className="" onClick={() => setShowModal(true)}>{t('config.settings')}</button> */}
                    In future saved playlists will appear here
                    {(currentPlaylist.store && currentPlaylist.store !== "") &&
                        <div className="currentPlaylist">
                            <div className="title">Current playlist:</div>
                            <div className="content">
                                <img src={JSON.parse(currentPlaylist.store).albumUrl} alt={JSON.parse(currentPlaylist.store).title} style={{width: "20%"}}/>
                                <div style={{width: "50%", textAlign: "left"}}>{JSON.parse(currentPlaylist.store).title}</div>
                            </div>
                        </div>
                    }
                    <Link to="/playlistconfiguration">
                        <button onClick={() => { }} className='tracksSettingsButton' disabled={(!tracks.store || tracks.store.length === 0)}>
                            {t("config.start")}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default GameConfiguration;

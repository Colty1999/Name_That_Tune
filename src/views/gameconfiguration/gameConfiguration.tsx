"use client";

import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./gameConfiguration.scss";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyLogin from "../../components/spotifyLogin/spotifyLogin";
import PlaylistSearchResult from "./components/playlistSearchResult/playlistSearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";
import { PlaylistSearchResultType } from "../../assets/common";
import { deleteCookie, getCookie } from "cookies-next/client";
import { Link, useNavigate } from "react-router-dom";
import { useStorageState } from "src/hooks/useStorageState";
import { fetchPlaylists } from "src/requests/fetchPlaylists";
import { deletePlaylist } from "src/requests/deletePlaylist";
import DeleteQuestionModal from "./components/modals/DeletePlaylistModal";


const GameConfiguration = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();

    const { setLoading, setError } = useContext(AppContext);

    const accessToken = getCookie("accessToken");
    const tracks = useStorageState({ state: "tracks" });
    const currentPlaylist = useStorageState({ state: "currentPlaylist" });

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<PlaylistSearchResultType[]>([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // -----------------

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    const fetchAndSetPlaylists = async () => {
        const fetchedPlaylists = await fetchPlaylists(setLoading, setError);
        setPlaylists(fetchedPlaylists); // Set the parsed playlists
    };

    useEffect(() => {
        fetchAndSetPlaylists();
    }, []);

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
            <DeleteQuestionModal show={showModal} id={playlistId!} deletePlaylist={deletePlaylist} fetchAndSetPlaylists={fetchAndSetPlaylists} handleClose={() => setShowModal(false)} />
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
                        <div className="noResults">{t('config.noresults')} "{search}"</div>
                    )}
                </div>
            </div>

            <div className="form" style={{ height: "calc(100vh - 4.5rem)" }}>
                <div className="tracksSettingsTitle">{t('config.playlists')}</div>
                <div className="tracksButtonContainer">
                    <div style={{ borderBottom: "0.1rem solid var(--secondaryColor)", paddingBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%",  overflowY: "auto" }}>
                        {playlists.length ? t('config.savedplaylists') : ""}
                        {playlists.map((playlist: any, key: number) => (
                            <div className="currentPlaylist" key={key}>
                                <div className="title">{JSON.parse(playlist.playlist).title}</div>
                                <div className="content">
                                    <img src={JSON.parse(playlist.playlist).albumUrl} alt={JSON.parse(playlist.playlist).title} style={{ width: "20%" }} />
                                    {/* <div style={{ textAlign: "left" }}>{JSON.parse(playlist.playlist).title}</div> */}
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            gap: "0.5rem",
                                            alignItems: "end",
                                        }}
                                    >
                                        {/* First button: takes the remaining space */}
                                        <button
                                            onClick={() => {
                                                setLoading(true);
                                                setTimeout(() => {
                                                    tracks.setStorageState(playlist.tracks);
                                                    currentPlaylist.setStorageState(playlist.playlist);
                                                    setLoading(false);
                                                    navigate("/playlistconfiguration");
                                                }, 500);
                                            }}
                                            className="tracksSettingsButton"
                                            style={{
                                                fontSize: "0.8rem",
                                                flex: 1, // This button takes all available space
                                            }}
                                        >
                                            {t("config.load")}
                                        </button>

                                        {/* Second button: takes minimal space */}
                                        <button
                                            onClick={() => {setPlaylistId(playlist.id); setShowModal(true)}}
                                            style={{
                                                fontSize: "0.8rem",
                                                flex: 0, // This button takes only the space it needs
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    {(currentPlaylist.store && currentPlaylist.store !== "") &&
                        <div className="currentPlaylist">
                            <div className="title" style={{ fontWeight: "bold" }}>{t('config.currentplaylist')}</div>
                            <div className="content">
                                <img src={JSON.parse(currentPlaylist.store).albumUrl} alt={JSON.parse(currentPlaylist.store).title} />
                                <div style={{ textAlign: "left", overflow: "hidden", flex: 1 }}>{JSON.parse(currentPlaylist.store).title}</div>
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

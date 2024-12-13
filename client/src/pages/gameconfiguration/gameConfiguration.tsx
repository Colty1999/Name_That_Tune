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
import Cookies from "js-cookie";
import ConfigurationModal from "./components/configurationModal/configurationModal";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";


const GameConfiguration = () => {
    const [t] = useTranslation();

    let { setError } = useContext(AppContext);

    let accessToken = Cookies.get("accessToken");
    let tracks = useStorageState({ state: "tracks" });

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);

    // let { setLoading } = useContext(AppContext);

    const spotifyApi = new SpotifyWebApi({
        clientId: "226da25afbe64537a2574c7155cbc643",
    });

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        // setLoading(true);
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchPlaylists(search) //, { limit: 50, offset: 1 }
            .then((res) => {
                if (cancel) return;
                setSearchResults(res.body.playlists!.items.filter((playlist) => playlist !== null).map((playlist: any) => {

                    const smallestImage = playlist.images.reduce((smallest: any, image: any) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, playlist.images[0]);

                    // setLoading(false);

                    return {
                        title: playlist.name,
                        description: playlist.description,
                        uri: playlist.uri,
                        albumUrl: smallestImage.url,
                    };

                })
                );
            })
            .catch((err) => {
                Cookies.remove("accessToken");
                console.error(err);
                setError(err.message);
                // setLoading(false);
            })
        return () => { cancel = true };
    }, [search, accessToken]);

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
                    {searchResults.map((playlist: any, key: number) => (
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
                    {(tracks.store && tracks.store.length > 0) && JSON.parse(tracks.store).map((track: any, key: number) => <TrackResult track={track} id={key} key={key} />)}
                </div>
                <div className="gameButtonContainer">
                    <button className="" onClick={() => setShowModal(true)}>{t('config.settings')}</button>
                    <Link to="/spotifygamemaster"><button className="gameSettingsButton">{t('config.start')}</button></Link>
                </div>
            </div>
            {/* <Player uri={currentSongUri.store ? currentSongUri.store : ""} /> */}
        </div>
    )
};

export default GameConfiguration;

"use client";

import { getCookie } from "cookies-next/client";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Track } from "src/assets/common";
import { useStorageState } from "src/hooks/useStorageState";
import TrackResult from "./components/trackResult/trackResult";
import SpotifyLogin from "src/components/spotifyLogin/spotifyLogin";
import { AppContext } from "src/App";
import { savePlaylist } from "src/requests/savePlaylist";
import PlaylistSavedModal from "./components/modals/playlistSavedModal";

const PlaylistConfiguration = () => {
    const [t] = useTranslation();
    const { setLoading, setError } = useContext(AppContext);

    const accessToken = getCookie("accessToken");
    const tracks = useStorageState({ state: "tracks" });
    const currentPlaylist = useStorageState({ state: "currentPlaylist" });

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

    // Configuration modal functions
    const [maxPointsLocal, setMaxPointsLocal] = useState<number>(maxPoints.store !== null ? Number(maxPoints.store) : 400);
    const [pointsIncrementLocal, setPointsIncrementLocal] = useState<number>(pointsIncrement.store !== null ? Number(pointsIncrement.store) : 5);
    const [playlistName, setPlaylistName] = useState<string>(currentPlaylist.store !== null ? JSON.parse(currentPlaylist.store).title : "");
    const [showModal, setShowModal] = useState(false);

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const combinedData = {
            tracks: tracks.store ? JSON.parse(tracks.store) : null,
            currentPlaylist: currentPlaylist.store ? JSON.parse(currentPlaylist.store) : null
        };
        const file = new Blob([JSON.stringify(combinedData, null, 2)], { type: 'application/json' });
        // const file = new Blob([tracks.store ? tracks.store : ""], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "NameThatTuneSettings.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    //-----------------
    const isSpotifyCombinedData = (data: unknown): data is SpotifyCombinedData => {
        if (
            typeof data === "object" &&
            data !== null &&
            "tracks" in data &&
            "currentPlaylist" in data
        ) {
            const tracks = (data as SpotifyCombinedData).tracks;
            const currentPlaylist = (data as SpotifyCombinedData).currentPlaylist;

            // Validate tracks
            const isValidTracks = Array.isArray(tracks) && tracks.every((item: unknown) => {
                return (
                    typeof item === "object" &&
                    item !== null &&
                    "added_at" in item &&
                    "added_by" in item &&
                    "is_local" in item &&
                    "primary_color" in item &&
                    "track" in item &&
                    "video_thumbnail" in item &&
                    "points" in item &&
                    ("played" in item || "clue" in item || "youtubeLink" in item || "youtubePlay" in item)
                );
            });

            // Validate currentPlaylist
            const isValidCurrentPlaylist =
                typeof currentPlaylist === "object" &&
                currentPlaylist !== null &&
                "title" in currentPlaylist &&
                "description" in currentPlaylist &&
                "uri" in currentPlaylist &&
                "albumUrl" in currentPlaylist;

            return isValidTracks && isValidCurrentPlaylist;
        }
        return false;
    };





    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files; // Retrieve files safely
        if (!files || files.length === 0) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            if (!e.target) return;
            const text = e.target.result as string;
            try {
                const parsedData = JSON.parse(text);
                if (isSpotifyCombinedData(parsedData)) {
                    // currentPlaylist.setStorageState()
                    tracks.setStorageState(JSON.stringify(parsedData.tracks));
                    currentPlaylist.setStorageState(JSON.stringify(parsedData.currentPlaylist));
                } else {
                    console.error("Parsed JSON is not of type SpotifyTrackData.");
                    setError("File doesnt contain correct game data.");
                }
            } catch (err) {
                console.error("Error parsing JSON:", err);
                setError("Error parsing file.");
            }
        };
        reader.readAsText(files[0]);
    };


    const hiddenFileInput = useRef<HTMLInputElement>(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        if (!hiddenFileInput.current) return;
        hiddenFileInput.current.click();
    };

    const resetClues = () => {
        if (tracks.store) {
            const trackRevival = JSON.parse(tracks.store);
            trackRevival.forEach((track: Track) => {
                track.clue = "";
            });
            tracks.setStorageState(JSON.stringify(trackRevival));
        }
    }

    const resetPoints = () => {
        if (tracks.store) {
            const trackRevival = JSON.parse(tracks.store);
            trackRevival.forEach((track: Track) => {
                track.points = 100;
            });
            tracks.setStorageState(JSON.stringify(trackRevival));
        }
    }

    // ----------------

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

    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>{t('sessionexpired')}</div><SpotifyLogin /></div>;
    return (
        <div className="tracksConfigurationContainer">
            <PlaylistSavedModal show={showModal} handleClose={() => setShowModal(false)} />
            <div className="tracksSettings" style={(tracks.store && tracks.store.length > 0) ? {} : { display: 'none' }}>
                <div className="tracksSettingsTitle">{t('config.summary')}</div>
                <div className="tracksSettingsContainer">
                    {(tracks.store && tracks.store.length > 0) && JSON.parse(tracks.store).map((track: Track, key: number) => <TrackResult track={track} id={key} key={key} />)}
                </div>
            </div>

            <div className="tracksSettings" style={(tracks.store && tracks.store.length > 0) ? {} : { display: 'none' }}>
                <div className="tracksSettingsTitle">{t('config.settings')}</div>
                <div className="tracksButtonContainer">
                    {(currentPlaylist.store && currentPlaylist.store !== "") &&
                        <div style={{ borderBottom: "0.1rem solid var(--secondaryColor)", paddingBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                            <div className="currentPlaylist">
                                <div className="title">{t('config.currentplaylist')}</div>
                                <div className="content">
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                                        <img src={JSON.parse(currentPlaylist.store).albumUrl} alt={JSON.parse(currentPlaylist.store).title} style={{ width: "20%" }} />
                                        <div className="clueForm">
                                            <input
                                                type="text"
                                                value={playlistName}
                                                onChange={(e) => { setPlaylistName(e.target.value); currentPlaylist.setStorageState(JSON.stringify({ ...JSON.parse(currentPlaylist.store!), title: e.target.value })) }}
                                            />
                                        </div>
                                    </div>
                                    <button className="tracksSettingsButton" disabled={false} onClick={() => savePlaylist(currentPlaylist.store!, tracks.store!, setLoading, setError, setShowModal)}>{t('config.save')}</button>
                                </div>
                            </div>
                        </div>
                    }
                    <button onClick={downloadTxtFile}>{t('config.modal.download')}</button>
                    <button onClick={handleClick}>{t('config.modal.upload')}</button>
                    <input
                        type="file"
                        name="myFile"
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                        onChange={uploadFile} />
                    <button onClick={resetPoints}>{t('config.modal.resetpoints')}</button>
                    <button onClick={resetClues}>{t('config.modal.resetclues')}</button>
                    <div className="clueForm">
                        <input
                            type="text"
                            value={maxPointsLocal}
                            onChange={(e) => { setMaxPointsLocal(Number(e.target.value)); maxPoints.setStorageState(e.target.value) }}
                        />
                    </div>
                    <div className="clueForm">
                        <input
                            type="text"
                            value={pointsIncrementLocal}
                            onChange={(e) => { setPointsIncrementLocal(Number(e.target.value)); pointsIncrement.setStorageState(e.target.value) }}
                        />
                    </div>
                    {/* <button className="" onClick={() => setShowModal(true)}>{t('config.settings')}</button> */}
                    <Link to="/spotifygamemaster" onClick={configureGameStart}><button className="tracksSettingsButton">{t('config.start')}</button></Link>
                </div>
            </div>

        </div>
    );
}

export default PlaylistConfiguration;

type SpotifyUser = {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
};

type SpotifyVideoThumbnail = {
    url: string | null;
};

type SpotifyExternalUrls = {
    spotify: string;
};

type SpotifyImage = {
    height: number | null;
    url: string;
    width: number | null;
};

type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};

type SpotifyAlbum = {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

type SpotifyTrack = {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids?: { [key: string]: string };
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity?: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
};

type SpotifyTrackData = {
    added_at: string;
    added_by: SpotifyUser;
    is_local: boolean;
    primary_color: string | null;
    track: SpotifyTrack;
    video_thumbnail: SpotifyVideoThumbnail;
    points: number;
    clue?: string;
    played?: boolean;
    youtubeLink?: string;
    youtubePlay?: boolean;
};

type SpotifyPlaylistData = {
    title: string;
    description: string;
    uri: string;
    albumUrl: string;
}

type SpotifyCombinedData = {
    tracks: SpotifyTrackData[];
    currentPlaylist: SpotifyPlaylistData;
};

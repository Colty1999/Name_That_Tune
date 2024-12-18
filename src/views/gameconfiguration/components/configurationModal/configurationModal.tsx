"use client";

import { useStorageState } from '../../../../hooks/useStorageState';
import Modal from 'react-modal';
import './configurationModal.scss';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../../App';
import { Track } from '../../../../assets/common';

interface ConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
}

function ConfigurationModal({ show, handleClose }: ConfigurationModalProps) {
    Modal.setAppElement('#root');
    const [t] = useTranslation();

    const { setError } = useContext(AppContext);

    const tracks = useStorageState({ state: "tracks" });
    const maxPoints = useStorageState({ state: "maxPoints" });
    const [maxPointsLocal, setMaxPointsLocal] = useState<number>(maxPoints.store !== null ? Number(maxPoints.store) : 400);
    const pointsIncrement = useStorageState({ state: "pointsIncrement" });
    const [pointsIncrementLocal, setPointsIncrementLocal] = useState<number>(pointsIncrement.store !== null ? Number(pointsIncrement.store) : 5);
    
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([tracks.store ? tracks.store : ""], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "NameThatTuneSettings.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    //-----------------
    const isSpotifyTrackData = (data: unknown): data is SpotifyTrackData[] => {
        return Array.isArray(data) && data.every((item: unknown) => {
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
                if (isSpotifyTrackData(parsedData)) {
                    tracks.setStorageState(text);
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

    return (
        <Modal
            isOpen={show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleClose}
            // style={customStyles}
            contentLabel="Game configuration modal"
            className="modalContainer"
            overlayClassName="overlayContainer"
        >
            <div className="modalHeader">{t('config.modal.settings')}</div>
            <div className="modalBody">
                <button onClick={downloadTxtFile} >{t('config.modal.download')}</button>
                <div>{t('config.modal.downloadmsg')}</div>
                <button onClick={handleClick}>{t('config.modal.upload')}</button>
                <div>{t('config.modal.uploadmsg')}</div>
                {/* <button onClick={resetClues}>Reset clues</button>
                <div> - Resets clues :)</div> */}
                <input
                    type="file"
                    name="myFile"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={uploadFile} />
                <button onClick={resetPoints}>{t('config.modal.resetpoints')}</button>
                <div>{t('config.modal.resetpointsmsg')}</div>
                <button onClick={resetClues}>{t('config.modal.resetclues')}</button>
                <div>{t('config.modal.resetcluesmsg')}</div>
                <div className="clueForm">
                    <input
                        type="text"
                        value={maxPointsLocal}
                        onChange={(e) => { setMaxPointsLocal(Number(e.target.value)); maxPoints.setStorageState(e.target.value) }}
                    />
                </div>
                <div>{t('config.modal.maxpointsmsg')}</div>
                <div className="clueForm">
                    <input
                        type="text"
                        value={pointsIncrementLocal}
                        onChange={(e) => { setPointsIncrementLocal(Number(e.target.value)); pointsIncrement.setStorageState(e.target.value) }}
                    />
                </div>
                <div>{t('config.modal.pointsincrementmsg')}</div>
            </div>
            <div className="modalFooter">
                <button onClick={handleClose}>{t('config.modal.close')}</button>
            </div>
        </Modal>
    );
}

export default ConfigurationModal;

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
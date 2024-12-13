import { faPlay, faPause, faBan, faRotateLeft, faVideo, faVideoSlash, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateType, Track } from "../../../assets/common";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../../../App";

interface SongButtonProps {
    track: Track;
    category: StateType;
    count: StateType;
    startPlaying: (track: Track) => void;
    pausePlaying: (track: Track) => void;
    setPoints: (track: Track | null, teamPoints: StateType | null, count: StateType) => void;
    resetTrack: (track: Track) => void;
    setShowName: (track: Track) => void;
    setYoutubePlay: (id: number) => void;
    tableId: number;
    songId: number;
}

const SongButton = (props: SongButtonProps) => {
    const { track, category, count, startPlaying, pausePlaying, setPoints, resetTrack, setShowName, setYoutubePlay, tableId, songId } = props;
    const [t] = useTranslation();
    const { songPlaying, playerLoaded } = useContext(AppContext);
    const smallestImage = track.track.album.images.reduce((smallest: any, image: any) => {
        if (image.height < smallest.height) return image;
        return smallest;
    }, track.track.album.images[0]);
    //TODO add tooltips

    return (
        <div key={track.track.id} className="horizontalpanel">
            {/* {!track.showName ?
                <button
                    className={`song songbutton`}
                    onClick={() => setShowName(track)}
                    disabled={!playerLoaded}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                :
                <button
                    className={`song songbutton`}
                    onClick={() => setShowName(track)}
                    disabled={!playerLoaded}
                >
                    <FontAwesomeIcon icon={faEyeSlash} />
                </button>
            } */}
            {track.youtubeLink &&
                <button
                    className={`song songbutton`}
                    onClick={() => setYoutubePlay(tableId * 5 + songId)}
                    disabled={!playerLoaded}
                >
                    <FontAwesomeIcon icon={track.youtubePlay ? faVideoSlash : faVideo} />
                </button>
            }
            <div className={`${category.store === track.track.name ? "active" : ""} ${track.played === true ? "playedsong" : ""} song`} style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img src={smallestImage.url} alt="album cover" width="40rem" height="40rem" />
                    <h4>{track.track.name} - {track.track.artists[0].name} {track.clue && <>({track.clue})</>}</h4>
                </div>
                <h4>{track.points}{t("pt")}</h4>
            </div>
            {!songPlaying || category.store !== track.track.name ?
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => startPlaying(track)}
                    disabled={track.played || !playerLoaded}
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                :
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => pausePlaying(track)}
                    disabled={track.played || !playerLoaded}
                >
                    <FontAwesomeIcon icon={faPause} />
                </button>
            }
            {track.played !== true ?
                <button
                    className={`song songbutton`}
                    onClick={() => setPoints(track, null, count)}
                    disabled={!playerLoaded}
                >
                    <FontAwesomeIcon icon={faBan} />
                </button>
                :
                <button
                    className={`song songbutton`}
                    onClick={() => resetTrack(track)}
                    disabled={!playerLoaded}
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                </button>
            }
        </div>
    )
};


export default SongButton;
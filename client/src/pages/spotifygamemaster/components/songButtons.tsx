import { faPlay, faPause, faBan, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
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
}

const SongButton = (props: SongButtonProps) => {
    const { track, category, count, startPlaying, pausePlaying, setPoints, resetTrack } = props;
    const [t] = useTranslation();
    const { songPlaying } = useContext(AppContext);

    // console.log(track);
    return (
        <div key={track.track.id} className="horizontalpanel">
            <div className={`${category.store === track.track.name ? "active" : ""} ${track.played === true ? "playedsong" : ""} song`} style={{ width: "100%" }}>
                <h4>{track.track.name}</h4>
                <h4>{track.points}{t("pt")}</h4>
            </div>
            {/* {track.songAudio?.paused ?
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => startPlaying(track)}
                    disabled={track.played || !track.songAudio?.paused}
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                :
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => pausePlaying(track)}
                    disabled={track.played}
                >
                    <FontAwesomeIcon icon={faPause} />
                </button>
            } */}
            {!songPlaying || category.store !== track.track.name ?
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => startPlaying(track)}
                    disabled={track.played}
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                :
                <button
                    className={`${track.played === true ? "playedsong" : ""} song songbutton`}
                    onClick={() => pausePlaying(track)}
                    disabled={track.played}
                >
                    <FontAwesomeIcon icon={faPause} />
                </button>
            }
            {/* TODO fix buttons  and playing functions*/}
            {track.played !== true ?
                <button
                    className={`song songbutton`}
                    onClick={() => setPoints(track, null, count)}
                >
                    <FontAwesomeIcon icon={faBan} />
                </button>
                :
                <button
                    className={`song songbutton`}
                    onClick={() => resetTrack(track)}
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                </button>
            }
        </div>
    )
};


export default SongButton;
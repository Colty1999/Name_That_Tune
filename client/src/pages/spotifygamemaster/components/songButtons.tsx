import { faPlay, faPause, faBan, faRotateLeft, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateType, Track } from "../../../assets/common";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../App";

interface SongButtonProps {
    track: Track;
    category: StateType;
    count: StateType;
    startPlaying: (track: Track) => void;
    pausePlaying: (track: Track) => void;
    setPoints: (track: Track | null, teamPoints: StateType | null, count: StateType) => void;
    resetTrack: (track: Track) => void;
    setYoutubePlay: (id: number) => void;
    id: number;
}

const SongButton = (props: SongButtonProps) => {
    const { track, category, count, startPlaying, pausePlaying, setPoints, resetTrack, setYoutubePlay, id } = props;
    const [t] = useTranslation();
    const { songPlaying, playerLoaded } = useContext(AppContext);
    const smallestImage = track.track.album.images.reduce((smallest: any, image: any) => {
        if (image.height < smallest.height) return image;
        return smallest;
    }, track.track.album.images[0]);

    useEffect(() => {
        if (!category.store || category.store === "") return;
        if (category.store === track.track.name) {
            track.played = true;
        }
    }, [category]);


    return (
        <div key={track.track.id} className="horizontalpanel">
            <div className={`${category.store === track.track.name ? "active" : ""} ${track.played === true ? "playedsong" : ""} song`} style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img src={smallestImage.url} alt="album cover" width="40rem" height="40rem" />
                    <h4>{track.track.name} - {track.track.artists[0].name} <div style={{fontSize: "0.8rem"}}>({track.clue})</div></h4>
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
            {track.youtubeLink ?
                <button
                    className={`song songbutton`}
                    onClick={() => setYoutubePlay(id)}
                >
                    <FontAwesomeIcon icon={track.youtubePlay ? faVideoSlash : faVideo} />
                </button>
                :
                <button
                    className={`song songbutton`}
                    style={{ cursor: "auto" }}
                    disabled={true} />
            }
        </div>
    )
};


export default SongButton;
import { faPlay, faPause, faBan, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Song, StateType } from "../../assets/common";

interface SongButtonProps {
    song: Song;
    category: StateType;
    count: StateType;
    startPlaying: (song: Song) => void;
    pausePlaying: (song: Song) => void;
    setPoints: (teamPoints: StateType | null, count: StateType) => void;
    resetSong: (song: Song) => void;
}

const SongButton = (props: SongButtonProps) => {
    const { song, category, count, startPlaying, pausePlaying, setPoints, resetSong } = props;
    return (
        <div key={song.id} className="horizontalpanel">
                    <div className={`${category.store === song.songName ? "active" : ""} ${song.played === true ? "playedsong" : ""} song`} style={{ width: "100%" }}>
                        <h4>{song.songName}</h4>
                        <h4>{song.points}pkt</h4>
                    </div>
                    <button
                        className={`${song.played === true ? "playedsong" : ""} song songbutton`}
                        onClick={() => startPlaying(song)}
                        disabled={song.played || !song.songAudio?.paused}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button
                        className={`${song.played === true ? "playedsong" : ""} song songbutton`}
                        onClick={() => pausePlaying(song)}
                        disabled={song.played}
                    >
                        <FontAwesomeIcon icon={faPause} />
                    </button>
                    <button
                        className={`${song.played === true ? "playedsong" : ""} song songbutton`}
                        onClick={() => setPoints(null, count)}
                    >
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                    <button
                        className={`${song.played !== true ? "playedsong" : ""} song songbutton`}
                        onClick={() => resetSong(song)}
                    >
                        <FontAwesomeIcon icon={faRotateLeft} />
                    </button>
                </div>
    )
};


export default SongButton;
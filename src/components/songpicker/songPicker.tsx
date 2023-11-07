import "./songPicker.scss";
import { Song, songs } from "../../assets/common";
import { useStorageState } from "../../hooks/useStorageState";

const SongPicker = () => {
    let category = useStorageState({state: "category"})

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div className={`${category.store === song.songName ? "active" : ""} song`} key={song.id}>
                    <h3>{song.clue}</h3>
                    <h3>{song.points}pkt</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

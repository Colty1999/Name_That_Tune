import "./songPicker.scss";
import { Song, StateType } from "../../assets/common";

interface SongPickerProps {
    songs: Song[];
    category: StateType;
}

const SongPicker = (props: SongPickerProps) => {
    const { songs, category } = props;

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div 
                className={`${category.store === song.songName ? "active" : ""} ${song.played === true ? "playedsong" : ""} song`} 
                key={song.id}
                >
                    <h3>{song.clue}</h3>
                    <h3>{song.points}pkt</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

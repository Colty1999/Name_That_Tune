import "./songPicker.scss";
import { Song, StateType } from "../../../../assets/common";
import { useTranslation } from "react-i18next";

interface SongPickerProps {
    songs: Song[];
    category: StateType;
}

const SongPicker = (props: SongPickerProps) => {
    const { songs, category } = props;
    const [t] = useTranslation();

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div 
                className={`${category.store === song.songName ? "active" : ""} ${song.played === true ? "playedsong" : ""} song`} 
                key={song.id}
                >
                    <h3>{song.clue}</h3>
                    <h3>{song.points}{t("pt")}</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

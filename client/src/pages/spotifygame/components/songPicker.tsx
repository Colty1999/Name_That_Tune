import { StateType, Track } from "../../../assets/common";
import { useTranslation } from "react-i18next";
import YoutubeModal from "./youtubeModal/youtubeModal";

interface SongPickerProps {
    tracks: Track[];
    category: StateType;
    setYoutubePlay: (id: number) => void;
}

const SongPicker = (props: SongPickerProps) => {
    const { tracks, category, setYoutubePlay } = props;
    const [t] = useTranslation();

    return (
        <div className="songpickerstyle" >
            {tracks.map((track: Track) => (
                <div
                    className={`${category.store === track.track.name ? "active" : ""} ${track.played === true ? "playedsong" : ""} song`}
                    key={track.track.id}
                >
                    <h3>{track.clue ?? track.track.artists[0].name ?? "missing clue"}</h3>
                    <h3>{track.points}{t("pt")}</h3>
                    {track.youtubeLink && !track.youtubePlay &&
                        <YoutubeModal
                            show={true}
                            handleClose={() => { setYoutubePlay(0) }}
                            id={track.youtubeLink}
                        />
                    }
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

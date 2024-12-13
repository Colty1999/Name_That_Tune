import { StateType, Track } from "../../../assets/common";
import { useTranslation } from "react-i18next";
import YoutubeModal from "./youtubeModal/youtubeModal";
import { useState, useEffect } from "react";

interface SongPickerProps {
    tracks: Track[];
    category: StateType;
}

const SongPicker = (props: SongPickerProps) => {
    const { tracks, category } = props;
    const [t] = useTranslation();

    // State to track visible text for each track
    const [visibleTexts, setVisibleTexts] = useState<Record<string, string>>({});
    const [fadingTracks, setFadingTracks] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Initialize visible texts for all tracks
        const initialTexts: Record<string, string> = {};
        tracks.forEach((track: Track) => {
            initialTexts[track.track.id] = track.showName
                ? track.track.name
                : track.clue ?? track.track.artists[0].name ?? "missing clue";
        });
        setVisibleTexts(initialTexts);
    }, [tracks]);

    const handleTrackTextUpdate = (track: Track) => {
        const trackId = track.track.id;

        // Trigger fade-out for the specific track
        setFadingTracks((prev) => ({ ...prev, [trackId]: true }));

        setTimeout(() => {
            // Update text for the specific track after fade-out
            const newText = track.showName
                ? track.track.name
                : track.clue ?? track.track.artists[0].name ?? "missing clue";

            setVisibleTexts((prev) => ({ ...prev, [trackId]: newText }));
            setFadingTracks((prev) => ({ ...prev, [trackId]: false })); // Trigger fade-in
        }, 200); // Match CSS transition duration
    };

    useEffect(() => {
        // Detect changes in `showName` and update text for specific tracks
        tracks.forEach((track: Track) => {
            const trackId = track.track.id;
            const currentText = track.showName
                ? track.track.name
                : track.clue ?? track.track.artists[0].name ?? "missing clue";

            // Update only if the text is different
            if (visibleTexts[trackId] !== currentText) {
                handleTrackTextUpdate(track);
            }
        });
    }, [tracks, visibleTexts]);

    return (
        <div className="songpickerstyle">
            {tracks.map((track: Track) => {
                const trackId = track.track.id;
                return (
                    <div
                        style={{ transition: "all 0.2s" }}
                        className={`${category.store === track.track.name ? "active" : ""} ${track.played ? "playedsong" : ""} song`}
                        key={trackId}
                    >
                        <h3 className={fadingTracks[trackId] ? "fade-out" : "fade-in"}>{visibleTexts[trackId]}</h3>
                        <h3>
                            {track.points}
                            {t("pt")}
                        </h3>
                        {track.youtubeLink && track.youtubePlay && (
                            <YoutubeModal
                                show={true}
                                handleClose={() => { }}
                                id={track.youtubeLink}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};


export default SongPicker;

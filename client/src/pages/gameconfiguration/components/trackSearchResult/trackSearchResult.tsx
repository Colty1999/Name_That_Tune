import { useEffect, useState } from "react";
import "./trackSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";

interface TrackSearchResultProps {
    track: {
        artist: string,
        title: string,
        uri: string,
        albumUrl?: string,
    }
}

const TrackSearchResult = ({ track }: TrackSearchResultProps) => {
    const { artist, title, uri, albumUrl } = track;
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    const [isPlaying, setIsPlaying] = useState(false);

    const onClick = () => {
        currentSongUri.setStorageState(uri);
        setIsPlaying(true);
    }

    useEffect(() => {
        if (currentSongUri.store === uri) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [currentSongUri.store, uri]);

    return (
        <div className="trackSearchResult">
            <div className={`trackElement ${isPlaying ? "active" : ""}`} onClick={() => onClick()}>
                <img src={albumUrl} alt={track.title} />
                <div className="songData">
                    <h3>{title}</h3>
                    <h4>{artist}</h4>
                </div>
            </div>
        </div>
    );
};

export default TrackSearchResult;

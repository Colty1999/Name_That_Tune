import { useContext, useEffect, useState } from "react";
import "./trackSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import { AppContext } from "../../../../App";

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
    let { songPlaying, setSongPlaying } = useContext(AppContext);
    const [songActive, setSongActive] = useState<boolean>(false);

    const onClick = () => {
        currentSongUri.setStorageState(uri);
        setSongPlaying(true);
        setSongActive(true);
    }

    useEffect(() => {
        if (currentSongUri.store === uri) {
            setSongPlaying(true);
            setSongActive(true);
        } else {
            setSongPlaying(false);
            setSongActive(false);
        }
    }, [currentSongUri.store, uri]);

    return (
        <div className="trackSearchResult">
            <div className={`trackElement ${songActive ? "active" : ""}`} onClick={() => onClick()}>
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

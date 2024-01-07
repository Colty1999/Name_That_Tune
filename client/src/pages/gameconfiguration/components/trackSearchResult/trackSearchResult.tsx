import { useContext, useEffect, useState } from "react";
import "./trackSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import { AppContext } from "../../../../App";

interface TrackSearchResultProps {
    track: {
        title: string,
        description: string,

        uri: string,
        albumUrl?: string,
    }
}

const TrackSearchResult = ({ track }: TrackSearchResultProps) => {
    const { title, description, uri, albumUrl } = track;
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    let { songPlaying, setSongPlaying } = useContext(AppContext);
    const [songActive, setSongActive] = useState<boolean>(false);

    const truncateString = (str: string, maxLength: number) => {
        if (str.length <= maxLength) {
            return str;
        } else {
            const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
            return lastSpaceIndex !== -1 ? str.substring(0, lastSpaceIndex) + '...' : str.substring(0, maxLength) + '...';
        }
    };
    const maxLength = 90;
    const truncatedString = truncateString(description, maxLength);

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
                    <h4>{truncatedString}</h4>
                </div>
            </div>
        </div>
    );
};

export default TrackSearchResult;

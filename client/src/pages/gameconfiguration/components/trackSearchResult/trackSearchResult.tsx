import { useContext, useEffect, useState } from "react";
import "./trackSearchResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import { AppContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

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
    let { setSongPlaying } = useContext(AppContext);
    const [songActive, setSongActive] = useState<boolean>(false);

    // const truncateString = (str: string, maxLength: number) => {
    //     if (str.length <= maxLength) {
    //         return str;
    //     } else {
    //         const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
    //         return lastSpaceIndex !== -1 ? str.substring(0, lastSpaceIndex) + '...' : str.substring(0, maxLength) + '...';
    //     }
    // };
    // const maxLength = 90;
    // const truncatedString = truncateString(description, maxLength);

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

    const [loadedClassName, setLoadedClassName] = useState<string>("");
    useEffect(() => {
        setLoadedClassName("loaded");
    }, []);


    return (
        <div className="playlistSearchResult">
            <div className={`playlistElement ${songActive ? "active" : ""} ${loadedClassName}`} onClick={() => onClick()}>
                <img src={albumUrl} alt={track.title} />
                <div className="playlistData">
                    <h3 className="playlistTitle">{title}</h3>
                    <h4 className="playlistDescription">{description}</h4>
                </div>
                <FontAwesomeIcon icon={songActive ? faPause : faPlay} className="playIcon" />
            </div>
        </div>
    );
};

export default TrackSearchResult;

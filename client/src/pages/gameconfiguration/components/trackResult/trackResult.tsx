import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import "./trackResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";

interface TrackResultProps {
    track: {
        name: string,
        album: {
            images: {
                height: number,
                width: number,
                url: string,
            }[],
        },
        artists: {
            name: string,
        }[],
        uri: string,
    },
    id: number,
}

const TrackResult = ({ track, id }: TrackResultProps) => {
    let { setSongPlaying } = useContext(AppContext);
    let currentSongUri = useStorageState({ state: "currentSongUri" });

    const [trackSelect, setTrackSelect] = useState<boolean>(false);

    const smallestImage = track.album.images.reduce((smallest: any, image: any) => {
        if (image.height < smallest.height) return image;
        return smallest;
    }, track.album.images[0]);

    const startPlaying = () => {
        currentSongUri.setStorageState(track.uri);
        setSongPlaying(true);
        setTrackSelect(true);
    }

    const stopPlaying = () => {
        setSongPlaying(false);
        setTrackSelect(false);
    }


    const [loadedClassName, setLoadedClassName] = useState<string>("");
    useEffect(() => {
        setLoadedClassName("loaded");
    }, []);

    return (
        <div className="trackResult">
            <div className={`trackElement ${trackSelect ? "active" : ""} ${loadedClassName}`} onClick={() => trackSelect ? stopPlaying() : startPlaying()}>
                <h4 className="trackId">{id+1}</h4>
                <img src={smallestImage.url} alt={track.name} />
                <div className="trackData">
                    <h3 className="trackTitle">{track.name}</h3>
                    <h4 className="trackDescription">{track.artists[0].name}</h4>
                </div>
                <FontAwesomeIcon icon={trackSelect ? faPause : faPlay} className="playIcon" />
            </div>
        </div>

    );
};

export default TrackResult;
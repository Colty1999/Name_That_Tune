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
    let tracks = useStorageState({ state: "tracks" });

    const [trackSelect, setTrackSelect] = useState<boolean>(false);
    const [clue, setClue] = useState<string>("");
    const [points, setPoints] = useState<number>(100);

    let currentPlaylistUri = useStorageState({ state: "currentPlaylistUri" });
    useEffect(() => {
        setClue("");
        setPoints(100);
    }, [currentPlaylistUri.store]);
    useEffect(() => {
        if (currentSongUri.store !== track.uri) stopPlaying();
    }, [currentSongUri.store]);

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

    if (tracks.store) console.log(JSON.parse(tracks.store));

    const [loadedClassName, setLoadedClassName] = useState<string>("");
    useEffect(() => {
        setLoadedClassName("loaded");
    }, []);

    return (
        <div className="trackResult">
            <div className={`trackElement ${trackSelect ? "active" : ""} ${loadedClassName}`}>
                <h4 className="trackId">{id + 1}</h4>
                <img src={smallestImage.url} alt={track.name} />
                <div className="trackData">
                    <div className="trackTitleAndArtist">
                        <h4 className="trackTitle">{track.name}</h4>
                        <div className="trackArtist">({track.artists[0].name})</div>
                    </div>
                    <div className="trackForm">
                        <div className="clueForm">
                            <label>Clue:</label>
                            <input
                                type="text"
                                value={clue}
                                onChange={(e) => setClue(e.target.value)}
                            />
                        </div>
                        <div className="pointsForm">
                            <label>Points:</label>
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon onClick={() => trackSelect ? stopPlaying() : startPlaying()} icon={trackSelect ? faPause : faPlay} className="playIcon" />
            </div>
        </div >

    );
};

export default TrackResult;
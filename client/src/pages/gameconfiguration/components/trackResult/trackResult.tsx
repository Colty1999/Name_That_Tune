import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import "./trackResult.scss";
import { useStorageState } from "../../../../hooks/useStorageState";
import { Track } from "../../../../assets/common";
import { useTranslation } from "react-i18next";

interface TrackResultProps {
    track: Track;
    id: number,
}

const TrackResult = ({ track, id }: TrackResultProps) => {
    const [t] = useTranslation();
    
    let { setSongPlaying } = useContext(AppContext);
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    let tracks = useStorageState({ state: "tracks" });
    const {playerLoaded} = useContext(AppContext);

    const [trackSelect, setTrackSelect] = useState<boolean>(false);
    const [clue, setClue] = useState<string>("");
    const [points, setPoints] = useState<number>(100);

    let currentPlaylistUri = useStorageState({ state: "currentPlaylistUri" });

    const updateClue = (clue: string) => {
        if (!tracks.store) return;
        setClue(clue);
        let newTracks = JSON.parse(tracks.store);
        newTracks[id].clue = clue;
        tracks.setStorageState(JSON.stringify(newTracks));
    };

    const updatePoints = (points: number) => {
        if (!tracks.store) return;
        setPoints(points);
        let newTracks = JSON.parse(tracks.store);
        newTracks[id].points = points;
        tracks.setStorageState(JSON.stringify(newTracks));
    };

    useEffect(() => {
        if (!tracks.store || tracks.store.length === 0) return;
        const newTracks = JSON.parse(tracks.store);
        if (newTracks[id].clue) setClue(newTracks[id].clue);
        if (newTracks[id].points) setPoints(newTracks[id].points);
    }, [tracks]); // set clue and points on load

    // useEffect(() => {
    //     if (!tracks.store || tracks.store.length === 0) return;
    //     let newTracks = JSON.parse(tracks.store!);
    //     newTracks[id].points = points;
    //     tracks.setStorageState(JSON.stringify(newTracks));
    // }, []); // set points on load

    useEffect(() => {
        setClue("");
    }, [currentPlaylistUri.store]); // Reset clue and points when playlist changes
    //TODO doesnt work

    useEffect(() => {
        if (currentSongUri.store !== track.track.uri) stopPlaying();
    }, [currentSongUri.store]); // Stop playing if another song is selected

    const smallestImage = track.track.album.images.reduce((smallest: any, image: any) => {
        if (image.height < smallest.height) return image;
        return smallest;
    }, track.track.album.images[0]);

    const startPlaying = () => {
        currentSongUri.setStorageState(track.track.uri);
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
    }, []); // Add loaded class when component is mounted

    return (
        <div className="trackResult">
            <div className={`trackElement ${trackSelect ? "active" : ""} ${loadedClassName}`}>
                <h4 className="trackId">{id + 1}</h4>
                <img src={smallestImage.url} alt={track.track.name} />
                <div className="trackData">
                    <div className="trackTitleAndArtist">
                        <h4 className="trackTitle">{track.track.name}</h4>
                        <div className="trackArtist">({track.track.artists[0].name})</div>
                    </div>
                    <div className="trackForm">
                        <div className="clueForm">
                            <label>{t('config.trackresults.clue')}</label>
                            <input
                                type="text"
                                value={clue}
                                onChange={(e) => updateClue(e.target.value)}
                            />
                        </div>
                        <div className="pointsForm">
                            <label>{t('config.trackresults.points')}</label>
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => updatePoints(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
                {/* <button
                                onClick={() => trackSelect ? stopPlaying() : startPlaying()} 
                                className="playIcon" 
                                disabled={!playerLoaded}
                >
                <FontAwesomeIcon icon={trackSelect ? faPause : faPlay} />
                </button> */}
            </div>
        </div >

    );
};

export default TrackResult;
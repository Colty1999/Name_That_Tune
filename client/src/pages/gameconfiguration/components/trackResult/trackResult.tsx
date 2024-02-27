import { useEffect, useState } from "react";
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

    let tracks = useStorageState({ state: "tracks" });
    const [clue, setClue] = useState<string>("");
    const [points, setPoints] = useState<number>(100);
    const [youtubeLink, setYoutubeLink] = useState<string>("");
    
    useEffect(() => {
        if (!tracks.store) return;
        const newTracks = JSON.parse(tracks.store);
        if (newTracks[id].clue) setClue(newTracks[id].clue);
        else setClue("");
        if (newTracks[id].points) setPoints(newTracks[id].points);
        else setPoints(100);
        if (newTracks[id].youtubeLink) setYoutubeLink(newTracks[id].youtubeLink);
        else setYoutubeLink("");
    }, [tracks]); // set clue and points on load

    //-----------------

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

    const updateYoutubeLink = (youtubeLink: string) => {
        if (!tracks.store) return;
        setYoutubeLink(youtubeLink);
        let newTracks = JSON.parse(tracks.store);
        newTracks[id].youtubeLink = youtubeLink;
        // console.log(newTracks[0]);
        // console.log(JSON.parse(tracks.store)[0]);
        tracks.setStorageState(JSON.stringify(newTracks));
    }

    //-----------------

    const smallestImage = track.track.album.images.reduce((smallest: any, image: any) => {
        if (image.height < smallest.height) return image;
        return smallest;
    }, track.track.album.images[0]);

    const [loadedClassName, setLoadedClassName] = useState<string>("");
    useEffect(() => {
        setLoadedClassName("loaded");
    }, []); // Add loaded class when component is mounted

    return (
        <div className="trackResult">
            <div className={`trackElement ${loadedClassName}`}>
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
                        <div className="youtubeForm">
                            <label>{t('config.trackresults.youtubelink')}</label>
                            <input
                                type="text"
                                value={youtubeLink}
                                onChange={(e) => updateYoutubeLink(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default TrackResult;
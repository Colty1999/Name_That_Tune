import './spotifyGame.scss'
import SongPicker from './components/songPicker';
import { Track, gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from './components/pointsScreen';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';


const SpotifyGame = () => {
    const [t] = useTranslation();
    let count = useStorageState({ state: "count" });
    let category = useStorageState({ state: "category" })
    let tracks = useStorageState({ state: "tracks" });
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);
    const [compiledTracks, setCompiledTracks] = useState<Track[][] | null>(null);

    useEffect(() => {
        if (!tracks.store) return;
        const chunkSize = 5;
        const splitArrays: Track[][] = [];
        const tracksFromJSON = JSON.parse(tracks.store);
        for (let i = 0; i < tracksFromJSON.length; i += chunkSize) {
            splitArrays.push(tracksFromJSON.slice(i, i + chunkSize));
        }
        setCompiledTracks(splitArrays);
    }, [tracks]);
    
    if (!compiledTracks) return <Loader />;
    return (
        <div className='gamestyle'>
            <div style={{ paddingBottom: "1rem" }}>
                <div>
                    <h2>{t("points")}</h2>
                    <div className="teampoints">
                        <h3>{count.store}{t("pt")}</h3>
                    </div>
                </div>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
                <PointsScreen />
            </div>
            <div style={{ paddingBottom: "5rem", minHeight: "25rem" }}>
                {compiledTracks.map((tracks: Track[], key: number) => (
                    <div key={key} className={`${key === currentPage ? 'visible' : 'hidden'}`}>
                        <SongPicker tracks={tracks} category={category} />
                    </div>
                ))}
            </div>
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
        </div >
    );
};

export default SpotifyGame;

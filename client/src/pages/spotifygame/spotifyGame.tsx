import './spotifyGame.scss'
import SongPicker from './components/songPicker';
import { Track, gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from './components/pointsScreen';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import Cookies from "js-cookie";
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';


const SpotifyGame = () => {
    const [t] = useTranslation();

    let accessToken = Cookies.get("accessToken");

    let count = useStorageState({ state: "count" });
    let category = useStorageState({ state: "category" })
    let tracks = useStorageState({ state: "tracks" });
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);
    const [compiledTracks, setCompiledTracks] = useState<Track[][] | null>(null);

    useEffect(() => {
        if (!tracks.store) return;
    
        const chunkSize = 5;
        const tracksFromJSON = JSON.parse(tracks.store);
        const splitArrays = [];
    
        for (let i = 0; i < tracksFromJSON.length; i += chunkSize) {
            splitArrays.push(tracksFromJSON.slice(i, i + chunkSize));
        }
    
        // Only update the state if splitArrays is different from the current state
        if (JSON.stringify(splitArrays) !== JSON.stringify(compiledTracks)) {
            setCompiledTracks(splitArrays);
        }
    }, [tracks.store, compiledTracks]); // Add compiledTracks as a dependency

    const setYoutubePlay = (id: number) => {
        if (!tracks.store) return;
        let newTracks = JSON.parse(tracks.store);
        newTracks[id].youtubePlay = !newTracks[id].youtubePlay;
        tracks.setStorageState(JSON.stringify(newTracks));
    };
    
    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>{t('sessionexpired')}</div><SpotifyLogin /></div>;
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
                        <SongPicker tracks={tracks} category={category} setYoutubePlay={setYoutubePlay}/>
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

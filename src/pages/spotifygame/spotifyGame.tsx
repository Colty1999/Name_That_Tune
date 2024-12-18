import './spotifyGame.scss'
import SongPicker from './components/songPicker';
import { Track, gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from './components/pointsScreen';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';
import { getCookie } from 'cookies-next/client';


const SpotifyGame = () => {
    const [t] = useTranslation();

    const accessToken = getCookie("accessToken");

    const count = useStorageState({ state: "count" });
    const category = useStorageState({ state: "category" })
    const tracks = useStorageState({ state: "tracks" });
    const pageStorage = useStorageState({ state: "currentPage" });
    const currentPage: number = Number(pageStorage.store ?? 0);
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

    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>{t('sessionexpired')}</div><SpotifyLogin /></div>;
    if (!compiledTracks) return <Loader />;
    return (
        <div className='gamestyle'>
            <div style={{ paddingBottom: "1rem" }}>
                <div>
                    <h2>{t("points")}</h2>
                    <div className="teampoints">
                        <div
                            className='progressbar'
                            style={{
                                width: `${Math.min(Math.max(((Number(count.store) - 100) / 300) * 100, 0), 100)}%`,
                                opacity: `${Number(count.store) <= 100 ? 0 : 1}`,
                            }}
                        />
                        <h3 className="pointsdisplay">{count.store}{t("pt")}</h3>
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

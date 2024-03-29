import './demoGame.scss'
import SongPicker from './components/songPicker';
import { Song, gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from './components/pointsScreen';
import { useTranslation } from 'react-i18next';


const DemoGame = () => {
    const [t] = useTranslation();
    let count = useStorageState({ state: "count" });
    let category = useStorageState({ state: "category" })
    let songStorage = useStorageState({ state: "songs" });
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);

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
                {JSON.parse(songStorage.store ?? "").map((songs: Song[], key: number) => (
                    <div key={key} className={`${key === currentPage ? 'visible' : 'hidden'}`}>
                        <SongPicker songs={songs} category={category} />
                    </div>
                ))}
            </div>
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
        </div >
    );
};

export default DemoGame;

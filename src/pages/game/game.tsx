import './game.scss'
import SongPicker from '../../components/songpicker/songPicker';
import { Song, gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from '../../components/points/pointsScreen';
import { useEffect, useState } from 'react';


const Game = () => {
    let count = useStorageState({ state: "count" });
    let category = useStorageState({ state: "category" })
    let songStorage = useStorageState({ state: "songs" });
    const [songs, setSongs] = useState<Song[][] | null>(null);
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);

    useEffect(() => {
      fetch('songsList.json',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson: JSON) {
          const chunkSize = 5;
          const fetchedArray: Song[] = JSON.parse(JSON.stringify(myJson));
          const splitArrays = [];
          for (let i = 0; i < fetchedArray.length; i += chunkSize) {
            splitArrays.push(fetchedArray.slice(i, i + chunkSize));
          }
          songStorage.setStorageState(JSON.stringify(splitArrays));
        });
    }, []);

    useEffect(() => {
        setSongs(JSON.parse(songStorage.store ?? ""));
    }, [songStorage]);

    if (!songs) return <div>Loading...</div>;
    return (
        <div className='gamestyle'>
            <div style={{ paddingBottom: "1rem" }}>
                <div>
                    <h2>Punkty</h2>
                    <div className="teampoints">
                        <h3>{count.store}pkt</h3>
                    </div>
                </div>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
                <PointsScreen />
            </div>
            <div style={{ paddingBottom: "5rem", minHeight: "25rem" }}>
                {songs.map((songs: Song[], key: number) => (
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

export default Game;

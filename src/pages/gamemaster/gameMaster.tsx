import { useCallback, useEffect, useState } from 'react';
import { Song, StateType } from '../../assets/common';
import "./gameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import SongTable from './components/songTable';
import { TeamPoints } from './components/teamPoints';
import { useTranslation } from 'react-i18next';
import TopPanel from './components/topPanel';
import BottomPanel from './components/bottomPanel';


const GameMaster = () => {
    const [t] = useTranslation();
    const [, updateState] = useState<{}>();
    const forceUpdate = useCallback(() => updateState({}), []);
    //-----------------
    let team1Points = useStorageState({ state: "team1Points" });
    let team2Points = useStorageState({ state: "team2Points" });
    let team3Points = useStorageState({ state: "team3Points" });
    let category = useStorageState({ state: "category" });
    let count = useStorageState({ state: "count" });
    //-----------------
    let songStorage = useStorageState({ state: "songs" });
    const [songs, setSongs] = useState<Song[][] | null>(null);
    //-----------------
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);
    //-----------------
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    //-----------------
    let songsLoaded = useStorageState({ state: "songsLoaded" });

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
                // const chosenSet = songSet;
                const chunkSize = 5;
                const fetchedArray: Song[] = JSON.parse(JSON.stringify(myJson));
                const splitArrays = [];
                fetchedArray.forEach((song: Song) => {
                    song.songAudio = new Audio((song.songPath));
                })
                for (let i = 0; i < fetchedArray.length; i += chunkSize) {
                    splitArrays.push(fetchedArray.slice(i, i + chunkSize));
                }
                setSongs(splitArrays);
                songStorage.setStorageState(JSON.stringify(splitArrays));
                songsLoaded.setStorageState("true");
                //function to parse the json file with audio data
            });
        pageStorage.setStorageState("0");
        category.setStorageState("");
        count.setStorageState("0");
        if (!team1Points.store) team1Points.setStorageState('0');
        if (!team2Points.store) team2Points.setStorageState('0');
        if (!team3Points.store) team3Points.setStorageState('0');
    }, []);

    window.addEventListener("beforeunload", () => {
        category.setStorageState("");
        team1Points.setStorageState("0");
        team2Points.setStorageState("0");
        team3Points.setStorageState("0");
        count.setStorageState("0");
    });

    //-----------------

    useEffect(() => {
        const interval = setInterval(() => {
            switch (true) {
                case (category.store === ""):
                    break;
                case (currentSong && currentSong.songAudio!.paused):
                    break
                case (Number(count.store) < 400):
                    count.setStorageState((Number(count.store) + 10).toString());
                    break;
                default:
                    break;
            }
        }, 2000); // 1000ms = 1 second
        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [count]);

    //starts playing song
    const startPlaying = (song: Song) => {
        switch (true) {
            case (!currentSong):
                count.setStorageState((song.points).toString());
                forceUpdate();
                break;
            case (currentSong && currentSong.songName !== song.songName):
                currentSong.songAudio!.pause();
                currentSong.songAudio!.currentTime = 0;
                count.setStorageState((song.points).toString());
                break;
            default:
                count.setStorageState((Number(count.store)).toString());
                break;
        }
        // if (!currentSong) {
        //     count.setStorageState((song.points).toString());
        //     forceUpdate();
        // }
        // else if (currentSong && currentSong.songName !== song.songName) {
        //     currentSong.songAudio!.pause();
        //     currentSong.songAudio!.currentTime = 0;
        //     count.setStorageState((song.points).toString());
        // }
        // else {
        //     count.setStorageState((Number(count.store)).toString());
        // }
        category.setStorageState(song.songName);
        song.songAudio!.play();
        setCurrentSong(song);
    };

    //pauses song
    const pausePlaying = (song: Song) => {
        // category.setStorageState(""); 
        song.songAudio!.pause();
        forceUpdate();
    };

    //adds points to team and resets count
    const setPoints = (song: Song | null, teamPoints: StateType | null, count: StateType) => {
        if (song) song.played = true;
        songStorage.setStorageState(JSON.stringify(songs));
        category.setStorageState("");
        if (currentSong) currentSong.songAudio!.pause();
        if (currentSong) currentSong.songAudio!.currentTime = 0;
        if (teamPoints) teamPoints.setStorageState((Number(teamPoints.store!) + Number(count.store)).toString());
        count.setStorageState("0");
    };

    //resets disabled song
    const resetSong = (song: Song) => {
        song.played = false;
        songStorage.setStorageState(JSON.stringify(songs))
    };

    //-----------------

    if (!songs) return <div>Loading...</div>;
    return (
        <div className="gamemasterstyle" >
            <TopPanel
                pageStorage={pageStorage}
                count={count}
                songs={songs}
            />
            {songs.map((song: Song[], key: number) => (
                < div key={key} className={`${key === currentPage ? 'visible' : 'hidden'}`}>
                    <SongTable
                        songs={song}
                        category={category}
                        count={count}
                        startPlaying={startPlaying}
                        pausePlaying={pausePlaying}
                        setPoints={setPoints}
                        resetSong={resetSong}
                    />
                </div>
            ))}
            <TeamPoints
                team1Points={team1Points}
                team2Points={team2Points}
                team3Points={team3Points}
                currentSong={currentSong!}
                count={count}
                setPoints={setPoints}
            />
            <BottomPanel
                team1Points={team1Points}
                team2Points={team2Points}
                team3Points={team3Points}
            />
        </div >
    );
};

export default GameMaster;
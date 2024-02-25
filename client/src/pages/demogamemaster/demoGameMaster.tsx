import { useCallback, useEffect, useState } from 'react';
import { Song, StateType } from '../../assets/common';
import "./demoGameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import SongTable from './components/songTable';
import { TeamPoints } from './components/teamPoints';
import TopPanel from './components/topPanel';
import BottomPanel from './components/bottomPanel';
import Loader from '../../components/loader/loader';


const DemoGameMaster = () => {
    const [, updateState] = useState<{}>();
    const forceUpdate = useCallback(() => updateState({}), []);
    //-----------------
    let team1 = useStorageState({ state: "team1" });
    let team2 = useStorageState({ state: "team2" });
    let team3 = useStorageState({ state: "team3" });
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
                //function to parse the json file with audio data
            });
        pageStorage.setStorageState("0");
        category.setStorageState("");
        count.setStorageState("0");
        team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
        team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
        team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
        return () => {
            // document.querySelectorAll('audio').forEach(el => el.pause());
            // console.log(document.querySelectorAll('HTMLAudioElement'));
            // if (songs) songs.forEach(song => {
            //     song.forEach(s => {if (s.songAudio) s.songAudio.pause()}); // Pause the audio
            //     // audio.currentTime = 0; // Reset the audio to the beginning
            // });
            // TODO pause song on component unmount
            category.setStorageState("");
            team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
            team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
            team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
            count.setStorageState("0");
        }
    }, []);

    // window.addEventListener("beforeunload", () => {
    //     category.setStorageState("");
    //     team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
    //     team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
    //     team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
    //     count.setStorageState("0");
    // });

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
    const setPoints = (song: Song | null, team: StateType | null, count: StateType) => {
        if (song) song.played = true;
        songStorage.setStorageState(JSON.stringify(songs));
        category.setStorageState("");
        if (currentSong) currentSong.songAudio!.pause();
        if (currentSong) currentSong.songAudio!.currentTime = 0;
        if (team) team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points + Number(count.store) }));
        count.setStorageState("0");
    };

    //resets disabled song
    const resetSong = (song: Song) => {
        song.played = false;
        songStorage.setStorageState(JSON.stringify(songs))
    };

    //-----------------

    if (!songs) return <Loader />;
    return (
        <div className="gamemasterstyle" >
            <TopPanel
                pageStorage={pageStorage}
                count={count}
                songs={songs}
            />
            <TeamPoints
                team1={team1}
                team2={team2}
                team3={team3}
                currentSong={currentSong!}
                count={count}
                setPoints={setPoints}
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
            <BottomPanel
                team1={team1}
                team2={team2}
                team3={team3}
            />
        </div >
    );
};

export default DemoGameMaster;
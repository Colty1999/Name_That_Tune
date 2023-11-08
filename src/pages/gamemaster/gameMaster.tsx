import { useCallback, useEffect, useState } from 'react';
import { Song, StateType } from '../../assets/common';
import "./gameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import SongTable from './songTable';


const GameMaster = () => {
    const [, updateState] = useState<{}>();
    const forceUpdate = useCallback(() => updateState({}), []);

    let category = useStorageState({ state: "category" });
    let count = useStorageState({ state: "count" });
    let songStorage = useStorageState({ state: "songs" });
    const [songs, setSongs] = useState<Song[][] | null>(null);

    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);

    let team1Points = useStorageState({ state: "team1Points" });
    let team2Points = useStorageState({ state: "team2Points" });
    let team3Points = useStorageState({ state: "team3Points" });

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
            const fetchedArray:Song[] = JSON.parse(JSON.stringify(myJson));
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
      }, []);

    useEffect (() => {
        category.setStorageState("");
        count.setStorageState("0");
        if (!team1Points.store) team1Points.setStorageState('0');
        if (!team2Points.store) team2Points.setStorageState('0');
        if (!team3Points.store) team3Points.setStorageState('0');
    }, []);


    const [currentSong, setCurrentSong] = useState<Song | null>(null);

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
            // if (category.store !== "" && Number(count.store) < 400) count.setStorageState((Number(count.store) + 10).toString());
        }, 2000); // 1000ms = 1 second
        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [count]);

    //starts playing song
    const startPlaying = (song: Song) => {
        if (!currentSong) {
            count.setStorageState((song.points).toString());
            forceUpdate();
            // console.log(song.points);
        }
        else if (currentSong && currentSong.songName !== song.songName) {
            currentSong.songAudio!.pause();
            currentSong.songAudio!.currentTime = 0;
            count.setStorageState((song.points).toString());
            // console.log(song.points);
        }
        else {
            count.setStorageState((Number(count.store)).toString());
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
    const setPoints = (teamPoints: StateType | null, count: StateType) => {
        songs!.forEach((song: Song[]) => {song.find((song: Song) => song.songName === category.store)!.played = true}); //TODO
        // songs!.forEach((song: Song[]) => {
        //     song.find((song: Song) => {
        //         return song.songName === category.store;
        //         song.played = true;
        //     })
        // });
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
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 0.5rem", marginBottom: "1rem" }}>
                <div>
                    <h1>Master Panel</h1>
                    <div style={{ display: "flex", justifyContent: "left", gap: "0.2rem" }}>
                        {(Number(pageStorage.store) !== 0) && <button onClick={() => { pageStorage.setStorageState((Number(pageStorage.store)-1).toString()) }} className='setbuttom'>
                            <FontAwesomeIcon icon={faSquareCaretLeft} /> Previous Set
                        </button>}
                        {(Number(pageStorage.store) < songs.length-1) && <button onClick={() => { pageStorage.setStorageState((Number(pageStorage.store)+1).toString()); }} className='setbuttom'>
                            Next Set <FontAwesomeIcon icon={faSquareCaretRight} />
                        </button>}
                    </div>
                </div>
                <div style={{ margin: "auto 0 0 0" }}>
                    <h3>Punkty</h3>
                    <div className="punctationbutton song" style={{ margin: 0 }}>
                        <h4>{count.store}</h4>
                    </div>
                </div>
            </div>
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


            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", paddingBottom: "2rem" }}>
                <div>
                    <h3>Drużyna 1</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(team1Points, count)} className="punctationbutton">
                            <h4>{team1Points.store}</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team1Points.setStorageState((Number(team1Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team1Points.setStorageState((Number(team1Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Drużyna 2</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(team2Points, count)} className="punctationbutton">
                            <h4>{team2Points.store}</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team2Points.setStorageState((Number(team2Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team2Points.setStorageState((Number(team2Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Drużyna 3</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(team3Points, count)} className="punctationbutton">
                            <h4>{team3Points.store}</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team3Points.setStorageState((Number(team3Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team3Points.setStorageState((Number(team3Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ display: "flex", justifyContent: "center", gap: "0.2rem" }}>
                <button
                    onClick={() => {
                        team1Points.setStorageState("0");
                        team2Points.setStorageState("0");
                        team3Points.setStorageState("0");
                    }
                    }
                    className="punctationbutton"
                >
                    Resetuj punkty
                </button>
            </div>
        </div >
    );
};

export default GameMaster;
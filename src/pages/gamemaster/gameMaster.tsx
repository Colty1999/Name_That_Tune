import { useCallback, useEffect, useState } from 'react';
import { Song, StateType, songList } from '../../assets/common';
import "./gameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';


const GameMaster = () => {

    let category = useStorageState({ state: "category" });
    let count = useStorageState({ state: "count" });
    let songStorage = useStorageState({ state: "songs" });
    let songs: Song[] = songList;
    useEffect(() => {
        songStorage.setStorageState(JSON.stringify(songs));
    }, []);

    let team1Points = useStorageState({ state: "team1Points" });
    let team2Points = useStorageState({ state: "team2Points" });
    let team3Points = useStorageState({ state: "team3Points" });

    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    useEffect(() => {
        count.setStorageState("0");
        if (!team1Points.store) team1Points.setStorageState('0');
        if (!team2Points.store) team2Points.setStorageState('0');
        if (!team3Points.store) team3Points.setStorageState('0');
    }, []);

    window.addEventListener("beforeunload", () => {
        category.setStorageState("");
    });

    //-----------------

    useEffect(() => {
        category.setStorageState("");
        songs.forEach((song: Song) => {
            song.songAudio = new Audio((song.songPath));
        });
    }, []);

    // useEffect(() => {
    //     songs.forEach((song: Song) => {
    //         if (category.store === song.songName) song.songAudio!.play();
    //     });
    // }, [category]);

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

    const startPlaying = (song: Song) => {
        if (currentSong && currentSong.songName !== song.songName) {
            currentSong.songAudio!.pause();
            currentSong.songAudio!.currentTime = 0
        };
        category.setStorageState(song.songName);
        song.songAudio!.play();
        setCurrentSong(song);
    };

    const pausePlaying = (song: Song) => {
        // category.setStorageState(""); 
        song.songAudio!.pause();
    };


    const setPoints = (teamPoints: StateType, count: StateType) => {
        songs.find((song: Song) => song.songName === category.store)!.played = true;
        songStorage.setStorageState(JSON.stringify(songs));
        category.setStorageState(""); 
        if (currentSong) currentSong.songAudio!.pause();
        if (currentSong) currentSong.songAudio!.currentTime = 0;
        teamPoints.setStorageState((Number(teamPoints.store!) + Number(count.store)).toString());
        count.setStorageState("0");
        // console.log(count.store);
    };

    //-----------------

    return (
        <div className="gamemasterstyle" >
            {songs.map((song: Song) => (
                <div key={song.id} className="horizontalpanel">
                    {/* <button
                        className={`${category.store === song.songName ? "active" : ""} song`}
                        onClick={() => {
                            if (currentSong && currentSong.songName !== song.songName) {
                                currentSong.songAudio!.pause();
                                currentSong.songAudio!.currentTime = 0
                            };
                            category.setStorageState(song.songName);
                            song.songAudio!.play();
                            setCurrentSong(song);
                        }}
                        style={{ width: "100%" }}
                    >
                        <h4>{song.songName}</h4>
                        <h4>{song.points}pkt</h4>
                    </button> */}
                    <div className={`${category.store === song.songName ? "active" : ""} ${song.played === true ? "playedsong" : ""} song`} style={{ width: "100%" }}>
                        <h4>{song.songName}</h4>
                        <h4>{song.points}pkt</h4>
                    </div>
                    <button
                        className={`${song.played === true ? "playedsong" : ""} song`}
                        onClick={() => startPlaying(song)}
                        disabled={song.played}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button
                        className={`${song.played === true ? "playedsong" : ""} song`}
                        onClick={() => pausePlaying(song)}
                        disabled={song.played}
                    >
                        <FontAwesomeIcon icon={faPause} />
                    </button>
                    <button
                        className={`song`}
                        onClick={() => {song.played = false; songStorage.setStorageState(JSON.stringify(songs))}}
                    >
                        <FontAwesomeIcon icon={faRotateLeft} />
                    </button>
                </div>
            ))}


            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", paddingBottom: "2rem" }}>
                <div>
                    <h3>Drużyna 1</h3>
                    <button onClick={() => setPoints(team1Points, count)} className="punctationbutton">
                        <h4>{team1Points.store}</h4>
                    </button>
                </div>
                <div>
                    <h3>Drużyna 2</h3>
                    <button onClick={() => setPoints(team2Points, count)} className="punctationbutton">
                        <h4>{team2Points.store}</h4>
                    </button>
                </div>
                <div>
                    <h3>Drużyna 3</h3>
                    <button onClick={() => setPoints(team3Points, count)} className="punctationbutton">
                        <h4>{team3Points.store}</h4>
                    </button>
                </div>
            </div>

            <div>
                <h3>Punkty</h3>
                <div className="teampoints">
                    <h4>{count.store}</h4>
                </div>
            </div>

            <button onClick={() => {
                team1Points.setStorageState("0");
                team2Points.setStorageState("0");
                team3Points.setStorageState("0");
            }
            }
                className="punctationbutton"
            >
                clear points
            </button>

        </div>
    );
};

export default GameMaster;
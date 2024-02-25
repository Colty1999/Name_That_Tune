import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Song, StateType, Track } from '../../assets/common';
import "./spotifyGameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import SongTable from './components/songTable';
import { TeamPoints } from './components/teamPoints';
import TopPanel from './components/topPanel';
import BottomPanel from './components/bottomPanel';
import Loader from '../../components/loader/loader';
import { AppContext } from '../../App';


const SpotifyGameMaster = () => {
    //-----------------
    let team1 = useStorageState({ state: "team1" });
    let team2 = useStorageState({ state: "team2" });
    let team3 = useStorageState({ state: "team3" });
    let category = useStorageState({ state: "category" }); //compares if the song name matches to determine styling (stupid)
    let count = useStorageState({ state: "count" });
    //-----------------
    //-----------------
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);
    //-----------------
    //new
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    // let trackStorage = useStorageState({ state: "trackStorage" });

    //-----------------
    //new
    let { songPlaying, setSongPlaying } = useContext(AppContext);
    let currentSongUri = useStorageState({ state: "currentSongUri" });

    let tracks = useStorageState({ state: "tracks" });
    let currentTracksStorage = useStorageState({ state: "currentTracks" });
    const [compiledTracks, setCompiledTracks] = useState<Track[][] | null>(null);
    //-----------------

    // const initialized = useRef(false); // used to prevent the useEffect from running twice in strict mode
    useEffect(() => {
        if (!tracks.store) return;
        const chunkSize = 5;
        const splitArrays: Track[][] = [];
        const tracksFromJSON = JSON.parse(tracks.store);
        for (let i = 0; i < tracksFromJSON.length; i += chunkSize) {
            splitArrays.push(tracksFromJSON.slice(i, i + chunkSize));
        }
        setCompiledTracks(splitArrays);
        currentTracksStorage.setStorageState(JSON.stringify(splitArrays));
        // songStorage.setStorageState(JSON.stringify(splitArrays));

        // if (!initialized.current) {
        //     initialized.current = true
        //     window.open(`${window.location.origin}${window.location.pathname}#/game`, "_blank", "popup")
        // } //TODO uncomment this line when the game is ready to be played
        //function to parse the json file with audio data
        pageStorage.setStorageState("0");
        category.setStorageState("");
        count.setStorageState("0");
        team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
        team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
        team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
        return () => {
            category.setStorageState("");
            team1.setStorageState(JSON.stringify({ name: "Team1", points: 0 }));
            team2.setStorageState(JSON.stringify({ name: "Team2", points: 0 }));
            team3.setStorageState(JSON.stringify({ name: "Team3", points: 0 }));
            count.setStorageState("0");
        }
    }, []);

    //-----------------

    useEffect(() => {
        const interval = setInterval(() => {
            switch (true) {
                case (category.store === ""):
                    break;
                case (!songPlaying):
                    break;
                // case (currentSong && currentSong.songAudio!.paused):
                //     break
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
    const startPlaying = (track: Track) => {
        currentSongUri.setStorageState(track.uri);
        count.setStorageState((track.points).toString());
        setSongPlaying(true);
        // switch (true) {
        //     case (!currentTrack):
        //         count.setStorageState((song.points).toString());
        //         forceUpdate();
        //         break;
        //     case (currentTrack && currentTrack.name !== song.songName):
        //         setSongPlaying(false);
        //         // currentSong.songAudio!.pause();
        //         // currentSong.songAudio!.currentTime = 0; //TODO reset time
        //         count.setStorageState((currentTrack.points).toString());
        //         break;
        //     default:
        //         count.setStorageState((Number(count.store)).toString());
        //         break;
        // }
        category.setStorageState(track.track.name);
        // song.songAudio!.play();
        setCurrentTrack(track);
    };

    //pauses song
    const pausePlaying = () => {
        setSongPlaying(false);
        // song.songAudio!.pause();
        // forceUpdate();
    };

    //adds points to team and resets count
    const setPoints = (track: Track | null, team: StateType | null, count: StateType) => {
        if (track) track.played = true;
        console.log(compiledTracks)
        if (compiledTracks) tracks.setStorageState(JSON.stringify(compiledTracks.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, [])
        ));
        category.setStorageState("");
        // if (currentTrack) currentTrack.songAudio!.pause();
        setSongPlaying(false);
        // if (currentTrack) currentTrack.songAudio!.currentTime = 0; //TODO timer
        if (team) team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points + Number(count.store) }));
        count.setStorageState("0");
    };

    //resets disabled song
    const resetTrack = (track: Track) => {
        track.played = false;
        if (compiledTracks) tracks.setStorageState(JSON.stringify(compiledTracks.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, [])
        ))
    };

    //-----------------

    if (!compiledTracks) return <Loader />;
    return (
        <div className="gamemasterstyle" >
            <TopPanel
                pageStorage={pageStorage}
                count={count}
                tracks={compiledTracks}
            />
            <TeamPoints
                team1={team1}
                team2={team2}
                team3={team3}
                currentTrack={currentTrack!}
                count={count}
                setPoints={setPoints}
            />
            {compiledTracks.map((tracks: Track[], key: number) => (
                < div key={key} className={`${key === currentPage ? 'visible' : 'hidden'}`}>
                    <SongTable
                        tracks={tracks}
                        category={category}
                        count={count}
                        startPlaying={startPlaying}
                        pausePlaying={pausePlaying}
                        setPoints={setPoints}
                        resetTrack={resetTrack}
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

export default SpotifyGameMaster;
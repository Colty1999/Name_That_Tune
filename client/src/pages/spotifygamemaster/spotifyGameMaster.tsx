import { useCallback, useContext, useEffect, useState } from 'react';
import { StateType, Track } from '../../assets/common';
import "./spotifyGameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';
import SongTable from './components/songTable';
import { TeamPoints } from './components/teamPoints';
import TopPanel from './components/topPanel';
import BottomPanel from './components/bottomPanel';
import Loader from '../../components/loader/loader';
import { AppContext } from '../../App';
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';
import Cookies from "js-cookie";


const SpotifyGameMaster = () => {
    const [, updateState] = useState<{}>();
    const forceUpdate = useCallback(() => updateState({}), []);
    //-----------------
    let team1 = useStorageState({ state: "team1" });
    let team2 = useStorageState({ state: "team2" });
    let team3 = useStorageState({ state: "team3" });
    let category = useStorageState({ state: "category" }); //compares if the song name matches to determine styling (stupid)
    let count = useStorageState({ state: "count" });
    //-----------------
    let pageStorage = useStorageState({ state: "currentPage" });
    let currentPage: number = Number(pageStorage.store ?? 0);
    //-----------------
    //new
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    let accessToken = Cookies.get("accessToken");
    //-----------------
    //new
    let { songPlaying, setSongPlaying } = useContext(AppContext);
    let currentSongUri = useStorageState({ state: "currentSongUri" });
    let tracks = useStorageState({ state: "tracks" });
    const [compiledTracks, setCompiledTracks] = useState<Track[][] | null>(null);
    //-----------------
    const { setLoadPlayer } = useContext(AppContext);
    useEffect(() => {
        setLoadPlayer(true);
        return () => {
            setLoadPlayer(false);
        };
    }, []); //show player on load

    //-----------------
    useEffect(() => { //stop music if playing
        console.log(tracks.store);
        if (!tracks.store) return;
        const chunkSize = 5;
        const splitArrays: Track[][] = [];
        const tracksFromJSON = JSON.parse(tracks.store);
        for (let i = 0; i < tracksFromJSON.length; i += chunkSize) {
            splitArrays.push(tracksFromJSON.slice(i, i + chunkSize));
        }
        setCompiledTracks(splitArrays);
        console.log(compiledTracks);
        //-----------------
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
                    forceUpdate();
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
        setSongPlaying(true);
        currentSongUri.setStorageState(track.track.uri);
        category.setStorageState(track.track.name);
        setCurrentTrack(track);
        switch (true) {
            case (!currentTrack || currentTrack.track.name !== track.track.name):
                count.setStorageState((track.points).toString());
                break;
            // case (currentTrack && currentTrack.track.name !== track.track.name):
            //     console.log(currentTrack.track.name, track.track.name)
            //     // setSongPlaying(false);
            //     // currentSong.songAudio!.pause();
            //     // currentSong.songAudio!.currentTime = 0; //TODO reset time
            //     count.setStorageState((track.points).toString());
            //     break;
            default:
                count.setStorageState((Number(count.store)).toString());
                break;
        }
        forceUpdate();
    };

    //pauses song
    const pausePlaying = () => {
        setSongPlaying(false);
        // category.setStorageState("");
        // song.songAudio!.pause();
        forceUpdate();
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

    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>Your session has expired</div><SpotifyLogin /></div>;
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
            {/* <div style={{display: "none"}}> */}
            {/* <Player uri={currentSongUri.store ? currentSongUri.store : ""} /> */}
            {/* </div> */}
        </div >
    );
};

export default SpotifyGameMaster;
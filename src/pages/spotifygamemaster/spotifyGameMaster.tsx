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
import { useTranslation } from 'react-i18next';
import Player from '../../components/player/player';
import { getCookie } from 'cookies-next/client';


const SpotifyGameMaster = () => {
    const [t] = useTranslation();

    const [, updateState] = useState<unknown>();
    const forceUpdate = useCallback(() => updateState({}), []);
    //-----------------
    const team1 = useStorageState({ state: "team1" });
    const team2 = useStorageState({ state: "team2" });
    const team3 = useStorageState({ state: "team3" });
    const category = useStorageState({ state: "category" }); //compares if the song name matches to determine styling (stupid)
    const count = useStorageState({ state: "count" });
    //-----------------
    const pageStorage = useStorageState({ state: "currentPage" });
    const currentPage: number = Number(pageStorage.store ?? 0);
    //-----------------
    //new
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const accessToken = getCookie("accessToken");
    //-----------------
    //new
    const { songPlaying, setSongPlaying } = useContext(AppContext);
    const currentSongUri = useStorageState({ state: "currentSongUri" });
    const tracks = useStorageState({ state: "tracks" });
    const [compiledTracks, setCompiledTracks] = useState<Track[][] | null>(null);

    //-----------------

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

    //-----------------
    //TODO somwhere here fix youtube song playing only form the first array of 5
    const setYoutubePlay = (id: number) => {
        if (!tracks.store) return;
        const newTracks = JSON.parse(tracks.store);
        newTracks[id].youtubePlay = !newTracks[id].youtubePlay;
        console.log(newTracks[id])
        tracks.setStorageState(JSON.stringify(newTracks));
    }; //TODO close all other youtube links
    //-----------------

    useEffect(() => {
        const interval = setInterval(() => {
            switch (true) {
                case (category.store === ""):
                    break;
                case (!songPlaying):
                    break;
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
    }, [count, category.store, forceUpdate, songPlaying]);

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
            default:
                count.setStorageState((Number(count.store)).toString());
                break;
        }
        forceUpdate();
    };

    //pauses song
    const pausePlaying = () => {
        setSongPlaying(false);
        forceUpdate();
    };

    //adds points to team and resets count
    const setPoints = (track: Track | null, team: StateType | null, count: StateType) => {
        if (track) {track.played = true; track.showName = true;}
        if (compiledTracks) tracks.setStorageState(JSON.stringify(compiledTracks.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, [])
        ));
        category.setStorageState("");
        setSongPlaying(false);
        if (team) team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points + Number(count.store) }));
        if (team) count.setStorageState("0");
    };

    //resets disabled song
    const resetTrack = (track: Track) => {
        if (track) {track.played = false; track.showName = false;}
        // count.setStorageState(JSON.stringify(track.points));
        if (compiledTracks) tracks.setStorageState(JSON.stringify(compiledTracks.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, [])
        ))
    };

    const setShowName = (track: Track) => {
        track.showName = !track.showName
        if (compiledTracks) tracks.setStorageState(JSON.stringify(compiledTracks.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, [])
        ))
    }

    //-----------------

    if (!accessToken) return <div className="spotifyLoginPrompt"><div style={{ paddingBottom: "1rem" }}>{t('sessionexpired')}</div><SpotifyLogin /></div>;
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
                        setShowName={setShowName}
                        setYoutubePlay={setYoutubePlay}
                        tableId={key}
                    />
                </div>
            ))}
            <BottomPanel
                team1={team1}
                team2={team2}
                team3={team3}
            />
            <Player uri={currentSongUri.store ? currentSongUri.store : ""} />
        </div >
    );
};

export default SpotifyGameMaster;
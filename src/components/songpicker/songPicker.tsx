import "./songPicker.scss";
import { useStorageState } from "../../hooks/useStorageState";
import { Song } from "../../assets/common";
import { useEffect } from "react";

const SongPicker = () => {
    let category = useStorageState({state: "category"})
    let songStorage = useStorageState({ state: "songs" });
    let songs: Song[] = JSON.parse(songStorage.store ?? "");
    // let songs = JSON.parse(useStorageState({ state: "songs" }).store ?? "");

    useEffect(() => {
        songs = JSON.parse(songStorage.store ?? "");
    }, [songStorage]);

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div 
                className={`${category.store === song.songName ? "active" : ""} ${song.played === true ? "playedsong" : ""} song`} 
                key={song.id}
                >
                    <h3>{song.clue}</h3>
                    <h3>{song.points}pkt</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

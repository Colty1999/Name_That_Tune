import { useState, useEffect } from "react";
import "./songPicker.scss";
import gameSongs, { Song } from "../../assets/gameSongs";

const SongPicker = () => {
    const songs = gameSongs;
    const [category, setCategory] = useState("");

    const onStorageUpdate = (e: any) => {
        const { key, newValue } = e;
        if (key === "category") {
            setCategory(newValue);
        }
    };

    const handleChange = (e: any) => {
        setCategory(e.target.value);
        localStorage.setItem("category", e.target.value);
    };

    useEffect(() => {
        setCategory(localStorage.getItem("category") || "");
        window.addEventListener("storage", onStorageUpdate);
        setCategory("Song 2"); //TO REMOVE
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div className={`${category == song.songName ? "active" : ""} song`} key={song.id}>
                    <h3>{song.songName}</h3>
                    <h3>100 pkt</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

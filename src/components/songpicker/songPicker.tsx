import { useState, useEffect } from "react";
import "./songPicker.scss";
import { Song, songs } from "../../assets/common";

const SongPicker = () => {
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
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);

    useEffect(() => {
        songs.forEach((song: Song) => {
            song.songAudio = new Audio((song.songPath));
        });
    }, []);

    useEffect(() => {
        songs.forEach((song: Song) => {
            if (category === song.songName) song.songAudio!.play();
        });
    }, [category]);

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div className={`${category === song.songName ? "active" : ""} song`} key={song.id}>
                    <h3>{song.songName}</h3>
                    <h3>100 pkt</h3>
                </div>
            ))}
            <button onClick={() => { setCategory("Song 2") }}>
                play
            </button>
        </div>
    );
};

export default SongPicker;

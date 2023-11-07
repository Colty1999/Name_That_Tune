import { useEffect } from 'react';
import { Song, songs } from '../../assets/common';
import "./gameMaster.scss";
import { useStorageState } from '../../hooks/useStorageState';


const GameMaster = () => {
    let category = useStorageState({ state: "category" })
    // const [category, setCategory] = useState("");

    // const onStorageUpdate = (e: any) => {
    //     const { key, newValue } = e;
    //     if (key === "category") {
    //         setCategory(newValue);
    //     }
    // };

    // const handleChange = (e: any) => {
    //     setCategory(e.target.value);
    //     localStorage.setItem("category", e.target.value);
    // };

    // useEffect(() => {
    //     setCategory(localStorage.getItem("category") || "");
    //     window.addEventListener("storage", onStorageUpdate);
    //     return () => {
    //         window.removeEventListener("storage", onStorageUpdate);
    //     };
    // }, []);

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

    return (
        <div className="gamemasterstyle" >
            {songs.map((song: Song) => (
                <div key={song.id} className="horizontalpanel">
                    <button
                        className={`${category.store === song.songName ? "active" : ""} song`}
                        onClick={() => { category.setStorageState(song.songName); song.songAudio!.play() }}
                        style={{width: "100%"}}
                    >
                        <h3>{song.songName}</h3>
                        <h3>{song.points}pkt</h3>
                    </button>
                    <button
                        className={`song`}
                        onClick={() => { category.setStorageState(""); song.songAudio!.pause() }}
                    >
                        Stop
                    </button>
                </div>
            ))}
        </div>
    );
};

export default GameMaster;

import "./songPicker.scss";
import { Song, songs } from "../../assets/common";
import { useStorageState } from "../../hooks/useStorageState";

const SongPicker = () => {
    let category = useStorageState({state: "category"})

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

    // useEffect(() => {
    //     songs.forEach((song: Song) => {
    //         song.songAudio = new Audio((song.songPath));
    //     });
    // }, []);

    // useEffect(() => {
    //     songs.forEach((song: Song) => {
    //         if (category.store === song.songName) song.songAudio!.play();
    //     });
    // }, [category]);

    return (
        <div className="songpickerstyle" >
            {songs.map((song: Song) => (
                <div className={`${category.store === song.songName ? "active" : ""} song`} key={song.id}>
                    <h3>{song.clue}</h3>
                    <h3>{song.points}pkt</h3>
                </div>
            ))}
        </div>
    );
};

export default SongPicker;

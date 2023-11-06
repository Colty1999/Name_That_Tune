import { useEffect, useState } from 'react';
import './game.scss'
import SongPicker from '../../components/songpicker/songPicker';
import { gameLogo } from '../../assets/common';


const Game = () => {
    const [count, setCount] = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [team1Points, setTeam1Points] = useState(0);
    const [team2Points, setTeam2Points] = useState(0);
    const [team3Points, setTeam3Points] = useState(0);

    //-----------------

    const [currentPoints, setCurrentPoints] = useState(0);
    const [category, setCategory] = useState("");

    const onStorageUpdate = (e: any) => {
        const { key, newValue } = e;
        if (key === "currentPoints") {
            setCurrentPoints(newValue);
        }
        if (key === "category") {
            setCategory(newValue);
        }
    };

    const handleChange = (e: any) => {
        setCurrentPoints(e.target.value);
        localStorage.setItem("currentPoints", e.target.value);
    };

    useEffect(() => {
        setCurrentPoints(Number(localStorage.getItem("currentPoints")) || 0);
        setCategory(localStorage.getItem("category") || "");
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);


    //-----------------

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 10);
        }, 1000); // 1000ms = 1 second
        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [count]);
    return (
        <div className='gamestyle'>
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <SongPicker />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem" }}>
                <div>
                    <h2>Drużyna 1</h2>
                    <button onClick={() => setCount((count) => count + 1)}>
                        <h3>{team1Points}</h3>
                    </button>
                </div>
                <div>
                    <h2>Drużyna 2</h2>
                    <button onClick={() => setCount((count) => count + 1)}>
                        <h3>{team2Points}</h3>
                    </button>
                </div>
                <div>
                    <h2>Drużyna 3</h2>
                    <button onClick={() => setCount((count) => count + 1)}>
                        <h3>{team3Points}</h3>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Game;

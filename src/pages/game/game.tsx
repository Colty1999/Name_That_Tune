import { useEffect, useState } from 'react';
import './game.scss'


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
                <img src="../src/assets/gameLogo.png" className="logo" alt="logo"/>
            </div>
            <div>
                <button onClick={() => setCount((count) => count + 1)}>
                    {team1Points}
                </button>
                <button onClick={() => setCount((count) => count + 1)} style={{ justifyContent: "space-evenly" }}>
                    {team2Points}
                </button>
                <button onClick={() => setCount((count) => count + 1)}>
                    {team3Points}
                </button>
            </div>
        </div>
    );
};

export default Game;

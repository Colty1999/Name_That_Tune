import { useEffect, useState } from 'react';
import './game.scss'
import SongPicker from '../../components/songpicker/songPicker';
import { gameLogo } from '../../assets/common';
import PointsScreen from '../../components/points/PointsScreen';
import { useStorageState } from '../../hooks/useStorageState';


const Game = () => {
    let category = useStorageState({ state: "category" })
    const [count, setCount] = useState(0);


    //-----------------

    const [currentPoints, setCurrentPoints] = useState(0);

    const onStorageUpdate = (e: any) => {
        const { key, newValue } = e;
        if (key === "currentPoints") {
            setCurrentPoints(newValue);
        }
    };

    const handleChange = (e: any) => {
        setCurrentPoints(e.target.value);
        localStorage.setItem("currentPoints", e.target.value);
    };

    useEffect(() => {
        setCurrentPoints(Number(localStorage.getItem("currentPoints")) || 0);
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, []);


    //-----------------

    useEffect(() => {
        const interval = setInterval(() => {
            if (category.store !== "" && count<400) setCount(count + 10);
        }, 2000); // 1000ms = 1 second
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
            <PointsScreen count={count}/>
        </div >
    );
};

export default Game;

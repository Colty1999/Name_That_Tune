import { useEffect, useState } from 'react';
import './game.scss'
import SongPicker from '../../components/songpicker/songPicker';
import { gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import PointsScreen from '../../components/points/PointsScreen';


const Game = () => {
    let category = useStorageState({ state: "category" })


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

    return (
        <div className='gamestyle'>
            <div style={{ display: "flex" }}>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <div style={{ paddingBottom: "1rem" }}>
                <PointsScreen />
            </div>
            <SongPicker />
        </div >
    );
};

export default Game;

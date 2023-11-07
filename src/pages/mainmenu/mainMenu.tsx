import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import { useStorageState } from '../../hooks/useStorageState';
import { useEffect } from 'react';


const MainMenu = () => {
    let category = useStorageState({state: "category"});
    useEffect(() => {
    category.setStorageState("");
    }, []);

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <Link to="/game">
                    <button onClick={() => {window.open(`${window.location.origin}/gamemaster`, "_blank", "popup")}}>
                        Rozpocznij
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/setup">
                    <button onClick={() => { }}>
                        Konfiguracja
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/instruction">
                    <button onClick={() => { }}>
                        Instrukcja
                    </button>
                </Link>
            </div>
            <p className="read-the-docs">
                Mateusz gietka | 2023
            </p>
        </div>
    );
};

export default MainMenu;

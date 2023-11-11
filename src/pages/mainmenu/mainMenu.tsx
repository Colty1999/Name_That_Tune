import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';


const MainMenu = () => {

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <Link to="/game">
                    <button onClick={() => { window.open(`${window.location.origin}${window.location.pathname}/#/gamemaster`, "_blank", "popup") }}>
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
                Mateusz gietka 2023 | <Link to="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                    LinkedIn
                </Link>
            </p>
        </div>
    );
};

export default MainMenu;

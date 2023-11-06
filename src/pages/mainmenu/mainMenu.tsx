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
                    <button onClick={() => {window.open(`${window.location.origin}/gamemaster`, "_blank", "popup")}}>
                        Rozpocznij
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/instruction">
                    <button onClick={() => { }}>
                        Instrukcja
                    </button>
                </Link>
                {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
            </div>
            <p className="read-the-docs">
                Mateusz gietka | 2023
            </p>
        </div>
    );
};

export default MainMenu;

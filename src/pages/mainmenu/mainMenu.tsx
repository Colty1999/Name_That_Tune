import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import Footer from '../../components/footer/footer';



const MainMenu = () => {

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <Link to="/game">
                    <button onClick={() => { window.open(`${window.location.origin}${window.location.pathname}#/gamemaster`, "_blank", "popup") }}>
                        Rozpocznij
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/notimplemented">
                    <button onClick={() => { }}>
                        Konfiguracja
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/notimplemented">
                    <button onClick={() => { }}>
                        Instrukcja
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default MainMenu;

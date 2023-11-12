import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';



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
            <p className="footer">
                Mateusz Gietka 2023 | <Link to="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                    <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
                </Link> | <Link to="https://github.com/Colty1999" target='_blank'>
                    <FontAwesomeIcon className="github" icon={faGithub} />
                </Link> |
            </p>
        </div>
    );
};

export default MainMenu;

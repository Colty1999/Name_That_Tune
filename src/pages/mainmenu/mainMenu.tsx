import { Link } from 'react-router-dom';
import './mainMenu.scss'
import Button from '../../components/button/button';


const MainMenu = () => {
    return (
        <div className="mainmenu">
            <div>
                <img src="../src/assets/gameLogo.png" className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <Link to="/game">
                    <Button onClick={() => {window.open(`${window.location.origin}/admin`, "_blank", "popup")}}>
                        Rozpocznij
                    </Button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/instruction">
                    <Button onClick={() => { }}>
                        Instrukcja
                    </Button>
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

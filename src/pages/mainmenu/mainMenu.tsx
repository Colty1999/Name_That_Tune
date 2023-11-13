import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import Footer from '../../components/footer/footer';
import { useTranslation } from 'react-i18next';



const MainMenu = () => {
    const [t] = useTranslation();

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>{t("mainmenu.title")}</h1>
            <div className="card button">
                <Link to="/game">
                    <button onClick={() => { window.open(`${window.location.origin}${window.location.pathname}#/gamemaster`, "_blank", "popup") }}>
                        {t("mainmenu.start")}
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/notimplemented">
                    <button onClick={() => { }}>
                        {t("mainmenu.config")}
                    </button>
                </Link>
            </div>
            <div className="card button">
                <Link to="/notimplemented">
                    <button onClick={() => { }}>
                        {t("mainmenu.instruction")}
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default MainMenu;

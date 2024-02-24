import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import { useTranslation } from 'react-i18next';
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';
import Footer from '../../components/footer/footer';



const MainMenu = () => {
    const [t] = useTranslation();

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>{t("mainmenu.title")}</h1>
            <div className="card">
                <SpotifyLogin/>
                <Link to="/demogamemaster">
                    <button
                        // onClick={() => { window.open(`${window.location.origin}${window.location.pathname}#/gamemaster`, "_blank", "popup") }}
                        className='button'
                    >
                        {t("mainmenu.start")}
                    </button>
                </Link>
                <Link to="/gameconfiguration">
                    <button onClick={() => { }} className='button'>
                        {t("mainmenu.config")}
                    </button>
                </Link>
                <Link to="/notimplemented">
                    <button onClick={() => { }} className='button'>
                        {t("mainmenu.instruction")}
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default MainMenu;

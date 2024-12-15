import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import { useTranslation } from 'react-i18next';
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';
import Footer from '../../components/footer/footer';
import Cookies from "js-cookie";



const MainMenu = () => {
    const [t] = useTranslation();
    let accessToken = Cookies.get("accessToken");

    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>{t("mainmenu.title")}</h1>
            <div className="card">
                <SpotifyLogin/>
                <Link to="/gameconfiguration">
                    <button onClick={() => { }} className='button' disabled={!accessToken}>
                        {t("mainmenu.start")}
                    </button>
                </Link>
                {/* <Link to="/demogamemaster">
                    <button
                        className='button'
                    >
                        {t("mainmenu.demo")}
                    </button>
                </Link> */}
                <Link to="/instruction">
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

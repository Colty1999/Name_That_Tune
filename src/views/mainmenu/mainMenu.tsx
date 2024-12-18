"use client";

import { Link } from 'react-router-dom';
import './mainMenu.scss'
import { gameLogo } from '../../assets/common';
import { useTranslation } from 'react-i18next';
import SpotifyLogin from '../../components/spotifyLogin/spotifyLogin';
import Footer from '../../components/footer/footer';
import { getCookie } from 'cookies-next/client';

const MainMenu = () => {
    const [t] = useTranslation();
    const accessToken = getCookie("accessToken");
    

    return (
        <main className="mainmenu">
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
        </main>
    );
};

export default MainMenu;

"use client";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import "./spotifyLogin.scss";
import { frontend } from "../../assets/common";
import { getCookie, deleteCookie } from "cookies-next/client";
import { useTranslation } from "react-i18next";


const SpotifyLogin = () => {
    const [t] = useTranslation();

    const accessToken = getCookie("accessToken");
    const {setLoading} = useContext(AppContext);

    const authEndpoint = 'https://accounts.spotify.com/authorize',
        clientId = '226da25afbe64537a2574c7155cbc643',
        responseType = 'code',
        redirectUri = frontend,
        scope = ["streaming, user-read-email, user-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state"].join("%20"),
        authorizationLink = `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

    function logout() {
        setLoading(true);
        setTimeout(() => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            setLoading(false);
        }, 300);
    }

    return (
        <div className="spotifyLogin">
            {accessToken ?
                <a>
                    <button className='button' onClick={logout}><FontAwesomeIcon icon={faSpotify} /> | {t('spotifylogin.logout')}</button>
                </a>
                :
                <Link to={authorizationLink}>
                    <button className='button'><FontAwesomeIcon icon={faSpotify} /> | {t('spotifylogin.login')}</button>
                </Link>
            }
        </div>
    );
};

export default SpotifyLogin;

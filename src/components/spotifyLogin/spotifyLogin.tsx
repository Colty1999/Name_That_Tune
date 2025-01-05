"use client";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppContext } from "../../App";
import "./spotifyLogin.scss";
import { frontend } from "../../assets/common";
import { getCookie, deleteCookie } from "cookies-next/client";
import { useTranslation } from "react-i18next";
import { createClient } from "../../../utils/supabase/client";


const SpotifyLogin = () => {
    const [t] = useTranslation();

    const accessToken = getCookie("accessToken");
    const {setLoading} = useContext(AppContext);

    const supabase = createClient();

    async function signInWithSpotify() {
        const { error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
            scopes: 'user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state',
            redirectTo: `${frontend}/api/callback`,
        },
        })
        if (error) {
            console.error('Error logging in:', error.message)
        }
    }

    async function signOut() {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message)
        }
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        setLoading(false);
    }

    return (
        <div className="spotifyLogin">
            {accessToken ?
                <a>
                    <button className='button' onClick={signOut}><FontAwesomeIcon icon={faSpotify} /> | {t('spotifylogin.logout')}</button>
                </a>
                :
                <a>
                    <button className='button' onClick={signInWithSpotify}><FontAwesomeIcon icon={faSpotify} /> | {t('spotifylogin.login')}</button>
                </a>
            }
        </div>
    );
};

export default SpotifyLogin;

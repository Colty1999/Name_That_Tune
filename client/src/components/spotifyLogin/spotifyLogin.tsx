import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useStorageState } from "../../hooks/useStorageState";
import "./spotifyLogin.scss";


const SpotifyLogin = () => {
    
    let loggedIn = useStorageState({ state: "loggedIn" });
    let accessToken = useStorageState({state: "accessToken"})
    const {setLoading, token, setToken} = useContext(AppContext);

    const authEndpoint = 'https://accounts.spotify.com/authorize',
        clientId = '226da25afbe64537a2574c7155cbc643',
        responseType = 'code',
        redirectUri = 'http://localhost:5173',
        scope = ["streaming, user-read-email, user-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state"].join("%20"),
        authorizationLink = `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

    function logout() {
        setLoading(true);
        setTimeout(() => {
            setToken(null);
            loggedIn.setStorageState("false");
            accessToken.setStorageState("");
            setLoading(false);
        }, 300);
    }

    return (
        <div className="spotifyLogin">
            {(token || (JSON.parse(localStorage.getItem("loggedIn") ? loggedIn.store! : "false") === true) ) ?
                <a>
                    <button className='button' onClick={logout}><FontAwesomeIcon icon={faSpotify} /> | Logout</button>
                </a>
                :
                <Link to={authorizationLink}>
                    <button className='button'><FontAwesomeIcon icon={faSpotify} /> | Login to Spotify</button>
                </Link>
            }
        </div>
    );
};

export default SpotifyLogin;

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../App";
import useAuth from "../hooks/useAuth";


const SpotifyLogin = () => {
    const setLoading = useContext(LoadingContext);

    const token = new URLSearchParams(window.location.search).get('code');

    const authEndpoint = 'https://accounts.spotify.com/authorize',
        clientId = '226da25afbe64537a2574c7155cbc643',
        responseType = 'code',
        redirectUri = 'http://localhost:5173',
        scope = ["streaming, user-read-email, user-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state"].join("%20"),
        authorizationLink = `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;



    if (token) {
        const accessToken = useAuth(token);
        console.log(accessToken);
    }



    // let token = useStorageState({ state: "token" });
    function logout() {
        setLoading(true);
        setTimeout(() => {
            // token.setStorageState("");
            setLoading(false);
        }, 1000);
    }

    return (
        <>
            {token ?
                <a>
                    <button className='button spotifybutton' onClick={logout}><FontAwesomeIcon icon={faSpotify} /> | Logout</button>
                </a>
                :
                <Link to={authorizationLink}>
                    <button className='button spotifybutton'><FontAwesomeIcon icon={faSpotify} /> | Login to Spotify</button>
                </Link>
            }
        </>
    );
};

export default SpotifyLogin;

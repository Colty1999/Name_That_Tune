import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useStorageState } from "../hooks/useStorageState";
import { useContext } from "react";
import { LoadingContext } from "../App";

const SpotifyLogin = () => {
    const clientId = '226da25afbe64537a2574c7155cbc643';
    const redirectUri = 'http://localhost:5173';
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scope = ["streaming, user-read-email, user-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state"].join("%20")
    const responseType = 'code';

    const authorizationLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    let token = useStorageState({ state: "token" });
    const setLoading = useContext(LoadingContext);


    function logout () {
        setLoading(true);
        setTimeout(() => {
            token.setStorageState("");
            setLoading(false);
        }, 1000);
    }

    return (
        <>
            {token.store === "" || token.store === null ?
                <Link to={authorizationLink}>
                    <button className='button spotifybutton'><FontAwesomeIcon icon={faSpotify} /> | Login to Spotify</button>
                </Link>
                :
                <a>
                    <button className='button spotifybutton' onClick={logout}><FontAwesomeIcon icon={faSpotify} /> | Logout</button>
                </a>
            }
        </>
    );
};

export default SpotifyLogin;

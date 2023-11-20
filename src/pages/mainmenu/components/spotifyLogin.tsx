import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useStorageState } from "../../../hooks/useStorageState";

const SpotifyLogin = () => {
    const CLIENT_ID = '226da25afbe64537a2574c7155cbc643';
    const REDIRECT_URL = 'http://localhost:5173';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    let token = useStorageState({ state: "token" });

    return (
        <>
            {token.store === "" || token.store === null ?
                <Link to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`}>
                    <button className='button spotifybutton'><FontAwesomeIcon icon={faSpotify} /> | Login to Spotify</button>
                </Link>
                :
                <a>
                    <button className='button spotifybutton' onClick={() => { token.setStorageState(""); console.log(token.store === "") }}><FontAwesomeIcon icon={faSpotify} /> | Logout</button>
                </a>
            }
        </>
    );
};

export default SpotifyLogin;

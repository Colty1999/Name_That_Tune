import SpotifyPlayer from 'react-spotify-web-playback';
import './player.scss';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { getCookie, deleteCookie } from 'cookies-next/client';

interface PlayerProps {
    uri: string;
}

const Player = ({ uri }: PlayerProps) => {
    let { setError } = useContext(AppContext);

    let accessToken = getCookie("accessToken");
    const { songPlaying, setPlayerLoaded } = useContext(AppContext);


    const styles = {
        // activeColor: '#fff',
        bgColor: '#242424',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
    }

    if (!accessToken) return <div className="spotifyLoginPrompt">You need to login to Spotify</div>;
    return (
        <div className='spotifyPlayerContainer'>
            <SpotifyPlayer
                token={accessToken}
                uris={uri}
                // autoPlay={true}
                play={songPlaying}
                callback={state => {
                    // if (!state.isPlaying) setSongPlaying(false);
                    if (state.status === "ERROR") {
                        deleteCookie("accessToken");
                        setError(state.error);
                    }
                    if (state.status === "READY") setPlayerLoaded(true);
                    else setPlayerLoaded(false);
                }}
                styles={styles}
                // layout='compact'
                hideAttribution={true}
                // hideCoverArt={true}
            />
        </div>
    );
};

export default Player;

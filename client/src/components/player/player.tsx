import { useStorageState } from '../../hooks/useStorageState';
import SpotifyPlayer from 'react-spotify-web-playback';
import './player.scss';
import { useContext } from 'react';
import { AppContext } from '../../App';

interface PlayerProps {
    uri: string;
}

const Player = ({ uri }: PlayerProps) => {
    let accessToken = useStorageState({ state: "accessToken" })
    const { songPlaying, setSongPlaying } = useContext(AppContext);


    const styles = {
        // activeColor: '#fff',
        bgColor: '#242424',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
    }

    if (!accessToken!.store) return <div className="spotifyLoginPrompt">You need to login to Spotify</div>;
    return (
        <div className='spotifyPlayerContainer'>
            <SpotifyPlayer
                token={accessToken.store}
                uris={uri}
                // autoPlay={true}
                play={songPlaying}
                callback={state => {
                    if (!state.isPlaying) setSongPlaying(false);
                }}
                styles={styles}
            />
        </div>
    );
};

export default Player;

import React from 'react';
import { useStorageState } from '../../hooks/useStorageState';
import SpotifyPlayer from 'react-spotify-web-playback';

interface PlayerProps {
    uri: string;
}

const Player = ({uri}: PlayerProps) => {
    let accessToken = useStorageState({ state: "accessToken" })

    // Implement your player component logic here

    if (!accessToken!.store) return <div className="spotifyLoginPrompt">You need to login to Spotify</div>;
    return (
        <SpotifyPlayer
            token={accessToken.store}
            uris={uri}
            // autoPlay={true}
            // play={true}
            // callback={state => {
            //     console.log(state);
            // }}
        />
    );
};

export default Player;

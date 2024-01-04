
import SpotifyLogin from "../../components/spotifyLogin";
import WebPlayback from "./components/webPlayback";
import { useStorageState } from "../../hooks/useStorageState";

const GameConfiguration = () => {
    let token = useStorageState({ state: "token" });


    if(token.store === null || token.store === "") return <SpotifyLogin/>
    return (
        <WebPlayback token={token}/>
    );
};

export default GameConfiguration;

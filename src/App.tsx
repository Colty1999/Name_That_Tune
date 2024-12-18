// "use client";

import MainMenu from './views/mainmenu/mainMenu';
import Container from 'react-bootstrap/esm/Container';
import NotFound from './views/notfound/notFound';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotImplemented from './views/notimplemented/notImplemented';
import Header from './components/header/header';
import { createContext, useState } from 'react';
import Loader from './components/loader/loader';
import GameConfiguration from './views/gameconfiguration/gameConfiguration';
import useAuth from './hooks/useAuth';
import SpotifyGameMaster from './views/spotifygamemaster/spotifyGameMaster';
import SpotifyGame from './views/spotifygame/spotifyGame';
import Instruction from './views/insctruction/instruction';
import ErrorModal from './components/errorModal/errorModal';
import './i18n.js';

export const AppContext = createContext<{
  setLoading: (React.Dispatch<React.SetStateAction<boolean>>),
  token: (string | null),
  setToken: (React.Dispatch<React.SetStateAction<string | null>>),
  songPlaying: boolean,
  setSongPlaying: (React.Dispatch<React.SetStateAction<boolean>>),
  playerLoaded: boolean,
  setPlayerLoaded: (React.Dispatch<React.SetStateAction<boolean>>),
  error: string,
  setError: (React.Dispatch<React.SetStateAction<string>>)
}>({ setLoading: () => { }, token: null, setToken: () => { }, songPlaying: false, setSongPlaying: () => { }, playerLoaded: false, setPlayerLoaded: () => { }, error: "", setError: () => { }});

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(new URLSearchParams(window.location.search).get('code'));
  const [songPlaying, setSongPlaying] = useState<boolean>(false);
  const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useAuth(token);

  return (
    <Container fluid="true" className='container'>
      <HashRouter >
        <AppContext.Provider value={{ setLoading, token, setToken, songPlaying, setSongPlaying, playerLoaded, setPlayerLoaded, error, setError }}>
          {loading && <Loader />}
          <ErrorModal />
          <Header />
          <Routes>
            <Route path="/" Component={MainMenu} />
            {/* <Route path="/demogame" Component={DemoGame} />
            <Route path="/demogamemaster" Component={DemoGameMaster} /> */}
            <Route path="/spotifygame" Component={SpotifyGame} />
            <Route path="/spotifygamemaster" Component={SpotifyGameMaster} />
            <Route path="/gameconfiguration" Component={GameConfiguration} />
            <Route path="instruction" Component={Instruction} />
            {/* <Route path="/game" Component={GalleryYearView} />
            <Route path="/archive/:year/:folder" Component={GalleryFolderView} />*/}
            <Route path='/notimplemented' Component={NotImplemented} />
            <Route path='/404' Component={NotFound} />
            <Route
            path="*"
            element={<Navigate to="/404" replace />}
          />
          </Routes>
        </AppContext.Provider>
      </HashRouter >
    </Container>
  )
}
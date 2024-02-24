import MainMenu from './pages/mainmenu/mainMenu'
import Container from 'react-bootstrap/esm/Container';
import Game from './pages/game/game';
import NotFound from './pages/notfound/notFound';
import GameMaster from './pages/gamemaster/gameMaster';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NotImplemented from './pages/notimplemented/notImplemented';
import Header from './components/header/header';
import { createContext, useState } from 'react';
import Loader from './components/loader/loader';
import GameConfiguration from './pages/gameconfiguration/gameConfiguration';
import useAuth from './hooks/useAuth';


export const AppContext = createContext<{
  setLoading: (React.Dispatch<React.SetStateAction<boolean>> | Function),
  token: (string | null),
  setToken: (React.Dispatch<React.SetStateAction<string | null>> | Function),
  songPlaying: boolean,
  setSongPlaying: (React.Dispatch<React.SetStateAction<boolean>> | Function),
  loggedIn: boolean,
  setLoggedIn: (React.Dispatch<React.SetStateAction<boolean>> | Function),
}>({ setLoading: () => { }, token: null, setToken: () => { }, songPlaying: false, setSongPlaying: () => { }, loggedIn: false, setLoggedIn: () => { } });

function App() {

  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(new URLSearchParams(window.location.search).get('code'));
  const [songPlaying, setSongPlaying] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useAuth(token);

  return (
    <Container fluid="true" className='container'>
      <HashRouter >
        <AppContext.Provider value={{ setLoading, token, setToken, songPlaying, setSongPlaying, loggedIn, setLoggedIn }}>
          {loading && <Loader />}
          <Header />
          <Routes>
            <Route path="/" Component={MainMenu} />
            <Route path="/game" Component={Game} />
            <Route path="/gamemaster" Component={GameMaster} />
            <Route path="/gameconfiguration" Component={GameConfiguration} />
            {/* <Route path="/game" Component={GalleryYearView} />
            <Route path="/archive/:year/:folder" Component={GalleryFolderView} />*/}
            <Route path='/notimplemented' Component={NotImplemented} />
            <Route path='/404' Component={NotFound} />
            {/* <Route
            path="*"
            element={<Navigate to="/404" replace />}
          /> */}
          </Routes>
        </AppContext.Provider>
      </HashRouter >
    </Container>
  )
}

export default App
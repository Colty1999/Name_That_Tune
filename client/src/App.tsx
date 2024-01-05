import MainMenu from './pages/mainmenu/mainMenu'
import Container from 'react-bootstrap/esm/Container';
import Game from './pages/game/game';
import NotFound from './pages/notfound/notFound';
import GameMaster from './pages/gamemaster/gameMaster';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NotImplemented from './pages/notimplemented/notImplemented';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { createContext, useState } from 'react';
import Loader from './components/loader/loader';
import GameConfiguration from './pages/gameconfiguration/gameConfiguration';


export const LoadingContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | Function>(() => { });

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  // let token = useStorageState({ state: "token" });
  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get('code');

  //   if (code) {
  //     window.location.search = '';
  //     token.setStorageState(code);
  //   }
  // }, []); // get token from spotify url

  return (
    <Container fluid="true">
      <HashRouter >
        <LoadingContext.Provider value={setLoading}>
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
          <Footer />
        </LoadingContext.Provider>
      </HashRouter >
    </Container>
  )
}

export default App

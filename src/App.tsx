import MainMenu from './pages/mainmenu/mainMenu'
import Container from 'react-bootstrap/esm/Container';
import Game from './pages/game/game';
import NotFound from './pages/notfound/notFound';
import GameMaster from './pages/gamemaster/gameMaster';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NotImplemented from './pages/notimplemented/notImplemented';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { useEffect } from 'react';
import { useStorageState } from './hooks/useStorageState';
// export const UserContext = createContext<{number:number, setNumber: React.Dispatch<React.SetStateAction<boolean>> | Function}>({number: 0, setNumber:() => { }});

function App() {
  let token = useStorageState({ state: "token" });

  useEffect(() => {
      let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));

      let _token = urlParams.get('access_token');

      if (_token) {
        window.location.hash = '';
          token.setStorageState(_token);
      }
  }, []); // get token from spotify url

  return (
    <Container fluid="true">
      <HashRouter >
      <Header />
        <Routes>
          <Route path="/" Component={MainMenu} />
          <Route path="/game" Component={Game} />
          <Route path="/gamemaster" Component={GameMaster} />
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
      </HashRouter >
    </Container>
  )
}

export default App

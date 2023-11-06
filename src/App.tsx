import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import MainMenu from './pages/mainmenu/mainMenu'
import Container from 'react-bootstrap/esm/Container';
import Game from './pages/game/game';
import NotFound from './pages/notfound/notFound';
import GameMaster from './pages/gamemaster/gameMaster';

// export const UserContext = createContext<{number:number, setNumber: React.Dispatch<React.SetStateAction<boolean>> | Function}>({number: 0, setNumber:() => { }});

function App() {

  return (
    <Container fluid="true">
      <Router>
          <Routes>
            <Route path="/" Component={MainMenu} />
            <Route path="/game" Component={Game} />
            <Route path="/gamemaster" Component={GameMaster} />
            {/* <Route path="/game" Component={GalleryYearView} />
            <Route path="/archive/:year/:folder" Component={GalleryFolderView} />*/}
            <Route path='/404' Component={NotFound} />
            <Route
              path="*"
              element={<Navigate to="/404" replace />}
            /> 
          </Routes>
      </Router>
    </Container>
  )
}

export default App

import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import MainMenu from './pages/mainmenu/mainMenu'
import Container from 'react-bootstrap/esm/Container';
import Game from './pages/game/game';
import NotFound from './pages/notfound/notFound';
import GameMaster from './pages/gamemaster/gameMaster';
import { useEffect } from 'react';
import { useStorageState } from './hooks/useStorageState';
import { Song } from './assets/common';

// export const UserContext = createContext<{number:number, setNumber: React.Dispatch<React.SetStateAction<boolean>> | Function}>({number: 0, setNumber:() => { }});

function App() {
  // const [songList, setSongList] = useState([]);
  let songStorage = useStorageState({ state: "songs" });

  useEffect(() => {
    fetch('songsList.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson: JSON) {
        const chunkSize = 5;
        const fetchedArray:Song[] = JSON.parse(JSON.stringify(myJson));
        // fetchedArray.forEach((song: any) => {
        //   song.songAudio = new Audio((song.songPath));
        // });
        const splitArrays = [];
        for (let i = 0; i < fetchedArray.length; i += chunkSize) {
          splitArrays.push(fetchedArray.slice(i, i + chunkSize));
        }
        // console.log(fetchedArray);
        // console.log(songList1);
        songStorage.setStorageState(JSON.stringify(splitArrays));
        //function to parse the json file with audio data
      });
  }, []);

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

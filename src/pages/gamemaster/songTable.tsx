import { Song, StateType } from "../../assets/common";
import SongButton from "./songButtons";

export interface SongTableProps {
    songs: Song[];
    category: StateType;
    count: StateType;
    startPlaying: (song: Song) => void;
    pausePlaying: (song: Song) => void;
    setPoints: (teamPoints: StateType | null, count: StateType) => void;
    resetSong: (song: Song) => void;
}

const SongTable = (props: SongTableProps) => {
    const { songs, category, count, startPlaying, pausePlaying, setPoints, resetSong } = props;
    console.log(songs)
    return (
        <div>
            {songs.map((song: Song) => (
                <div key={song.id}>
                    <SongButton
                        song={song}
                        category={category}
                        count={count}
                        startPlaying={startPlaying}
                        pausePlaying={pausePlaying}
                        setPoints={setPoints}
                        resetSong={resetSong}
                    />
                </div>
            ))}
        </div>
    );
}

export default SongTable;
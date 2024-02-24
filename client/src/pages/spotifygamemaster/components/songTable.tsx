import { Song, StateType } from "../../../assets/common";
import SongButton from "./songButtons";

export interface SongTableProps {
    songs: Song[];
    category: StateType;
    count: StateType;
    startPlaying: (song: Song) => void;
    pausePlaying: (song: Song) => void;
    setPoints: (song: Song | null, teamPoints: StateType | null, count: StateType) => void;
    resetSong: (song: Song) => void;
}

const SongTable = (props: SongTableProps) => {
    const { songs, category, count, startPlaying, pausePlaying, setPoints, resetSong } = props;
    return (
        <div className="songtable">
            {songs.map((song: Song) => (
                <SongButton
                    song={song}
                    category={category}
                    count={count}
                    startPlaying={startPlaying}
                    pausePlaying={pausePlaying}
                    setPoints={setPoints}
                    resetSong={resetSong}
                    key={song.id}
                />
            ))}
        </div>
    );
}

export default SongTable;
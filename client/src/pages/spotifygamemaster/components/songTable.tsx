import { StateType, Track } from "../../../assets/common";
import SongButton from "./songButtons";

export interface SongTableProps {
    tracks: Track[];
    category: StateType;
    count: StateType;
    startPlaying: (track: Track) => void;
    pausePlaying: (track: Track) => void;
    setPoints: (track: Track | null, teamPoints: StateType | null, count: StateType) => void;
    resetTrack: (track: Track) => void;
    setShowName: (track: Track) => void;
    setYoutubePlay: (id: number) => void;
    tableId: number;
}

const SongTable = (props: SongTableProps) => {
    const { tracks, category, count, startPlaying, pausePlaying, setPoints, resetTrack, setShowName, setYoutubePlay, tableId} = props;

    return (
        <div className="songtable">
            {tracks.map((track: Track, id: number) => (
                <SongButton
                    key={id}
                    track={track}
                    category={category}
                    count={count}
                    startPlaying={startPlaying}
                    pausePlaying={pausePlaying}
                    setPoints={setPoints}
                    resetTrack={resetTrack}
                    setShowName={setShowName}
                    setYoutubePlay={setYoutubePlay}
                    tableId={tableId}
                    songId={id}
                />
            ))}
        </div>
    );
}

export default SongTable;
import "./trackSearchResult.scss";

interface TrackSearchResultProps {
    track: {
        artist: string,
        title: string,
        uri: string,
        albumUrl?: string,
    }
}

const TrackSearchResult = ({ track }: TrackSearchResultProps) => {

    return (
        <div className="trackSearchResult">
            <img src={track.albumUrl} alt={track.title} />
            <div className="songData">
                <h3>{track.title}</h3>
                <h4>{track.artist}</h4>
            </div>
        </div>
    );
};

export default TrackSearchResult;

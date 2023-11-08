import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Song, StateType } from "../../../assets/common";

interface TeamPointsProps {
  team1Points: StateType;
  team2Points: StateType;
  team3Points: StateType;
  currentSong: Song;
  count: StateType;
  setPoints: (song: Song | null, teamPoints: StateType | null, count: StateType) => void;
}

export const TeamPoints = (props: TeamPointsProps) => {
  const { team1Points, team2Points, team3Points, currentSong, count, setPoints } = props;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", paddingBottom: "2rem" }}>
                <div>
                    <h3>Drużyna 1</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team1Points, count)} className="punctationbutton">
                            <h4>{team1Points.store}pkt</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team1Points.setStorageState((Number(team1Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team1Points.setStorageState((Number(team1Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Drużyna 2</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team2Points, count)} className="punctationbutton">
                            <h4>{team2Points.store}pkt</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team2Points.setStorageState((Number(team2Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team2Points.setStorageState((Number(team2Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Drużyna 3</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team3Points, count)} className="punctationbutton">
                            <h4>{team3Points.store}pkt</h4>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={() => team3Points.setStorageState((Number(team3Points.store) + 10).toString())}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => team3Points.setStorageState((Number(team3Points.store) - 10).toString())}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
  );
};

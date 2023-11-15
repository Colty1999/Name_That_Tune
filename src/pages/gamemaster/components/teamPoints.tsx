import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Song, StateType } from "../../../assets/common";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation();

  return (
    <div className="teampoints">
                <div>
                    <h3>{t("team")} 1</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team1Points, count)} className="punctationbutton">
                            <h4>{team1Points.store}{t("pt")}</h4>
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
                    <h3>{t("team")} 2</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team2Points, count)} className="punctationbutton">
                            <h4>{team2Points.store}{t("pt")}</h4>
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
                    <h3>{t("team")} 3</h3>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => setPoints(currentSong, team3Points, count)} className="punctationbutton">
                            <h4>{team3Points.store}{t("pt")}</h4>
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

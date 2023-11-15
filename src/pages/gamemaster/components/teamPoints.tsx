import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Song, StateType } from "../../../assets/common";
import { useTranslation } from "react-i18next";

interface TeamPointsProps {
    team1: StateType;
    team2: StateType;
    team3: StateType;
    currentSong: Song;
    count: StateType;
    setPoints: (song: Song | null, teamPoints: StateType | null, count: StateType) => void;
}

export const TeamPoints = (props: TeamPointsProps) => {
    const { team1, team2, team3, currentSong, count, setPoints } = props;
    const [t] = useTranslation();

    function TeamView (props: {team: StateType}) {
        const { team } = props;

        return (
            <div>
                <h3>{JSON.parse(team.store!).name}</h3>
                <div style={{ display: "flex" }}>
                    <button onClick={() => setPoints(currentSong, team, count)} className="punctationbutton">
                        <h4>{JSON.parse(team.store!).points}{t("pt")}</h4>
                    </button>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <button onClick={() => team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points + 10 }))}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button onClick={() => team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points - 10 }))}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="teampoints">
            <TeamView team={team1} />
            <TeamView team={team2} />
            <TeamView team={team3} />
        </div>
    );
};

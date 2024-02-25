import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateType, Track } from "../../../assets/common";
import { useTranslation } from "react-i18next";

interface TeamPointsProps {
    team1: StateType;
    team2: StateType;
    team3: StateType;
    currentTrack: Track;
    count: StateType;
    setPoints: (track: Track | null, teamPoints: StateType | null, count: StateType) => void;
}

export const TeamPoints = (props: TeamPointsProps) => {
    const { team1, team2, team3, currentTrack, count, setPoints } = props;
    const [t] = useTranslation();

    function TeamView(props: { team: StateType }) {
        const { team } = props;
        // team1.setStorageState(JSON.stringify({name: "Team1", points: 0}))
        return (
            <div className="team">
                <div className="teamnames">
                    {/* {JSON.parse(team.store!).name} */}
                    <input
                        defaultValue={JSON.parse(team.store!).name}
                        onBlur={(e) => team.setStorageState(JSON.stringify({ name: e.target.value, points: JSON.parse(team.store!).points }))}
                    />
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                    <button onClick={() => team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points - 10 }))}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <button onClick={() => setPoints(currentTrack, team, count)} className="punctationbutton">
                        <h4>{JSON.parse(team.store!).points}{t("pt")}</h4>
                    </button>
                    <button onClick={() => team.setStorageState(JSON.stringify({ name: JSON.parse(team.store!).name, points: JSON.parse(team.store!).points + 10 }))}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    {/* <div style={{ display: "flex", flexDirection: "column" }}>
                    </div> */}
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

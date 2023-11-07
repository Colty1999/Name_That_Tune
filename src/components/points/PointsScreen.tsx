import { useStorageState } from "../../hooks/useStorageState";
import "./pointsScreen.scss";

const PointsScreen = () => {

    let team1Points = useStorageState({ state: "team1Points" });
    let team2Points = useStorageState({ state: "team2Points" });
    let team3Points = useStorageState({ state: "team3Points" });

    return (
        <div className="pointscreenstyle">
            <div>
                <h3>Drużyna 1</h3>
                <div className="teampoints">
                    <h3>{team1Points.store}pkt</h3>
                </div>
            </div>
            <div>
                <h3>Drużyna 2</h3>
                <div className="teampoints">
                    <h3>{team2Points.store}pkt</h3>
                </div>
            </div>
            <div>
                <h3>Drużyna 3</h3>
                <div className="teampoints">

                    <h3>{team3Points.store}pkt</h3>
                </div>
            </div>
        </div>
    );
};

export default PointsScreen;

import { useTranslation } from "react-i18next";
import { useStorageState } from "../../../../hooks/useStorageState";
import "./pointsScreen.scss";

const PointsScreen = () => {
    const [t] = useTranslation();

    let team1 = useStorageState({ state: "team1" });
    let team2 = useStorageState({ state: "team2" });
    let team3 = useStorageState({ state: "team3" });

    return (
        <div className="pointscreenstyle">
            <div>
                <h3>{JSON.parse(team1.store!).name}</h3>
                <div className="teampoints">
                    <h3>{JSON.parse(team1.store!).points}{t("pt")}</h3>
                </div>
            </div>
            <div>
                <h3>{JSON.parse(team1.store!).name}</h3>
                <div className="teampoints">
                    <h3>{JSON.parse(team2.store!).points}{t("pt")}</h3>
                </div>
            </div>
            <div>
                <h3>{JSON.parse(team1.store!).name}</h3>
                <div className="teampoints">

                    <h3>{JSON.parse(team3.store!).points}{t("pt")}</h3>
                </div>
            </div>
        </div>
    );
};

export default PointsScreen;

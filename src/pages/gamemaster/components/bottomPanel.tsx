import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { StateType, Song } from "../../../assets/common";

interface BottomPanelProps {
    team1Points: StateType;
    team2Points: StateType;
    team3Points: StateType;
}

const BottomPanel = (props: BottomPanelProps) => {
    const { team1Points, team2Points, team3Points } = props;
    const [t] = useTranslation();
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.2rem" }}>
            <button
                onClick={() => {
                    team1Points.setStorageState("0");
                    team2Points.setStorageState("0");
                    team3Points.setStorageState("0");
                }
                }
                className="punctationbutton"
            >
                {t("gamemaster.resetpoints")}
            </button>
        </div>
    )
}

export default BottomPanel;
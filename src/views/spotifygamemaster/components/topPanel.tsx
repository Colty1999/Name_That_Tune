"use client";

import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { StateType, Track } from "../../../assets/common";

interface TopPanelProps {
    pageStorage: StateType;
    count: StateType;
    tracks: Track[][];

}

const TopPanel = (props: TopPanelProps) => {
    const { pageStorage, count, tracks } = props;
    const [t] = useTranslation();
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <h1>{t("gamemaster.masterpanel")}</h1>
                <div style={{ display: "flex", justifyContent: "left", gap: "0.2rem" }}>
                    <button
                        onClick={() => { pageStorage.setStorageState((Number(pageStorage.store) - 1).toString()) }}
                        className='setbuttom'
                        disabled={Number(pageStorage.store) === 0}
                    >
                        <FontAwesomeIcon icon={faSquareCaretLeft} /> {t("gamemaster.prevset")}
                    </button>
                    <button
                        onClick={() => { pageStorage.setStorageState((Number(pageStorage.store) + 1).toString()); }}
                        className='setbuttom'
                        disabled={Number(pageStorage.store) >= tracks.length - 1}
                    >
                        {t("gamemaster.nextset")} <FontAwesomeIcon icon={faSquareCaretRight} />
                    </button>
                    {pageStorage.store && <div style={{display: "flex", alignItems: "center", marginLeft: "1rem"}}>Set {Number(pageStorage.store) + 1}/{tracks.length}</div>}
                </div>
            </div>
            <div style={{ margin: "auto 0 0 0" }}>
                <h3>{t("points")}</h3>
                <div className="punctationbutton song" style={{ margin: 0 }}>
                    <h4>{count.store}{t("pt")}</h4>
                </div>
            </div>
        </div>
    )
}

export default TopPanel;
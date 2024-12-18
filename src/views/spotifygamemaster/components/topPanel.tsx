"use client";

import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { StateType, Track } from "../../../assets/common";
import { useState, useEffect } from "react";
import { useStorageState } from "src/hooks/useStorageState";

interface TopPanelProps {
    pageStorage: StateType;
    count: StateType;
    tracks: Track[][];

}

const TopPanel = (props: TopPanelProps) => {
    const { pageStorage, count, tracks } = props;
    const [t] = useTranslation();

    const category = useStorageState({ state: "category" })
    const maxPoints = useStorageState({ state: "maxPoints" });

    const [currentTrackPoints, setCurrentTrackPoints] = useState<number>(100);
        useEffect(() => {
            tracks.forEach((track: Track[]) => {
                track.forEach((track: Track) => {
                    if (category.store === track.track.name) setCurrentTrackPoints(track.points);
                });
            });
        }, [category.store, tracks, count.store]);

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
                {/* <div className="punctationbutton song" style={{ margin: 0 }}>
                    <h4>{count.store}{t("pt")}</h4>
                </div> */}
                <div className="punctationbutton song ">
                        <div
                            className='progressbar'
                            style={{
                                width: `${Math.min(Math.max(((Number(count.store) - currentTrackPoints) / (Number(maxPoints.store) - currentTrackPoints)) * 100, 0), 100)}%`,
                                opacity: `${Number(count.store) <= currentTrackPoints ? 0 : 1}`,
                            }}
                        />
                        <h4 className="pointsdisplay">{count.store}{t("pt")}</h4>
                    </div>
            </div>
        </div>
    )
}

export default TopPanel;
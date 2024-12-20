"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStorageState } from "../../../hooks/useStorageState";

const PointsScreen = () => {
    const [t] = useTranslation();

    const team1 = useStorageState({ state: "team1" });
    const team2 = useStorageState({ state: "team2" });
    const team3 = useStorageState({ state: "team3" });

    // State to track flashing for each team
    const [flashTeam1, setFlashTeam1] = useState(false);
    const [flashTeam2, setFlashTeam2] = useState(false);
    const [flashTeam3, setFlashTeam3] = useState(false);

    // Previous points for comparison
    const [prevPoints1, setPrevPoints1] = useState(JSON.parse(team1.store!).points);
    const [prevPoints2, setPrevPoints2] = useState(JSON.parse(team2.store!).points);
    const [prevPoints3, setPrevPoints3] = useState(JSON.parse(team3.store!).points);

    // Check for point changes and trigger flash
    const minTeamPointsAnimation = 10;
    useEffect(() => {
        const currentPoints = JSON.parse(team1.store!).points;
        if (currentPoints - prevPoints1 > minTeamPointsAnimation) {
            setFlashTeam1(true);
            setTimeout(() => setFlashTeam1(false), 1000);
        }
        setPrevPoints1(currentPoints);
    }, [team1.store, prevPoints1]);

    useEffect(() => {
        const currentPoints = JSON.parse(team2.store!).points;
        if (currentPoints - prevPoints2 > minTeamPointsAnimation) {
            setFlashTeam2(true);
            setTimeout(() => setFlashTeam2(false), 1000);
        }
        setPrevPoints2(currentPoints);
    }, [team2.store, prevPoints2]);

    useEffect(() => {
        const currentPoints = JSON.parse(team3.store!).points;
        if (currentPoints - prevPoints3 > minTeamPointsAnimation) {
            setFlashTeam3(true);
            setTimeout(() => setFlashTeam3(false), 1000);
        }
        setPrevPoints3(currentPoints);
    }, [team3.store, prevPoints3]);

    return (
        <div className="pointscreenstyle">
            <div>
                <h3>{JSON.parse(team1.store!).name}</h3>
                <div className={`teampoints ${flashTeam1 ? "flash" : ""}`}>
                    <h3>{JSON.parse(team1.store!).points}{t("pt")}</h3>
                </div>
            </div>
            <div>
                <h3>{JSON.parse(team2.store!).name}</h3>
                <div className={`teampoints ${flashTeam2 ? "flash" : ""}`}>
                    <h3>{JSON.parse(team2.store!).points}{t("pt")}</h3>
                </div>
            </div>
            <div>
                <h3>{JSON.parse(team3.store!).name}</h3>
                <div className={`teampoints ${flashTeam3 ? "flash" : ""}`}>
                    <h3>{JSON.parse(team3.store!).points}{t("pt")}</h3>
                </div>
            </div>
        </div>
    );
};


export default PointsScreen;

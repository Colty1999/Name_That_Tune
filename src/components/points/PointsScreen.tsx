import { useState } from "react";

const PointsScreen = (props: {count: number}) => {
    const {count} = props;

    const [team1Points, setTeam1Points] = useState(0);
    const [team2Points, setTeam2Points] = useState(0);
    const [team3Points, setTeam3Points] = useState(0);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem" }}>
                <div>
                    <h2>Drużyna 1</h2>
                    <button onClick={() => setTeam1Points((points) => points + count)}>
                        <h3>{team1Points}</h3>
                    </button>
                </div>
                <div>
                    <h2>Drużyna 2</h2>
                    <button onClick={() => setTeam2Points((points) => points + count)}>
                        <h3>{team2Points}</h3>
                    </button>
                </div>
                <div>
                    <h2>Drużyna 3</h2>
                    <button onClick={() => setTeam3Points((points) => points + count)}>
                        <h3>{team3Points}</h3>
                    </button>
                </div>
            </div>
    );
};

export default PointsScreen;

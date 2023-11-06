import { gameLogo } from '../../assets/common';


const GameMaster = () => {
    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <p className="read-the-docs">
                Mateusz gietka | 2023
            </p>
        </div>
    );
};

export default GameMaster;

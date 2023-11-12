import { gameLogo } from "../../assets/common";
import Footer from "../../components/footer/footer";

const NotFound = () => {
    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <h2>Not Found</h2>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;

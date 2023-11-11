import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { gameLogo } from "../assets/common";


const NotImplemented = () => {
    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>Jaka to melodia?</h1>
            <div className="card button">
                <h2>Not Implemented</h2>
            </div>
            <p className="footer">
                Mateusz Gietka 2023 | <Link to="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                    <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
                </Link> | <Link to="https://github.com/Colty1999" target='_blank'>
                    <FontAwesomeIcon className="github" icon={faGithub} />
                </Link>
            </p>
        </div>
    );
};

export default NotImplemented;

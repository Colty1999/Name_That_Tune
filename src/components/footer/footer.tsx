import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            Mateusz Gietka 2023 | <a href="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
            </a> | <a href="https://github.com/Colty1999" target='_blank'>
                <FontAwesomeIcon className="github" icon={faGithub} />
            </a>
        </footer>
    );
}

export default Footer;
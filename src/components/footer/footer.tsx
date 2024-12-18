"use client";

import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './footer.scss'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            Mateusz Gietka 2023 - 2024 | <Link to="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
            </Link> | <Link to="https://github.com/Colty1999" target='_blank'>
                <FontAwesomeIcon className="github" icon={faGithub} />
            </Link>
        </footer>
    );
}

export default Footer;
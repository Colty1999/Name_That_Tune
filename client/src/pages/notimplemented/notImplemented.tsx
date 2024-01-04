import { useTranslation } from "react-i18next";
import { gameLogo } from "../../assets/common";
import Footer from "../../components/footer/footer";


const NotImplemented = () => {
    const [t] = useTranslation();
    
    return (
        <div className="mainmenu">
            <div>
                <img src={gameLogo} className="logo" alt="logo" />
            </div>
            <h1>{t("mainmenu.title")}</h1>
            <div className="card button">
                <h2>{t("notimplemented")}</h2>
            </div>
            <Footer />
        </div>
    );
};

export default NotImplemented;

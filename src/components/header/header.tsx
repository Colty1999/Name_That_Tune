"use client";

import Select from 'react-select'
import "./header.scss";
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
// import { useLocation } from 'react-router-dom';
import { useStorageState } from '../../hooks/useStorageState';
import { useEffect, useState } from 'react';

function Header() {
    const { i18n } = useTranslation();
    // const location = useLocation();
    const language = useStorageState({ state: "language" });
    const [isLoadingLanguage, setLoadingLanguage] = useState(false);

    useEffect(() => {
        if (!isLoadingLanguage && language.store && language.store !== i18n.language) {
            const load = async () => {
                setLoadingLanguage(true);
                await i18n.changeLanguage(language.store!).then(() => setLoadingLanguage(false));
            };
            load();
        }
    }, [isLoadingLanguage, language, i18n]);

    // const visibilityPaths = ["/", "/demogamemaster", "spotifygamemaster", "/instruction"];

    return (
        <header className="header">
            {/* {visibilityPaths.includes(location.pathname) && */}
            <Select
                styles={{
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        boxShadow: "0 0 0 1px rgba(90, 90, 255, 0.1),0 4px 11px rgba(90, 90, 255, 0.1)",
                        color: 'white',
                        padding: 0,
                        margin: 0,
                    }),
                    option: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        color: 'white',
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "white",
                            color: "#1a1a1a",
                        },
                    }),
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        height: '2rem',
                        marginTop: '0.25rem',
                        boxShadow: "0 0 0 1px rgba(90, 90, 255, 0.1),0 4px 11px rgba(90, 90, 255, 0.1)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            backgroundColor: "white",
                            color: "#1a1a1a",
                        },
                    }),
                    // valueContainer: (provided, state) => ({
                    //     ...provided,
                    //     paddingTop: '0.3rem',
                    // }),
                    singleValue: (provided, state) => {
                        const opacity = state.isDisabled ? 0.5 : 1;
                        const transition = 'opacity 300ms';

                        return { ...provided, opacity, transition };
                    }
                }}
                defaultValue={{ value: i18n.language, label: <Flag code={i18n.language === 'en' ? 'GB' : 'PL'} width='30px' /> }}
                options={[
                    { value: 'en', label: <Flag code="GB" width='30px' /> },
                    { value: 'pl', label: <Flag code="PL" width='30px' /> },
                ]}
                onChange={(e) => { language.setStorageState(e?.value ?? 'en'); }}
                components={{ IndicatorSeparator: () => null }}
            //DropdownIndicator:() => null,
            />
        </header>
    );
}

export default Header;

import Select from 'react-select'
import "./header.scss";
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import { googleLogo } from '../../assets/common';
import { useLocation } from 'react-router-dom';

function Header() {
    const { i18n } = useTranslation();
    let location = useLocation();

    return (
        <header className="header">
            {location.pathname === "/" ? <div className='userbutton' onClick={() => alert("Not Implemented")}>
                <img src={googleLogo} alt="user" className="userimg" />
                <span style={{ marginTop: "-0.25rem" }}>
                    | &nbsp;&nbsp; Login &nbsp;
                </span>
            </div> : <div/>}
            <Select
                // menuIsOpen={true}
                styles={{
                    // (provided, state)
                    // #1a1a1a
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        // boxShadow: 'none',
                        boxShadow: "0 0 0 1px rgba(90, 90, 255, 0.1),0 4px 11px rgba(90, 90, 255, 0.1)",
                        color: 'white',
                        padding: 0,
                        margin: 0,
                    }),
                    option: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        color: 'white',
                        // padding: 0,
                        // margin: 0,
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
                        // width: '5rem',
                        border: 'none',
                        // borderColor: '#686868',
                        height: '2rem', // Adjust the height as needed
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
                onChange={(e) => i18n.changeLanguage(e?.value ?? 'en')}
                components={{ IndicatorSeparator: () => null }}
            //DropdownIndicator:() => null,
            />
        </header>
    );
}

export default Header;

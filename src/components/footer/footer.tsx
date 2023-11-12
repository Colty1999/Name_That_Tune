import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Select from 'react-select'
import './footer.scss'
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags'

const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="footer">
            Mateusz Gietka 2023 | <Link to="https://www.linkedin.com/in/mateusz-gietka-50032b210/" target='_blank'>
                <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
            </Link> | <Link to="https://github.com/Colty1999" target='_blank'>
                <FontAwesomeIcon className="github" icon={faGithub} />
            </Link> | <Select
                // menuIsOpen={true}
                styles={{
                    menu: (provided, state) => ({
                        ...provided,
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        padding: 0,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        padding: 0,
                        margin: 0,
                        //   color: state.isSelected ? 'red' : 'blue',
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        // width: '5rem',
                        border: 'none',
                        // borderColor: '#686868',
                        height: '2rem', // Adjust the height as needed
                        marginTop: '0.25rem', 
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
                defaultValue={{value: i18n.language, label: <Flag code={i18n.language === 'GB' ? 'EN' : 'PL'} width='30px'/>}}
                options={[
                    { value: 'EN', label: <Flag code="GB"  width='30px'/> },
                    { value: 'PL', label: <Flag code="PL"  width='30px'/> },
                ]}
                onChange={(e) => i18n.changeLanguage(e?.value ?? 'EN')}
                components={{IndicatorSeparator:() => null }}
                //DropdownIndicator:() => null,
            />
        </div>
    );
}

export default Footer;
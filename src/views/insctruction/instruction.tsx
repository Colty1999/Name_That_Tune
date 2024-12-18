"use client";

import { useTranslation } from "react-i18next";
import { gameConfigurationImage, gameImage, gameLogo, loginImage, masterPanelImage } from "../../assets/common";
import './instruction.scss';
import { faBan, faMinus, faPause, faPlay, faPlus, faRotateLeft, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/footer";

function Instruction() {
    const [t] = useTranslation();

    const data: { title: string, content: JSX.Element }[] = [
        {
            title: t("instruction.introduction.title"),
            content: <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                    justifyContent: "start",

                    // alignItems: "center", // Align items vertically center
                    // justifyContent: "center", // Align content horizontally center
                    padding: "1rem"
                }}
            >
                <img
                    src={gameLogo}
                    alt="gameLogo"
                    style={{
                        width: "90%",
                        height: "auto",
                    }}
                />
                <div style={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "start", gap: "1rem" }}>
                    <b>{t("instruction.introduction.content.header")}<br />
                    {t("instruction.introduction.content.description")}</b>
                    <div>
                    {t("instruction.introduction.content.requirements.title")}
                        <ul>
                            <li>{t("instruction.introduction.content.requirements.account")}</li>
                            <li>{t("instruction.introduction.content.requirements.gamemaster")}</li>
                            <li>{t("instruction.introduction.content.requirements.players")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        },
        {
            title: t("instruction.login.title"),
            content:
                <div style={{
                    width: "100%",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    justifyContent: "start",
                }}>
                    <img
                        src={loginImage}
                        alt="login image"
                        style={{
                            width: "30%",
                            height: "auto",
                            paddingLeft: "4rem"
                        }} />
                    <b>-</b>
                    <b>{t("instruction.login.content")}</b>
                </div>
        },
        {
            title: t("instruction.gameconfiguration.title"),
            content:
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center", // Align items vertically center
                        justifyContent: "center", // Align content horizontally center
                        paddingBottom: "1rem"
                    }}
                >
                    <img
                        src={gameConfigurationImage}
                        alt="gameConfiguration image"
                        style={{
                            width: "90%",
                            height: "auto",
                        }}
                    />

                    <b>{t("instruction.gameconfiguration.content.header")}</b>

                    <div style={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <b>{t("instruction.gameconfiguration.content.properties.title")}</b>
                        <ol>
                            <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.properties.clue.1")}</b>{t("instruction.gameconfiguration.content.properties.clue.2")}</li>
                            <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.properties.points.1")}</b>{t("instruction.gameconfiguration.content.properties.points.2")} <b>{t("instruction.gameconfiguration.content.properties.points.3")}</b>. <br />
                            {t("instruction.gameconfiguration.content.properties.points.4")}<b> ({t("instruction.gameconfiguration.content.properties.points.5")}</b>).</li>
                            <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.properties.youtube.1")}</b>{t("instruction.gameconfiguration.content.properties.youtube.2")}<br />
                            {t("instruction.gameconfiguration.content.properties.youtube.3")}</li>
                        </ol>


                        <ul style={{ display: "flex", gap: "1rem" }}>
                            <li>
                                <b>{t("instruction.gameconfiguration.content.loadplaylist.title")}</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.loadplaylist.step1")}</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.loadplaylist.step2.1")}</b>{t("instruction.gameconfiguration.content.loadplaylist.step2.2")}<br />
                                    {t("instruction.gameconfiguration.content.loadplaylist.step2.3")}</li>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.loadplaylist.step3")}</li>
                                </ol>
                            </li>
                            <li>
                                <b>{t("instruction.gameconfiguration.content.loadplaylist.title")}</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.loadplaylist.step1")}</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.loadplaylist.step2.1")}</b>{t("instruction.gameconfiguration.content.loadplaylist.step2.2")}<br />
                                    {t("instruction.gameconfiguration.content.loadplaylist.step2.3")}</li>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.loadplaylist.step3")}</li>
                                </ol>
                            </li>
                        </ul>
                        <ul style={{ alignSelf: "start" }}>
                            <li>
                                <b>{t("instruction.gameconfiguration.content.savefile.title")}</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.savefile.step1")}</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gameconfiguration.content.savefile.step2.1")}</b>{t("instruction.gameconfiguration.content.savefile.step2.2")}<br />
                                    {t("instruction.gameconfiguration.content.savefile.step2.3")}</li>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.savefile.step3")}</li>
                                    <li style={{ paddingLeft: "1rem" }}>{t("instruction.gameconfiguration.content.savefile.step4")}</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>

        },
        {
            title: t("instruction.gamemaster.title"),
            content: <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center", // Align items vertically center
                    justifyContent: "center", // Align content horizontally center
                    paddingBottom: "1rem"
                }}
            >
                <img
                    src={masterPanelImage}
                    alt="masterPanel image"
                    style={{
                        width: "90%",
                        height: "auto",
                    }}
                />
                <b>{t("instruction.gamemaster.content.header")}</b>

                <ol style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.set.name")}</b>{t("instruction.gamemaster.content.steps.set.description")}<br />
                    {t("instruction.gamemaster.content.steps.set.note")}</li>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.points.name")}</b>{t("instruction.gamemaster.content.steps.points.description")}</li>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.teampanel.title")}</b>
                        <ul>
                            <li><b>{t("instruction.gamemaster.content.steps.teampanel.name.name")}</b>{t("instruction.gamemaster.content.steps.teampanel.name.description")}</li>
                            <li><b>{t("instruction.gamemaster.content.steps.teampanel.points.name")}</b>{t("instruction.gamemaster.content.steps.teampanel.points.description")}</li>
                            <li><b><FontAwesomeIcon icon={faMinus} /> <FontAwesomeIcon icon={faPlus} /></b>{t("instruction.gamemaster.content.steps.teampanel.increment.description")}</li>
                        </ul>
                    </li>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.songpanel.title")}</b>
                        <ul>
                            <li><b><FontAwesomeIcon icon={faVideo} /> <FontAwesomeIcon icon={faVideoSlash} /></b>{t("instruction.gamemaster.content.steps.songpanel.video.description")}<br />
                            {t("instruction.gamemaster.content.steps.songpanel.video.note")}</li>
                            <li><b>{t("instruction.gamemaster.content.steps.songpanel.data.name")}</b>{t("instruction.gamemaster.content.steps.songpanel.data.description")}</li>
                            <li><b><FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} /></b>{t("instruction.gamemaster.content.steps.songpanel.play.description")}</li>
                            <li><b><FontAwesomeIcon icon={faBan} /> <FontAwesomeIcon icon={faRotateLeft} /></b>{t("instruction.gamemaster.content.steps.songpanel.enable.description")}</li>
                        </ul>
                    </li>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.reset.name")}</b>{t("instruction.gamemaster.content.steps.reset.description")}</li>
                    <li style={{ paddingLeft: "1rem" }}><b>{t("instruction.gamemaster.content.steps.gamewindow.name")}</b>{t("instruction.gamemaster.content.steps.gamewindow.description")}</li>
                </ol>

            </div>
        },
        {
            title: "Game Client",
            content: <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center", // Align items vertically center
                    justifyContent: "center", // Align content horizontally center
                    paddingBottom: "1rem"
                }}
            >
                <img
                    src={gameImage}
                    alt="masterPanel image"
                    style={{
                        width: "90%",
                        height: "auto",
                    }}
                />
                <b>{t("instruction.client.title")}</b>
                {t("instruction.client.content.1")}<br />
                {t("instruction.client.content.2")}

            </div>
        },
    ];

    return (
        <div className="instructionContainer">
            <div className="instructionTitle">
                <div className="instructionLogoContainer">
                    <img src={gameLogo} className="instructionLogo" alt="logo" />
                </div>
                <div className="instructionDescription">
                    <h2>{t("mainmenu.title")}</h2>
                    <h4>{t("instruction.title")}</h4>
                </div>
            </div>
            <div className="instructionTable">
                <table>
                    {/* <thead>
                        <tr>
                            <th style={{width: "20%"}}>Company</th>
                            <th >Contact</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index.toString()}>
                                <td style={{ width: "15%" }}>{(index + 1).toString()}. {record.title}</td>
                                <td style={{ width: "85%" }}>{record.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Instruction;
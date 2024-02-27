import { useTranslation } from "react-i18next";
import { gameConfigurationImage, gameImage, gameLogo, loginImage, masterPanelImage } from "../../assets/common";
import Footer from "../../components/footer/footer";
import './instruction.scss';
import { faBan, faMinus, faPause, faPlay, faPlus, faRotateLeft, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Instruction() {
    const [t] = useTranslation();

    const data: { title: string, content: JSX.Element }[] = [
        {
            title: "Introduction",
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
                    <b>Name that tune is a game based on a populat TV show. <br />
                        The participants compete againt each other by guessing the title of a song as fast as possible.</b>
                    <div>
                        Requirements:
                        <ul>
                            <li>Spotify account</li>
                            <li>1 game master</li>
                            <li>2 - &#8734; players</li>
                        </ul>
                    </div>
                </div>
            </div>
        },
        {
            title: "Login",
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
                    <b>use this button to login to your Spotify account.</b>
                </div>
        },
        {
            title: "Game Configuration",
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

                    <b>Game configuration allows you to configure your game by selecting playlists and editing song properties.</b>

                    <div style={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <b>Song Properties:</b>
                        <ol>
                            <li style={{ paddingLeft: "1rem" }}><b>Clue</b> - defines what clue will be presented to players.</li>
                            <li style={{ paddingLeft: "1rem" }}><b>Points</b> - point value of selected song <b>(default 100 points)</b>. <br />
                                (Note: When song is playing the value increases by 10 every 1 second <b>(max 400 points)</b>).</li>
                            <li style={{ paddingLeft: "1rem" }}><b>Youtube</b> - add youtube link to song. Allows to display the video in game client. <br />Created with the idea of playing Just Dance videos but will play anything.</li>
                        </ol>


                        <ul style={{ display: "flex", gap: "1rem" }}>
                            <li>
                                <b>Load game from playlist:</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>Search playlists and select the one you want to play.</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>(OPTIONAL)</b> Add clues, points and youtube links to songs. <br />
                                        (Note: If clue is not defined song author name will be use as one.) </li>
                                    <li style={{ paddingLeft: "1rem" }}>Press start game button.</li>
                                </ol>
                            </li>
                            <li>
                                <b>Load game from file:</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>Click settings button to open settings modal.</li>
                                    <li style={{ paddingLeft: "1rem" }}>Click upload button to upload a previous game configuration from file.</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>(OPTIONAL)</b> Edit clues, points and youtube links to songs. <br />
                                        (Note: If clue is not defined song author name will be use as one.) </li>
                                    <li style={{ paddingLeft: "1rem" }}>Press start game button.</li>
                                </ol>
                            </li>
                        </ul>
                        <ul style={{ alignSelf: "start" }}>
                            <li>
                                <b>Save game to file</b>
                                <ol>
                                    <li style={{ paddingLeft: "1rem" }}>Search playlists and select the one you want to play.</li>
                                    <li style={{ paddingLeft: "1rem" }}><b>(OPTIONAL)</b> Add clues, points and youtube links to songs. <br />
                                        (Note: If clue is not defined song author name will be use as one.) </li>
                                    <li style={{ paddingLeft: "1rem" }}>Click settings button to open settings modal.</li>
                                    <li style={{ paddingLeft: "1rem" }}>Click download button to download current game configuration file.</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>

        },
        {
            title: "Game Master",
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
                <b>Master panel is a cockpit for game master to lead the game.</b>

                <ol style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <li style={{ paddingLeft: "1rem" }}><b>Previous Set, Next Set</b> - buttons to change the array of currently displayed songs <br />
                        (Note: Songs from playlist are divided into sets of 5 songs).</li>
                    <li style={{ paddingLeft: "1rem" }}><b>Points</b> - displays current point pool.</li>
                    <li style={{ paddingLeft: "1rem" }}><b>Team panel:</b>
                        <ul>
                            <li><b>Team name</b> - name of the team, click to change.</li>
                            <li><b>Team points</b> - team points, click to add the current point pool to the team.</li>
                            <li><b><FontAwesomeIcon icon={faMinus} /> <FontAwesomeIcon icon={faPlus} /></b> - change team points in increment of 10.</li>
                        </ul>
                    </li>
                    <li style={{ paddingLeft: "1rem" }}><b>Songs panel:</b>
                        <ul>
                            <li><b><FontAwesomeIcon icon={faVideo} /> <FontAwesomeIcon icon={faVideoSlash} /></b> - open/close youtube video in game window. <br />
                                (Note: Disabled if no Youtube link was provided).</li>
                            <li><b>Song data</b> - Data about the song.</li>
                            <li><b><FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} /></b> - play/pause the Song.</li>
                            <li><b><FontAwesomeIcon icon={faBan} /> <FontAwesomeIcon icon={faRotateLeft} /></b> - enable/disable the song (for example if no team guessed the song name).</li>
                        </ul>
                    </li>
                    <li style={{ paddingLeft: "1rem" }}><b>Reset points</b> - reset points for all teams.</li>
                    <li style={{ paddingLeft: "1rem" }}><b>Open new game window</b> - <b>IMPORTANT</b> open game client for game participants.</li>
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
                <b>Game client for participants.</b>
                Main game window for alle the players in teams to look at. Reflects data set in Game Configuration and Game Master. <br />
                Shows youtube video for a song when the proper button is clicked in the Master Panel.

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
                    <h4>Setup instruction</h4>
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
                                <td style={{ width: "20%" }}>{(index + 1).toString()}. {record.title}</td>
                                <td style={{ width: "80%" }}>{record.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Instruction;
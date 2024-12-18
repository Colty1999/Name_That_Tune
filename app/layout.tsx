import { Metadata } from "next"
import "../src/index.scss";
import "../src/assets/_consts.scss";
import "../src/components/errorModal/errorModal.scss";
import "../src/components/footer/footer.scss";
import "../src/components/header/header.scss";
import "../src/components/loader/loader.scss";
import "../src/components/player/player.scss";
import "../src/components/spotifyLogin/spotifyLogin.scss";
import "../src/views/gameconfiguration/gameConfiguration.scss";
import "../src/views/gameconfiguration/components/configurationModal/configurationModal.scss";
import "../src/views/gameconfiguration/components/playlistSearchResult/playlistSearchResult.scss";
import "../src/views/gameconfiguration/components/trackResult/trackResult.scss";
import "../src/views/insctruction/instruction.scss";
import "../src/views/mainmenu/mainMenu.scss";
import "../src/views/spotifygame/spotifyGame.scss";
import "../src/views/spotifygame/components/youtubeModal/youtubeModal.scss";
import "../src/views/spotifygamemaster/spotifyGameMaster.scss";

export const metadata: Metadata = {
    title: 'Name That Tune',
    description: 'Name That Tune is a game where you have to guess the song name from the lyrics',
    icons: {
      icon: "/gameLogo.png",
    },
  }

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }
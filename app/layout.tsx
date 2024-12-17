import { Metadata } from "next"
import "../src/index.scss";
import "../src/assets/_consts.scss";
import "../src/components/errorModal/errorModal.scss";
import "../src/components/footer/footer.scss";
import "../src/components/header/header.scss";
import "../src/components/loader/loader.scss";
import "../src/components/player/player.scss";
import "../src/components/spotifyLogin/spotifyLogin.scss";
import "../src/pages/gameconfiguration/gameConfiguration.scss";
import "../src/pages/gameconfiguration/components/configurationModal/configurationModal.scss";
import "../src/pages/gameconfiguration/components/playlistSearchResult/playlistSearchResult.scss";
import "../src/pages/gameconfiguration/components/trackResult/trackResult.scss";
import "../src/pages/insctruction/instruction.scss";
import "../src/pages/mainmenu/mainMenu.scss";
import "../src/pages/spotifygame/spotifyGame.scss";
import "../src/pages/spotifygame/components/youtubeModal/youtubeModal.scss";
import "../src/pages/spotifygamemaster/spotifyGameMaster.scss";

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
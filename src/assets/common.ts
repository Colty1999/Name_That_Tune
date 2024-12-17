import gameLogoLoader from "../../public/gameLogo.png";
import googleLogoLoader from "../../public/googleLogo.png";
import loginImageLoader from "../../public/instruction/login.png";
import gameConfigurationImageLoader from "../../public/instruction/gameConfiguration.png";
import gameConfigurationModalImageLoader from "../../public/instruction/gameConfigurationModal.png";
import masterPanelImageLoader from "../../public/instruction/masterPanel.png";
import gameImageLoader from "../../public/instruction/game.png";
import gameModalImageLoader from "../../public/instruction/gameModal.png";

export const gameLogo = (gameLogoLoader as unknown as {src: string}).src;
export const googleLogo = (googleLogoLoader as unknown as {src: string}).src;
export const loginImage = (loginImageLoader as unknown as {src: string}).src;
export const gameConfigurationImage = (gameConfigurationImageLoader as unknown as {src: string}).src;
export const gameConfigurationModalImage = (gameConfigurationModalImageLoader as unknown as {src: string}).src;
export const masterPanelImage = (masterPanelImageLoader as unknown as {src: string}).src;
export const gameImage = (gameImageLoader as unknown as {src: string}).src;
export const gameModalImage = (gameModalImageLoader as unknown as {src: string}).src;


export interface Song {
  id: number;
  songName: string;
  songPath: string;
  clue?: string;
  points: number;
  songAudio?: HTMLAudioElement;
  played?: boolean;
}

export interface Track {
  track: {
    id: string;
    uri: string;
    album: {
      images: {
        height: number;
        width: number;
        url: string;
      }[];
    };
    artists: {
      name: string;
    }[];
    name: string;
  };
  points: number;
  clue?: string;
  played?: boolean;
  youtubeLink?: string;
  youtubePlay?: boolean;
  showName?: boolean;
}

export interface StateType {
  readonly store: string | null;
  readonly setStorageState: (newValue: string) => void;
}

export const frontend = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const cookieOptions = {
  sameSite: "lax",
  // secure: true,
  path: "/",
} as const;

export const gameLogo = "./gameLogo.png";
export const googleLogo = "./googleLogo.png";

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
}

export interface StateType {
  readonly store: string | null;
  readonly setStorageState: (newValue: string) => void;
}

export const backend = import.meta.env.VITE_BACKEND_URL;
export const frontend = import.meta.env.VITE_FRONTEND_URL;

export const cookieOptions = {
  sameSite: "lax",
  // secure: true,
  path: "/",
} as const;

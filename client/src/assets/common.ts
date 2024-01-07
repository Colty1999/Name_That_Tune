export const gameLogo = "gameLogo.png";
export const googleLogo = "googleLogo.png";

export interface Song {
  id: number;
  songName: string;
  songPath: string;
  clue?: string;
  points: number;
  songAudio?: HTMLAudioElement;
  played?: boolean;
}

export interface StateType {
  readonly store: string | null;
  readonly setStorageState: (newValue: string) => void;
}


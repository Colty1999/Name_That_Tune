export const gameLogo = "gameLogo.png";

export interface Song {
  id: number;
  songName: string;
  songPath: string;
  clue: string;
  points: number;
  songAudio?: HTMLAudioElement;
  played?: boolean;
}

export interface StateType {
  readonly store: string | null;
  readonly setStorageState: (newValue: string) => void;
}

export const songList: Song[] = [
  {
    id: 1,
    songName: "Song 1ioasdhfguoaofgu",
    songPath: "audio/pokemon.mp3",
    points: 100,
    clue: "apple",
  },
  {
    id: 2,
    songName: "Song 2",
    songPath: "audio/pokemon.mp3",
    points: 100,
    clue: "banana",
  },
  {
    id: 3,
    songName: "Song 3",
    songPath: "audio/pokemon.mp3",
    points: 100,
    clue: "chocolate",
  },
  {
    id: 4,
    songName: "Song 4",
    songPath: "audio/pokemon.mp3",
    points: 100,
    clue: "dragon",
  },
  {
    id: 5,
    songName: "Song 5",
    songPath: "audio/pokemon.mp3",
    points: 200,
    clue: "elephant",
  },
];

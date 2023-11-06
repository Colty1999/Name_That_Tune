export const gameLogo = "gameLogo.png";

export interface Song {
    id: number;
    songName: string;
    songPath: string;
    clue: string;
    songAudio?: HTMLAudioElement;
  }
  
  export const songs: Song[] = [
    {
      id: 1,
      songName: "Song 1",
      songPath: "audio/pokemon.mp3",
      clue: "apple",
    },
    {
      id: 2,
      songName: "Song 2",
      songPath: "audio/pokemon.mp3",
      clue: "banana",
    },
    {
      id: 3,
      songName: "Song 3",
      songPath: "audio/pokemon.mp3",
      clue: "chocolate",
    },
    {
      id: 4,
      songName: "Song 4",
      songPath: "audio/pokemon.mp3",
      clue: "dragon",
    },
    {
      id: 5,
      songName: "Song 5",
      songPath: "audio/pokemon.mp3",
      clue: "elephant",
    }
  ];
  
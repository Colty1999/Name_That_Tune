export interface Song {
  id: number;
  songName: string;
  songPath: string;
  clue: string;
}

const gameSongs: Song[] = [
  {
    id: 1,
    songName: "Song 1",
    songPath: "/audio/song1.mp3",
    clue: "apple",
  },
  {
    id: 2,
    songName: "Song 2",
    songPath: "/audio/song2.mp3",
    clue: "banana",
  },
  {
    id: 3,
    songName: "Song 3",
    songPath: "/audio/song3.mp3",
    clue: "chocolate",
  },
  {
    id: 4,
    songName: "Song 4",
    songPath: "/audio/song4.mp3",
    clue: "dragon",
  },
  {
    id: 5,
    songName: "Song 5",
    songPath: "/audio/song5.mp3",
    clue: "elephant",
  }
];

export default gameSongs;

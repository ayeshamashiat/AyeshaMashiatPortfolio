/** Generated crossword: every run of letters in the grid is a clued entry (checked by script). */
export interface CrosswordEntry {
  n: number;
  dir: "A" | "D";
  row: number;
  col: number;
  answer: string;
  clue: string;
}

export const CROSSWORD = {
  rows: 12,
  cols: 13,
  // "#" is a black square.
  grid: ["##########D##", "H#GIT#C###O##", "A###O#ASYNC##", "STACK#C###K#B", "H###E#H###E#U", "#BOUNCER##RAG", "#A###H#E#####", "#B#DHAKA##L##", "#U#E###C##IUT", "###V#PYTHON##", "##########U##", "##########X##"],
  entries: [
  {
    "n": 3,
    "dir": "A",
    "row": 1,
    "col": 2,
    "answer": "GIT",
    "clue": "Version control, and what `commit` and `push` belong to"
  },
  {
    "n": 6,
    "dir": "A",
    "row": 2,
    "col": 6,
    "answer": "ASYNC",
    "clue": "Keyword before `await`'s function"
  },
  {
    "n": 7,
    "dir": "A",
    "row": 3,
    "col": 0,
    "answer": "STACK",
    "clue": "Last in, first out"
  },
  {
    "n": 9,
    "dir": "A",
    "row": 5,
    "col": 1,
    "answer": "BOUNCER",
    "clue": "Doorman for AI agents, and the name of Ayesha's security project"
  },
  {
    "n": 12,
    "dir": "A",
    "row": 5,
    "col": 10,
    "answer": "RAG",
    "clue": "Retrieval-augmented generation, for short"
  },
  {
    "n": 13,
    "dir": "A",
    "row": 7,
    "col": 3,
    "answer": "DHAKA",
    "clue": "Home city, capital of Bangladesh"
  },
  {
    "n": 15,
    "dir": "A",
    "row": 8,
    "col": 10,
    "answer": "IUT",
    "clue": "Her university, by its initials"
  },
  {
    "n": 16,
    "dir": "A",
    "row": 9,
    "col": 5,
    "answer": "PYTHON",
    "clue": "Language behind most of her backends"
  },
  {
    "n": 1,
    "dir": "D",
    "row": 0,
    "col": 10,
    "answer": "DOCKER",
    "clue": "Packs an app and its dependencies into a container"
  },
  {
    "n": 2,
    "dir": "D",
    "row": 1,
    "col": 0,
    "answer": "HASH",
    "clue": "One-way function that turns input into a fixed-size digest"
  },
  {
    "n": 4,
    "dir": "D",
    "row": 1,
    "col": 4,
    "answer": "TOKEN",
    "clue": "Unit of text an LLM reads, or a login credential"
  },
  {
    "n": 5,
    "dir": "D",
    "row": 1,
    "col": 6,
    "answer": "CACHE",
    "clue": "Fast storage for data you'll want again soon"
  },
  {
    "n": 8,
    "dir": "D",
    "row": 3,
    "col": 12,
    "answer": "BUG",
    "clue": "What a debugger hunts"
  },
  {
    "n": 9,
    "dir": "D",
    "row": 5,
    "col": 1,
    "answer": "BABU",
    "clue": "Touch Grass, ___"
  },
  {
    "n": 10,
    "dir": "D",
    "row": 5,
    "col": 5,
    "answer": "CHA",
    "clue": "Bangla for tea"
  },
  {
    "n": 11,
    "dir": "D",
    "row": 5,
    "col": 7,
    "answer": "REACT",
    "clue": "JavaScript UI library with hooks"
  },
  {
    "n": 13,
    "dir": "D",
    "row": 7,
    "col": 3,
    "answer": "DEV",
    "clue": "Where she publishes her technical writing"
  },
  {
    "n": 14,
    "dir": "D",
    "row": 7,
    "col": 10,
    "answer": "LINUX",
    "clue": "Open-source kernel with a penguin mascot"
  }
] as CrosswordEntry[],
};

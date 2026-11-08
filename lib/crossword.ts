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
  rows: 10,
  cols: 11,
  // "#" is a black square.
  grid: ["########L##", "##F#R###O##", "DHAKA###R#I", "E#S#G##BABU", "V#T####O##T", "##A##C#U###", "##PYTHON###", "##I##A#C###", "#######E###", "######GRASS"],
  entries: [
  {
    "n": 4,
    "dir": "A",
    "row": 2,
    "col": 0,
    "answer": "DHAKA",
    "clue": "Home city, capital of Bangladesh"
  },
  {
    "n": 6,
    "dir": "A",
    "row": 3,
    "col": 7,
    "answer": "BABU",
    "clue": "Touch Grass, ___"
  },
  {
    "n": 8,
    "dir": "A",
    "row": 6,
    "col": 2,
    "answer": "PYTHON",
    "clue": "Language behind most of her backends"
  },
  {
    "n": 9,
    "dir": "A",
    "row": 9,
    "col": 6,
    "answer": "GRASS",
    "clue": "What Babu orders you to touch"
  },
  {
    "n": 1,
    "dir": "D",
    "row": 0,
    "col": 8,
    "answer": "LORA",
    "clue": "Fine-tuning trick used to teach a 4B model to roast"
  },
  {
    "n": 2,
    "dir": "D",
    "row": 1,
    "col": 2,
    "answer": "FASTAPI",
    "clue": "Python framework she builds her REST APIs with"
  },
  {
    "n": 3,
    "dir": "D",
    "row": 1,
    "col": 4,
    "answer": "RAG",
    "clue": "Retrieval-augmented generation, for short"
  },
  {
    "n": 4,
    "dir": "D",
    "row": 2,
    "col": 0,
    "answer": "DEV",
    "clue": "Where she publishes her technical writing"
  },
  {
    "n": 5,
    "dir": "D",
    "row": 2,
    "col": 10,
    "answer": "IUT",
    "clue": "Her university, by its initials"
  },
  {
    "n": 6,
    "dir": "D",
    "row": 3,
    "col": 7,
    "answer": "BOUNCER",
    "clue": "Doorman for AI agents, and the name of Ayesha's security project"
  },
  {
    "n": 7,
    "dir": "D",
    "row": 5,
    "col": 5,
    "answer": "CHA",
    "clue": "Bangla for tea"
  }
] as CrosswordEntry[],
};

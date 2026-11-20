import type { SubjectText } from "../types";

export const TOURNAMENTS: SubjectText = {
  passage: {
    id: "i-tournaments",
    title: "How Many Matches Does a Tournament Need?",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "Sports tournaments are organised in two basic formats. In a **round robin** (league), every team plays every other team once. Each of the $n$ teams plays $n - 1$ matches; since every match involves two teams, the number of matches is:",
      },
      { k: "formula", tex: "M_{\\text{league}} = \\frac{n \\cdot (n-1)}{2}", label: "(1)" },
      {
        k: "p",
        text: "If every pair plays twice (home and away), this number doubles.",
      },
      {
        k: "p",
        text: "In a **knockout** tournament, the loser of each match is eliminated. Because every match eliminates exactly one team and all teams except the winner must be eliminated, a knockout tournament always needs:",
      },
      { k: "formula", tex: "M_{\\text{knockout}} = n - 1", label: "(2)" },
      {
        k: "p",
        text: "If $n$ is a power of 2, the number of teams halves in each round, so there are $\\log_2 n$ rounds ($2^k = n$ gives $k$ rounds). Many championships combine both formats: teams first play round robins in small groups, and the best teams of each group then enter a knockout stage.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many matches does a round robin with 6 teams need?",
      options: ["6", "12", "15", "30"],
      answer: 2,
      explanation: "Formula (1): $\\frac{6 \\cdot 5}{2} = 15$. 30 counts every match twice.",
    },
    {
      difficulty: "low",
      stem: "How many matches does each team play in a round robin with 6 teams?",
      options: ["3", "5", "6", "15"],
      answer: 1,
      explanation: "Each team plays all others once: $6 - 1 = 5$ matches.",
    },
    {
      difficulty: "low",
      stem: "How many matches does a knockout tournament with 16 teams need?",
      options: ["8", "15", "16", "32"],
      answer: 1,
      explanation: "Formula (2): $16 - 1 = 15$ (8 + 4 + 2 + 1).",
    },
    {
      difficulty: "medium",
      stem: "How many rounds does a knockout tournament with 16 teams have?",
      options: ["4", "8", "15", "16"],
      answer: 0,
      explanation: "$2^4 = 16$, so 4 rounds: 16 → 8 → 4 → 2 → 1.",
    },
    {
      difficulty: "medium",
      stem: "In a league of 10 teams, every pair plays twice (home and away). How many matches are played in a season?",
      options: ["45", "90", "100", "180"],
      answer: 1,
      explanation: "Once: $\\frac{10 \\cdot 9}{2} = 45$; twice: 90.",
    },
    {
      difficulty: "medium",
      stem: "A knockout tournament has 20 teams; some teams get a free pass (bye) in the first round. How many matches are needed in total?",
      options: ["10", "16", "19", "20"],
      answer: 2,
      explanation: "Formula (2) holds for any number of teams: each match eliminates one team, and 19 must be eliminated.",
    },
    {
      difficulty: "high",
      stem: "A championship has 32 teams in 8 groups of 4. Each group plays a round robin; the top 2 of each group enter a knockout stage. How many matches are played in total?",
      options: ["48", "55", "63", "496"],
      answer: 2,
      explanation: "Groups: $8 \\cdot \\frac{4 \\cdot 3}{2} = 48$. Knockout with 16 teams: 15. Total: 63. A single round robin of 32 teams would need 496 matches.",
    },
    {
      difficulty: "high",
      stem: "A round robin needs exactly 28 matches. How many teams take part?",
      options: ["7", "8", "14", "28"],
      answer: 1,
      explanation: "$\\frac{n(n-1)}{2} = 28$ gives $n(n-1) = 56 = 8 \\cdot 7$, so $n = 8$.",
    },
  ],
};

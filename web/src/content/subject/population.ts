import type { SubjectText } from "./types";

export const POPULATION: SubjectText = {
  passage: {
    id: "population",
    title: "Population Growth",
    field: "Biology",
    blocks: [
      {
        k: "p",
        text: "When microorganisms such as bacteria or yeast have plenty of food and space, each cell divides after a fixed time. The population then doubles in equal time steps; this is called **exponential growth**. With a starting population $N_0$ and a doubling time $T_d$, the population after time $t$ is:",
      },
      { k: "formula", tex: "N(t) = N_0 \\cdot 2^{\\,t / T_d}", label: "(1)" },
      {
        k: "p",
        text: "Exponential growth cannot go on forever. Food runs out and waste products accumulate, so growth slows down. The largest population an environment can support in the long run is called its **carrying capacity** $K$. The **logistic model** describes this: the increase of the population per unit of time is",
      },
      { k: "formula", tex: "\\frac{\\Delta N}{\\Delta t} = r \\cdot N \\cdot \\left(1 - \\frac{N}{K}\\right)", label: "(2)" },
      {
        k: "p",
        text: "where $r$ is the growth rate. While $N$ is small compared with $K$, the bracket is close to 1 and growth is almost exponential. As $N$ approaches $K$, the bracket approaches 0 and growth stops. The absolute increase is largest when the population is at half the carrying capacity, $N = K/2$.",
      },
      {
        k: "table",
        caption: "Table 1. Yeast cells in a culture flask (thousand cells per mL), counted every two hours.",
        head: ["Time (h)", "0", "2", "4", "6", "8", "10", "12", "14", "16"],
        rows: [["Cells", "10", "20", "40", "78", "140", "210", "255", "280", "292"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A bacterial culture starts with 100 cells and has a doubling time of 20 minutes. How many cells are there after one hour, if growth is exponential?",
      options: ["300", "600", "800", "1,600"],
      answer: 2,
      explanation: "One hour is three doubling times: 100 → 200 → 400 → 800. With formula (1): $100 \\cdot 2^{60/20} = 100 \\cdot 2^3 = 800$.",
    },
    {
      difficulty: "low",
      stem: "During which period does the yeast culture in Table 1 grow approximately exponentially?",
      options: ["From 0 to 6 hours", "From 6 to 10 hours", "From 10 to 16 hours", "During the whole 16 hours"],
      answer: 0,
      explanation: "From 0 to 6 h the number roughly doubles every 2 hours (10, 20, 40, 78). Afterwards the increase becomes relatively smaller, so growth is no longer exponential.",
    },
    {
      difficulty: "medium",
      stem: "What is the best estimate of the carrying capacity $K$ of the flask, based on Table 1?",
      options: ["About 140 thousand cells/mL", "About 210 thousand cells/mL", "About 300 thousand cells/mL", "About 600 thousand cells/mL"],
      answer: 2,
      explanation: "The counts level off: 255 → 280 → 292, with ever smaller increases. They approach a value of roughly 300 thousand cells/mL.",
    },
    {
      difficulty: "medium",
      stem: "In which two-hour interval does the number of yeast cells increase the most?",
      options: ["4 to 6 hours", "6 to 8 hours", "8 to 10 hours", "10 to 12 hours"],
      answer: 2,
      explanation: "Increases: 4–6 h: 38, 6–8 h: 62, 8–10 h: 70, 10–12 h: 45. The largest is 8–10 h, around 150–210 thousand cells, close to $K/2 \\approx 150$, as the logistic model predicts.",
    },
    {
      difficulty: "medium",
      stem: "Using formula (2) with $r$ = 0.4 per hour and $K$ = 300, how fast does the population grow when $N$ = 150 (all in thousand cells/mL)?",
      options: ["15 thousand cells/mL per hour", "30 thousand cells/mL per hour", "60 thousand cells/mL per hour", "120 thousand cells/mL per hour"],
      answer: 1,
      explanation: "$0.4 \\cdot 150 \\cdot (1 - 150/300) = 0.4 \\cdot 150 \\cdot 0.5 = 30$ thousand cells/mL per hour.",
    },
    {
      difficulty: "high",
      stem: "According to the logistic model, what happens when the population has reached its carrying capacity ($N = K$)?",
      options: [
        "The population no longer increases.",
        "The population doubles in the next time step.",
        "The population grows at its highest speed.",
        "The population immediately dies out.",
      ],
      answer: 0,
      explanation: "For $N = K$ the bracket in (2) is $1 - 1 = 0$, so $\\Delta N / \\Delta t = 0$: the population stays constant.",
    },
    {
      difficulty: "high",
      stem: "A culture of 1,000 cells grows exponentially with a doubling time of 3 hours. After how many hours does it first exceed 30,000 cells?",
      options: ["9 hours", "12 hours", "15 hours", "90 hours"],
      answer: 2,
      explanation: "Every 3 h the number doubles: 2,000 (3 h), 4,000 (6 h), 8,000 (9 h), 16,000 (12 h), 32,000 (15 h). It first exceeds 30,000 after 15 hours.",
    },
  ],
};

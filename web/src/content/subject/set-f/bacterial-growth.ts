import type { SubjectText } from "../types";

export const BACTERIAL_GROWTH: SubjectText = {
  passage: {
    id: "f-bacterial-growth",
    title: "How Bacteria Multiply",
    field: "Microbiology",
    blocks: [
      {
        k: "p",
        text: "Bacteria multiply by dividing in two. The time a population needs to double is the **generation time** $g$. As long as nutrients are plentiful, the number of cells grows exponentially:",
      },
      { k: "formula", tex: "N(t) = N_0 \\cdot 2^{\\,t / g}", label: "(1)" },
      {
        k: "p",
        text: "When bacteria are placed in a new environment, the number of cells usually goes through four phases:",
      },
      {
        k: "list",
        items: [
          "**Lag phase:** the cells adapt to the new conditions and hardly divide.",
          "**Exponential phase:** the cells divide at a constant generation time, as in formula (1).",
          "**Stationary phase:** nutrients run short and waste products build up; as many cells divide as die, so the number stays constant.",
          "**Death phase:** more cells die than are formed.",
        ],
      },
      {
        k: "p",
        text: "The generation time depends strongly on the temperature. This is why food is kept in the refrigerator: cooling does not kill bacteria, but it slows their growth very much. In the questions, assume that the bacteria are in the exponential phase unless a lag phase is mentioned.",
      },
      {
        k: "table",
        caption: "Table 1. Generation time of a food bacterium at different temperatures.",
        head: ["Temperature", "Generation time"],
        rows: [
          ["37 °C (body temperature)", "20 min"],
          ["20 °C (room temperature)", "60 min"],
          ["5 °C (refrigerator)", "10 h"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many bacteria develop from a single cell in 2 hours at 37 °C?",
      options: ["6", "12", "64", "120"],
      answer: 2,
      explanation: "2 h $= 120$ min $= 6$ generations of 20 min: $2^6 = 64$.",
    },
    {
      difficulty: "low",
      stem: "In which phase does the number of living cells stay constant?",
      options: ["Lag phase", "Exponential phase", "Stationary phase", "Death phase"],
      answer: 2,
      explanation: "In the stationary phase, as many cells divide as die. In the lag phase the cells hardly divide, but they are adapting, not balanced by dying.",
    },
    {
      difficulty: "medium",
      stem: "A sandwich contains 100 bacteria and is left at room temperature for 5 hours. How many bacteria are there afterwards?",
      options: ["500", "1,000", "3,200", "10,000"],
      answer: 2,
      explanation: "At 20 °C: 5 generations in 5 h. $100 \\cdot 2^5 = 3{,}200$.",
    },
    {
      difficulty: "medium",
      stem: "Food with 1,000 bacteria is stored in the refrigerator for 20 hours. How many bacteria are there afterwards?",
      options: ["1,000", "2,000", "4,000", "about 1 million"],
      answer: 2,
      explanation: "At 5 °C, 20 h are 2 generations of 10 h: $1{,}000 \\cdot 2^2 = 4{,}000$. The bacteria survive the cold but grow slowly.",
    },
    {
      difficulty: "medium",
      stem: "A culture at 37 °C first goes through a lag phase of 1 hour without division. By what factor has it grown after 2 hours in total?",
      options: ["4", "8", "64", "512"],
      answer: 1,
      explanation: "Only the second hour counts: 60 min $= 3$ generations, $2^3 = 8$. Without the lag phase it would be $2^6 = 64$.",
    },
    {
      difficulty: "high",
      stem: "About how long does it take at 37 °C for 1,000 bacteria to become about one million?",
      options: ["about 20 min", "about 1 h", "about 3 h 20 min", "about 10 h"],
      answer: 2,
      explanation: "A factor of 1,000 is about $2^{10} = 1{,}024$, i.e. 10 generations: $10 \\cdot 20$ min $= 200$ min $= 3$ h 20 min.",
    },
    {
      difficulty: "high",
      stem: "Two equal samples are kept for 3 hours, one at 37 °C and one at 20 °C. How many times as many bacteria does the warm sample contain afterwards?",
      options: ["3 times", "8 times", "64 times", "504 times"],
      answer: 2,
      explanation: "37 °C: 9 generations, factor $2^9 = 512$. 20 °C: 3 generations, factor $2^3 = 8$. $512 / 8 = 64$.",
    },
  ],
};

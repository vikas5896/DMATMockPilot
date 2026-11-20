import type { SubjectText } from "../types";

export const HERD_IMMUNITY: SubjectText = {
  passage: {
    id: "i-herd-immunity",
    title: "Vaccination and Herd Immunity",
    field: "Epidemiology",
    blocks: [
      {
        k: "p",
        text: "How quickly an infectious disease spreads is described by the **basic reproduction number** $R_0$: the average number of people that one infected person infects in a population where nobody is immune. If some people are immune, only the susceptible ones can be infected, and the **effective reproduction number** is:",
      },
      { k: "formula", tex: "R = R_0 \\cdot s", label: "(1)" },
      {
        k: "p",
        text: "where $s$ is the share of the population that is still susceptible. An outbreak grows if $R > 1$ and dies out if $R < 1$. When enough people are immune, the disease cannot spread even among the unprotected: this is **herd immunity**. Setting $R = 1$ gives the minimum share of immune people, the **herd immunity threshold**:",
      },
      { k: "formula", tex: "H = 1 - \\frac{1}{R_0}", label: "(2)" },
      {
        k: "p",
        text: "Vaccines do not protect everybody they are given to. If a vaccine has an effectiveness $E$ (the share of vaccinated people who become immune), the share of the population that must be vaccinated is $V = H / E$.",
      },
      {
        k: "table",
        caption: "Table 1. Basic reproduction numbers of three diseases (example values).",
        head: ["Disease", "X", "Y", "Z"],
        rows: [["$R_0$", "2", "4", "15"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the herd immunity threshold for disease X?",
      options: ["2 %", "25 %", "50 %", "100 %"],
      answer: 2,
      explanation: "Formula (2): $1 - 1/2 = 0.5 = 50$ %.",
    },
    {
      difficulty: "low",
      stem: "In a population without immunity, how many people does one person with disease Y infect on average?",
      options: ["1", "2", "4", "16"],
      answer: 2,
      explanation: "This is the definition of $R_0$, which is 4 for disease Y.",
    },
    {
      difficulty: "medium",
      stem: "What is the herd immunity threshold for disease Y?",
      options: ["25 %", "50 %", "75 %", "80 %"],
      answer: 2,
      explanation: "$1 - 1/4 = 0.75 = 75$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the herd immunity threshold for disease Z?",
      options: ["about 85 %", "about 93 %", "about 97 %", "100 %"],
      answer: 1,
      explanation: "$1 - 1/15 \\approx 1 - 0.067 = 0.933$, about 93 %.",
    },
    {
      difficulty: "medium",
      stem: "60 % of a population are immune to disease Y. Can an outbreak still grow?",
      options: [
        "No, because more than half are immune.",
        "Yes, because R = 1.6 is greater than 1.",
        "No, because R = 0.4 is smaller than 1.",
        "Yes, because R = 2.4 is greater than 1.",
      ],
      answer: 1,
      explanation: "Susceptible: 40 %. Formula (1): $R = 4 \\cdot 0.4 = 1.6 > 1$. The 60 % are below the threshold of 75 %.",
    },
    {
      difficulty: "high",
      stem: "A vaccine against disease Y has an effectiveness of 90 %. What share of the population must be vaccinated to reach herd immunity?",
      options: ["67.5 %", "75 %", "about 83 %", "90 %"],
      answer: 2,
      explanation: "$V = H / E = 0.75 / 0.9 \\approx 0.83$, about 83 %. 67.5 % multiplies instead of dividing.",
    },
    {
      difficulty: "high",
      stem: "A vaccine against disease Z also has an effectiveness of 90 %. What follows?",
      options: [
        "Vaccinating about 84 % is enough.",
        "Vaccinating 93 % is enough.",
        "Even vaccinating everyone does not reach the threshold.",
        "Herd immunity is not possible for any disease with R₀ above 10.",
      ],
      answer: 2,
      explanation: "$V = 0.933 / 0.9 \\approx 1.04$: more than 100 % would be needed. With 90 % effectiveness, at most 90 % of the population can become immune, below the threshold of about 93 %.",
    },
  ],
};

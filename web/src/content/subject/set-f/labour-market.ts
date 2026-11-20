import type { SubjectText } from "../types";

export const LABOUR_MARKET: SubjectText = {
  passage: {
    id: "f-labour-market",
    title: "Measuring Unemployment",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "Labour market statistics divide the **working-age population** (here: people aged 15–64) into three groups:",
      },
      {
        k: "list",
        items: [
          "**Employed:** people who did paid work in the reference week, including part-time work.",
          "**Unemployed:** people without work who are available and **actively looking** for a job.",
          "**Not in the labour force:** everyone else, e.g. full-time students, homemakers, early retirees, and people who would like a job but have given up looking (**discouraged workers**).",
        ],
      },
      {
        k: "p",
        text: "The employed and the unemployed together form the **labour force**. Three rates are commonly reported:",
      },
      {
        k: "list",
        items: [
          "**Unemployment rate** = unemployed / labour force",
          "**Participation rate** = labour force / working-age population",
          "**Employment rate** = employed / working-age population",
        ],
      },
      {
        k: "p",
        text: "Because the unemployment rate only counts people who are looking for work, it can fall even when nobody finds a job, for example when discouraged workers stop searching.",
      },
      {
        k: "table",
        caption: "Table 1. Working-age population of a region (in thousands).",
        head: ["Group", "Number (thousands)"],
        rows: [
          ["Employed", "6,300"],
          ["Unemployed", "700"],
          ["Not in the labour force", "3,000"],
          ["Working-age population", "10,000"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How large is the labour force of the region?",
      options: ["3,000 thousand", "6,300 thousand", "7,000 thousand", "10,000 thousand"],
      answer: 2,
      explanation: "Employed plus unemployed: $6{,}300 + 700 = 7{,}000$ thousand.",
    },
    {
      difficulty: "low",
      stem: "What is the unemployment rate?",
      options: ["7 %", "10 %", "about 11.1 %", "70 %"],
      answer: 1,
      explanation: "$700 / 7{,}000 = 10$ %. 7 % divides by the whole working-age population; 11.1 % divides by the employed only.",
    },
    {
      difficulty: "low",
      stem: "Which person counts as unemployed?",
      options: [
        "A full-time student who does not look for a job",
        "A person working 10 hours per week",
        "A person without work who is applying for jobs",
        "A person who wants a job but has stopped searching",
      ],
      answer: 2,
      explanation: "Unemployed means without work and actively looking. The student and the discouraged worker are not in the labour force; part-time workers are employed.",
    },
    {
      difficulty: "medium",
      stem: "What is the participation rate?",
      options: ["30 %", "63 %", "70 %", "90 %"],
      answer: 2,
      explanation: "$7{,}000 / 10{,}000 = 70$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the employment rate?",
      options: ["10 %", "63 %", "70 %", "90 %"],
      answer: 1,
      explanation: "$6{,}300 / 10{,}000 = 63$ %. 90 % is the share of the labour force that is employed.",
    },
    {
      difficulty: "medium",
      stem: "300 thousand students who were not in the labour force take part-time jobs. Everything else stays the same. What happens to the unemployment rate?",
      options: [
        "It stays exactly 10 %.",
        "It falls slightly, to about 9.6 %.",
        "It falls to 4 %.",
        "It rises, because the labour force grows.",
      ],
      answer: 1,
      explanation: "The labour force grows to 7,300 thousand, the unemployed stay at 700: $700 / 7{,}300 \\approx 9.6$ %.",
    },
    {
      difficulty: "high",
      stem: "200 thousand unemployed people give up looking for work and become discouraged workers. What is the new unemployment rate?",
      options: ["5 %", "about 7.1 %", "about 7.4 %", "10 %"],
      answer: 2,
      explanation: "Unemployed: 500; labour force: $7{,}000 - 200 = 6{,}800$. $500 / 6{,}800 \\approx 7.4$ %. The rate falls although nobody found a job. 7.1 % forgets that the labour force shrinks too.",
    },
    {
      difficulty: "high",
      stem: "With an unchanged labour force, how many unemployed people would have to find jobs to bring the unemployment rate down to 5 %?",
      options: ["35 thousand", "350 thousand", "700 thousand", "3,500 thousand"],
      answer: 1,
      explanation: "5 % of 7,000 thousand $= 350$ thousand may remain unemployed, so $700 - 350 = 350$ thousand must find jobs.",
    },
  ],
};

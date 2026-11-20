import type { SubjectText } from "../types";

export const DEPENDENCY_RATIO: SubjectText = {
  passage: {
    id: "e-dependency-ratio",
    title: "Age Structure and the Dependency Ratio",
    field: "Demography",
    blocks: [
      {
        k: "p",
        text: "The **age structure** of a population shows how many people belong to each age group. Demographers often use three broad groups: children (0–14 years), people of working age (15–64 years) and older people (65 years and over).",
      },
      {
        k: "p",
        text: "The **total dependency ratio** compares the people who are usually not working with those of working age. It is given per 100 people of working age:",
      },
      { k: "formula", tex: "\\text{DR} = \\frac{P_{0-14} + P_{65+}}{P_{15-64}} \\cdot 100", label: "(1)" },
      {
        k: "p",
        text: "The **old-age dependency ratio** counts only the older people: $\\text{OADR} = P_{65+} / P_{15-64} \\cdot 100$. It is closely watched because pensions are often paid from the contributions of people currently working. A country whose population has a particularly high share of working-age people can profit economically from this phase (the **demographic dividend**).",
      },
      {
        k: "table",
        caption: "Table 1. Population of two fictional countries by age group (millions).",
        head: ["Country", "0–14 years", "15–64 years", "65+ years", "Total"],
        rows: [
          ["P", "30", "60", "10", "100"],
          ["Q", "12", "50", "18", "80"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What share of country P's population are children (0–14 years)?",
      options: ["10 %", "30 %", "50 %", "60 %"],
      answer: 1,
      explanation: "30 million of 100 million people are children: $30 / 100 = 30$ %.",
    },
    {
      difficulty: "low",
      stem: "Which country has the older population, measured by the share of people aged 65 and over?",
      options: ["Country P", "Country Q", "Both have the same share.", "This cannot be determined."],
      answer: 1,
      explanation: "P: $10/100 = 10$ %. Q: $18/80 = 22.5$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the total dependency ratio of country P?",
      options: ["40", "50", "about 66.7", "150"],
      answer: 2,
      explanation: "Formula (1): $\\frac{30 + 10}{60} \\cdot 100 \\approx 66.7$ dependants per 100 people of working age. 40 is the number of dependants, not the ratio.",
    },
    {
      difficulty: "medium",
      stem: "What is the old-age dependency ratio of country Q?",
      options: ["18", "22.5", "36", "60"],
      answer: 2,
      explanation: "$18 / 50 \\cdot 100 = 36$. 22.5 is the share of older people in the total population.",
    },
    {
      difficulty: "medium",
      stem: "In country Q, the number of people aged 65 and over rises by 5 million, while the other groups stay the same. What is the new old-age dependency ratio?",
      options: ["23", "41", "46", "50"],
      answer: 2,
      explanation: "$(18 + 5) / 50 \\cdot 100 = 46$.",
    },
    {
      difficulty: "high",
      stem: "Which statement is supported by Table 1?",
      options: [
        "Country Q has both the older population and the higher total dependency ratio.",
        "Country P has the higher total dependency ratio, although its population is younger.",
        "Both countries have the same total dependency ratio.",
        "Country P has the higher old-age dependency ratio.",
      ],
      answer: 1,
      explanation: "Total dependency ratio: P ≈ 66.7, Q $= (12 + 18)/50 \\cdot 100 = 60$. P has more dependants per worker because of its many children, although Q is older (OADR: P ≈ 16.7, Q = 36).",
    },
    {
      difficulty: "high",
      stem: "In country Q, about how many people of working age are there for each person aged 65 and over?",
      options: ["about 1.6", "about 2.8", "about 3.6", "about 6"],
      answer: 1,
      explanation: "$50 / 18 \\approx 2.8$. In country P, the value is $60/10 = 6$.",
    },
  ],
};

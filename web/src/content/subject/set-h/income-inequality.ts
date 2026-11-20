import type { SubjectText } from "../types";

export const INCOME_INEQUALITY: SubjectText = {
  passage: {
    id: "h-income-inequality",
    title: "Measuring Income Inequality",
    field: "Sociology",
    blocks: [
      {
        k: "p",
        text: "To describe how equally income is distributed, statisticians sort all households of a country by income and divide them into five groups of equal size, the **quintiles**. The first quintile contains the poorest 20 % of households, the fifth quintile the richest 20 %. For each quintile, they report its **share** of the total household income. If incomes were perfectly equal, every quintile would receive exactly 20 %.",
      },
      {
        k: "p",
        text: "A simple measure of inequality is the **S80/S20 ratio**: the income share of the richest quintile divided by that of the poorest quintile. It states how many times as much income the richest 20 % receive as the poorest 20 %. Adding the shares from the poorest quintile upwards gives the cumulative shares, which are used to draw the **Lorenz curve**.",
      },
      {
        k: "p",
        text: "Because all quintiles contain the same number of households, a quintile's average income per household equals the overall average multiplied by its share and divided by 20 %.",
      },
      {
        k: "table",
        caption: "Table 1. Income shares of the quintiles (%) in two countries.",
        head: ["Country", "1st (poorest)", "2nd", "3rd", "4th", "5th (richest)"],
        rows: [
          ["M", "8", "12", "17", "23", "40"],
          ["N", "4", "8", "13", "20", "55"],
        ],
      },
      {
        k: "p",
        text: "In country M, the average household income is **20,000 €** per year.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What share of total income do the richest 20 % of households in country N receive?",
      options: ["20 %", "40 %", "55 %", "80 %"],
      answer: 2,
      explanation: "Table 1: the fifth quintile in country N receives 55 %.",
    },
    {
      difficulty: "low",
      stem: "What is the S80/S20 ratio of country M?",
      options: ["0.2", "2", "5", "32"],
      answer: 2,
      explanation: "$40 / 8 = 5$: the richest 20 % receive five times as much as the poorest 20 %.",
    },
    {
      difficulty: "low",
      stem: "With perfectly equal incomes, what share would each quintile receive?",
      options: ["5 %", "10 %", "20 %", "100 %"],
      answer: 2,
      explanation: "Five equal groups with equal incomes: $100 / 5 = 20$ % each.",
    },
    {
      difficulty: "medium",
      stem: "What share of total income do the poorest 40 % of households in country M receive together?",
      options: ["8 %", "12 %", "20 %", "40 %"],
      answer: 2,
      explanation: "Cumulative share: $8 + 12 = 20$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the S80/S20 ratio of country N?",
      options: ["5", "about 6.9", "13.75", "51"],
      answer: 2,
      explanation: "$55 / 4 = 13.75$, almost three times the value of country M.",
    },
    {
      difficulty: "high",
      stem: "What is the average household income in the poorest quintile of country M?",
      options: ["1,600 €", "4,000 €", "8,000 €", "16,000 €"],
      answer: 2,
      explanation: "Share 8 %, i.e. $8/20 = 0.4$ times the average: $0.4 \\cdot 20{,}000 = 8{,}000$ €. The richest quintile averages $2 \\cdot 20{,}000 = 40{,}000$ €.",
    },
    {
      difficulty: "high",
      stem: "In country N, how many times as much income do the richest 20 % receive as the poorest 60 % together?",
      options: ["about 1.4 times", "about 2.2 times", "about 4.2 times", "13.75 times"],
      answer: 1,
      explanation: "Poorest 60 %: $4 + 8 + 13 = 25$ %. $55 / 25 = 2.2$.",
    },
  ],
};

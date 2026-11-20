import type { SubjectText } from "../types";

export const LOGARITHMS: SubjectText = {
  passage: {
    id: "j-logarithms",
    title: "Logarithms and Doubling Times",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "The **logarithm** answers the question: to which power must a base be raised to obtain a given number?",
      },
      { k: "formula", tex: "\\log_b x = y \\quad\\Leftrightarrow\\quad b^y = x", label: "(1)" },
      {
        k: "p",
        text: "For example, $\\log_{10} 1{,}000 = 3$ because $10^3 = 1{,}000$. Logarithms turn multiplication into addition and powers into multiplication:",
      },
      { k: "formula", tex: "\\log(x \\cdot y) = \\log x + \\log y \\qquad \\log(x^k) = k \\cdot \\log x", label: "(2)" },
      {
        k: "p",
        text: "Useful values to remember: $\\log_{10} 2 \\approx 0.30$ and $\\log_{10} 3 \\approx 0.48$. The number of digits of a whole number $N$ is the integer part of $\\log_{10} N$ plus 1.",
      },
      {
        k: "p",
        text: "Logarithms also answer the question of how long exponential growth takes. A quantity growing by $p$ % per year doubles in approximately $70 / p$ years (**rule of 70**). After two doubling times it has grown 4-fold, after three 8-fold.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is $\\log_{10} 1$?",
      options: ["0", "1", "10", "It is not defined."],
      answer: 0,
      explanation: "$10^0 = 1$, so $\\log_{10} 1 = 0$.",
    },
    {
      difficulty: "low",
      stem: "What is $\\log_{10} 1{,}000$?",
      options: ["2", "3", "100", "1,000"],
      answer: 1,
      explanation: "By formula (1), we need the power of 10 that gives 1,000: $10^3 = 1{,}000$, so the answer is 3.",
    },
    {
      difficulty: "low",
      stem: "What is $\\log_2 32$?",
      options: ["4", "5", "6", "16"],
      answer: 1,
      explanation: "We need the power of 2 that gives 32: $2^5 = 32$, so the answer is 5.",
    },
    {
      difficulty: "medium",
      stem: "What is $\\log_{10} 20$, approximately?",
      options: ["0.6", "1.3", "2", "20"],
      answer: 1,
      explanation: "Formula (2): $\\log 20 = \\log 2 + \\log 10 \\approx 0.30 + 1 = 1.3$.",
    },
    {
      difficulty: "medium",
      stem: "What is $\\log_{10} 8$, approximately?",
      options: ["0.3", "0.6", "0.9", "2.4"],
      answer: 2,
      explanation: "$\\log(2^3) = 3 \\cdot \\log 2 \\approx 3 \\cdot 0.30 = 0.9$.",
    },
    {
      difficulty: "medium",
      stem: "An investment grows by 7 % per year. After about how many years has it doubled?",
      options: ["about 7 years", "about 10 years", "about 14 years", "about 49 years"],
      answer: 1,
      explanation: "Rule of 70: $70 / 7 = 10$ years.",
    },
    {
      difficulty: "high",
      stem: "A city's population grows by 7 % per year. After about how many years has it grown 8-fold?",
      options: ["about 10 years", "about 24 years", "about 30 years", "about 80 years"],
      answer: 2,
      explanation: "8-fold means three doublings ($2^3 = 8$): $3 \\cdot 10 = 30$ years.",
    },
    {
      difficulty: "high",
      stem: "How many digits does the number $2^{20}$ have?",
      options: ["6", "7", "20", "21"],
      answer: 1,
      explanation: "$\\log_{10} 2^{20} = 20 \\cdot 0.30 = 6.0$; integer part 6, plus 1: 7 digits. Indeed $2^{20} = 1{,}048{,}576$.",
    },
  ],
};

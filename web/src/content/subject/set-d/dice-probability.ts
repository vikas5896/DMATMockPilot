import type { SubjectText } from "../types";

export const DICE_PROBABILITY: SubjectText = {
  passage: {
    id: "d-dice-probability",
    title: "Probability and Expected Value with Dice",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "If all outcomes of a random experiment are equally likely, the probability of an event $A$ is the number of favourable outcomes divided by the number of possible outcomes (**Laplace probability**). When two fair dice are thrown, there are $6 \\cdot 6 = 36$ equally likely outcomes, because every result of the first die can be combined with every result of the second.",
      },
      {
        k: "p",
        text: "Two further rules are useful. The probability that an event does **not** occur is $P(\\bar{A}) = 1 - P(A)$ (**complement rule**); this is often the easiest way to calculate the probability of \"at least one\". For **independent** events, such as the results of separate throws, the probabilities are multiplied.",
      },
      {
        k: "p",
        text: "In games of chance, the **expected value** describes the average result per game in the long run. It is the sum of all possible values, each multiplied by its probability:",
      },
      { k: "formula", tex: "E = x_1 \\cdot P(x_1) + x_2 \\cdot P(x_2) + \\ldots + x_k \\cdot P(x_k)", label: "(1)" },
      {
        k: "p",
        text: "A game is called **fair** if the expected gain of a player (payout minus stake) is zero.",
      },
      {
        k: "table",
        caption: "Table 1. Number of outcomes (of 36) for each sum of two dice.",
        head: ["Sum", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        rows: [["Outcomes", "1", "2", "3", "4", "5", "6", "5", "4", "3", "2", "1"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the probability of throwing a sum of 7 with two dice?",
      options: ["1/12", "1/7", "1/6", "7/36"],
      answer: 2,
      explanation: "Table 1: 6 of 36 outcomes give 7: $6/36 = 1/6$.",
    },
    {
      difficulty: "low",
      stem: "What is the probability of throwing a sum of 2 or 12?",
      options: ["1/36", "1/18", "1/12", "1/6"],
      answer: 1,
      explanation: "One outcome each: $2/36 = 1/18$.",
    },
    {
      difficulty: "low",
      stem: "What is the expected value of the number shown by one fair die?",
      options: ["3", "3.5", "4", "6"],
      answer: 1,
      explanation: "Formula (1): $(1 + 2 + 3 + 4 + 5 + 6) \\cdot \\frac{1}{6} = \\frac{21}{6} = 3.5$. The expected value does not have to be a possible result.",
    },
    {
      difficulty: "medium",
      stem: "What is the probability that the sum of two dice is at least 10?",
      options: ["1/12", "1/6", "1/4", "1/3"],
      answer: 1,
      explanation: "Sums 10, 11, 12: $3 + 2 + 1 = 6$ outcomes: $6/36 = 1/6$.",
    },
    {
      difficulty: "medium",
      stem: "Two dice are thrown. What is the probability that at least one of them shows a six?",
      options: ["1/6", "11/36", "1/3", "25/36"],
      answer: 1,
      explanation: "Complement: no six at all has probability $\\frac{5}{6} \\cdot \\frac{5}{6} = \\frac{25}{36}$, so at least one six: $1 - \\frac{25}{36} = \\frac{11}{36}$. Simply adding $\\frac{1}{6} + \\frac{1}{6} = \\frac{1}{3}$ counts the double six twice.",
    },
    {
      difficulty: "medium",
      stem: "One die is thrown three times. About how likely is it that no six appears at all?",
      options: ["about 0.42", "0.50", "about 0.58", "about 0.83"],
      answer: 2,
      explanation: "Independent throws: $\\left(\\frac{5}{6}\\right)^3 = \\frac{125}{216} \\approx 0.58$.",
    },
    {
      difficulty: "high",
      stem: "A game costs 1 € per round. Two dice are thrown; if the sum is 7, the player receives 5 €, otherwise nothing. What is the player's expected gain per round?",
      options: ["about +0.17 €", "0 €", "about −0.17 €", "about −0.83 €"],
      answer: 2,
      explanation: "Expected payout: $5 \\cdot \\frac{1}{6} \\approx 0.83$ €. Expected gain: $0.83 - 1 \\approx -0.17$ € per round.",
    },
    {
      difficulty: "high",
      stem: "How much would the payout for a sum of 7 have to be so that the game in the previous question is fair?",
      options: ["5 €", "6 €", "7 €", "36 €"],
      answer: 1,
      explanation: "Fair means expected payout = stake: $x \\cdot \\frac{1}{6} = 1$ €, so $x = 6$ €.",
    },
  ],
};

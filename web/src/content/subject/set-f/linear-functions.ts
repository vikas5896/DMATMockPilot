import type { SubjectText } from "../types";

export const LINEAR_FUNCTIONS: SubjectText = {
  passage: {
    id: "f-linear-functions",
    title: "Linear Functions and Tariff Comparison",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "Many prices consist of a fixed amount plus an amount per unit. Such relationships are described by **linear functions**:",
      },
      { k: "formula", tex: "y = m \\cdot x + b", label: "(1)" },
      {
        k: "p",
        text: "The **slope** $m$ states by how much $y$ changes when $x$ increases by 1; the **intercept** $b$ is the value of $y$ at $x = 0$. The graph is a straight line. Through two points $(x_1, y_1)$ and $(x_2, y_2)$, the slope is:",
      },
      { k: "formula", tex: "m = \\frac{y_2 - y_1}{x_2 - x_1}", label: "(2)" },
      {
        k: "p",
        text: "Two lines with the same slope are **parallel**. To find where two lines meet, set their equations equal and solve for $x$.",
      },
      {
        k: "p",
        text: "**Example.** Two taxi companies in a city charge as follows, where $x$ is the distance in km and $y$ the price in ₹:",
      },
      {
        k: "table",
        caption: "Table 1. Taxi tariffs.",
        head: ["Company", "Basic fee", "Price per km", "Equation"],
        rows: [
          ["A", "50 ₹", "20 ₹", "$y = 20x + 50$"],
          ["B", "100 ₹", "15 ₹", "$y = 15x + 100$"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What does an 8 km trip with company A cost?",
      options: ["160 ₹", "210 ₹", "220 ₹", "450 ₹"],
      answer: 1,
      explanation: "$20 \\cdot 8 + 50 = 210$ ₹.",
    },
    {
      difficulty: "low",
      stem: "What is the slope of company B's tariff, and what does it mean?",
      options: [
        "100: the basic fee",
        "15: the price rises by 15 ₹ per km",
        "115: the price of the first kilometre",
        "15: the price of a trip of 0 km",
      ],
      answer: 1,
      explanation: "The slope is the factor of $x$: each additional km costs 15 ₹. 100 ₹ is the intercept (basic fee).",
    },
    {
      difficulty: "low",
      stem: "Which line is parallel to $y = 2x + 5$?",
      options: ["$y = 5x + 2$", "$y = -2x + 5$", "$y = 2x - 3$", "$y = 0.5x + 5$"],
      answer: 2,
      explanation: "Parallel lines have the same slope, here 2.",
    },
    {
      difficulty: "medium",
      stem: "For which distance do both companies charge the same price?",
      options: ["5 km", "10 km", "15 km", "20 km"],
      answer: 1,
      explanation: "$20x + 50 = 15x + 100$ gives $5x = 50$, so $x = 10$ km (both 250 ₹).",
    },
    {
      difficulty: "medium",
      stem: "A passenger travels 20 km. Which company is cheaper, and by how much?",
      options: ["A, by 50 ₹", "B, by 50 ₹", "B, by 100 ₹", "Both cost the same."],
      answer: 1,
      explanation: "A: $20 \\cdot 20 + 50 = 450$ ₹; B: $15 \\cdot 20 + 100 = 400$ ₹. For distances above 10 km, B is cheaper.",
    },
    {
      difficulty: "medium",
      stem: "What is the slope of the line through the points (2, 7) and (6, 19)?",
      options: ["2", "3", "4", "12"],
      answer: 1,
      explanation: "Formula (2): $\\frac{19 - 7}{6 - 2} = \\frac{12}{4} = 3$.",
    },
    {
      difficulty: "high",
      stem: "What is the equation of the line through the points (2, 7) and (6, 19)?",
      options: ["$y = 3x + 1$", "$y = 3x + 7$", "$y = 2x + 3$", "$y = 4x - 1$"],
      answer: 0,
      explanation: "Slope 3; at $x = 2$: $7 = 3 \\cdot 2 + b$, so $b = 1$. Check: $3 \\cdot 6 + 1 = 19$.",
    },
    {
      difficulty: "high",
      stem: "A student has 400 ₹. What is the longest trip she can afford with company A?",
      options: ["15 km", "17.5 km", "20 km", "22.5 km"],
      answer: 1,
      explanation: "$20x + 50 \\le 400$ gives $x \\le 350 / 20 = 17.5$ km. With company B she could go $300 / 15 = 20$ km.",
    },
  ],
};

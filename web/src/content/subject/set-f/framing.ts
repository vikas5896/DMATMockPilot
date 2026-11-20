import type { SubjectText } from "../types";

export const FRAMING: SubjectText = {
  passage: {
    id: "f-framing",
    title: "How Wording Changes Decisions",
    field: "Behavioural Science",
    blocks: [
      {
        k: "p",
        text: "Classical economic theory assumes that people choose between options according to their outcomes, no matter how the options are described. Behavioural research shows that the description, the **frame**, can change decisions even when the outcomes are identical (**framing effect**).",
      },
      {
        k: "p",
        text: "In a typical experiment, 300 students were told that a dangerous disease threatens 600 people and that two programmes are available. Half of the students (group 1, n = 150) received the options in a **gain frame**:",
      },
      {
        k: "list",
        items: [
          "Programme A: 200 people will be saved for certain.",
          "Programme B: with a probability of 1/3, all 600 people will be saved; with a probability of 2/3, nobody will be saved.",
        ],
      },
      {
        k: "p",
        text: "The other half (group 2, n = 150) received the same options in a **loss frame**:",
      },
      {
        k: "list",
        items: [
          "Programme C: 400 people will die for certain.",
          "Programme D: with a probability of 1/3, nobody will die; with a probability of 2/3, all 600 people will die.",
        ],
      },
      {
        k: "p",
        text: "The researchers explain the result as follows: when options are described as gains, most people prefer the certain option (they are **risk-averse**); when the same options are described as losses, most people prefer the gamble (they are **risk-seeking**).",
      },
      {
        k: "table",
        caption: "Table 1. Choices of the students.",
        head: ["Group", "Certain option", "Risky option"],
        rows: [
          ["Group 1 (gain frame)", "A: 72 %", "B: 28 %"],
          ["Group 2 (loss frame)", "C: 22 %", "D: 78 %"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many students in group 1 chose programme A?",
      options: ["72", "108", "150", "216"],
      answer: 1,
      explanation: "72 % of 150 $= 0.72 \\cdot 150 = 108$ students.",
    },
    {
      difficulty: "low",
      stem: "How many people does programme B save on average (expected value)?",
      options: ["0", "200", "300", "600"],
      answer: 1,
      explanation: "$\\frac{1}{3} \\cdot 600 + \\frac{2}{3} \\cdot 0 = 200$ people, the same number as programme A saves for certain.",
    },
    {
      difficulty: "medium",
      stem: "Which statement about programmes A and C is correct?",
      options: [
        "A saves more people than C.",
        "C saves more people than A.",
        "Both lead to the same outcome: 200 survive and 400 die.",
        "They cannot be compared, because one is about survival and one about death.",
      ],
      answer: 2,
      explanation: "Of 600 people, 200 saved means 400 die. A and C describe the same outcome in different words.",
    },
    {
      difficulty: "medium",
      stem: "How many students in group 2 chose the risky programme D?",
      options: ["33", "78", "117", "150"],
      answer: 2,
      explanation: "78 % of 150 $= 117$ students.",
    },
    {
      difficulty: "medium",
      stem: "Which conclusion does the experiment support?",
      options: [
        "Students prefer programmes that save more people.",
        "The description of identical options changed which option most students chose.",
        "Most students did not understand the probabilities.",
        "Risky options are always preferred.",
      ],
      answer: 1,
      explanation: "The outcomes in both frames are identical, yet the majority switched from the certain option (gain frame) to the risky one (loss frame).",
    },
    {
      difficulty: "high",
      stem: "In the terms of the text, how did most students in group 2 behave?",
      options: [
        "Risk-averse, because they avoided the certain loss.",
        "Risk-seeking, because they preferred the gamble when the options were described as losses.",
        "Risk-averse, because they chose the option with the higher expected value.",
        "Neutral, because both options have the same expected value.",
      ],
      answer: 1,
      explanation: "78 % chose the gamble D in the loss frame: according to the text, this is risk-seeking behaviour. Both options have the same expected value, so expected value cannot explain the choice.",
    },
    {
      difficulty: "high",
      stem: "By how many percentage points does the share of students choosing the certain option differ between the two frames?",
      options: ["22", "50", "72", "about 227"],
      answer: 1,
      explanation: "$72$ % $- 22$ % $= 50$ percentage points. About 227 % would be the relative difference ($50/22$), not percentage points.",
    },
  ],
};

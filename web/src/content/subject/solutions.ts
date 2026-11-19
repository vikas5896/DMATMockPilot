import type { SubjectText } from "./types";

export const SOLUTIONS: SubjectText = {
  passage: {
    id: "solutions",
    title: "Concentration and Dilution",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "Chemists count particles in **moles** (mol). The mass of one mole of a substance is its **molar mass** $M$ (in g/mol). The amount of substance $n$ in a sample of mass $m$ is therefore:",
      },
      { k: "formula", tex: "n = \\frac{m}{M}", label: "(1)" },
      {
        k: "p",
        text: "The **molar concentration** $c$ of a solution states how many moles of dissolved substance there are per litre of solution:",
      },
      { k: "formula", tex: "c = \\frac{n}{V}", label: "(2)" },
      {
        k: "p",
        text: "When a solution is **diluted** by adding water, the amount of dissolved substance does not change; only the volume increases. Before and after dilution therefore:",
      },
      { k: "formula", tex: "c_1 \\cdot V_1 = c_2 \\cdot V_2", label: "(3)" },
      {
        k: "p",
        text: "In medicine, concentrations are often given as mass per volume: a 0.9 % saline solution contains 0.9 g of sodium chloride in 100 mL, i.e. 9 g per litre.",
      },
      {
        k: "table",
        caption: "Table 1. Molar masses of some substances.",
        head: ["Substance", "Formula", "M in g/mol"],
        rows: [
          ["Sodium chloride", "NaCl", "58.5"],
          ["Sodium hydroxide", "NaOH", "40"],
          ["Glucose", "C₆H₁₂O₆", "180"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many moles are contained in 40 g of sodium hydroxide?",
      options: ["0.5 mol", "1 mol", "2 mol", "40 mol"],
      answer: 1,
      explanation: "Formula (1): $n = 40 / 40 = 1$ mol.",
    },
    {
      difficulty: "low",
      stem: "1 mol of sodium hydroxide is dissolved in water to give 2 litres of solution. What is the concentration?",
      options: ["0.5 mol/L", "1 mol/L", "2 mol/L", "20 mol/L"],
      answer: 0,
      explanation: "Formula (2): $c = 1 / 2 = 0.5$ mol/L.",
    },
    {
      difficulty: "medium",
      stem: "100 mL of a 2 mol/L solution are to be diluted to 0.5 mol/L. How much water must be added?",
      options: ["100 mL", "200 mL", "300 mL", "400 mL"],
      answer: 2,
      explanation: "Formula (3): $2 \\cdot 100 = 0.5 \\cdot V_2$, so $V_2 = 400$ mL. Since 100 mL are already there, 300 mL of water must be added.",
    },
    {
      difficulty: "medium",
      stem: "9 g of glucose are dissolved to give 0.5 L of solution. What is the molar concentration?",
      options: ["0.01 mol/L", "0.05 mol/L", "0.1 mol/L", "18 mol/L"],
      answer: 2,
      explanation: "$n = 9 / 180 = 0.05$ mol. $c = 0.05 / 0.5 = 0.1$ mol/L.",
    },
    {
      difficulty: "medium",
      stem: "Roughly what is the molar concentration of sodium chloride in a 0.9 % saline solution?",
      options: ["0.015 mol/L", "0.15 mol/L", "1.5 mol/L", "9 mol/L"],
      answer: 1,
      explanation: "The solution contains 9 g NaCl per litre. $n = 9 / 58.5 \\approx 0.15$ mol, so $c \\approx 0.15$ mol/L.",
    },
    {
      difficulty: "high",
      stem: "1 L of a 1 mol/L NaCl solution is mixed with 1 L of a 3 mol/L NaCl solution. What is the concentration of the mixture?",
      options: ["1 mol/L", "2 mol/L", "3 mol/L", "4 mol/L"],
      answer: 1,
      explanation: "Amount: 1 mol + 3 mol = 4 mol in 2 L of solution. $c = 4 / 2 = 2$ mol/L.",
    },
    {
      difficulty: "high",
      stem: "Which statement about diluting a solution with water is correct?",
      options: [
        "The amount of dissolved substance stays the same, while the concentration falls.",
        "The amount of dissolved substance falls, while the concentration stays the same.",
        "Both the amount of substance and the concentration fall.",
        "The concentration rises, because the volume increases.",
      ],
      answer: 0,
      explanation: "Adding water does not remove dissolved particles, so $n$ stays constant. With a larger volume, $c = n / V$ falls.",
    },
  ],
};

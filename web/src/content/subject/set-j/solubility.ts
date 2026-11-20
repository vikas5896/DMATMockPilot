import type { SubjectText } from "../types";

export const SOLUBILITY: SubjectText = {
  passage: {
    id: "j-solubility",
    title: "Solubility and Crystallisation",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "Only a limited amount of a solid dissolves in a given amount of water. The **solubility** states the maximum mass that dissolves in 100 g of water at a certain temperature. A solution that contains this maximum amount is **saturated**; one that contains less is **unsaturated**.",
      },
      {
        k: "p",
        text: "For most salts, the solubility rises with temperature, but by very different amounts. If a saturated solution is cooled, the solubility falls, and the excess salt separates as solid **crystals**. The mass of crystals is the amount dissolved minus the amount that can still stay dissolved at the lower temperature.",
      },
      {
        k: "p",
        text: "Chemists use this to purify substances (**recrystallisation**): the impure substance is dissolved in hot water and the solution is cooled. The main substance crystallises, while small amounts of impurities with a different solubility behaviour stay in solution.",
      },
      {
        k: "table",
        caption: "Table 1. Solubility in grams per 100 g of water.",
        head: ["Substance", "20 °C", "40 °C", "60 °C", "80 °C"],
        rows: [
          ["Potassium nitrate (KNO₃)", "32", "64", "110", "169"],
          ["Sodium chloride (NaCl)", "36", "37", "37", "38"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the maximum mass of potassium nitrate that dissolves in 100 g of water at 40 °C?",
      options: ["32 g", "37 g", "64 g", "110 g"],
      answer: 2,
      explanation: "Table 1: 64 g per 100 g of water at 40 °C.",
    },
    {
      difficulty: "low",
      stem: "For which substance does the solubility hardly change with temperature?",
      options: ["Potassium nitrate", "Sodium chloride", "Both change strongly.", "Neither dissolves in water."],
      answer: 1,
      explanation: "Sodium chloride: 36 g at 20 °C and 38 g at 80 °C.",
    },
    {
      difficulty: "medium",
      stem: "How much potassium nitrate dissolves at most in 200 g of water at 60 °C?",
      options: ["55 g", "110 g", "220 g", "338 g"],
      answer: 2,
      explanation: "Twice the water dissolves twice the amount: $2 \\cdot 110 = 220$ g.",
    },
    {
      difficulty: "medium",
      stem: "At which temperature is a solution of 110 g of potassium nitrate in 100 g of water exactly saturated?",
      options: ["20 °C", "40 °C", "60 °C", "80 °C"],
      answer: 2,
      explanation: "Table 1: the solubility is exactly 110 g at 60 °C.",
    },
    {
      difficulty: "medium",
      stem: "A saturated solution of potassium nitrate in 100 g of water at 80 °C is cooled to 20 °C. What mass of crystals forms?",
      options: ["32 g", "105 g", "137 g", "169 g"],
      answer: 2,
      explanation: "$169 - 32 = 137$ g crystallise; 32 g stay dissolved.",
    },
    {
      difficulty: "high",
      stem: "50 g of potassium nitrate are dissolved in 100 g of water at 40 °C, and the solution is then cooled to 20 °C. What happens?",
      options: [
        "No crystals form, because the solution was unsaturated.",
        "18 g of crystals form.",
        "32 g of crystals form.",
        "50 g of crystals form.",
      ],
      answer: 1,
      explanation: "At 40 °C, 50 g < 64 g: the solution is unsaturated. At 20 °C only 32 g can stay dissolved, so $50 - 32 = 18$ g crystallise.",
    },
    {
      difficulty: "high",
      stem: "Potassium nitrate contaminated with a little sodium chloride is purified by recrystallisation from hot water. Why does this work?",
      options: [
        "Both salts crystallise equally on cooling.",
        "Potassium nitrate's solubility falls strongly on cooling, while the small amount of sodium chloride stays dissolved.",
        "Sodium chloride evaporates when heated.",
        "Sodium chloride does not dissolve in water at all.",
      ],
      answer: 1,
      explanation: "Cooling forces most of the potassium nitrate out of solution. The solubility of sodium chloride hardly changes, so its small amount remains dissolved.",
    },
  ],
};

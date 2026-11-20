import type { SubjectText } from "../types";

export const PH_VALUE: SubjectText = {
  passage: {
    id: "c-ph-value",
    title: "Acids, Bases and the pH Scale",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "Acids release hydrogen ions (H⁺) in water; bases bind them. How acidic a solution is depends on the concentration of hydrogen ions, written $[\\text{H}^+]$ and measured in mol/L. Because these concentrations range over many powers of ten, chemists use the **pH value**:",
      },
      { k: "formula", tex: "\\text{pH} = -\\log_{10}\\,[\\text{H}^+] \\qquad\\Leftrightarrow\\qquad [\\text{H}^+] = 10^{-\\text{pH}}", label: "(1)" },
      {
        k: "p",
        text: "At 25 °C, pure water has a pH of 7 (**neutral**). Solutions with a pH below 7 are **acidic**, above 7 **basic** (alkaline). A difference of one pH unit means a factor of 10 in the hydrogen-ion concentration. If a solution of a strong acid is diluted with water to ten times its volume, its pH therefore rises by one unit. Diluting an acid brings its pH ever closer to 7, but water alone can never make it basic.",
      },
      {
        k: "p",
        text: "In a **neutralisation**, an acid reacts with a base. For hydrochloric acid (HCl) and sodium hydroxide (NaOH), one mole of acid needs exactly one mole of base. The amount of substance in a solution is $n = c \\cdot V$ (concentration times volume). The molar mass of HCl is 36.5 g/mol.",
      },
      {
        k: "table",
        caption: "Table 1. Approximate pH values of some liquids.",
        head: ["Liquid", "pH"],
        rows: [
          ["Gastric acid", "1.5"],
          ["Lemon juice", "2"],
          ["Coffee", "5"],
          ["Pure water", "7"],
          ["Seawater", "8"],
          ["Soap solution", "10"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the hydrogen-ion concentration of a solution with pH 3?",
      options: ["3 mol/L", "0.003 mol/L", "0.001 mol/L", "1,000 mol/L"],
      answer: 2,
      explanation: "Formula (1): $[\\text{H}^+] = 10^{-3} = 0.001$ mol/L.",
    },
    {
      difficulty: "low",
      stem: "Which liquid in Table 1 is basic?",
      options: ["Gastric acid", "Coffee", "Pure water", "Soap solution"],
      answer: 3,
      explanation: "Basic means a pH above 7. Of the options, only soap solution (pH 10) is basic; pure water is neutral.",
    },
    {
      difficulty: "medium",
      stem: "How many times higher is the hydrogen-ion concentration in lemon juice than in coffee?",
      options: ["2.5 times", "3 times", "100 times", "1,000 times"],
      answer: 3,
      explanation: "The pH values differ by $5 - 2 = 3$ units: $10^3 = 1{,}000$ times.",
    },
    {
      difficulty: "medium",
      stem: "Hydrochloric acid with pH 2 is diluted with water to 100 times its volume. What is its new pH?",
      options: ["2.02", "3", "4", "200"],
      answer: 2,
      explanation: "Each tenfold dilution raises the pH by 1; a 100-fold dilution means two tenfold dilutions: $2 + 2 = 4$.",
    },
    {
      difficulty: "medium",
      stem: "What volume of NaOH solution with $c = 0.2$ mol/L is needed to neutralise 20 mL of HCl with $c = 0.1$ mol/L?",
      options: ["5 mL", "10 mL", "20 mL", "40 mL"],
      answer: 1,
      explanation: "$n(\\text{HCl}) = 0.1 \\cdot 0.020 = 0.002$ mol. The same amount of NaOH is needed: $V = 0.002 / 0.2 = 0.010$ L $= 10$ mL.",
    },
    {
      difficulty: "high",
      stem: "An acidic solution with pH 4 is diluted again and again with pure water. What happens to its pH?",
      options: [
        "It rises by 1 with every dilution until it is basic.",
        "It rises and approaches 7, but does not go above 7.",
        "It stays at 4, because the amount of acid is unchanged.",
        "It falls, because more water is added.",
      ],
      answer: 1,
      explanation: "The text states that dilution brings the pH ever closer to 7, but water alone can never make the solution basic.",
    },
    {
      difficulty: "high",
      stem: "How many grams of HCl must be dissolved in 1 L of water to obtain hydrochloric acid with pH 1? (HCl releases all its hydrogen ions.)",
      options: ["0.365 g", "3.65 g", "36.5 g", "365 g"],
      answer: 1,
      explanation: "pH 1 means $[\\text{H}^+] = 10^{-1} = 0.1$ mol/L, so 0.1 mol of HCl in 1 L. Mass: $0.1 \\cdot 36.5 = 3.65$ g.",
    },
  ],
};

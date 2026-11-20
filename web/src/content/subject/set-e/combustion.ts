import type { SubjectText } from "../types";

export const COMBUSTION: SubjectText = {
  passage: {
    id: "e-combustion",
    title: "Calculating with Chemical Equations",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "Natural gas consists mainly of methane (CH₄). When it burns completely, it reacts with oxygen to form carbon dioxide and water:",
      },
      { k: "formula", tex: "\\text{CH}_4 + 2\\,\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\,\\text{H}_2\\text{O}", label: "(1)" },
      {
        k: "p",
        text: "The numbers in front of the formulas state the **amounts of substance** in moles that react with each other: 1 mol of methane needs 2 mol of oxygen and produces 1 mol of CO₂ and 2 mol of water. To convert amounts into masses, chemists use the **molar mass** $M$ (mass of one mole): $m = n \\cdot M$. It is the sum of the atomic masses: C = 12, H = 1 and O = 16 g/mol. In every reaction, the total mass of the products equals the total mass of the reactants (**conservation of mass**).",
      },
      {
        k: "p",
        text: "For gases, equal amounts of substance take up equal volumes at the same temperature and pressure. At room temperature and normal pressure, one mole of any gas occupies about **24 L**.",
      },
      {
        k: "p",
        text: "The combustion of methane releases heat: **890 kJ per mole** of methane burnt.",
      },
      {
        k: "table",
        caption: "Table 1. Molar masses of the substances in equation (1).",
        head: ["Substance", "CH₄", "O₂", "CO₂", "H₂O"],
        rows: [["Molar mass (g/mol)", "16", "32", "44", "18"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How is the molar mass of CO₂ (44 g/mol) obtained?",
      options: ["12 + 16", "12 + 2 · 16", "2 · 12 + 16", "12 · 16 − 2"],
      answer: 1,
      explanation: "CO₂ contains one carbon atom (12) and two oxygen atoms ($2 \\cdot 16 = 32$): $12 + 32 = 44$ g/mol.",
    },
    {
      difficulty: "low",
      stem: "How many moles of oxygen are needed to burn 3 mol of methane completely?",
      options: ["1.5 mol", "3 mol", "6 mol", "9 mol"],
      answer: 2,
      explanation: "Equation (1): 2 mol of O₂ per mol of CH₄: $3 \\cdot 2 = 6$ mol.",
    },
    {
      difficulty: "medium",
      stem: "What mass of carbon dioxide is formed when 32 g of methane burn completely?",
      options: ["32 g", "44 g", "64 g", "88 g"],
      answer: 3,
      explanation: "$32$ g $/ 16$ g/mol $= 2$ mol CH₄, which gives 2 mol CO₂: $2 \\cdot 44 = 88$ g.",
    },
    {
      difficulty: "medium",
      stem: "16 g of methane react completely with oxygen. What is the total mass of the products?",
      options: ["16 g", "48 g", "62 g", "80 g"],
      answer: 3,
      explanation: "1 mol CH₄ (16 g) reacts with 2 mol O₂ ($2 \\cdot 32 = 64$ g). Conservation of mass: $16 + 64 = 80$ g of products (44 g CO₂ + 36 g H₂O).",
    },
    {
      difficulty: "medium",
      stem: "At room temperature, what volume of oxygen is needed to burn 48 L of methane completely?",
      options: ["24 L", "48 L", "96 L", "192 L"],
      answer: 2,
      explanation: "Equal volumes contain equal amounts of gas, so the volumes react in the ratio 1 : 2: $48 \\cdot 2 = 96$ L.",
    },
    {
      difficulty: "high",
      stem: "About how much heat is released when 1 kg of methane burns completely?",
      options: ["0.89 MJ", "about 14 MJ", "about 56 MJ", "890 MJ"],
      answer: 2,
      explanation: "$1{,}000$ g $/ 16$ g/mol $= 62.5$ mol; $62.5 \\cdot 890$ kJ $\\approx 55{,}600$ kJ $\\approx 56$ MJ.",
    },
    {
      difficulty: "high",
      stem: "About how much CO₂ is released per megajoule (MJ) of heat from burning methane?",
      options: ["about 16 g", "about 49 g", "about 89 g", "about 890 g"],
      answer: 1,
      explanation: "Per mole of methane: 44 g CO₂ and 890 kJ $= 0.89$ MJ. $44 / 0.89 \\approx 49$ g per MJ.",
    },
  ],
};

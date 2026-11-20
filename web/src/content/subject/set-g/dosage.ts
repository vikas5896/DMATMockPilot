import type { SubjectText } from "../types";

export const DOSAGE: SubjectText = {
  passage: {
    id: "g-dosage",
    title: "Calculating Medicine Doses",
    field: "Pharmacy",
    blocks: [
      {
        k: "p",
        text: "For children, many medicines are dosed according to **body weight**. A prescription such as \"15 mg/kg per day in 3 doses\" means: multiply the body weight in kg by 15 mg to get the daily dose, and divide it into 3 equal single doses. Often a **maximum daily dose** applies that must not be exceeded, whatever the body weight.",
      },
      {
        k: "p",
        text: "Liquid medicines state their **concentration**, e.g. 250 mg per 5 mL. The volume to give is the required dose divided by the concentration.",
      },
      { k: "formula", tex: "\\text{volume} = \\frac{\\text{dose}}{\\text{concentration}}", label: "(1)" },
      {
        k: "p",
        text: "In hospitals, fluids are often given by **infusion**. The infusion rate in mL/h is the volume divided by the time. With a simple gravity drip, nurses set the number of drops per minute; a standard infusion set produces 20 drops per mL (the **drop factor**).",
      },
      { k: "formula", tex: "\\text{drops per minute} = \\frac{\\text{volume (mL)} \\cdot \\text{drop factor}}{\\text{time (min)}}", label: "(2)" },
      {
        k: "table",
        caption: "Table 1. A prescription for a child weighing 20 kg.",
        head: ["Item", "Value"],
        rows: [
          ["Antibiotic syrup: dose", "15 mg/kg per day in 3 doses"],
          ["Antibiotic syrup: maximum daily dose", "500 mg"],
          ["Antibiotic syrup: concentration", "250 mg per 5 mL"],
          ["Infusion", "1,000 mL over 8 hours"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the child's daily dose of the antibiotic?",
      options: ["15 mg", "100 mg", "300 mg", "500 mg"],
      answer: 2,
      explanation: "$15$ mg/kg $\\cdot 20$ kg $= 300$ mg per day (below the maximum of 500 mg).",
    },
    {
      difficulty: "low",
      stem: "What is the concentration of the syrup in mg per mL?",
      options: ["5 mg/mL", "50 mg/mL", "250 mg/mL", "1,250 mg/mL"],
      answer: 1,
      explanation: "$250$ mg $/ 5$ mL $= 50$ mg/mL.",
    },
    {
      difficulty: "medium",
      stem: "How many millilitres of syrup must be given per single dose?",
      options: ["2 mL", "6 mL", "10 mL", "30 mL"],
      answer: 0,
      explanation: "Single dose: $300 / 3 = 100$ mg. Formula (1): $100 / 50 = 2$ mL. 6 mL would be the whole daily amount.",
    },
    {
      difficulty: "medium",
      stem: "What is the infusion rate in mL per hour?",
      options: ["8 mL/h", "about 42 mL/h", "125 mL/h", "8,000 mL/h"],
      answer: 2,
      explanation: "$1{,}000$ mL $/ 8$ h $= 125$ mL/h.",
    },
    {
      difficulty: "medium",
      stem: "A bottle contains 100 mL of the syrup. For how many full days of treatment is it enough?",
      options: ["5 days", "16 days", "33 days", "50 days"],
      answer: 1,
      explanation: "Per day: $3 \\cdot 2 = 6$ mL. $100 / 6 \\approx 16.7$, so 16 full days.",
    },
    {
      difficulty: "high",
      stem: "How many drops per minute must the gravity drip deliver for the infusion?",
      options: ["about 6", "about 21", "about 42", "125"],
      answer: 2,
      explanation: "Formula (2): $\\frac{1{,}000 \\cdot 20}{480} \\approx 41.7$, so about 42 drops per minute.",
    },
    {
      difficulty: "high",
      stem: "Above which body weight does the maximum daily dose limit the antibiotic?",
      options: ["above 20 kg", "above about 33 kg", "above 50 kg", "above 500 kg"],
      answer: 1,
      explanation: "$15$ mg/kg $\\cdot w = 500$ mg gives $w \\approx 33.3$ kg. Heavier children receive at most 500 mg per day.",
    },
  ],
};

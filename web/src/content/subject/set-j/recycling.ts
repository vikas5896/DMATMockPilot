import type { SubjectText } from "../types";

export const RECYCLING: SubjectText = {
  passage: {
    id: "j-recycling",
    title: "How Much Plastic Is Really Recycled?",
    field: "Environmental Engineering",
    blocks: [
      {
        k: "p",
        text: "Recycling statistics can be misleading, because material is lost at every step between the household bin and the new product. A typical chain for plastic packaging has three steps:",
      },
      {
        k: "list",
        items: [
          "**Collection:** only part of the packaging waste ends up in the separate recycling bin; the rest goes into household waste or the environment.",
          "**Sorting:** sorting plants separate the collected material; some of it is too dirty or mixed and cannot be used.",
          "**Recycling:** in the recycling plant, further losses occur when the material is washed, melted and filtered.",
        ],
      },
      {
        k: "p",
        text: "The share of the original waste that actually becomes new material is the product of the shares passed on at each step:",
      },
      { k: "formula", tex: "\\text{effective recycling rate} = c \\cdot s \\cdot r", label: "(1)" },
      {
        k: "p",
        text: "Recycling saves raw materials and energy. For aluminium, the savings are especially large: recycled aluminium needs only about **5 %** of the energy needed to produce new aluminium from ore.",
      },
      {
        k: "table",
        caption: "Table 1. Plastic packaging in a city (per year).",
        head: ["Step", "Share passed on"],
        rows: [
          ["Waste generated", "100,000 t"],
          ["Collected separately (c)", "60 %"],
          ["Sorted as recyclable (s), of the collected material", "70 %"],
          ["Actually recycled (r), of the sorted material", "80 %"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many tonnes of plastic packaging are collected separately per year?",
      options: ["40,000 t", "42,000 t", "60,000 t", "70,000 t"],
      answer: 2,
      explanation: "60 % of 100,000 t $= 60{,}000$ t.",
    },
    {
      difficulty: "low",
      stem: "How many tonnes are not collected separately?",
      options: ["30,000 t", "40,000 t", "60,000 t", "66,400 t"],
      answer: 1,
      explanation: "$100{,}000 - 60{,}000 = 40{,}000$ t.",
    },
    {
      difficulty: "medium",
      stem: "How many tonnes are sorted as recyclable?",
      options: ["33,600 t", "42,000 t", "48,000 t", "70,000 t"],
      answer: 1,
      explanation: "70 % of the 60,000 t collected: $42{,}000$ t.",
    },
    {
      difficulty: "medium",
      stem: "What is the effective recycling rate?",
      options: ["33.6 %", "42 %", "60 %", "70 %"],
      answer: 0,
      explanation: "Formula (1): $0.6 \\cdot 0.7 \\cdot 0.8 = 0.336$, i.e. 33.6 % or 33,600 t. Reporting the collection rate (60 %) would overstate it.",
    },
    {
      difficulty: "medium",
      stem: "Producing new aluminium needs 20 units of energy for a certain amount. About how much energy does recycled aluminium need for the same amount?",
      options: ["1 unit", "5 units", "15 units", "19 units"],
      answer: 0,
      explanation: "5 % of 20 units $= 1$ unit.",
    },
    {
      difficulty: "high",
      stem: "A campaign raises the collection rate from 60 % to 80 %. The other rates stay the same. By how many percentage points does the effective recycling rate rise?",
      options: ["5.6", "11.2", "20", "44.8"],
      answer: 1,
      explanation: "New rate: $0.8 \\cdot 0.7 \\cdot 0.8 = 0.448$. Rise: $44.8 - 33.6 = 11.2$ percentage points.",
    },
    {
      difficulty: "high",
      stem: "Which improvement raises the effective recycling rate more: collection from 60 % to 70 %, or sorting from 70 % to 85 %?",
      options: [
        "Collection to 70 %",
        "Sorting to 85 %",
        "Both have the same effect.",
        "Neither changes the effective rate.",
      ],
      answer: 1,
      explanation: "Collection: $0.7 \\cdot 0.7 \\cdot 0.8 = 39.2$ % (+5.6 points). Sorting: $0.6 \\cdot 0.85 \\cdot 0.8 = 40.8$ % (+7.2 points).",
    },
  ],
};

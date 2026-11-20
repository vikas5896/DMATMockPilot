import type { SubjectText } from "../types";

export const COMPARATIVE_ADVANTAGE: SubjectText = {
  passage: {
    id: "g-comparative-advantage",
    title: "Why Countries Trade: Comparative Advantage",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "A country has an **absolute advantage** in a good if it can produce it with less labour than another country. Surprisingly, trade can benefit both countries even when one of them is better at producing everything. What matters is the **comparative advantage**: a country should specialise in the good that it produces at the lowest **opportunity cost**, i.e. by giving up the least of the other good.",
      },
      {
        k: "p",
        text: "The opportunity cost of one unit of a good is the amount of the other good that could have been produced with the same labour. If both countries specialise according to their comparative advantage and then trade, the world can produce more of at least one good without producing less of the other. Both countries gain if the exchange rate between the goods lies **between** their opportunity costs.",
      },
      {
        k: "p",
        text: "**Example.** Two countries, X and Y, produce only rice and cloth. Each has **1,200 hours** of labour available. Without trade, each country spends half of its hours on each good.",
      },
      {
        k: "table",
        caption: "Table 1. Hours of labour needed per unit.",
        head: ["Country", "1 tonne of rice", "1 bale of cloth"],
        rows: [
          ["X", "4 h", "2 h"],
          ["Y", "6 h", "12 h"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many tonnes of rice could country X produce if it used all 1,200 hours for rice?",
      options: ["100 t", "200 t", "300 t", "600 t"],
      answer: 2,
      explanation: "$1{,}200 / 4 = 300$ t.",
    },
    {
      difficulty: "low",
      stem: "Which country has an absolute advantage in both goods?",
      options: ["Country X", "Country Y", "X in rice, Y in cloth", "Neither country"],
      answer: 0,
      explanation: "X needs fewer hours for both rice (4 h vs 6 h) and cloth (2 h vs 12 h).",
    },
    {
      difficulty: "medium",
      stem: "What is the opportunity cost of 1 tonne of rice in country X?",
      options: ["0.5 bales of cloth", "2 bales of cloth", "4 bales of cloth", "6 bales of cloth"],
      answer: 1,
      explanation: "The 4 hours for 1 t of rice could produce $4 / 2 = 2$ bales of cloth.",
    },
    {
      difficulty: "medium",
      stem: "What is the opportunity cost of 1 tonne of rice in country Y?",
      options: ["0.5 bales of cloth", "2 bales of cloth", "6 bales of cloth", "12 bales of cloth"],
      answer: 0,
      explanation: "The 6 hours for 1 t of rice could produce $6 / 12 = 0.5$ bales of cloth.",
    },
    {
      difficulty: "medium",
      stem: "Which country has the comparative advantage in rice?",
      options: [
        "X, because it needs fewer hours for rice.",
        "Y, because rice costs it less cloth than it costs X.",
        "X, because it is better at everything.",
        "Neither, because X is more productive in both goods.",
      ],
      answer: 1,
      explanation: "The comparative advantage depends on opportunity cost: rice costs Y 0.5 bales of cloth, but X 2 bales. Absolute productivity is not decisive.",
    },
    {
      difficulty: "medium",
      stem: "How much rice and cloth do both countries produce together without trade?",
      options: ["250 t and 350 bales", "300 t and 500 bales", "250 t and 500 bales", "200 t and 350 bales"],
      answer: 0,
      explanation: "X: $600/4 = 150$ t and $600/2 = 300$ bales. Y: $600/6 = 100$ t and $600/12 = 50$ bales. Total: 250 t and 350 bales.",
    },
    {
      difficulty: "high",
      stem: "Y now produces only rice, and X produces the remaining 50 t of rice and as much cloth as possible. How much more cloth exists than without trade, with the same amount of rice?",
      options: ["50 bales", "150 bales", "200 bales", "500 bales"],
      answer: 1,
      explanation: "Y: $1{,}200/6 = 200$ t of rice. X: 50 t of rice take 200 h; the other 1,000 h give 500 bales. Total: 250 t and 500 bales, i.e. 150 bales more.",
    },
    {
      difficulty: "high",
      stem: "At which exchange rate between the goods do both countries gain from trade?",
      options: [
        "1 t of rice for 0.25 bales of cloth",
        "1 t of rice for 1 bale of cloth",
        "1 t of rice for 3 bales of cloth",
        "1 t of rice for 12 bales of cloth",
      ],
      answer: 1,
      explanation: "The rate must lie between the opportunity costs of 0.5 (Y) and 2 (X) bales per tonne. At 1 bale per tonne, Y gets more cloth for its rice than at home, and X gets rice cheaper than producing it itself.",
    },
  ],
};

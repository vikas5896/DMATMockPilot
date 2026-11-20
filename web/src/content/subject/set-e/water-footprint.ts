import type { SubjectText } from "../types";

export const WATER_FOOTPRINT: SubjectText = {
  passage: {
    id: "e-water-footprint",
    title: "The Water Footprint of Food",
    field: "Agricultural Science",
    blocks: [
      {
        k: "p",
        text: "Producing food requires large amounts of fresh water, mostly for irrigating crops and growing animal feed. The **water footprint** of a product is the total volume of fresh water used to produce it, along the whole production chain. For animal products it includes the water needed to grow the feed, which is why meat usually has a much larger footprint than plant foods.",
      },
      {
        k: "p",
        text: "When food is traded between countries, the water used to produce it is traded \"invisibly\" as well. This is called **virtual water**. A country with little water can save its own water by importing water-intensive products. Remember: 1 m³ = 1,000 L, and 1 km³ = 1 billion m³.",
      },
      {
        k: "p",
        text: "Comparing foods only per kilogram can be misleading, because they contain very different amounts of nutrients. Another useful measure is the water needed per gram of protein.",
      },
      {
        k: "table",
        caption: "Table 1. Average water footprint and protein content (rounded example values).",
        head: ["Food", "Water footprint (L per kg)", "Protein (g per kg)"],
        rows: [
          ["Wheat", "1,800", "120"],
          ["Rice", "2,500", "70"],
          ["Chicken meat", "4,300", "250"],
          ["Beef", "15,400", "260"],
          ["Tomatoes", "210", "9"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much water is needed to produce 0.5 kg of beef?",
      options: ["770 L", "7,700 L", "15,400 L", "30,800 L"],
      answer: 1,
      explanation: "$0.5 \\cdot 15{,}400 = 7{,}700$ L.",
    },
    {
      difficulty: "low",
      stem: "A family replaces 1 kg of beef per week with 1 kg of chicken meat. How much water does this save per week?",
      options: ["4,300 L", "11,100 L", "15,400 L", "19,700 L"],
      answer: 1,
      explanation: "$15{,}400 - 4{,}300 = 11{,}100$ L.",
    },
    {
      difficulty: "low",
      stem: "About how much water is needed to grow one tomato of 100 g?",
      options: ["2 L", "21 L", "210 L", "2,100 L"],
      answer: 1,
      explanation: "$0.1$ kg $\\cdot 210$ L/kg $= 21$ L.",
    },
    {
      difficulty: "medium",
      stem: "About how many times as much water per kilogram does beef need as chicken meat?",
      options: ["about 2 times", "about 3.6 times", "about 7 times", "about 11 times"],
      answer: 1,
      explanation: "$15{,}400 / 4{,}300 \\approx 3.6$.",
    },
    {
      difficulty: "medium",
      stem: "A meal consists of 200 g of rice and 150 g of chicken meat. What is its water footprint?",
      options: ["about 645 L", "about 1,145 L", "about 1,700 L", "about 6,800 L"],
      answer: 1,
      explanation: "Rice: $0.2 \\cdot 2{,}500 = 500$ L; chicken: $0.15 \\cdot 4{,}300 = 645$ L. Total: 1,145 L.",
    },
    {
      difficulty: "high",
      stem: "Which of these foods needs the least water per gram of protein?",
      options: ["Wheat", "Rice", "Chicken meat", "Beef"],
      answer: 0,
      explanation: "Wheat: $1{,}800/120 = 15$ L/g; chicken: $4{,}300/250 \\approx 17$ L/g; rice: $2{,}500/70 \\approx 36$ L/g; beef: $15{,}400/260 \\approx 59$ L/g. Per gram of protein, chicken is almost as good as wheat, and rice does worse than chicken.",
    },
    {
      difficulty: "high",
      stem: "A country exports 1 million tonnes of wheat. How much virtual water does it export with it?",
      options: ["1.8 million m³", "1.8 km³", "1,800 km³", "1.8 billion litres"],
      answer: 1,
      explanation: "1 million t $= 10^9$ kg; $10^9 \\cdot 1{,}800$ L $= 1.8 \\cdot 10^{12}$ L $= 1.8 \\cdot 10^9$ m³ $= 1.8$ km³.",
    },
  ],
};

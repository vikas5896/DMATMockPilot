import type { SubjectText } from "../types";

export const RAINWATER: SubjectText = {
  passage: {
    id: "h-rainwater",
    title: "Harvesting Rainwater from Roofs",
    field: "Water Management",
    blocks: [
      {
        k: "p",
        text: "In regions where rain falls mainly in a few months of the year, collecting rainwater from roofs can supply water for gardens, toilets and washing during the dry season. Rainfall is measured as the height of water that would cover flat ground, in millimetres. Since 1 mm of rain on 1 m² is 1 L of water, the volume collected from a roof is:",
      },
      { k: "formula", tex: "V\\ (\\text{L}) = A\\ (\\text{m}^2) \\cdot h\\ (\\text{mm}) \\cdot C", label: "(1)" },
      {
        k: "p",
        text: "Here $A$ is the roof area seen from above, $h$ the rainfall and $C$ the **runoff coefficient**: the share of the rain that actually reaches the tank. Some water evaporates, splashes off or soaks into the roof material. A tiled roof has $C \\approx 0.8$; a green roof covered with plants retains much more water ($C \\approx 0.3$).",
      },
      {
        k: "p",
        text: "The water is stored in a tank. When the tank is full, any further water overflows and is lost. Remember that 1 m³ = 1,000 L.",
      },
      {
        k: "table",
        caption: "Table 1. Rainfall in a city with a monsoon climate (other months: practically no rain). The house has a tiled roof of 100 m².",
        head: ["Month", "June", "July", "August", "September"],
        rows: [["Rainfall (mm)", "150", "250", "180", "120"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "10 mm of rain fall on a flat surface of 50 m². How much water is that (without losses)?",
      options: ["5 L", "60 L", "500 L", "5,000 L"],
      answer: 2,
      explanation: "$50 \\cdot 10 = 500$ L.",
    },
    {
      difficulty: "low",
      stem: "What is the total annual rainfall in the city?",
      options: ["250 mm", "550 mm", "700 mm", "1,000 mm"],
      answer: 2,
      explanation: "$150 + 250 + 180 + 120 = 700$ mm; the other months add practically nothing.",
    },
    {
      difficulty: "medium",
      stem: "How much water can the house collect from its roof in one year?",
      options: ["7,000 L", "56,000 L", "70,000 L", "87,500 L"],
      answer: 1,
      explanation: "Formula (1): $100 \\cdot 700 \\cdot 0.8 = 56{,}000$ L. 70,000 L forgets the runoff coefficient.",
    },
    {
      difficulty: "medium",
      stem: "How much water can be collected in July?",
      options: ["2.5 m³", "20 m³", "25 m³", "200 m³"],
      answer: 1,
      explanation: "$100 \\cdot 250 \\cdot 0.8 = 20{,}000$ L $= 20$ m³.",
    },
    {
      difficulty: "medium",
      stem: "The family uses 150 L per day of rainwater for the garden and the toilets. For about how many days would one year's harvest last if it could all be stored?",
      options: ["about 37 days", "about 150 days", "about 373 days", "about 467 days"],
      answer: 2,
      explanation: "$56{,}000 / 150 \\approx 373$ days, i.e. a whole year, if the tank were big enough.",
    },
    {
      difficulty: "high",
      stem: "The tank holds 10 m³ and is empty at the start of July. In July (31 days), the family uses 150 L per day. How much water overflows in July?",
      options: ["0 L", "about 5,350 L", "10,000 L", "about 15,350 L"],
      answer: 1,
      explanation: "Inflow 20,000 L, use $31 \\cdot 150 = 4{,}650$ L, net $+15{,}350$ L. Only 10,000 L fit, so about 5,350 L overflow.",
    },
    {
      difficulty: "high",
      stem: "The neighbours have a green roof of the same size. How much rainwater can they collect per year?",
      options: ["16,800 L", "21,000 L", "35,000 L", "56,000 L"],
      answer: 1,
      explanation: "$100 \\cdot 700 \\cdot 0.3 = 21{,}000$ L, i.e. $0.3 / 0.8 = 37.5$ % of the tiled roof's harvest.",
    },
  ],
};

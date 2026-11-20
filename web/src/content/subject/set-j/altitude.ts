import type { SubjectText } from "../types";

export const ALTITUDE: SubjectText = {
  passage: {
    id: "j-altitude",
    title: "Breathing at High Altitude",
    field: "Physiology",
    blocks: [
      {
        k: "p",
        text: "Air consists of about **21 % oxygen**, and this share is practically the same at every altitude. What changes is the air pressure: the higher one climbs, the less air lies above, and the pressure falls. Roughly, it halves every 5,500 m.",
      },
      {
        k: "p",
        text: "For breathing, what matters is the **partial pressure of oxygen** ($p_{O_2}$): the part of the total pressure that is due to oxygen. It determines how much oxygen passes from the lungs into the blood:",
      },
      { k: "formula", tex: "p_{O_2} = 0.21 \\cdot p", label: "(1)" },
      {
        k: "p",
        text: "At high altitude, the body therefore receives less oxygen with every breath, although the air contains the same percentage of oxygen. People breathe faster, the heart beats faster, and over several weeks the body produces more red blood cells. Climbers on the highest mountains often use bottled oxygen, which raises the oxygen share of the air they breathe.",
      },
      {
        k: "table",
        caption: "Table 1. Approximate air pressure at different altitudes (rounded).",
        head: ["Altitude", "Air pressure"],
        rows: [
          ["Sea level", "1,000 hPa"],
          ["2,000 m", "800 hPa"],
          ["3,500 m", "650 hPa"],
          ["5,500 m", "500 hPa"],
          ["8,800 m", "330 hPa"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What share of the air at 5,500 m is oxygen?",
      options: ["about 10 %", "about 15 %", "about 21 %", "about 42 %"],
      answer: 2,
      explanation: "The text states that the oxygen share is practically the same at every altitude: about 21 %.",
    },
    {
      difficulty: "low",
      stem: "What is the partial pressure of oxygen at sea level?",
      options: ["21 hPa", "210 hPa", "790 hPa", "1,000 hPa"],
      answer: 1,
      explanation: "Formula (1): $0.21 \\cdot 1{,}000 = 210$ hPa.",
    },
    {
      difficulty: "medium",
      stem: "What is the partial pressure of oxygen at 3,500 m?",
      options: ["about 65 hPa", "about 137 hPa", "about 168 hPa", "650 hPa"],
      answer: 1,
      explanation: "$0.21 \\cdot 650 \\approx 137$ hPa.",
    },
    {
      difficulty: "medium",
      stem: "How does the oxygen partial pressure at 5,500 m compare with that at sea level?",
      options: ["It is the same.", "It is about half as high.", "It is about a quarter.", "It is twice as high."],
      answer: 1,
      explanation: "The total pressure halves (1,000 → 500 hPa) while the share stays 21 %, so $p_{O_2}$ halves too (210 → 105 hPa).",
    },
    {
      difficulty: "medium",
      stem: "Why do people get out of breath more easily at high altitude?",
      options: [
        "Because the air contains a smaller percentage of oxygen.",
        "Because the partial pressure of oxygen is lower, so less oxygen enters the blood.",
        "Because the air is colder.",
        "Because there is more carbon dioxide in the air.",
      ],
      answer: 1,
      explanation: "The percentage is the same; what falls is the pressure and therefore the oxygen partial pressure.",
    },
    {
      difficulty: "high",
      stem: "At 8,800 m, roughly what fraction of the sea-level oxygen partial pressure is available?",
      options: ["about 1/10", "about 1/3", "about 1/2", "about 2/3"],
      answer: 1,
      explanation: "$0.21 \\cdot 330 \\approx 69$ hPa, compared with 210 hPa: $69 / 210 \\approx 0.33$, about one third.",
    },
    {
      difficulty: "high",
      stem: "At 5,500 m, a climber breathes air enriched to 42 % oxygen. What partial pressure of oxygen does this give?",
      options: ["about 105 hPa", "about 168 hPa", "about 210 hPa", "about 420 hPa"],
      answer: 2,
      explanation: "$0.42 \\cdot 500 = 210$ hPa, the same as normal air at sea level. Doubling the share compensates for the halved pressure.",
    },
  ],
};

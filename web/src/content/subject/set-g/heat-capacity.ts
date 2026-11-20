import type { SubjectText } from "../types";

export const HEAT_CAPACITY: SubjectText = {
  passage: {
    id: "g-heat-capacity",
    title: "Heating Water and Other Substances",
    field: "Thermodynamics",
    blocks: [
      {
        k: "p",
        text: "The heat $Q$ needed to warm a substance depends on its mass $m$, the temperature change $\\Delta T$ and a material property, the **specific heat capacity** $c$:",
      },
      { k: "formula", tex: "Q = m \\cdot c \\cdot \\Delta T", label: "(1)" },
      {
        k: "p",
        text: "Temperature differences are the same in kelvin (K) and degrees Celsius. Water has an unusually high specific heat capacity, which is why seas warm up and cool down slowly. A substance with a small $c$ heats up quickly.",
      },
      {
        k: "p",
        text: "An electrical heater with power $P$ delivers the energy $E = P \\cdot t$. If not all of this energy reaches the water (for example because the kettle itself heats up and loses heat to the air), only the share given by the **efficiency** is used: $Q = \\eta \\cdot P \\cdot t$.",
      },
      {
        k: "p",
        text: "When two amounts of the same liquid at different temperatures are mixed (without heat losses), the final temperature is the mass-weighted average of the two temperatures.",
      },
      {
        k: "table",
        caption: "Table 1. Specific heat capacities.",
        head: ["Substance", "c (kJ per kg and K)"],
        rows: [
          ["Water", "4.2"],
          ["Cooking oil", "2.0"],
          ["Aluminium", "0.9"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much heat is needed to warm 1 kg of water by 10 K?",
      options: ["0.42 kJ", "4.2 kJ", "42 kJ", "420 kJ"],
      answer: 2,
      explanation: "Formula (1): $1 \\cdot 4.2 \\cdot 10 = 42$ kJ.",
    },
    {
      difficulty: "low",
      stem: "Equal masses of the three substances in Table 1 receive the same amount of heat. Which one becomes the warmest?",
      options: ["Water", "Cooking oil", "Aluminium", "All warm up equally."],
      answer: 2,
      explanation: "$\\Delta T = Q / (m \\cdot c)$: the smallest $c$ (aluminium, 0.9) gives the largest temperature rise.",
    },
    {
      difficulty: "medium",
      stem: "How much heat is needed to heat 1.5 L of water (1.5 kg) from 20 °C to 100 °C?",
      options: ["126 kJ", "336 kJ", "504 kJ", "630 kJ"],
      answer: 2,
      explanation: "$\\Delta T = 80$ K: $1.5 \\cdot 4.2 \\cdot 80 = 504$ kJ. 630 kJ would wrongly use 100 K.",
    },
    {
      difficulty: "medium",
      stem: "A 2 kW kettle heats this water without any losses. How long does it take?",
      options: ["about 1 min", "about 4.2 min", "about 8.4 min", "about 252 min"],
      answer: 1,
      explanation: "$t = Q / P = 504$ kJ $/ 2$ kJ/s $= 252$ s $= 4.2$ min.",
    },
    {
      difficulty: "medium",
      stem: "2 kg of water at 80 °C are mixed with 3 kg of water at 20 °C. What is the final temperature?",
      options: ["44 °C", "50 °C", "56 °C", "60 °C"],
      answer: 0,
      explanation: "Mass-weighted average: $\\frac{2 \\cdot 80 + 3 \\cdot 20}{5} = \\frac{220}{5} = 44$ °C. 50 °C ignores the different masses.",
    },
    {
      difficulty: "high",
      stem: "The 2 kW kettle actually has an efficiency of 80 %. How long does it need to heat the 1.5 L from 20 °C to 100 °C?",
      options: ["3 min 22 s", "4 min 12 s", "5 min 15 s", "about 21 min"],
      answer: 2,
      explanation: "Usable power: $0.8 \\cdot 2 = 1.6$ kW. $t = 504 / 1.6 = 315$ s $= 5$ min $15$ s.",
    },
    {
      difficulty: "high",
      stem: "1 kg of cooking oil and 1 kg of water each receive 84 kJ of heat. By how much does the oil's temperature rise?",
      options: ["20 K", "42 K", "84 K", "168 K"],
      answer: 1,
      explanation: "Oil: $\\Delta T = 84 / (1 \\cdot 2.0) = 42$ K. Water would rise only $84 / 4.2 = 20$ K.",
    },
  ],
};

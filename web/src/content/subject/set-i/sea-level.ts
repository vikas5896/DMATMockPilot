import type { SubjectText } from "../types";

export const SEA_LEVEL: SubjectText = {
  passage: {
    id: "i-sea-level",
    title: "Melting Ice and Rising Sea Level",
    field: "Earth Science",
    blocks: [
      {
        k: "p",
        text: "Global sea level rises mainly for two reasons: ice on land (glaciers and the ice sheets of Greenland and Antarctica) melts and flows into the ocean, and ocean water expands as it warms (**thermal expansion**).",
      },
      {
        k: "p",
        text: "Ice is less dense than water: **1 km³ of ice gives about 0.9 km³ of water** when it melts. The water spreads over the whole ocean surface, which is about **360 million km²** ($3.6 \\cdot 10^8$ km²). The resulting rise is the volume of water divided by the ocean area:",
      },
      { k: "formula", tex: "\\Delta h = \\frac{V_{\\text{water}}}{A_{\\text{ocean}}}", label: "(1)" },
      {
        k: "p",
        text: "Remember that 1 km = 1,000 m = 1,000,000 mm.",
      },
      {
        k: "p",
        text: "Sea ice, in contrast, already floats in the ocean. By Archimedes' principle, floating ice displaces exactly as much water as it contains, so its melting does **not** raise sea level, just as melting ice cubes do not make a full glass overflow. Sea ice still matters for the climate, because white ice reflects much more sunlight than dark water.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Floating sea ice in the Arctic Ocean melts completely. What happens to global sea level?",
      options: [
        "It rises considerably.",
        "It hardly changes, because floating ice already displaces its own weight of water.",
        "It falls, because ice takes up more space than water.",
        "It rises by 0.9 times the ice volume.",
      ],
      answer: 1,
      explanation: "Floating ice displaces as much water as it contains (Archimedes), so melting it does not raise sea level.",
    },
    {
      difficulty: "low",
      stem: "How much water results when 100 km³ of glacier ice melts?",
      options: ["9 km³", "90 km³", "100 km³", "111 km³"],
      answer: 1,
      explanation: "$100 \\cdot 0.9 = 90$ km³.",
    },
    {
      difficulty: "medium",
      stem: "By how much does sea level rise when 360 km³ of water are added to the ocean?",
      options: ["0.1 mm", "1 mm", "1 cm", "1 m"],
      answer: 1,
      explanation: "Formula (1): $360 / (3.6 \\cdot 10^8) = 10^{-6}$ km $= 1$ mm.",
    },
    {
      difficulty: "medium",
      stem: "Greenland loses about 280 km³ of ice per year. By about how much does this raise global sea level per year?",
      options: ["about 0.07 mm", "about 0.7 mm", "about 7 mm", "about 7 cm"],
      answer: 1,
      explanation: "Water: $280 \\cdot 0.9 = 252$ km³. Rise: $252 / 360 = 0.7$ mm, since 360 km³ give 1 mm.",
    },
    {
      difficulty: "medium",
      stem: "Besides melting land ice, which process mentioned in the text raises sea level?",
      options: [
        "Melting sea ice",
        "Water expanding as it warms",
        "Increasing evaporation",
        "Ice reflecting sunlight",
      ],
      answer: 1,
      explanation: "The text names thermal expansion of warming ocean water as the second main cause.",
    },
    {
      difficulty: "high",
      stem: "How much land ice must melt to raise global sea level by 1 mm?",
      options: ["324 km³", "360 km³", "400 km³", "3,600 km³"],
      answer: 2,
      explanation: "1 mm needs 360 km³ of water. Because 1 km³ of ice gives only 0.9 km³ of water: $360 / 0.9 = 400$ km³ of ice.",
    },
    {
      difficulty: "high",
      stem: "All mountain glaciers in the world together contain roughly 160,000 km³ of ice. About how much would sea level rise if they all melted?",
      options: ["about 4 cm", "about 40 cm", "about 4 m", "about 40 m"],
      answer: 1,
      explanation: "Water: $0.9 \\cdot 160{,}000 = 144{,}000$ km³. Rise: $144{,}000 / 360 = 400$ mm $= 40$ cm.",
    },
  ],
};

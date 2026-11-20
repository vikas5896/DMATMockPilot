import type { SubjectText } from "../types";

export const FOOD_CHAINS: SubjectText = {
  passage: {
    id: "d-food-chains",
    title: "Energy Flow in Food Chains",
    field: "Ecology",
    blocks: [
      {
        k: "p",
        text: "In an ecosystem, **producers** such as plants and algae capture the energy of sunlight by photosynthesis. **Consumers** obtain energy by eating: herbivores eat producers, and carnivores eat other animals. Each step of such a food chain is called a **trophic level**.",
      },
      {
        k: "p",
        text: "Only a small part of the energy of one trophic level reaches the next one. Much of the food is not eaten or not digested, and most of the energy that is taken up is used for the organisms' own life processes (respiration) and finally released as **heat**. As a rule of thumb, only about **10 %** of the energy passes from one trophic level to the next. Food chains therefore rarely have more than four or five levels, and feeding people directly with plants requires far less farmland than feeding them with animals raised on plants.",
      },
      {
        k: "p",
        text: "Some pollutants, such as certain pesticides and mercury, are not broken down or excreted. They accumulate in the organisms, and because each animal eats many organisms of the level below, their concentration increases from level to level (**biomagnification**).",
      },
      {
        k: "table",
        caption: "Table 1. Food chain in a lake. Energy stored per year in the producers, with the 10 % rule for the following levels.",
        head: ["Trophic level", "Organisms", "Energy (kJ per m² per year)"],
        rows: [
          ["1", "Algae (producers)", "100,000"],
          ["2", "Zooplankton (herbivores)", "?"],
          ["3", "Small fish", "?"],
          ["4", "Pike (top predator)", "?"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "According to the 10 % rule, how much energy reaches the zooplankton per m² and year?",
      options: ["10 kJ", "1,000 kJ", "10,000 kJ", "90,000 kJ"],
      answer: 2,
      explanation: "10 % of 100,000 kJ $= 10{,}000$ kJ. 90,000 kJ is the part that is lost.",
    },
    {
      difficulty: "low",
      stem: "Why can more people be fed from a field if they eat the crops directly instead of meat from animals fed with these crops?",
      options: [
        "Because animals do not digest plants.",
        "Because about 90 % of the energy is lost at each step of the food chain.",
        "Because plants contain more energy than they receive from the sun.",
        "Because meat contains no energy.",
      ],
      answer: 1,
      explanation: "Each additional trophic level loses about 90 % of the energy, so eating one level lower makes about ten times as much energy available.",
    },
    {
      difficulty: "medium",
      stem: "How much energy reaches the pike per m² and year?",
      options: ["10 kJ", "100 kJ", "1,000 kJ", "10,000 kJ"],
      answer: 1,
      explanation: "Three transfers from the algae: $100{,}000 \\cdot 0.1^3 = 100$ kJ.",
    },
    {
      difficulty: "medium",
      stem: "What share of the energy stored in the algae reaches the pike?",
      options: ["0.1 %", "1 %", "10 %", "30 %"],
      answer: 0,
      explanation: "$100 / 100{,}000 = 0.001 = 0.1$ %. 30 % would wrongly add the 10 % of three steps.",
    },
    {
      difficulty: "medium",
      stem: "Where does most of the energy that is not passed on to the next trophic level end up?",
      options: [
        "It is stored in the soil.",
        "It is released as heat after being used for life processes.",
        "It is passed back to the producers.",
        "It is destroyed.",
      ],
      answer: 1,
      explanation: "The text states that most of the energy taken up is used for respiration and finally released as heat. Energy is never destroyed.",
    },
    {
      difficulty: "high",
      stem: "A pesticide reaches the algae in a concentration of 0.002 mg/kg. At each trophic level, its concentration increases 5-fold. What concentration is expected in the pike?",
      options: ["0.01 mg/kg", "0.03 mg/kg", "0.25 mg/kg", "1.25 mg/kg"],
      answer: 2,
      explanation: "Three steps from algae to pike: $0.002 \\cdot 5^3 = 0.002 \\cdot 125 = 0.25$ mg/kg. 0.03 mg/kg adds the factor 5 three times instead of multiplying.",
    },
    {
      difficulty: "high",
      stem: "Suppose 20 % instead of 10 % of the energy were passed on at every step. How many times as much energy would reach the pike?",
      options: ["2 times", "4 times", "8 times", "20 times"],
      answer: 2,
      explanation: "$100{,}000 \\cdot 0.2^3 = 800$ kJ instead of 100 kJ: 8 times as much, because the factor 2 applies at each of the three steps ($2^3 = 8$).",
    },
  ],
};

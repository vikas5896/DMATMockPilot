import type { SubjectText } from "../types";

export const CO2_EQUIVALENTS: SubjectText = {
  passage: {
    id: "f-co2-equivalents",
    title: "Comparing Greenhouse Gases",
    field: "Climate Science",
    blocks: [
      {
        k: "p",
        text: "Carbon dioxide (CO₂) is not the only gas that warms the climate. Methane (CH₄) and nitrous oxide (N₂O) trap much more heat per kilogram, although they are emitted in smaller amounts. Methane comes, for example, from the digestion of cattle and from flooded rice fields; nitrous oxide is released mainly from nitrogen fertiliser in soils.",
      },
      {
        k: "p",
        text: "To compare the gases, each is given a **global warming potential** (GWP): how much a kilogram of the gas warms the climate over 100 years, compared with a kilogram of CO₂. Emissions are then expressed in **CO₂ equivalents** (CO₂e):",
      },
      { k: "formula", tex: "\\text{CO}_2\\text{e} = \\text{mass of the gas} \\cdot \\text{GWP}", label: "(1)" },
      {
        k: "table",
        caption: "Table 1. Global warming potential over 100 years (rounded).",
        head: ["Gas", "GWP"],
        rows: [
          ["Carbon dioxide (CO₂)", "1"],
          ["Methane (CH₄)", "28"],
          ["Nitrous oxide (N₂O)", "265"],
        ],
      },
      {
        k: "p",
        text: "**Example.** A dairy farm with 40 cows reports its annual emissions: 50 t of CO₂ (from fuel and electricity), 4 t of methane (about 100 kg per cow) and 0.2 t of nitrous oxide (from fertilised fields).",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many tonnes of CO₂ equivalents correspond to 1 t of methane?",
      options: ["1 t", "28 t", "265 t", "293 t"],
      answer: 1,
      explanation: "Formula (1): $1$ t $\\cdot 28 = 28$ t CO₂e.",
    },
    {
      difficulty: "low",
      stem: "Which gas in Table 1 warms the climate most per kilogram?",
      options: ["Carbon dioxide", "Methane", "Nitrous oxide", "All three equally"],
      answer: 2,
      explanation: "Nitrous oxide has the highest GWP (265).",
    },
    {
      difficulty: "medium",
      stem: "What are the farm's methane emissions in CO₂ equivalents?",
      options: ["4 t", "28 t", "112 t", "1,060 t"],
      answer: 2,
      explanation: "$4 \\cdot 28 = 112$ t CO₂e.",
    },
    {
      difficulty: "medium",
      stem: "What are the farm's total emissions in CO₂ equivalents?",
      options: ["54.2 t", "about 162 t", "about 215 t", "about 1,226 t"],
      answer: 2,
      explanation: "CO₂: 50 t; methane: $4 \\cdot 28 = 112$ t; nitrous oxide: $0.2 \\cdot 265 = 53$ t. Total: $50 + 112 + 53 = 215$ t CO₂e. 54.2 t simply adds the masses.",
    },
    {
      difficulty: "medium",
      stem: "A feed additive reduces the cows' methane emissions by 25 %. How much CO₂e does the farm save per year?",
      options: ["1 t", "12.5 t", "28 t", "53.75 t"],
      answer: 2,
      explanation: "25 % of 4 t $= 1$ t of methane, i.e. $1 \\cdot 28 = 28$ t CO₂e.",
    },
    {
      difficulty: "high",
      stem: "About what share of the farm's total CO₂-equivalent emissions comes from methane?",
      options: ["about 2 %", "about 25 %", "about 52 %", "about 75 %"],
      answer: 2,
      explanation: "$112 / 215 \\approx 0.52$. By mass, methane is only about 7 % of the gases emitted, but because of its high GWP it is the largest contributor.",
    },
    {
      difficulty: "high",
      stem: "Which measure saves more CO₂ equivalents: cutting CO₂ emissions by 10 t, or cutting nitrous oxide emissions by 0.05 t?",
      options: [
        "Cutting CO₂ by 10 t",
        "Cutting nitrous oxide by 0.05 t",
        "Both save exactly the same.",
        "This cannot be compared.",
      ],
      answer: 1,
      explanation: "Nitrous oxide: $0.05 \\cdot 265 = 13.25$ t CO₂e, which is more than 10 t.",
    },
  ],
};

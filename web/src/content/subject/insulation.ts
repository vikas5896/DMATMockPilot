import type { SubjectText } from "./types";

export const INSULATION: SubjectText = {
  passage: {
    id: "insulation",
    title: "Heat Loss and Thermal Insulation",
    field: "Engineering",
    blocks: [
      {
        k: "p",
        text: "In winter, heat flows from a warm room through the walls to the cold outside. The heat flow $\\Phi$ (in watt) through a wall of area $A$ is proportional to the temperature difference $\\Delta T$ between inside and outside:",
      },
      { k: "formula", tex: "\\Phi = U \\cdot A \\cdot \\Delta T", label: "(1)" },
      {
        k: "p",
        text: "The **U-value** (unit W/(m²·K)) describes how much heat a wall lets through. The smaller the U-value, the better the wall insulates. A temperature difference of 1 K is the same as a difference of 1 °C.",
      },
      {
        k: "p",
        text: "Each layer of a wall has a **thermal resistance** $R$, which depends on its thickness $d$ (in m) and the thermal conductivity $\\lambda$ of the material. For a wall made of several layers, the resistances add up, and the U-value is the inverse of the total resistance (ignoring the thin air layers at the surfaces):",
      },
      { k: "formula", tex: "R = \\frac{d}{\\lambda} \\qquad R_{total} = R_1 + R_2 + \\dots \\qquad U = \\frac{1}{R_{total}}", label: "(2)" },
      {
        k: "table",
        caption: "Table 1. Thermal conductivity λ of some materials.",
        head: ["Material", "λ in W/(m·K)"],
        rows: [
          ["Concrete", "2.0"],
          ["Brick", "0.8"],
          ["Wood", "0.15"],
          ["Mineral wool", "0.04"],
        ],
      },
      {
        k: "p",
        text: "The energy lost over a time $t$ is $E = \\Phi \\cdot t$. A heat flow of 1,000 W lasting one hour corresponds to 1 kWh.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A wall with $U$ = 0.5 W/(m²·K) and an area of 20 m² separates a room at 20 °C from the outside at 0 °C. How large is the heat flow through the wall?",
      options: ["20 W", "200 W", "400 W", "2,000 W"],
      answer: 1,
      explanation: "Formula (1): $\\Phi = 0.5 \\cdot 20 \\cdot 20 = 200$ W.",
    },
    {
      difficulty: "low",
      stem: "Which material from Table 1 insulates best at the same thickness?",
      options: ["Concrete", "Brick", "Wood", "Mineral wool"],
      answer: 3,
      explanation: "The smaller $\\lambda$, the larger $R = d/\\lambda$ at the same thickness. Mineral wool has the smallest conductivity (0.04).",
    },
    {
      difficulty: "medium",
      stem: "What is the thermal resistance of a 20 cm thick concrete layer?",
      options: ["0.1 m²·K/W", "0.4 m²·K/W", "2.5 m²·K/W", "10 m²·K/W"],
      answer: 0,
      explanation: "$R = d / \\lambda = 0.2 / 2.0 = 0.1$ m²·K/W. Note that the thickness must be in metres.",
    },
    {
      difficulty: "medium",
      stem: "The 20 cm concrete wall is covered with 12 cm of mineral wool. What is the approximate U-value of the combined wall?",
      options: ["0.1 W/(m²·K)", "0.32 W/(m²·K)", "3.1 W/(m²·K)", "10 W/(m²·K)"],
      answer: 1,
      explanation: "Mineral wool: $R = 0.12 / 0.04 = 3$. Total: $3 + 0.1 = 3.1$ m²·K/W. $U = 1 / 3.1 \\approx 0.32$ W/(m²·K).",
    },
    {
      difficulty: "medium",
      stem: "On a milder day, the temperature difference between inside and outside is only half as large. What happens to the heat flow through the same wall?",
      options: ["It halves.", "It stays the same.", "It falls to a quarter.", "It doubles."],
      answer: 0,
      explanation: "In (1), $\\Phi$ is proportional to $\\Delta T$. Half the temperature difference gives half the heat flow.",
    },
    {
      difficulty: "high",
      stem: "How thick must a wooden layer be to have the same thermal resistance as 4 cm of mineral wool?",
      options: ["1.5 cm", "4 cm", "15 cm", "37.5 cm"],
      answer: 2,
      explanation: "Mineral wool: $R = 0.04 / 0.04 = 1$ m²·K/W. Wood needs $d = R \\cdot \\lambda = 1 \\cdot 0.15 = 0.15$ m = 15 cm.",
    },
    {
      difficulty: "high",
      stem: "A constant heat flow of 200 W leaves a house through one wall for a whole day. How much energy is lost?",
      options: ["0.2 kWh", "4.8 kWh", "48 kWh", "4,800 kWh"],
      answer: 1,
      explanation: "$E = 200$ W · 24 h = 4,800 Wh = 4.8 kWh.",
    },
  ],
};

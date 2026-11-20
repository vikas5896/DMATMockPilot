import type { SubjectText } from "../types";

export const GAS_LAWS: SubjectText = {
  passage: {
    id: "d-gas-laws",
    title: "Pressure, Volume and Temperature of Gases",
    field: "Physical Chemistry",
    blocks: [
      {
        k: "p",
        text: "The state of a gas is described by its pressure $p$, its volume $V$ and its temperature $T$. For many gases under everyday conditions, the **ideal gas law** applies, where $n$ is the amount of gas and $R$ a constant:",
      },
      { k: "formula", tex: "p \\cdot V = n \\cdot R \\cdot T", label: "(1)" },
      {
        k: "p",
        text: "In this law, the temperature must be the **absolute temperature** in kelvin: $T = \\vartheta + 273$, where $\\vartheta$ is the temperature in °C. On the Celsius scale, zero is chosen arbitrarily, so ratios of Celsius temperatures have no physical meaning.",
      },
      {
        k: "p",
        text: "For a fixed amount of gas, formula (1) leads to three special cases:",
      },
      {
        k: "list",
        items: [
          "Constant temperature: $p \\cdot V$ stays constant. Halving the volume doubles the pressure.",
          "Constant volume (closed rigid container): $p / T$ stays constant.",
          "Constant pressure (e.g. a balloon): $V / T$ stays constant.",
        ],
      },
      {
        k: "p",
        text: "In water, the pressure increases with depth: at the surface it is about 1 bar (air pressure), and every 10 m of depth adds about 1 bar.",
      },
      {
        k: "table",
        caption: "Table 1. Starting state of the air in a closed syringe.",
        head: ["Quantity", "Value"],
        rows: [
          ["Volume", "100 mL"],
          ["Pressure", "1 bar"],
          ["Temperature", "27 °C"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the absolute temperature of the air in the syringe?",
      options: ["27 K", "246 K", "273 K", "300 K"],
      answer: 3,
      explanation: "$T = 27 + 273 = 300$ K.",
    },
    {
      difficulty: "low",
      stem: "The plunger is pushed in slowly at constant temperature until the air has a volume of 50 mL. What is its pressure now?",
      options: ["0.5 bar", "1 bar", "2 bar", "50 bar"],
      answer: 2,
      explanation: "At constant temperature, $p \\cdot V$ is constant: half the volume means twice the pressure, 2 bar.",
    },
    {
      difficulty: "medium",
      stem: "The syringe is locked so that the volume cannot change, and the air is heated from 27 °C to 127 °C. What is the new pressure?",
      options: ["1.0 bar", "about 1.33 bar", "about 4.7 bar", "0.75 bar"],
      answer: 1,
      explanation: "Constant volume: $p/T$ constant. $T$ rises from 300 K to 400 K, so $p = 1 \\cdot \\frac{400}{300} \\approx 1.33$ bar. 4.7 bar would wrongly use $127/27$.",
    },
    {
      difficulty: "medium",
      stem: "A balloon holds 3 L of air at 300 K. At constant pressure, it is warmed to 350 K. What is its new volume?",
      options: ["2.57 L", "3.15 L", "3.5 L", "4.5 L"],
      answer: 2,
      explanation: "Constant pressure: $V/T$ constant. $V = 3 \\cdot \\frac{350}{300} = 3.5$ L.",
    },
    {
      difficulty: "medium",
      stem: "Why must temperatures be given in kelvin in these calculations?",
      options: [
        "Because kelvin values are always larger.",
        "Because the gas laws need temperatures measured from absolute zero; Celsius ratios have no physical meaning.",
        "Because gases do not exist below 0 °C.",
        "Because 1 K is larger than 1 °C.",
      ],
      answer: 1,
      explanation: "The text explains that the zero of the Celsius scale is arbitrary. Heating from 10 °C to 20 °C does not double the volume; only the absolute temperature works in the ratios.",
    },
    {
      difficulty: "high",
      stem: "The volume of a gas is halved and at the same time its absolute temperature is doubled. How does its pressure change?",
      options: ["It stays the same.", "It doubles.", "It becomes 4 times as high.", "It becomes a quarter."],
      answer: 2,
      explanation: "From formula (1): $p \\sim T / V$. Doubling $T$ doubles $p$, halving $V$ doubles it again: factor $2 \\cdot 2 = 4$.",
    },
    {
      difficulty: "high",
      stem: "A diver at a depth of 20 m breathes out an air bubble of 6 mL. It rises to the surface at constant temperature. What is its volume at the surface?",
      options: ["2 mL", "6 mL", "12 mL", "18 mL"],
      answer: 3,
      explanation: "At 20 m the pressure is $1 + 2 = 3$ bar; at the surface 1 bar. With $p \\cdot V$ constant: $V = 6 \\cdot 3 / 1 = 18$ mL. 12 mL forgets the air pressure at the surface.",
    },
  ],
};

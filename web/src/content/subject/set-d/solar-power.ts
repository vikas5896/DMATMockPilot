import type { SubjectText } from "../types";

export const SOLAR_POWER: SubjectText = {
  passage: {
    id: "d-solar-power",
    title: "Electricity from Solar Panels",
    field: "Renewable Energy",
    blocks: [
      {
        k: "p",
        text: "Solar panels convert part of the sunlight falling on them into electrical power. On a clear day around noon, about $1{,}000$ W of sunlight fall on each square metre of a panel facing the sun; this value is used as the standard test condition. The **efficiency** $\\eta$ of a panel is the electrical power it delivers divided by the solar power falling on it:",
      },
      { k: "formula", tex: "\\eta = \\frac{P_{el}}{1{,}000\\ \\text{W/m}^2 \\cdot A}", label: "(1)" },
      {
        k: "p",
        text: "The power a panel delivers under these standard conditions is called its **peak power**, given in watt-peak (Wp) or kilowatt-peak (kWp). Over a year, a panel produces much less than its peak power times the hours of the year, because of night, clouds and the changing angle of the sun. Planners therefore use the **specific yield**: the energy produced per year by each kWp of installed power. It depends mainly on the amount of sunshine at the location.",
      },
      { k: "formula", tex: "E_{\\text{year}} = P_{\\text{peak}} \\cdot \\text{specific yield}", label: "(2)" },
      {
        k: "table",
        caption: "Table 1. A panel and a rooftop system (example values).",
        head: ["Item", "Value"],
        rows: [
          ["Area of one panel", "2 m²"],
          ["Peak power of one panel", "400 Wp"],
          ["Panels on the roof", "10"],
          ["Specific yield in Germany", "950 kWh per kWp and year"],
          ["Specific yield in India", "1,500 kWh per kWp and year"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the efficiency of one panel in Table 1?",
      options: ["2 %", "4 %", "20 %", "40 %"],
      answer: 2,
      explanation: "Formula (1): solar power on the panel $= 1{,}000 \\cdot 2 = 2{,}000$ W; $\\eta = 400 / 2{,}000 = 0.2 = 20$ %.",
    },
    {
      difficulty: "low",
      stem: "What is the peak power of the whole rooftop system?",
      options: ["0.4 kWp", "4 kWp", "40 kWp", "4,000 kWp"],
      answer: 1,
      explanation: "$10 \\cdot 400$ Wp $= 4{,}000$ Wp $= 4$ kWp.",
    },
    {
      difficulty: "low",
      stem: "Why is the specific yield in Germany lower than in India?",
      options: [
        "Because German panels are smaller.",
        "Because there is less sunshine at the location.",
        "Because the peak power is measured differently.",
        "Because the efficiency of panels depends on the country.",
      ],
      answer: 1,
      explanation: "The text states that the specific yield depends mainly on the amount of sunshine at the location; the panels are the same.",
    },
    {
      difficulty: "medium",
      stem: "How much electrical energy does the rooftop system produce per year in Germany?",
      options: ["950 kWh", "2,375 kWh", "3,800 kWh", "6,000 kWh"],
      answer: 2,
      explanation: "Formula (2): $4$ kWp $\\cdot 950$ kWh/kWp $= 3{,}800$ kWh.",
    },
    {
      difficulty: "medium",
      stem: "How much more energy per year would the same system produce in India than in Germany?",
      options: ["550 kWh", "2,200 kWh", "3,800 kWh", "6,000 kWh"],
      answer: 1,
      explanation: "India: $4 \\cdot 1{,}500 = 6{,}000$ kWh. Difference: $6{,}000 - 3{,}800 = 2{,}200$ kWh. 550 kWh is the difference per kWp only.",
    },
    {
      difficulty: "medium",
      stem: "How many panels of the type in Table 1 are needed for a system with a peak power of 6 kWp?",
      options: ["6", "12", "15", "24"],
      answer: 2,
      explanation: "$6{,}000$ Wp $/ 400$ Wp $= 15$ panels.",
    },
    {
      difficulty: "high",
      stem: "The German system costs 8,000 €. Each kWh it produces saves on average 0.20 €. After about how many years has it paid for itself?",
      options: ["about 5 years", "about 10.5 years", "about 21 years", "about 40 years"],
      answer: 1,
      explanation: "Savings per year: $3{,}800 \\cdot 0.20 = 760$ €. $8{,}000 / 760 \\approx 10.5$ years.",
    },
    {
      difficulty: "high",
      stem: "The roof has room for exactly 10 panels of 2 m² each. How much more peak power would panels with an efficiency of 22 % instead of 20 % deliver?",
      options: ["2 %", "10 %", "22 %", "110 %"],
      answer: 1,
      explanation: "Same area, so peak power is proportional to efficiency: $22/20 = 1.1$, i.e. 10 % more (440 Wp instead of 400 Wp per panel). The efficiency rises by 2 percentage points, but by 10 percent.",
    },
  ],
};

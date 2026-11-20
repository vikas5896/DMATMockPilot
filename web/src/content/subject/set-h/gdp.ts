import type { SubjectText } from "../types";

export const GDP: SubjectText = {
  passage: {
    id: "h-gdp",
    title: "Nominal and Real Gross Domestic Product",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "The **gross domestic product** (GDP) measures the market value of all final goods and services produced in a country in one year. **Nominal GDP** values the quantities at the prices of the same year. If prices rise, nominal GDP grows even when nothing more is produced. **Real GDP** therefore values the quantities of every year at the prices of a fixed **base year**; it changes only when quantities change.",
      },
      {
        k: "p",
        text: "The ratio of the two is a price index for the whole economy, the **GDP deflator**:",
      },
      { k: "formula", tex: "\\text{deflator} = \\frac{\\text{nominal GDP}}{\\text{real GDP}} \\cdot 100", label: "(1)" },
      {
        k: "p",
        text: "Growth rates are calculated relative to the earlier year. To compare living standards, real GDP is often divided by the population (**real GDP per capita**).",
      },
      {
        k: "p",
        text: "**Example.** A small island economy produces only tea and mobile phones. Year 1 is the base year. The island has 100 inhabitants in year 1 and 104 in year 2.",
      },
      {
        k: "table",
        caption: "Table 1. Quantities and prices (prices in €).",
        head: ["Good", "Year 1 quantity", "Year 1 price", "Year 2 quantity", "Year 2 price"],
        rows: [
          ["Tea (kg)", "1,000", "5", "1,200", "6"],
          ["Phones", "100", "200", "110", "220"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the nominal GDP in year 1?",
      options: ["5,200 €", "20,000 €", "25,000 €", "31,400 €"],
      answer: 2,
      explanation: "$1{,}000 \\cdot 5 + 100 \\cdot 200 = 5{,}000 + 20{,}000 = 25{,}000$ €.",
    },
    {
      difficulty: "low",
      stem: "What is the nominal GDP in year 2?",
      options: ["28,000 €", "30,000 €", "31,400 €", "33,000 €"],
      answer: 2,
      explanation: "$1{,}200 \\cdot 6 + 110 \\cdot 220 = 7{,}200 + 24{,}200 = 31{,}400$ €.",
    },
    {
      difficulty: "low",
      stem: "Why is real GDP better than nominal GDP for comparing how much an economy produces over time?",
      options: [
        "Because it includes more goods.",
        "Because it removes the effect of price changes.",
        "Because it is always higher.",
        "Because it is divided by the population.",
      ],
      answer: 1,
      explanation: "Real GDP uses the prices of a fixed base year, so it changes only when quantities change.",
    },
    {
      difficulty: "medium",
      stem: "What is the real GDP in year 2 (in prices of year 1)?",
      options: ["25,000 €", "28,000 €", "29,200 €", "31,400 €"],
      answer: 1,
      explanation: "Year 2 quantities at year 1 prices: $1{,}200 \\cdot 5 + 110 \\cdot 200 = 6{,}000 + 22{,}000 = 28{,}000$ €.",
    },
    {
      difficulty: "medium",
      stem: "What is the real growth rate from year 1 to year 2?",
      options: ["10 %", "12 %", "20 %", "25.6 %"],
      answer: 1,
      explanation: "$(28{,}000 - 25{,}000) / 25{,}000 = 0.12 = 12$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the nominal growth rate from year 1 to year 2?",
      options: ["12 %", "about 21 %", "25.6 %", "31.4 %"],
      answer: 2,
      explanation: "$(31{,}400 - 25{,}000) / 25{,}000 = 6{,}400 / 25{,}000 = 0.256 = 25.6$ %. More than half of it is price increases.",
    },
    {
      difficulty: "high",
      stem: "What is the GDP deflator in year 2?",
      options: ["about 89", "100", "about 112", "125.6"],
      answer: 2,
      explanation: "Formula (1): $31{,}400 / 28{,}000 \\cdot 100 \\approx 112$: prices rose by about 12 % on average.",
    },
    {
      difficulty: "high",
      stem: "By about what percentage did real GDP per capita grow from year 1 to year 2?",
      options: ["about 4 %", "about 7.7 %", "12 %", "about 16 %"],
      answer: 1,
      explanation: "Year 1: $25{,}000 / 100 = 250$ €. Year 2: $28{,}000 / 104 \\approx 269.2$ €. Growth: $19.2 / 250 \\approx 7.7$ %. Population growth eats up part of the 12 %.",
    },
  ],
};

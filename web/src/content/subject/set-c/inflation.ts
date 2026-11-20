import type { SubjectText } from "../types";

export const INFLATION: SubjectText = {
  passage: {
    id: "c-inflation",
    title: "Measuring Inflation with a Price Index",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "**Inflation** is a general rise in prices. To measure it, statistics offices define a **basket** of goods and services that a typical household buys and record what this fixed basket costs every year. The cost in a chosen **base year** is set to 100. The **consumer price index** (CPI) of a later year is:",
      },
      { k: "formula", tex: "\\text{CPI}_t = \\frac{\\text{cost of the basket in year } t}{\\text{cost of the basket in the base year}} \\cdot 100", label: "(1)" },
      {
        k: "p",
        text: "The **inflation rate** from one year to the next is the percentage change of the CPI, always relative to the earlier year:",
      },
      { k: "formula", tex: "\\pi_t = \\frac{\\text{CPI}_t - \\text{CPI}_{t-1}}{\\text{CPI}_{t-1}} \\cdot 100\\,\\%", label: "(2)" },
      {
        k: "p",
        text: "Prices also matter for incomes and savings. A **nominal** wage is the amount of money paid; the **real** wage measures what this money can buy and is found by dividing the nominal wage by the price level (CPI/100). Similarly, the real interest rate on savings is approximately the nominal interest rate minus the inflation rate.",
      },
      {
        k: "table",
        caption: "Table 1. Monthly basket of a student household (prices in €). Base year 2020.",
        head: ["Item", "Cost in 2020", "Cost in 2024"],
        rows: [
          ["Rent", "400", "480"],
          ["Food", "200", "260"],
          ["Transport", "50", "50"],
          ["Other", "150", "170"],
          ["Total", "800", "960"],
        ],
      },
      {
        k: "table",
        caption: "Table 2. Consumer price index of the student basket (2020 = 100).",
        head: ["Year", "2020", "2021", "2022", "2023", "2024"],
        rows: [["CPI", "100", "104", "112", "118", "120"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which value of the CPI for 2024 follows from Table 1?",
      options: ["112", "118", "120", "160"],
      answer: 2,
      explanation: "Formula (1): $960 / 800 \\cdot 100 = 120$, as also shown in Table 2. 160 is the increase in euros, not the index.",
    },
    {
      difficulty: "low",
      stem: "What was the inflation rate from 2020 to 2021?",
      options: ["0.4 %", "1.04 %", "4 %", "104 %"],
      answer: 2,
      explanation: "Formula (2): $(104 - 100) / 100 = 0.04 = 4$ %.",
    },
    {
      difficulty: "low",
      stem: "Which item of the basket did not become more expensive between 2020 and 2024?",
      options: ["Rent", "Food", "Transport", "Other"],
      answer: 2,
      explanation: "Table 1: transport costs 50 € in both years. All other items became more expensive.",
    },
    {
      difficulty: "medium",
      stem: "What was the inflation rate from 2021 to 2022?",
      options: ["about 7.1 %", "about 7.7 %", "8.0 %", "12.0 %"],
      answer: 1,
      explanation: "Formula (2): $(112 - 104) / 104 = 8/104 \\approx 0.077 = 7.7$ %. The CPI rose by 8 index points, but the rate is relative to the earlier year (104), not to 100.",
    },
    {
      difficulty: "medium",
      stem: "Which item of the basket had the largest percentage price increase from 2020 to 2024?",
      options: ["Rent", "Food", "Transport", "Other"],
      answer: 1,
      explanation: "Rent: $80/400 = 20$ %; food: $60/200 = 30$ %; transport: 0 %; other: $20/150 \\approx 13$ %. Rent rose most in euros, food most in percent.",
    },
    {
      difficulty: "medium",
      stem: "A savings account pays 3 % interest per year while prices rise by 5 % per year. What is the approximate real interest rate?",
      options: ["+8 %", "+2 %", "−2 %", "−5 %"],
      answer: 2,
      explanation: "Real interest ≈ nominal interest − inflation $= 3 - 5 = -2$ %: the savings buy about 2 % less each year.",
    },
    {
      difficulty: "high",
      stem: "A student's monthly income was 1,500 € in 2020 and 1,740 € in 2024. How did the real income change, measured with the student basket?",
      options: [
        "It rose by 16 %.",
        "It rose by about 4 %.",
        "It stayed the same.",
        "It fell by about 3 %.",
      ],
      answer: 3,
      explanation: "Real income 2024 in 2020 prices: $1{,}740 / 1.20 = 1{,}450$ €. Compared with 1,500 €, that is $-50/1{,}500 \\approx -3.3$ %. The nominal rise of 16 % is smaller than the price rise of 20 %.",
    },
    {
      difficulty: "high",
      stem: "Which share of the increase in the basket's cost from 2020 to 2024 is due to rent?",
      options: ["20 %", "40 %", "50 %", "80 %"],
      answer: 2,
      explanation: "The basket became $960 - 800 = 160$ € more expensive; rent rose by $480 - 400 = 80$ €. $80 / 160 = 50$ %.",
    },
  ],
};

import type { SubjectText } from "../types";

export const INCOME_TAX: SubjectText = {
  passage: {
    id: "e-income-tax",
    title: "Progressive Income Tax",
    field: "Public Finance",
    blocks: [
      {
        k: "p",
        text: "Most countries tax income **progressively**: higher incomes pay a higher share of tax. In a system with **tax brackets**, the income is divided into slices, and each slice is taxed at its own rate. A higher rate therefore applies only to the part of the income that lies in the higher bracket, not to the whole income.",
      },
      {
        k: "p",
        text: "Before the brackets are applied, a **standard deduction** is subtracted from the gross income. The result is the **taxable income**. Two rates describe a person's tax burden:",
      },
      {
        k: "list",
        items: [
          "The **marginal tax rate** is the rate on the last (next) unit of taxable income, i.e. the rate of the bracket in which the taxable income ends.",
          "The **average tax rate** is the total tax divided by the gross income.",
        ],
      },
      {
        k: "p",
        text: "Because only the additional income is taxed at the higher rate, a pay rise in such a system always increases the income left after tax. Table 1 shows the simplified tax schedule of a fictional country. The standard deduction is **50,000 ₹** per year.",
      },
      {
        k: "table",
        caption: "Table 1. Tax brackets (taxable income per year).",
        head: ["Slice of taxable income", "Tax rate on this slice"],
        rows: [
          ["0 – 300,000 ₹", "0 %"],
          ["300,000 – 700,000 ₹", "5 %"],
          ["700,000 – 1,000,000 ₹", "10 %"],
          ["above 1,000,000 ₹", "20 %"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the taxable income of a person with a gross income of 650,000 ₹?",
      options: ["300,000 ₹", "600,000 ₹", "650,000 ₹", "700,000 ₹"],
      answer: 1,
      explanation: "Gross income minus the standard deduction: $650{,}000 - 50{,}000 = 600{,}000$ ₹.",
    },
    {
      difficulty: "low",
      stem: "What is the marginal tax rate for a taxable income of 850,000 ₹?",
      options: ["0 %", "5 %", "10 %", "20 %"],
      answer: 2,
      explanation: "850,000 ₹ lies in the bracket 700,000 – 1,000,000 ₹, whose rate is 10 %.",
    },
    {
      difficulty: "low",
      stem: "Which statement about this tax system is correct?",
      options: [
        "A pay rise can reduce the income left after tax.",
        "When the income crosses a bracket limit, the whole income is taxed at the higher rate.",
        "A pay rise always increases the income left after tax.",
        "The average tax rate is always higher than the marginal tax rate.",
      ],
      answer: 2,
      explanation: "Only the extra income is taxed at the higher rate, so at least 80 % of every additional rupee remains. The average rate is never above the marginal rate.",
    },
    {
      difficulty: "medium",
      stem: "How much tax does a person with a gross income of 650,000 ₹ pay?",
      options: ["15,000 ₹", "17,500 ₹", "30,000 ₹", "32,500 ₹"],
      answer: 0,
      explanation: "Taxable income 600,000 ₹: the first 300,000 ₹ are tax-free, the next 300,000 ₹ are taxed at 5 %: $0.05 \\cdot 300{,}000 = 15{,}000$ ₹. 32,500 ₹ wrongly taxes the whole gross income at 5 %.",
    },
    {
      difficulty: "medium",
      stem: "A person with a gross income of 1,250,000 ₹ pays 90,000 ₹ tax. What is the average tax rate?",
      options: ["7.2 %", "7.5 %", "10 %", "20 %"],
      answer: 0,
      explanation: "Average rate = tax / gross income $= 90{,}000 / 1{,}250{,}000 = 0.072 = 7.2$ %. 7.5 % divides by the taxable income instead; 20 % is the marginal rate.",
    },
    {
      difficulty: "medium",
      stem: "The person with a gross income of 1,250,000 ₹ gets a pay rise of 100,000 ₹. How much of the rise is left after tax?",
      options: ["80,000 ₹", "90,000 ₹", "92,800 ₹", "100,000 ₹"],
      answer: 0,
      explanation: "The whole rise lies in the 20 % bracket: tax $0.2 \\cdot 100{,}000 = 20{,}000$ ₹, so 80,000 ₹ remain.",
    },
    {
      difficulty: "high",
      stem: "Show that a gross income of 1,250,000 ₹ leads to 90,000 ₹ tax. Which calculation is correct?",
      options: [
        "$0.2 \\cdot 1{,}200{,}000$",
        "$0.05 \\cdot 400{,}000 + 0.1 \\cdot 300{,}000 + 0.2 \\cdot 200{,}000$",
        "$0.05 \\cdot 300{,}000 + 0.1 \\cdot 300{,}000 + 0.2 \\cdot 250{,}000$",
        "$0.1 \\cdot 1{,}250{,}000 - 50{,}000$",
      ],
      answer: 1,
      explanation: "Taxable income 1,200,000 ₹: 0 % on 300,000; 5 % on 400,000 (= 20,000); 10 % on 300,000 (= 30,000); 20 % on the last 200,000 (= 40,000). Total 90,000 ₹.",
    },
    {
      difficulty: "high",
      stem: "Person A has a gross income of 400,000 ₹, person B one of 800,000 ₹. How many times as much tax does B pay as A?",
      options: ["2 times", "4 times", "10 times", "20 times"],
      answer: 2,
      explanation: "A: taxable 350,000 ₹, tax $0.05 \\cdot 50{,}000 = 2{,}500$ ₹. B: taxable 750,000 ₹, tax $0.05 \\cdot 400{,}000 + 0.1 \\cdot 50{,}000 = 25{,}000$ ₹. B pays 10 times as much with twice the income: that is progression.",
    },
  ],
};

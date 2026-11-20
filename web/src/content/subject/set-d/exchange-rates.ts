import type { SubjectText } from "../types";

export const EXCHANGE_RATES: SubjectText = {
  passage: {
    id: "d-exchange-rates",
    title: "Exchange Rates and Currency Conversion",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "An **exchange rate** states the price of one currency in another. In this text, all rates are given as the amount of a foreign currency that one euro buys, for example 1 € = 90 ₹ (Indian rupees). To convert euros into rupees, multiply by the rate; to convert rupees into euros, divide by it.",
      },
      {
        k: "p",
        text: "If one euro buys more rupees than before, the euro has **appreciated** (gained value) and the rupee has **depreciated** (lost value). The changes are not equal in percent: if the euro becomes 10 % dearer in rupees, the rupee loses less than 10 % of its value in euros, because the base of the comparison is different.",
      },
      {
        k: "p",
        text: "Banks do not exchange money at the middle rate. They **sell** euros to customers at a higher rate and **buy** euros back at a lower rate; the difference (the **spread**) is their income. The rate between two foreign currencies (a **cross rate**) can be calculated from their rates against the euro.",
      },
      {
        k: "table",
        caption: "Table 1. Middle rates: what 1 € buys (example values).",
        head: ["Currency", "1 € ="],
        rows: [
          ["Indian rupee (INR)", "90 ₹"],
          ["US dollar (USD)", "1.10 USD"],
          ["British pound (GBP)", "0.85 £"],
        ],
      },
      {
        k: "table",
        caption: "Table 2. Rates of a bank in India for euro cash.",
        head: ["Bank sells 1 € for", "Bank buys 1 € for"],
        rows: [["92 ₹", "88 ₹"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many rupees are 450 € at the middle rate?",
      options: ["5 ₹", "4,050 ₹", "40,500 ₹", "405,000 ₹"],
      answer: 2,
      explanation: "Euros into rupees: multiply by the rate. $450 \\cdot 90 = 40{,}500$ ₹.",
    },
    {
      difficulty: "low",
      stem: "What is one rupee worth in euros at the middle rate?",
      options: ["about 0.011 €", "about 0.11 €", "1.1 €", "90 €"],
      answer: 0,
      explanation: "Rupees into euros: divide by the rate. $1 / 90 \\approx 0.011$ €, i.e. about 1.1 cents.",
    },
    {
      difficulty: "low",
      stem: "Last year 1 € bought 95 ₹; today it buys 90 ₹. Which statement is correct?",
      options: [
        "The rupee has depreciated against the euro.",
        "The rupee has appreciated against the euro.",
        "Both currencies have appreciated.",
        "The exchange rate has not changed in value.",
      ],
      answer: 1,
      explanation: "One euro now buys fewer rupees, so a rupee is worth more in euros: the rupee has appreciated and the euro has depreciated.",
    },
    {
      difficulty: "medium",
      stem: "A student in India needs 1,000 € in cash for her first month in Germany and buys it from the bank in Table 2. How many rupees does she pay?",
      options: ["88,000 ₹", "90,000 ₹", "92,000 ₹", "180,000 ₹"],
      answer: 2,
      explanation: "The bank sells euros at 92 ₹: $1{,}000 \\cdot 92 = 92{,}000$ ₹. The middle rate (90) is not available to customers.",
    },
    {
      difficulty: "medium",
      stem: "The rupee depreciates: the rate moves from 1 € = 90 ₹ to 1 € = 99 ₹. How many rupees more does a tuition fee of 10,000 € now cost (at the middle rate)?",
      options: ["9,000 ₹", "90,000 ₹", "99,000 ₹", "900,000 ₹"],
      answer: 1,
      explanation: "Each euro costs $99 - 90 = 9$ ₹ more: $10{,}000 \\cdot 9 = 90{,}000$ ₹ more ($990{,}000$ instead of $900{,}000$ ₹).",
    },
    {
      difficulty: "high",
      stem: "The student buys 100 € from the bank in Table 2 and immediately sells them back to the same bank. How many rupees does she lose?",
      options: ["0 ₹", "200 ₹", "400 ₹", "800 ₹"],
      answer: 2,
      explanation: "She pays $100 \\cdot 92 = 9{,}200$ ₹ and gets back $100 \\cdot 88 = 8{,}800$ ₹: a loss of 400 ₹, the bank's spread.",
    },
    {
      difficulty: "high",
      stem: "Using Table 1, how many rupees does one US dollar buy?",
      options: ["about 81.8 ₹", "about 88.9 ₹", "about 91.1 ₹", "99 ₹"],
      answer: 0,
      explanation: "90 ₹ and 1.10 USD are both worth 1 €, so one dollar is worth $90 / 1.10 \\approx 81.8$ ₹. Multiplying ($90 \\cdot 1.1 = 99$) gives the wrong direction.",
    },
    {
      difficulty: "high",
      stem: "When the rate moves from 1 € = 90 ₹ to 1 € = 99 ₹, the euro becomes 10 % dearer in rupees. By about what percentage does the value of the rupee in euros fall?",
      options: ["1 %", "about 9.1 %", "10 %", "about 11.1 %"],
      answer: 1,
      explanation: "One rupee was worth $1/90$ € and is now worth $1/99$ €. The fall is $1 - \\frac{90}{99} = \\frac{9}{99} \\approx 9.1$ %. As the text explains, the two percentages differ.",
    },
  ],
};

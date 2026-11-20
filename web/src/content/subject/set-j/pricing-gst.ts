import type { SubjectText } from "../types";

export const PRICING_GST: SubjectText = {
  passage: {
    id: "j-pricing-gst",
    title: "Markup, Margin and Tax on Prices",
    field: "Business Administration",
    blocks: [
      {
        k: "p",
        text: "Sellers often set prices by adding a **markup** to their cost: a percentage **of the cost**. The resulting profit can also be expressed as a **margin**: a percentage **of the selling price**. Because the price is larger than the cost, the margin is always smaller than the markup for the same profit.",
      },
      { k: "formula", tex: "\\text{net price} = \\text{cost} \\cdot (1 + \\text{markup}) \\qquad \\text{margin} = \\frac{\\text{net price} - \\text{cost}}{\\text{net price}}", label: "(1)" },
      {
        k: "p",
        text: "Many countries add a tax on goods and services to the net price; in India this is the **Goods and Services Tax** (GST). In this text, a GST rate of **18 %** applies. The price the customer pays is the net price times 1.18. To find the net price from a price including GST, divide by 1.18; subtracting 18 % of the gross price is wrong, because the tax was calculated on the smaller net price.",
      },
      {
        k: "p",
        text: "**Example.** An educational publisher produces a printed exam guide at a cost of **600 ₹** per copy and sells it with a markup of **50 %**.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the net price of the exam guide (before GST)?",
      options: ["650 ₹", "800 ₹", "900 ₹", "1,200 ₹"],
      answer: 2,
      explanation: "Formula (1): $600 \\cdot 1.5 = 900$ ₹.",
    },
    {
      difficulty: "low",
      stem: "What is the difference between markup and margin?",
      options: [
        "Markup is the profit as a share of the cost; margin is the profit as a share of the price.",
        "Markup includes GST; margin does not.",
        "They are two names for the same number.",
        "Margin is the profit as a share of the cost; markup as a share of the price.",
      ],
      answer: 0,
      explanation: "This is how the text defines them: markup refers to the cost, margin to the selling price.",
    },
    {
      difficulty: "low",
      stem: "What does a customer pay for the guide including 18 % GST?",
      options: ["918 ₹", "1,000 ₹", "1,062 ₹", "1,080 ₹"],
      answer: 2,
      explanation: "$900 \\cdot 1.18 = 1{,}062$ ₹.",
    },
    {
      difficulty: "medium",
      stem: "What is the publisher's margin on the guide?",
      options: ["about 33.3 %", "50 %", "66.7 %", "150 %"],
      answer: 0,
      explanation: "Profit $900 - 600 = 300$ ₹. Margin $= 300 / 900 \\approx 33.3$ %, although the markup is 50 %.",
    },
    {
      difficulty: "medium",
      stem: "How much GST is included in the price paid by the customer?",
      options: ["108 ₹", "162 ₹", "180 ₹", "191 ₹"],
      answer: 1,
      explanation: "18 % of the net price: $0.18 \\cdot 900 = 162$ ₹.",
    },
    {
      difficulty: "medium",
      stem: "For a promotion, the publisher gives a 10 % discount on the net price. What profit per copy remains?",
      options: ["150 ₹", "210 ₹", "240 ₹", "270 ₹"],
      answer: 1,
      explanation: "New net price: $900 \\cdot 0.9 = 810$ ₹. Profit: $810 - 600 = 210$ ₹: a 10 % discount cuts the profit by 30 %.",
    },
    {
      difficulty: "high",
      stem: "A course costs 1,180 ₹ including 18 % GST. What is its net price?",
      options: ["967.60 ₹", "1,000 ₹", "1,062 ₹", "1,162 ₹"],
      answer: 1,
      explanation: "$1{,}180 / 1.18 = 1{,}000$ ₹. Subtracting 18 % of 1,180 ₹ (giving 967.60 ₹) is the mistake the text warns about.",
    },
    {
      difficulty: "high",
      stem: "Which markup on the cost of 600 ₹ is needed to obtain a margin of 40 %?",
      options: ["40 %", "60 %", "about 66.7 %", "140 %"],
      answer: 2,
      explanation: "Margin 40 % means cost = 60 % of the price: price $= 600 / 0.6 = 1{,}000$ ₹. Markup $= 400 / 600 \\approx 66.7$ %.",
    },
  ],
};

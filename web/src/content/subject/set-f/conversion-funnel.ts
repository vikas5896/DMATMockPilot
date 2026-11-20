import type { SubjectText } from "../types";

export const CONVERSION_FUNNEL: SubjectText = {
  passage: {
    id: "f-conversion-funnel",
    title: "The Online Sales Funnel",
    field: "Marketing",
    blocks: [
      {
        k: "p",
        text: "Online businesses describe the path from first visit to purchase as a **funnel**: at each step, some people continue and the rest drop out. The share of people who move on from one step to the next is the **conversion rate** of that step. The **overall conversion rate** is the share of the first step that reaches the last step; it equals the product of the conversion rates of all steps.",
      },
      {
        k: "p",
        text: "Two further measures relate the funnel to money. The **customer acquisition cost** (CAC) is the marketing spending divided by the number of new customers. The **return on advertising spend** (ROAS) is the revenue from these customers divided by the advertising spending.",
      },
      {
        k: "p",
        text: "**Example.** An online exam-preparation platform analyses one month of advertising. Visitors come to the website, some create a free account, some of these take a free mock test, and some of these finally buy a pack for 1,000 ₹ on average. The platform spent **60,000 ₹** on advertising in that month.",
      },
      {
        k: "table",
        caption: "Table 1. The platform's funnel in one month.",
        head: ["Step", "Number of people"],
        rows: [
          ["Visitors to the website", "20,000"],
          ["Created a free account", "1,600"],
          ["Took the free mock test", "1,200"],
          ["Bought a pack", "120"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What share of the visitors created a free account?",
      options: ["0.6 %", "8 %", "12.5 %", "80 %"],
      answer: 1,
      explanation: "$1{,}600 / 20{,}000 = 0.08 = 8$ %.",
    },
    {
      difficulty: "low",
      stem: "What share of the people with an account took the free mock test?",
      options: ["6 %", "10 %", "75 %", "133 %"],
      answer: 2,
      explanation: "$1{,}200 / 1{,}600 = 0.75 = 75$ %.",
    },
    {
      difficulty: "low",
      stem: "At which step does the funnel lose the most people?",
      options: [
        "From visit to free account",
        "From free account to free mock test",
        "From free mock test to purchase",
        "The losses are equal at every step.",
      ],
      answer: 0,
      explanation: "18,400 visitors do not create an account, compared with 400 and 1,080 people at the later steps.",
    },
    {
      difficulty: "medium",
      stem: "What is the overall conversion rate from visitor to buyer?",
      options: ["0.6 %", "6 %", "10 %", "60 %"],
      answer: 0,
      explanation: "$120 / 20{,}000 = 0.006 = 0.6$ %. Equivalently: $0.08 \\cdot 0.75 \\cdot 0.10 = 0.006$.",
    },
    {
      difficulty: "medium",
      stem: "What is the customer acquisition cost?",
      options: ["3 ₹", "50 ₹", "500 ₹", "1,000 ₹"],
      answer: 2,
      explanation: "$60{,}000 / 120 = 500$ ₹ per new customer.",
    },
    {
      difficulty: "medium",
      stem: "What is the return on advertising spend (ROAS)?",
      options: ["0.5", "2", "120", "500"],
      answer: 1,
      explanation: "Revenue: $120 \\cdot 1{,}000 = 120{,}000$ ₹; ROAS $= 120{,}000 / 60{,}000 = 2$: each rupee of advertising brought 2 ₹ of revenue.",
    },
    {
      difficulty: "high",
      stem: "A redesign of the website raises the share of visitors who create an account from 8 % to 10 %. All other rates stay the same. How many additional buyers per month are expected?",
      options: ["2", "24", "30", "150"],
      answer: 2,
      explanation: "Buyers: $20{,}000 \\cdot 0.10 \\cdot 0.75 \\cdot 0.10 = 150$ instead of 120: 30 more. 150 is the new total.",
    },
    {
      difficulty: "high",
      stem: "With the original conversion rates, how many visitors would be needed to win 200 buyers in a month?",
      options: ["20,000", "26,667", "about 33,333", "40,000"],
      answer: 2,
      explanation: "Overall conversion 0.6 %: $200 / 0.006 \\approx 33{,}333$ visitors.",
    },
  ],
};

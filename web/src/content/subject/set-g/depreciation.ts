import type { SubjectText } from "../types";

export const DEPRECIATION: SubjectText = {
  passage: {
    id: "g-depreciation",
    title: "Depreciation of Machines",
    field: "Accounting",
    blocks: [
      {
        k: "p",
        text: "Machines lose value through wear and ageing. In accounting, this loss is recorded as **depreciation**, spread over the machine's **useful life**. The value still shown in the books is the **book value**: purchase price minus all depreciation so far. Two common methods are:",
      },
      {
        k: "list",
        items: [
          "**Straight-line method:** the same amount every year. The purchase price minus the expected **residual value** (what the machine is still worth at the end) is divided by the useful life.",
          "**Declining-balance method:** every year, a fixed percentage of the **current book value** is written off. Depreciation is high at first and falls every year; the book value never reaches zero.",
        ],
      },
      { k: "formula", tex: "\\text{straight-line depreciation per year} = \\frac{\\text{purchase price} - \\text{residual value}}{\\text{useful life}}", label: "(1)" },
      {
        k: "p",
        text: "**Example.** A company buys a machine for **100,000 €**. Its useful life is **5 years**, and its residual value afterwards is expected to be **10,000 €**. For the declining-balance method, the company uses a rate of **30 %** per year.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the annual depreciation with the straight-line method?",
      options: ["10,000 €", "18,000 €", "20,000 €", "30,000 €"],
      answer: 1,
      explanation: "Formula (1): $(100{,}000 - 10{,}000) / 5 = 18{,}000$ €. 20,000 € ignores the residual value.",
    },
    {
      difficulty: "low",
      stem: "What is the book value after 2 years with the straight-line method?",
      options: ["36,000 €", "60,000 €", "64,000 €", "82,000 €"],
      answer: 2,
      explanation: "$100{,}000 - 2 \\cdot 18{,}000 = 64{,}000$ €.",
    },
    {
      difficulty: "low",
      stem: "What is the book value at the end of year 5 with the straight-line method?",
      options: ["0 €", "10,000 €", "18,000 €", "90,000 €"],
      answer: 1,
      explanation: "After 5 years, $5 \\cdot 18{,}000 = 90{,}000$ € have been written off, leaving the residual value of 10,000 €.",
    },
    {
      difficulty: "medium",
      stem: "What is the depreciation in the first year with the declining-balance method?",
      options: ["18,000 €", "27,000 €", "30,000 €", "70,000 €"],
      answer: 2,
      explanation: "30 % of 100,000 € $= 30{,}000$ €.",
    },
    {
      difficulty: "medium",
      stem: "What is the book value after 2 years with the declining-balance method?",
      options: ["40,000 €", "49,000 €", "51,000 €", "60,000 €"],
      answer: 1,
      explanation: "Year 1: $100{,}000 \\cdot 0.7 = 70{,}000$ €. Year 2: $70{,}000 \\cdot 0.7 = 49{,}000$ €. 40,000 € would subtract 30,000 € twice.",
    },
    {
      difficulty: "medium",
      stem: "What is the depreciation in year 3 with the declining-balance method?",
      options: ["9,000 €", "14,700 €", "18,000 €", "30,000 €"],
      answer: 1,
      explanation: "30 % of the book value at the start of year 3 (49,000 €): $0.3 \\cdot 49{,}000 = 14{,}700$ €.",
    },
    {
      difficulty: "high",
      stem: "In which year is the depreciation of the straight-line method higher than that of the declining-balance method for the first time?",
      options: ["Year 1", "Year 2", "Year 3", "Year 5"],
      answer: 2,
      explanation: "Declining balance: 30,000 €, 21,000 €, 14,700 €, … Straight line: always 18,000 €. In year 3, $18{,}000 > 14{,}700$.",
    },
    {
      difficulty: "high",
      stem: "Why does the book value never reach zero with the declining-balance method?",
      options: [
        "Because the rate is less than 50 %.",
        "Because each year only a percentage of the remaining book value is written off.",
        "Because the residual value is subtracted first.",
        "Because depreciation rises every year.",
      ],
      answer: 1,
      explanation: "70 % of a positive value is always positive: $100{,}000 \\cdot 0.7^n > 0$ for every $n$.",
    },
  ],
};

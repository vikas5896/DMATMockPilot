import type { SubjectText } from "./types";

export const STATISTICS: SubjectText = {
  passage: {
    id: "statistics",
    title: "Describing Data",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "To summarise a list of numbers, statisticians use measures of the *centre* and of the *spread* of the data.",
      },
      {
        k: "list",
        items: [
          "The **mean** is the sum of all values divided by their number.",
          "The **median** is the middle value when the values are sorted. With an even number of values, it is the mean of the two middle values.",
          "The **mode** is the value that occurs most often.",
          "The **range** is the difference between the largest and the smallest value.",
        ],
      },
      {
        k: "p",
        text: "Extreme values, so-called **outliers**, pull the mean strongly in their direction, while the median hardly reacts to them. For skewed data such as incomes, the median therefore often describes a typical value better.",
      },
      {
        k: "p",
        text: "The **standard deviation** $s$ measures how far the values typically lie from the mean. Many measurements (for example body height or test scores) follow a bell-shaped *normal distribution*. For such data, about 68 % of all values lie within one standard deviation of the mean, about 95 % within two and about 99.7 % within three standard deviations.",
      },
      {
        k: "table",
        caption: "Table 1. Monthly net income of the nine people working in a small company (in €), sorted.",
        head: ["Person", "1", "2", "3", "4", "5", "6", "7", "8", "9 (owner)"],
        rows: [["Income", "1,800", "2,000", "2,100", "2,200", "2,200", "2,400", "2,500", "2,700", "12,000"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the median income in Table 1?",
      options: ["2,000 €", "2,200 €", "2,400 €", "3,322 €"],
      answer: 1,
      explanation: "With 9 sorted values, the median is the 5th value: 2,200 €.",
    },
    {
      difficulty: "low",
      stem: "What is the mode of the incomes in Table 1?",
      options: ["1,800 €", "2,200 €", "2,700 €", "12,000 €"],
      answer: 1,
      explanation: "2,200 € is the only value that occurs twice.",
    },
    {
      difficulty: "medium",
      stem: "What is the approximate mean income in Table 1?",
      options: ["About 2,200 €", "About 2,500 €", "About 3,320 €", "About 12,000 €"],
      answer: 2,
      explanation: "Sum: 1,800 + 2,000 + 2,100 + 2,200 + 2,200 + 2,400 + 2,500 + 2,700 + 12,000 = 29,900 €. Divided by 9: about 3,322 €.",
    },
    {
      difficulty: "medium",
      stem: "Which measure best describes the income of a typical person in this company, and why?",
      options: [
        "The median, because the owner's very high income hardly affects it.",
        "The mean, because it uses all nine values.",
        "The range, because it shows the difference between the incomes.",
        "The mean, because outliers make it more precise.",
      ],
      answer: 0,
      explanation: "The owner's 12,000 € is an outlier that pulls the mean up to about 3,322 €, more than eight of the nine people earn. The median (2,200 €) is not affected.",
    },
    {
      difficulty: "medium",
      stem: "What is the range of the incomes in Table 1?",
      options: ["2,200 €", "900 €", "10,200 €", "12,000 €"],
      answer: 2,
      explanation: "Range = largest − smallest value = 12,000 − 1,800 = 10,200 €.",
    },
    {
      difficulty: "high",
      stem: "Test scores are normally distributed with a mean of 60 points and a standard deviation of 10 points. Roughly what share of students score between 40 and 80 points?",
      options: ["About 50 %", "About 68 %", "About 95 %", "About 99.7 %"],
      answer: 2,
      explanation: "40 and 80 lie two standard deviations below and above the mean ($60 \\pm 2 \\cdot 10$). About 95 % of values fall within two standard deviations.",
    },
    {
      difficulty: "high",
      stem: "The owner is left out and only the eight employees are considered. What happens to the mean income?",
      options: [
        "It falls to about 2,240 €.",
        "It stays about the same.",
        "It rises, because fewer people are counted.",
        "It falls to exactly 2,200 €, the median.",
      ],
      answer: 0,
      explanation: "Without the owner the sum is 29,900 − 12,000 = 17,900 €. Divided by 8: about 2,238 €, so the mean falls by more than 1,000 €.",
    },
  ],
};

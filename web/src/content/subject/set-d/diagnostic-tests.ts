import type { SubjectText } from "../types";

export const DIAGNOSTIC_TESTS: SubjectText = {
  passage: {
    id: "d-diagnostic-tests",
    title: "How Reliable Is a Medical Test?",
    field: "Medicine",
    blocks: [
      {
        k: "p",
        text: "No medical test is perfect. A sick person can be tested negative (a **false negative**), and a healthy person can be tested positive (a **false positive**). Two numbers describe the quality of a test:",
      },
      {
        k: "list",
        items: [
          "The **sensitivity** is the share of sick people whom the test correctly identifies as positive.",
          "The **specificity** is the share of healthy people whom the test correctly identifies as negative.",
        ],
      },
      {
        k: "p",
        text: "For a person who receives a result, another question matters: how likely is it that the result is right? The **positive predictive value** (PPV) is the share of people with a positive result who are actually sick; the **negative predictive value** (NPV) is the share of people with a negative result who are actually healthy. These values depend strongly on the **prevalence**, the share of people in the tested group who have the disease.",
      },
      {
        k: "p",
        text: "**Example.** In a screening programme, 10,000 people without symptoms are tested for a disease with a prevalence of 2 %. The test has a sensitivity of 90 % and a specificity of 95 %. Table 1 shows the expected results. Because most positive results in such a screening can be false, positive results are usually checked with a second, more specific test.",
      },
      {
        k: "table",
        caption: "Table 1. Expected results of the screening of 10,000 people.",
        head: ["", "Test positive", "Test negative", "Total"],
        rows: [
          ["Sick", "180", "20", "200"],
          ["Healthy", "490", "9,310", "9,800"],
          ["Total", "670", "9,330", "10,000"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many of the sick people in the screening are correctly tested positive?",
      options: ["20", "180", "200", "670"],
      answer: 1,
      explanation: "Sensitivity 90 % of the 200 sick people: $0.9 \\cdot 200 = 180$ (Table 1).",
    },
    {
      difficulty: "low",
      stem: "What does a specificity of 95 % mean?",
      options: [
        "95 % of sick people are tested positive.",
        "95 % of healthy people are tested negative.",
        "95 % of positive results are correct.",
        "95 % of the population is healthy.",
      ],
      answer: 1,
      explanation: "Specificity is the share of healthy people who are correctly tested negative ($9{,}310$ of $9{,}800$).",
    },
    {
      difficulty: "medium",
      stem: "What is the negative predictive value of the test in this screening?",
      options: ["90 %", "95 %", "about 97.9 %", "about 99.8 %"],
      answer: 3,
      explanation: "Of 9,330 negative results, 9,310 are healthy people: $9{,}310 / 9{,}330 \\approx 99.8$ %. A negative result is therefore very reliable here.",
    },
    {
      difficulty: "medium",
      stem: "Why are positive screening results usually checked with a second test?",
      options: [
        "Because the first test misses most sick people.",
        "Because many positive results in a screening are false positives.",
        "Because the second test has a lower specificity.",
        "Because negative results are usually wrong.",
      ],
      answer: 1,
      explanation: "With a low prevalence, false positives (490) outnumber true positives (180). A second, more specific test sorts them out.",
    },
    {
      difficulty: "medium",
      stem: "How many people in total receive a positive result?",
      options: ["180", "490", "670", "9,330"],
      answer: 2,
      explanation: "True positives plus false positives: $180 + 490 = 670$.",
    },
    {
      difficulty: "high",
      stem: "A person in the screening receives a positive result. What is the probability that this person is actually sick?",
      options: ["2 %", "about 27 %", "90 %", "95 %"],
      answer: 1,
      explanation: "PPV $= 180 / 670 \\approx 0.27$. Although the test is good, most positive results are false, because the disease is rare in the tested group.",
    },
    {
      difficulty: "high",
      stem: "The same test is used in a clinic where 20 % of 10,000 tested patients are sick. What is the positive predictive value there?",
      options: ["about 27 %", "50 %", "about 82 %", "90 %"],
      answer: 2,
      explanation: "Sick: 2,000, of which $0.9 \\cdot 2{,}000 = 1{,}800$ test positive. Healthy: 8,000, of which $5$ % $= 400$ test positive. PPV $= 1{,}800 / 2{,}200 \\approx 82$ %. A higher prevalence raises the PPV.",
    },
  ],
};

import type { SubjectText } from "../types";

export const NET_PROMOTER: SubjectText = {
  passage: {
    id: "i-net-promoter",
    title: "Measuring Customer Loyalty with the Net Promoter Score",
    field: "Business Administration",
    blocks: [
      {
        k: "p",
        text: "Many companies ask their customers a single question: \"How likely is it that you would recommend us to a friend?\", answered on a scale from 0 (not at all likely) to 10 (extremely likely). The answers are grouped into three categories:",
      },
      {
        k: "list",
        items: [
          "**Promoters** (9 or 10): enthusiastic customers who are likely to recommend the company.",
          "**Passives** (7 or 8): satisfied but not enthusiastic customers.",
          "**Detractors** (0 to 6): unhappy customers who may even warn others.",
        ],
      },
      {
        k: "p",
        text: "The **Net Promoter Score** (NPS) is the percentage of promoters minus the percentage of detractors. Passives count only in the total number of answers:",
      },
      { k: "formula", tex: "\\text{NPS} = \\%\\,\\text{promoters} - \\%\\,\\text{detractors}", label: "(1)" },
      {
        k: "p",
        text: "The NPS is given as a number between −100 (all detractors) and +100 (all promoters), without the % sign. Because it reduces a whole distribution to one number, very different distributions can have the same score, and small surveys can give unreliable results.",
      },
      {
        k: "table",
        caption: "Table 1. Survey of 400 students after an online course.",
        head: ["Answer", "0–6", "7–8", "9–10"],
        rows: [["Number of students", "80", "120", "200"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What percentage of the students in Table 1 are promoters?",
      options: ["20 %", "30 %", "50 %", "200 %"],
      answer: 2,
      explanation: "200 of the 400 students answered 9 or 10: $200 / 400 = 50$ %.",
    },
    {
      difficulty: "low",
      stem: "A student answers 7. In which category does the answer fall?",
      options: ["Promoter", "Passive", "Detractor", "It is not counted."],
      answer: 1,
      explanation: "Answers of 7 and 8 are passives.",
    },
    {
      difficulty: "low",
      stem: "What is the lowest possible NPS?",
      options: ["−100", "−10", "0", "−50"],
      answer: 0,
      explanation: "If all customers are detractors: $0 - 100 = -100$.",
    },
    {
      difficulty: "medium",
      stem: "What is the NPS of the online course?",
      options: ["20", "30", "50", "70"],
      answer: 1,
      explanation: "Promoters 50 %, detractors $80/400 = 20$ %: $50 - 20 = 30$.",
    },
    {
      difficulty: "medium",
      stem: "After an improvement, 40 of the passives become promoters. All other answers stay the same. What is the new NPS?",
      options: ["30", "35", "40", "60"],
      answer: 2,
      explanation: "Promoters: $240 / 400 = 60$ %; detractors still 20 %: $60 - 20 = 40$.",
    },
    {
      difficulty: "medium",
      stem: "A company finds that all of its customers answered 7 or 8. What is its NPS?",
      options: ["0", "50", "75", "100"],
      answer: 0,
      explanation: "No promoters and no detractors: $0 - 0 = 0$, although every customer is satisfied. This shows how the single number can mislead.",
    },
    {
      difficulty: "high",
      stem: "Starting again from Table 1, which change raises the NPS more: 40 passives becoming promoters, or 40 detractors becoming passives?",
      options: [
        "Passives becoming promoters",
        "Detractors becoming passives",
        "Both raise the NPS by the same amount.",
        "Neither changes the NPS.",
      ],
      answer: 2,
      explanation: "The first adds 10 percentage points of promoters (NPS 40); the second removes 10 percentage points of detractors ($50 - 10 = 40$). Both give 40.",
    },
    {
      difficulty: "high",
      stem: "Another survey has 1,000 answers, of which 300 are detractors. Its NPS is +10. How many promoters are there?",
      options: ["100", "310", "400", "700"],
      answer: 2,
      explanation: "Detractors: 30 %. $\\%\\,\\text{promoters} - 30 = 10$ gives 40 %, i.e. 400 promoters.",
    },
  ],
};

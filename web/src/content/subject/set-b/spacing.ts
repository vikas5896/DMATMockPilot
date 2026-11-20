import type { SubjectText } from "../types";

export const SPACING: SubjectText = {
  passage: {
    id: "b-spacing",
    title: "Spaced Learning and Long-Term Memory",
    field: "Psychology",
    blocks: [
      {
        k: "p",
        text: "Many students prepare for exams by learning a lot in one long session shortly before the test (**massed learning**). Memory research suggests that the same learning time can be more effective if it is split into several shorter sessions on different days (**spaced learning**). A second strategy is **self-testing**: instead of only rereading, learners try to recall the material from memory.",
      },
      {
        k: "p",
        text: "In an experiment, 120 students learned the same list of 40 words in a foreign language. They were randomly divided into three groups of 40 students. Every group spent **60 minutes in total** on learning:",
      },
      {
        k: "list",
        items: [
          "Group M (massed): one session of 60 minutes.",
          "Group S (spaced): three sessions of 20 minutes on days 1, 3 and 5.",
          "Group T (spaced with self-testing): like group S, but in every session the students tested themselves on the words.",
        ],
      },
      {
        k: "p",
        text: "All students took the same recall test 1 day and 30 days after their last learning session. Table 1 shows the average percentage of the 40 words each group recalled.",
      },
      {
        k: "table",
        caption: "Table 1. Average share of the 40 words recalled.",
        head: ["Group", "After 1 day", "After 30 days"],
        rows: [
          ["M (massed)", "70 %", "25 %"],
          ["S (spaced)", "68 %", "45 %"],
          ["T (spaced + self-testing)", "75 %", "60 %"],
        ],
      },
      {
        k: "p",
        text: "The researchers define the **retention rate** as the recall after 30 days divided by the recall after 1 day. It shows which share of what was known after one day was still known a month later.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "On average, how many words did a student in group M recall after 30 days?",
      options: ["10", "25", "28", "30"],
      answer: 0,
      explanation: "25 % of 40 words $= 0.25 \\cdot 40 = 10$ words.",
    },
    {
      difficulty: "medium",
      stem: "What is the retention rate of group S?",
      options: ["about 23 %", "about 45 %", "about 66 %", "about 151 %"],
      answer: 2,
      explanation: "Retention rate $= 45 / 68 \\approx 0.66 = 66$ %. 23 % is the difference in percentage points, and 151 % divides the wrong way round.",
    },
    {
      difficulty: "low",
      stem: "Which group has the highest retention rate?",
      options: ["Group M", "Group S", "Group T", "Groups S and T are equal."],
      answer: 2,
      explanation: "M: $25/70 \\approx 36$ %, S: $45/68 \\approx 66$ %, T: $60/75 = 80$ %.",
    },
    {
      difficulty: "medium",
      stem: "How many of the 40 words did a student in group T forget, on average, between day 1 and day 30?",
      options: ["6", "15", "24", "30"],
      answer: 0,
      explanation: "Recall fell from 75 % to 60 %, i.e. by 15 percentage points: $0.15 \\cdot 40 = 6$ words.",
    },
    {
      difficulty: "medium",
      stem: "Which conclusion is supported by the data?",
      options: [
        "Massed learning gives the worst result after one day.",
        "Spacing improves recall after 30 days, although recall after 1 day is almost the same.",
        "Self-testing alone, without spacing, gives the best results.",
        "The differences between the groups are explained by different total learning times.",
      ],
      answer: 1,
      explanation: "After 1 day, M (70 %) and S (68 %) are almost equal; after 30 days S is clearly better (45 % vs 25 %). M is not worst after one day, all groups learned 60 minutes, and self-testing without spacing was not tested.",
    },
    {
      difficulty: "high",
      stem: "Why can the experiment NOT show whether self-testing helps when the learning is massed?",
      options: [
        "Because the groups were too small.",
        "Because there was no group that used self-testing in a single session.",
        "Because group T learned for a longer time.",
        "Because the recall test was only taken twice.",
      ],
      answer: 1,
      explanation: "Self-testing was only combined with spacing (group T). To judge its effect with massed learning, a group with one 60-minute session including self-tests would be needed.",
    },
    {
      difficulty: "high",
      stem: "By what percentage (relative to group M) is the 30-day recall of group T higher than that of group M?",
      options: ["35 %", "58 %", "140 %", "240 %"],
      answer: 2,
      explanation: "The difference is $60 - 25 = 35$ percentage points. Relative to group M: $35 / 25 = 1.4 = 140$ %. 240 % is the ratio $60/25$ expressed in percent.",
    },
  ],
};

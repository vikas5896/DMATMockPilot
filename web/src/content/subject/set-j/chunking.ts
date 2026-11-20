import type { SubjectText } from "../types";

export const CHUNKING: SubjectText = {
  passage: {
    id: "j-chunking",
    title: "Chunking in Short-Term Memory",
    field: "Cognitive Psychology",
    blocks: [
      {
        k: "p",
        text: "Short-term memory can hold only a small number of units at a time. A classic estimate is about **7 ± 2** units, i.e. between 5 and 9; more recent research suggests that the true limit is closer to 4 units when people cannot rehearse. These units are not single letters or digits but **chunks**: groups of information that are remembered as one meaningful whole.",
      },
      {
        k: "p",
        text: "**Chunking** means grouping information into such units. A 10-digit mobile number is much easier to remember as 98765 43210 (two chunks) than as ten separate digits, and the letters P D F C P U G P S become three chunks for someone who recognises the abbreviations PDF, CPU and GPS. Chunking does not enlarge the number of chunks memory can hold, but it increases how much information each chunk contains. Experts in a field, for example chess players, can remember far more because they recognise large meaningful patterns.",
      },
      {
        k: "p",
        text: "In an experiment, two groups of 30 students had to repeat lists of random digits. Group 1 received no instructions. Group 2 was trained for one week to group digits into chunks of three.",
      },
      {
        k: "table",
        caption: "Table 1. Average number of digits recalled correctly.",
        head: ["Group", "Digits recalled"],
        rows: [
          ["Group 1 (no strategy)", "7"],
          ["Group 2 (trained: chunks of 3 digits)", "12"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many chunks does the mobile number 98765 43210 consist of when grouped as shown?",
      options: ["2", "5", "7", "10"],
      answer: 0,
      explanation: "Two groups of five digits each: 2 chunks.",
    },
    {
      difficulty: "low",
      stem: "According to the classic estimate, how many units can short-term memory hold?",
      options: ["1 to 3", "5 to 9", "10 to 15", "unlimited"],
      answer: 1,
      explanation: "About 7 ± 2 units, i.e. between 5 and 9.",
    },
    {
      difficulty: "medium",
      stem: "A person who does not know the abbreviations PDF, CPU and GPS reads the letters P D F C P U G P S. How many units must they remember?",
      options: ["3", "6", "9", "27"],
      answer: 2,
      explanation: "Without recognising the abbreviations, each of the 9 letters is a separate unit. Someone who knows them needs only 3 chunks.",
    },
    {
      difficulty: "medium",
      stem: "How many more digits did group 2 recall on average than group 1?",
      options: ["3", "4", "5", "12"],
      answer: 2,
      explanation: "Group 2 recalled 12 digits and group 1 recalled 7: $12 - 7 = 5$ digits more.",
    },
    {
      difficulty: "medium",
      stem: "By about what percentage did training improve the number of digits recalled?",
      options: ["about 42 %", "about 58 %", "about 71 %", "about 171 %"],
      answer: 2,
      explanation: "$5 / 7 \\approx 0.71 = 71$ %. 42 % would wrongly divide by 12.",
    },
    {
      difficulty: "high",
      stem: "How many chunks of three digits did a student in group 2 hold in memory on average?",
      options: ["3", "4", "7", "12"],
      answer: 1,
      explanation: "$12 / 3 = 4$ chunks: fewer units than group 1's 7 digits, but each chunk contains more information. This fits the newer estimate of about 4 units.",
    },
    {
      difficulty: "high",
      stem: "Which conclusion is best supported by the text and the experiment?",
      options: [
        "Training enlarges the number of units short-term memory can hold.",
        "Chunking increases the amount of information per unit, not the number of units.",
        "Group 2 had a better memory from the start.",
        "Chunking works only with letters, not with digits.",
      ],
      answer: 1,
      explanation: "Group 2 recalled more digits with fewer units (4 chunks). The text says chunking does not enlarge the number of chunks; the groups were formed for the experiment, not selected by memory ability.",
    },
  ],
};

import type { SubjectText } from "../types";

export const BACKUPS: SubjectText = {
  passage: {
    id: "h-backups",
    title: "Backups and the Probability of Data Loss",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "Every storage device fails sooner or later. Hard disks, for example, fail with a certain probability $p$ per year. Data is lost only if **all** copies are lost. If several copies are stored on devices that fail **independently** of each other, the probabilities are multiplied: with two copies, the probability of losing both in a year is $p \\cdot p = p^2$.",
      },
      {
        k: "p",
        text: "Independence is the critical assumption. A fire, a flood, theft or ransomware can destroy all copies in one place at the same time. A widely recommended guideline is the **3-2-1 rule**:",
      },
      {
        k: "list",
        items: [
          "Keep at least **3** copies of important data,",
          "on at least **2** different types of storage (e.g. a disk and a cloud service),",
          "with at least **1** copy in a different location (off-site).",
        ],
      },
      {
        k: "p",
        text: "The probability that at least one of several devices fails, so that something has to be repaired or replaced, is calculated with the complement: 1 minus the probability that none fails.",
      },
      {
        k: "p",
        text: "**Example.** The disks of a small company each fail with a probability of **4 %** per year, independently of each other.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the probability that a single disk survives a year without failing?",
      options: ["4 %", "40 %", "96 %", "99.84 %"],
      answer: 2,
      explanation: "$1 - 0.04 = 0.96 = 96$ %.",
    },
    {
      difficulty: "low",
      stem: "What does the 3-2-1 rule require?",
      options: [
        "3 disks, 2 computers, 1 password",
        "3 copies, on 2 types of storage, with 1 copy off-site",
        "Backups every 3 days, kept for 2 weeks, checked once a month",
        "3 locations, 2 copies each, 1 cloud service",
      ],
      answer: 1,
      explanation: "At least three copies, on two different types of storage, one of them in another location.",
    },
    {
      difficulty: "medium",
      stem: "Data is stored on two independent disks. What is the probability that both fail in the same year?",
      options: ["0.08 %", "0.16 %", "4 %", "8 %"],
      answer: 1,
      explanation: "$0.04 \\cdot 0.04 = 0.0016 = 0.16$ %.",
    },
    {
      difficulty: "medium",
      stem: "What is the probability that all three of three independent copies are lost in the same year?",
      options: ["0.0064 %", "0.064 %", "0.12 %", "12 %"],
      answer: 0,
      explanation: "$0.04^3 = 0.000064 = 0.0064$ %.",
    },
    {
      difficulty: "medium",
      stem: "The company has 100 such disks. How many of them are expected to fail per year?",
      options: ["0.04", "1", "4", "40"],
      answer: 2,
      explanation: "$100 \\cdot 0.04 = 4$ disks on average.",
    },
    {
      difficulty: "high",
      stem: "With two independent disks, what is the probability that at least one of them fails within a year?",
      options: ["0.16 %", "4 %", "7.84 %", "8 %"],
      answer: 2,
      explanation: "Neither fails: $0.96^2 = 0.9216$. At least one fails: $1 - 0.9216 = 0.0784 = 7.84$ %. Adding $4 + 4 = 8$ % counts the case of both failing twice.",
    },
    {
      difficulty: "high",
      stem: "Both disks of the previous questions are in the same office, where a fire destroys everything with a probability of 0.5 % per year. What is now the main risk of losing the data?",
      options: [
        "Two independent disk failures (0.16 %)",
        "A fire destroying both disks at once (0.5 %)",
        "Both risks are equal.",
        "There is no risk, because there are two copies.",
      ],
      answer: 1,
      explanation: "The fire affects both copies at the same time, so independence fails. Its 0.5 % is about three times the 0.16 % for two independent failures. An off-site copy, as the 3-2-1 rule demands, removes this risk.",
    },
  ],
};

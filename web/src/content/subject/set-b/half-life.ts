import type { SubjectText } from "../types";

export const HALF_LIFE: SubjectText = {
  passage: {
    id: "b-half-life",
    title: "How the Body Eliminates Medicines",
    field: "Pharmacology",
    blocks: [
      {
        k: "p",
        text: "After a medicine has been absorbed, its concentration in the blood plasma falls because the liver breaks it down and the kidneys excrete it. For most medicines the body removes a **constant fraction** of the drug per unit of time, not a constant amount. The concentration therefore falls exponentially.",
      },
      {
        k: "p",
        text: "The **half-life** $t_{1/2}$ is the time in which the concentration falls to half of its value. Starting from a concentration $C_0$, the concentration after a time $t$ is:",
      },
      { k: "formula", tex: "C(t) = C_0 \\cdot \\left(\\tfrac{1}{2}\\right)^{t / t_{1/2}}", label: "(1)" },
      {
        k: "p",
        text: "After about **five half-lives**, only about 3 % of the drug is left, and the medicine is regarded as eliminated.",
      },
      {
        k: "p",
        text: "A medicine only works above its **minimum effective concentration** (MEC) and causes harmful side effects above its **minimum toxic concentration** (MTC). The range between the two is the **therapeutic window**. The ratio MTC/MEC describes how wide the window is: the smaller the ratio, the more carefully the dose must be chosen.",
      },
      {
        k: "p",
        text: "If a medicine is taken repeatedly at fixed intervals, some drug is still present when the next dose arrives, and the concentration builds up. After about **four to five half-lives**, the amount eliminated between two doses equals the amount taken in: the concentration has reached a **steady state** and only rises and falls within each dosing interval.",
      },
      {
        k: "table",
        caption: "Table 1. Properties of three medicines (concentrations in mg per litre of plasma).",
        head: ["Medicine", "Half-life", "MEC", "MTC"],
        rows: [
          ["A", "2 h", "4 mg/L", "20 mg/L"],
          ["B", "6 h", "10 mg/L", "40 mg/L"],
          ["C", "24 h", "1 mg/L", "3 mg/L"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "After a dose of medicine B, the plasma concentration is 40 mg/L. What is it 12 hours later?",
      options: ["5 mg/L", "10 mg/L", "20 mg/L", "28 mg/L"],
      answer: 1,
      explanation: "12 h are two half-lives of medicine B (6 h each): $40 \\to 20 \\to 10$ mg/L.",
    },
    {
      difficulty: "medium",
      stem: "A dose of medicine A produces a concentration of 16 mg/L. After how many hours does it fall to the minimum effective concentration?",
      options: ["2 h", "4 h", "6 h", "8 h"],
      answer: 1,
      explanation: "The MEC of A is 4 mg/L. $16 \\to 8$ (after 2 h) $\\to 4$ (after 4 h). From then on the medicine stops working.",
    },
    {
      difficulty: "medium",
      stem: "Which medicine has the narrowest therapeutic window according to the measure described in the text?",
      options: ["Medicine A", "Medicine B", "Medicine C", "A and B are equally narrow."],
      answer: 2,
      explanation: "Ratios MTC/MEC: A $= 20/4 = 5$, B $= 40/10 = 4$, C $= 3/1 = 3$. The smallest ratio (C) means the narrowest window, even though C has the smallest absolute values.",
    },
    {
      difficulty: "low",
      stem: "About how long does it take until medicine C is regarded as eliminated after a single dose?",
      options: ["1 day", "2.5 days", "5 days", "10 days"],
      answer: 2,
      explanation: "Five half-lives: $5 \\cdot 24$ h $= 120$ h $= 5$ days.",
    },
    {
      difficulty: "medium",
      stem: "What percentage of the starting concentration of medicine A is left after 6 hours?",
      options: ["6.25 %", "12.5 %", "25 %", "33 %"],
      answer: 1,
      explanation: "6 h are three half-lives of A. Formula (1): $(1/2)^3 = 1/8 = 12.5$ %. 33 % would wrongly assume a constant amount is removed per hour.",
    },
    {
      difficulty: "high",
      stem: "A patient takes medicine B every 6 hours. After roughly how long does the concentration reach a steady state?",
      options: ["After the first 6 hours", "After about 1 day", "After about 3 days", "Never, it keeps rising."],
      answer: 1,
      explanation: "Steady state is reached after about four to five half-lives: $4\\text{–}5 \\cdot 6$ h $= 24\\text{–}30$ h, i.e. about one day. It does not keep rising, because elimination grows with the concentration.",
    },
    {
      difficulty: "high",
      stem: "Which statement follows from formula (1) and the description of elimination?",
      options: [
        "The same amount of drug is eliminated in every hour.",
        "The fraction of the drug eliminated per hour becomes smaller over time.",
        "The amount of drug eliminated per hour decreases over time.",
        "A double dose doubles the half-life.",
      ],
      answer: 2,
      explanation: "A constant fraction is removed per unit of time. Since that fraction is taken from an ever smaller remaining amount, the amount removed per hour falls. The half-life does not depend on the dose.",
    },
  ],
};

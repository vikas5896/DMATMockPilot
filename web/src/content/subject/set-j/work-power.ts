import type { SubjectText } from "../types";

export const WORK_POWER: SubjectText = {
  passage: {
    id: "j-work-power",
    title: "Work, Energy and Power",
    field: "Physics",
    blocks: [
      {
        k: "p",
        text: "To lift a body of mass $m$ by a height $h$, work must be done against gravity. This work is stored as potential energy:",
      },
      { k: "formula", tex: "W = m \\cdot g \\cdot h", label: "(1)" },
      {
        k: "p",
        text: "Use $g = 10$ m/s². Work and energy are measured in joules (1 J = 1 N·m). The work depends only on the mass and the height, not on how fast the body is lifted or along which path. How fast the work is done is described by the **power**, measured in watts (1 W = 1 J/s):",
      },
      { k: "formula", tex: "P = \\frac{W}{t}", label: "(2)" },
      {
        k: "p",
        text: "Muscles convert only about **25 %** of the chemical energy from food into mechanical work; the rest becomes heat. To do a certain amount of work, the body must therefore use about four times as much food energy. Food energy is often given in kilocalories: 1 kcal ≈ 4.2 kJ.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much work is needed to lift a mass of 50 kg by 2 m?",
      options: ["100 J", "500 J", "1,000 J", "10,000 J"],
      answer: 2,
      explanation: "Formula (1): $50 \\cdot 10 \\cdot 2 = 1{,}000$ J.",
    },
    {
      difficulty: "low",
      stem: "A student with a mass of 70 kg climbs three floors, 9 m in total. How much work does she do against gravity?",
      options: ["630 J", "2,100 J", "6,300 J", "63,000 J"],
      answer: 2,
      explanation: "$70 \\cdot 10 \\cdot 9 = 6{,}300$ J.",
    },
    {
      difficulty: "low",
      stem: "Two students of equal mass climb the same stairs, one in 30 s and one in 60 s. Which statement is correct?",
      options: [
        "The faster student does more work.",
        "Both do the same work, but the faster student has the higher power.",
        "Both have the same power.",
        "The slower student does more work.",
      ],
      answer: 1,
      explanation: "Work depends only on mass and height (formula 1). Doing it in half the time doubles the power (formula 2).",
    },
    {
      difficulty: "medium",
      stem: "The student climbs the 9 m in 30 seconds. What is her average power?",
      options: ["21 W", "210 W", "630 W", "2,100 W"],
      answer: 1,
      explanation: "Formula (2): $6{,}300 / 30 = 210$ W.",
    },
    {
      difficulty: "medium",
      stem: "A worker lifts 20 boxes of 10 kg each onto a shelf 1.5 m high. How much work does this take in total?",
      options: ["150 J", "300 J", "3,000 J", "30,000 J"],
      answer: 2,
      explanation: "Per box: $10 \\cdot 10 \\cdot 1.5 = 150$ J; for 20 boxes: $3{,}000$ J.",
    },
    {
      difficulty: "high",
      stem: "About how much food energy does the student use to do the 6,300 J of climbing work?",
      options: ["about 1.5 kcal", "about 6 kcal", "about 25 kcal", "about 63 kcal"],
      answer: 1,
      explanation: "With 25 % efficiency: $6{,}300 \\cdot 4 = 25{,}200$ J $\\approx 25.2$ kJ. $25.2 / 4.2 = 6$ kcal. (25 kcal confuses kJ with kcal.)",
    },
    {
      difficulty: "high",
      stem: "A crane motor delivers a constant power of 5 kW. How high can it lift a load of 1,000 kg in one minute?",
      options: ["0.5 m", "3 m", "30 m", "300 m"],
      answer: 2,
      explanation: "Work in 60 s: $5{,}000 \\cdot 60 = 300{,}000$ J. $h = W / (m \\cdot g) = 300{,}000 / 10{,}000 = 30$ m.",
    },
  ],
};

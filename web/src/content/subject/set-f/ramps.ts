import type { SubjectText } from "../types";

export const RAMPS: SubjectText = {
  passage: {
    id: "f-ramps",
    title: "Gradients and Accessible Ramps",
    field: "Architecture",
    blocks: [
      {
        k: "p",
        text: "The steepness of roads and ramps is usually given as a **gradient** in percent: the height gained (rise) divided by the horizontal distance (run):",
      },
      { k: "formula", tex: "\\text{gradient} = \\frac{\\text{rise}}{\\text{run}} \\cdot 100\\,\\%", label: "(1)" },
      {
        k: "p",
        text: "A gradient can also be written as a ratio: 1 : 10 means 1 m rise per 10 m run, i.e. 10 %. The angle $\\alpha$ of the slope follows from $\\tan \\alpha = \\text{rise} / \\text{run}$. A gradient of 100 % therefore corresponds to an angle of 45°, not 90°.",
      },
      {
        k: "p",
        text: "Buildings must be accessible to people in wheelchairs. A typical building regulation (simplified here) sets two rules for ramps:",
      },
      {
        k: "list",
        items: [
          "The gradient of a ramp must not exceed **6 %**.",
          "After at most **6 m** of horizontal ramp length, a flat **landing** at least **1.5 m** long must follow, so that wheelchair users can rest.",
        ],
      },
      {
        k: "p",
        text: "For such small gradients, the length along the ramp is almost the same as the horizontal run; in the questions, use the horizontal run.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A ramp rises 0.3 m over a horizontal run of 5 m. What is its gradient?",
      options: ["0.06 %", "1.5 %", "6 %", "16.7 %"],
      answer: 2,
      explanation: "Formula (1): $0.3 / 5 \\cdot 100$ % $= 6$ %.",
    },
    {
      difficulty: "low",
      stem: "Which angle corresponds to a gradient of 100 %?",
      options: ["10°", "45°", "60°", "90°"],
      answer: 1,
      explanation: "100 % means rise = run, so $\\tan \\alpha = 1$ and $\\alpha = 45$°.",
    },
    {
      difficulty: "low",
      stem: "Which slope is steeper: 12 % or 1 : 10?",
      options: ["12 %", "1 : 10", "Both are equally steep.", "They cannot be compared."],
      answer: 0,
      explanation: "1 : 10 means 10 %, which is less than 12 %.",
    },
    {
      difficulty: "medium",
      stem: "An entrance lies 0.48 m above the pavement. What is the minimum horizontal run of a ramp that meets the 6 % rule?",
      options: ["2.9 m", "6 m", "8 m", "12 m"],
      answer: 2,
      explanation: "$\\text{run} = 0.48 / 0.06 = 8$ m.",
    },
    {
      difficulty: "medium",
      stem: "A mountain road has a constant gradient of 10 % over a horizontal distance of 2 km. How much height does it gain?",
      options: ["20 m", "200 m", "2,000 m", "10 m"],
      answer: 1,
      explanation: "$0.10 \\cdot 2{,}000$ m $= 200$ m.",
    },
    {
      difficulty: "medium",
      stem: "Which of these ramps meets both rules of the regulation?",
      options: [
        "Rise 0.5 m over a run of 10 m, without a landing",
        "Rise 0.3 m over a run of 4 m",
        "Rise 0.3 m over a run of 5.5 m",
        "Rise 0.6 m over a run of 8 m, with a landing after 6 m",
      ],
      answer: 2,
      explanation: "0.3/5.5 ≈ 5.5 % and shorter than 6 m: allowed. The first is 5 % but 10 m without a landing; the second is 7.5 %; the last is 7.5 %.",
    },
    {
      difficulty: "high",
      stem: "The ramp for the 0.48 m entrance (run 8 m) needs a landing after 6 m. What total horizontal length does the whole construction need?",
      options: ["8 m", "9.5 m", "11 m", "12.5 m"],
      answer: 1,
      explanation: "6 m of ramp, a 1.5 m landing and the remaining 2 m of ramp: $6 + 1.5 + 2 = 9.5$ m.",
    },
    {
      difficulty: "high",
      stem: "In front of a building there are exactly 7.5 m of horizontal space for a ramp including any landings. What is the largest height difference that can be overcome?",
      options: ["0.36 m", "0.45 m", "0.54 m", "0.75 m"],
      answer: 0,
      explanation: "A ramp longer than 6 m would need a 1.5 m landing, leaving again only 6 m of ramp. So the best is 6 m of ramp: $0.06 \\cdot 6 = 0.36$ m. 0.45 m wrongly uses all 7.5 m as ramp without a landing.",
    },
  ],
};

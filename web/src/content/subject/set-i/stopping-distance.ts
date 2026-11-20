import type { SubjectText } from "../types";

export const STOPPING_DISTANCE: SubjectText = {
  passage: {
    id: "i-stopping-distance",
    title: "Stopping Distance of a Car",
    field: "Traffic Engineering",
    blocks: [
      {
        k: "p",
        text: "When a driver sees a danger, the car does not stop immediately. First, during the **reaction time** $t_r$, the driver recognises the danger and moves the foot to the brake; the car keeps its speed $v$. Then the brakes slow the car down with a deceleration $a$. The **stopping distance** is the sum of both parts:",
      },
      { k: "formula", tex: "s = \\underbrace{v \\cdot t_r}_{\\text{reaction distance}} + \\underbrace{\\frac{v^2}{2a}}_{\\text{braking distance}}", label: "(1)" },
      {
        k: "p",
        text: "The speed must be given in m/s: divide the speed in km/h by 3.6 (36 km/h = 10 m/s). The reaction distance grows in proportion to the speed, but the braking distance grows with the **square** of the speed.",
      },
      {
        k: "table",
        caption: "Table 1. Typical values used in this text.",
        head: ["Quantity", "Value"],
        rows: [
          ["Reaction time of an attentive driver", "1 s"],
          ["Deceleration on a dry road", "8 m/s²"],
          ["Deceleration on a wet road", "4 m/s²"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is 72 km/h in m/s?",
      options: ["7.2 m/s", "20 m/s", "36 m/s", "259 m/s"],
      answer: 1,
      explanation: "Divide the speed in km/h by 3.6: $72 / 3.6 = 20$ m/s.",
    },
    {
      difficulty: "low",
      stem: "What is the reaction distance of an attentive driver at 72 km/h?",
      options: ["7.2 m", "20 m", "25 m", "72 m"],
      answer: 1,
      explanation: "$20$ m/s $\\cdot 1$ s $= 20$ m.",
    },
    {
      difficulty: "medium",
      stem: "What is the braking distance at 72 km/h on a dry road?",
      options: ["2.5 m", "20 m", "25 m", "50 m"],
      answer: 2,
      explanation: "$\\frac{20^2}{2 \\cdot 8} = \\frac{400}{16} = 25$ m.",
    },
    {
      difficulty: "medium",
      stem: "What is the total stopping distance at 72 km/h on a dry road?",
      options: ["25 m", "40 m", "45 m", "70 m"],
      answer: 2,
      explanation: "Reaction distance 20 m + braking distance 25 m $= 45$ m.",
    },
    {
      difficulty: "medium",
      stem: "A car drives twice as fast. How does its braking distance change?",
      options: ["It stays the same.", "It doubles.", "It becomes 4 times as long.", "It becomes 8 times as long."],
      answer: 2,
      explanation: "The braking distance depends on $v^2$: $2^2 = 4$.",
    },
    {
      difficulty: "medium",
      stem: "What is the stopping distance at 72 km/h on a wet road?",
      options: ["45 m", "50 m", "70 m", "90 m"],
      answer: 2,
      explanation: "Braking distance: $\\frac{400}{2 \\cdot 4} = 50$ m. With the reaction distance: $20 + 50 = 70$ m.",
    },
    {
      difficulty: "high",
      stem: "What is the stopping distance at 108 km/h on a dry road?",
      options: ["about 56 m", "about 68 m", "about 86 m", "about 101 m"],
      answer: 2,
      explanation: "$108 / 3.6 = 30$ m/s. Reaction: 30 m. Braking: $\\frac{900}{16} \\approx 56.3$ m. Total: about 86 m, almost twice the distance at 72 km/h.",
    },
    {
      difficulty: "high",
      stem: "A driver looking at a phone reacts only after 2 s. How much longer is the stopping distance at 72 km/h on a dry road than for an attentive driver?",
      options: ["5 m", "20 m", "25 m", "45 m"],
      answer: 1,
      explanation: "Only the reaction distance changes: $20 \\cdot 2 = 40$ m instead of 20 m. The stopping distance grows from 45 m to 65 m, i.e. by 20 m.",
    },
  ],
};

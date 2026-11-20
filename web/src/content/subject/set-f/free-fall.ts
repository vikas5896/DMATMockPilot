import type { SubjectText } from "../types";

export const FREE_FALL: SubjectText = {
  passage: {
    id: "f-free-fall",
    title: "Free Fall and Horizontal Throws",
    field: "Physics",
    blocks: [
      {
        k: "p",
        text: "Near the Earth's surface, all bodies fall with the same constant acceleration $g$ if air resistance can be neglected. In this text, use $g = 10$ m/s². A body that is released from rest has, after the time $t$, the speed $v$ and has fallen the distance $s$:",
      },
      { k: "formula", tex: "v = g \\cdot t \\qquad s = \\tfrac{1}{2}\\, g \\, t^2", label: "(1)" },
      {
        k: "p",
        text: "The distance fallen grows with the square of the time: in twice the time, a body falls four times as far. Solving formula (1) for the time gives the time needed to fall a height $h$: $t = \\sqrt{2h / g}$.",
      },
      {
        k: "p",
        text: "If a body is thrown **horizontally**, two independent motions combine. Horizontally, it keeps its initial speed $v_x$ (no force acts in this direction). Vertically, it falls exactly like a body that is simply dropped. The time until it lands therefore does not depend on how fast it was thrown, and the horizontal distance is $x = v_x \\cdot t$.",
      },
      {
        k: "p",
        text: "A simple way to measure a person's reaction time uses free fall: someone drops a ruler between the person's open fingers, and the person catches it as fast as possible. The distance the ruler fell shows the reaction time.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the speed of a stone 3 seconds after it was dropped?",
      options: ["3 m/s", "15 m/s", "30 m/s", "45 m/s"],
      answer: 2,
      explanation: "Formula (1): $v = 10 \\cdot 3 = 30$ m/s.",
    },
    {
      difficulty: "low",
      stem: "How far does a stone fall in the first 2 seconds?",
      options: ["10 m", "20 m", "40 m", "100 m"],
      answer: 1,
      explanation: "$s = \\frac{1}{2} \\cdot 10 \\cdot 2^2 = 20$ m. 40 m forgets the factor $\\frac{1}{2}$.",
    },
    {
      difficulty: "medium",
      stem: "How long does a stone need to fall from a height of 45 m?",
      options: ["2 s", "3 s", "4.5 s", "9 s"],
      answer: 1,
      explanation: "$t = \\sqrt{2 \\cdot 45 / 10} = \\sqrt{9} = 3$ s.",
    },
    {
      difficulty: "medium",
      stem: "A stone is thrown horizontally at 15 m/s from a cliff 20 m high. How far from the foot of the cliff does it land?",
      options: ["15 m", "20 m", "30 m", "60 m"],
      answer: 2,
      explanation: "Fall time: $\\sqrt{2 \\cdot 20 / 10} = 2$ s. Horizontal distance: $15 \\cdot 2 = 30$ m.",
    },
    {
      difficulty: "medium",
      stem: "From the same height, ball 1 is dropped and ball 2 is thrown horizontally at the same moment. Which ball lands first (no air resistance)?",
      options: ["Ball 1", "Ball 2", "Both land at the same time.", "It depends on the masses of the balls."],
      answer: 2,
      explanation: "The vertical motion of the thrown ball is the same as that of the dropped ball, so both need the same time to fall.",
    },
    {
      difficulty: "high",
      stem: "How far does a dropped stone fall during the third second (from t = 2 s to t = 3 s)?",
      options: ["10 m", "15 m", "25 m", "45 m"],
      answer: 2,
      explanation: "After 3 s: $\\frac{1}{2} \\cdot 10 \\cdot 9 = 45$ m; after 2 s: 20 m. During the third second: $45 - 20 = 25$ m.",
    },
    {
      difficulty: "high",
      stem: "In the ruler test, the ruler falls 20 cm before it is caught. What is the person's reaction time?",
      options: ["0.02 s", "about 0.14 s", "0.2 s", "2 s"],
      answer: 2,
      explanation: "$t = \\sqrt{2 \\cdot 0.2 / 10} = \\sqrt{0.04} = 0.2$ s. The height must be in metres.",
    },
  ],
};

import type { SubjectText } from "../types";

export const PENDULUM: SubjectText = {
  passage: {
    id: "i-pendulum",
    title: "The Period of a Pendulum",
    field: "Physics",
    blocks: [
      {
        k: "p",
        text: "A simple pendulum is a small heavy body hanging on a string of length $L$. If it swings with small angles, the time for one complete back-and-forth swing, the **period** $T$, is:",
      },
      { k: "formula", tex: "T = 2\\pi \\sqrt{\\frac{L}{g}}", label: "(1)" },
      {
        k: "p",
        text: "Remarkably, the period depends neither on the mass of the body nor on how wide the pendulum swings (as long as the angles stay small). This made pendulums the most accurate clocks for almost three centuries. Because the period depends only on the length and on $g$, pendulums were also used to measure the gravitational acceleration at different places on Earth.",
      },
      {
        k: "p",
        text: "On Earth, $g \\approx 10$ m/s². With the approximation $\\pi^2 \\approx 10$, formula (1) becomes very simple:",
      },
      { k: "formula", tex: "T \\approx 2\\sqrt{L} \\qquad (T \\text{ in s}, \\ L \\text{ in m})", label: "(2)" },
      {
        k: "p",
        text: "Solids expand slightly when they are warmed, so the rod of a pendulum clock is a little longer in summer than in winter.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the period of a pendulum 1 m long on Earth?",
      options: ["about 1 s", "about 2 s", "about 3.1 s", "about 10 s"],
      answer: 1,
      explanation: "Formula (2): $T \\approx 2 \\cdot \\sqrt{1} = 2$ s.",
    },
    {
      difficulty: "low",
      stem: "The body on a pendulum is replaced by one with twice the mass. What happens to the period?",
      options: ["It doubles.", "It halves.", "It stays the same.", "It becomes about 1.4 times as long."],
      answer: 2,
      explanation: "The text states that the period does not depend on the mass.",
    },
    {
      difficulty: "medium",
      stem: "What is the period of a pendulum 4 m long?",
      options: ["about 2 s", "about 4 s", "about 8 s", "about 16 s"],
      answer: 1,
      explanation: "$T \\approx 2 \\cdot \\sqrt{4} = 4$ s. Four times the length gives only twice the period.",
    },
    {
      difficulty: "medium",
      stem: "How long must a pendulum be to have a period of 1 s?",
      options: ["0.25 m", "0.5 m", "1 m", "2 m"],
      answer: 0,
      explanation: "$1 = 2\\sqrt{L}$ gives $\\sqrt{L} = 0.5$, so $L = 0.25$ m.",
    },
    {
      difficulty: "medium",
      stem: "By what factor must the length of a pendulum be changed to double its period?",
      options: ["×√2", "×2", "×4", "×8"],
      answer: 2,
      explanation: "$T \\sim \\sqrt{L}$: to double $T$, $\\sqrt{L}$ must double, so $L$ must be multiplied by 4.",
    },
    {
      difficulty: "high",
      stem: "A pendulum clock is set correctly in winter. How does it behave on a hot summer day?",
      options: [
        "It runs fast, because the pendulum swings faster.",
        "It runs slow, because the longer pendulum has a longer period.",
        "It keeps exact time, because the period does not depend on temperature.",
        "It runs slow, because warm air slows the pendulum.",
      ],
      answer: 1,
      explanation: "The rod expands, $L$ increases, and so does $T$. Each swing takes a little longer, so the clock counts too few seconds: it runs slow.",
    },
    {
      difficulty: "high",
      stem: "On the Moon, the gravitational acceleration is about 1.6 m/s². What is the period of a 1 m pendulum there?",
      options: ["about 0.8 s", "about 2 s", "about 5 s", "about 12.5 s"],
      answer: 2,
      explanation: "Formula (1): $T^2 = 4\\pi^2 \\cdot L / g \\approx 40 \\cdot 1 / 1.6 = 25$, so $T \\approx 5$ s. Formula (2) only applies on Earth.",
    },
  ],
};

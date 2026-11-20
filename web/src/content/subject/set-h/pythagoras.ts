import type { SubjectText } from "../types";

export const PYTHAGORAS: SubjectText = {
  passage: {
    id: "h-pythagoras",
    title: "The Theorem of Pythagoras in Practice",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "In a right-angled triangle, the side opposite the right angle is the **hypotenuse** $c$; the other two sides are the legs $a$ and $b$. The **theorem of Pythagoras** states:",
      },
      { k: "formula", tex: "a^2 + b^2 = c^2", label: "(1)" },
      {
        k: "p",
        text: "Whole-number solutions are called **Pythagorean triples**, for example 3–4–5, 5–12–13 and 8–15–17. Multiples of a triple are triples too (6–8–10, 9–12–15, …). Conversely, if three lengths fulfil formula (1), the triangle has a right angle.",
      },
      {
        k: "p",
        text: "The theorem gives the distance between two points $(x_1, y_1)$ and $(x_2, y_2)$ in a coordinate system, because the differences in $x$ and $y$ form the legs of a right triangle:",
      },
      { k: "formula", tex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}", label: "(2)" },
      {
        k: "p",
        text: "Applied twice, it also gives the **space diagonal** of a box with edges $a$, $b$ and $c$: $d = \\sqrt{a^2 + b^2 + c^2}$. Screens are measured by their diagonal, too.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "The legs of a right-angled triangle are 6 cm and 8 cm long. How long is the hypotenuse?",
      options: ["7 cm", "10 cm", "14 cm", "100 cm"],
      answer: 1,
      explanation: "$c = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm.",
    },
    {
      difficulty: "low",
      stem: "The hypotenuse is 13 cm and one leg is 5 cm. How long is the other leg?",
      options: ["8 cm", "12 cm", "13.9 cm", "18 cm"],
      answer: 1,
      explanation: "$b = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm.",
    },
    {
      difficulty: "low",
      stem: "Which three lengths form a right-angled triangle?",
      options: ["4, 5, 6", "5, 10, 15", "8, 15, 17", "6, 7, 9"],
      answer: 2,
      explanation: "$8^2 + 15^2 = 64 + 225 = 289 = 17^2$.",
    },
    {
      difficulty: "medium",
      stem: "What is the distance between the points (1, 2) and (7, 10)?",
      options: ["8", "10", "14", "100"],
      answer: 1,
      explanation: "Formula (2): $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.",
    },
    {
      difficulty: "medium",
      stem: "A 5 m ladder leans against a vertical wall. Its foot stands 3 m from the wall. How high up the wall does it reach?",
      options: ["2 m", "4 m", "5.8 m", "8 m"],
      answer: 1,
      explanation: "$\\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ m.",
    },
    {
      difficulty: "medium",
      stem: "A screen is 48 cm wide and 36 cm high. How long is its diagonal?",
      options: ["42 cm", "60 cm", "72 cm", "84 cm"],
      answer: 1,
      explanation: "$\\sqrt{48^2 + 36^2} = \\sqrt{2{,}304 + 1{,}296} = \\sqrt{3{,}600} = 60$ cm (a multiple of the triple 3–4–5).",
    },
    {
      difficulty: "high",
      stem: "A rectangular park is 120 m long and 50 m wide. How many metres does a walker save by crossing it diagonally instead of walking along two sides?",
      options: ["30 m", "40 m", "130 m", "170 m"],
      answer: 1,
      explanation: "Diagonal: $\\sqrt{120^2 + 50^2} = \\sqrt{16{,}900} = 130$ m. Along the sides: $170$ m. Saving: 40 m.",
    },
    {
      difficulty: "high",
      stem: "A box has edges of 3 cm, 4 cm and 12 cm. How long is its space diagonal?",
      options: ["12.6 cm", "13 cm", "17 cm", "19 cm"],
      answer: 1,
      explanation: "$\\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$ cm. (The diagonal of the 3 × 4 face is 5, and $\\sqrt{5^2 + 12^2} = 13$.)",
    },
  ],
};

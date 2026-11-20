import type { SubjectText } from "../types";

export const SCALING: SubjectText = {
  passage: {
    id: "e-scaling",
    title: "Scaling: Lengths, Areas and Volumes",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "Two objects are **similar** if one is an enlarged or reduced copy of the other. If all lengths are multiplied by a **scale factor** $k$, areas and volumes change much more:",
      },
      { k: "formula", tex: "\\text{length} \\times k \\qquad \\text{area} \\times k^2 \\qquad \\text{volume} \\times k^3", label: "(1)" },
      {
        k: "p",
        text: "For objects made of the same material, the mass is proportional to the volume. A model on the scale 1 : 50 has all lengths 50 times smaller than the original.",
      },
      {
        k: "p",
        text: "Because volume grows faster than surface area, large objects have a smaller **surface-to-volume ratio** than small ones. For a cube with edge length $a$:",
      },
      { k: "formula", tex: "S = 6a^2 \\qquad V = a^3 \\qquad \\frac{S}{V} = \\frac{6}{a}", label: "(2)" },
      {
        k: "p",
        text: "This ratio matters in many fields. Warm-blooded animals lose heat through their surface but produce heat in their whole volume, so large animals cool down more slowly than small ones. In chemistry, a solid cut into small pieces reacts faster, because a larger surface is exposed.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "The edge length of a cube is doubled. How does its volume change?",
      options: ["×2", "×4", "×6", "×8"],
      answer: 3,
      explanation: "Formula (1) with $k = 2$: volume $\\times 2^3 = 8$.",
    },
    {
      difficulty: "low",
      stem: "A car is 4.5 m long. How long is a model of it on the scale 1 : 50?",
      options: ["0.9 cm", "9 cm", "22.5 cm", "90 cm"],
      answer: 1,
      explanation: "$450$ cm $/ 50 = 9$ cm.",
    },
    {
      difficulty: "medium",
      stem: "A statue is copied three times as tall (all lengths ×3). How much more paint is needed to cover the copy?",
      options: ["3 times as much", "6 times as much", "9 times as much", "27 times as much"],
      answer: 2,
      explanation: "Paint covers the surface, an area: $\\times 3^2 = 9$.",
    },
    {
      difficulty: "medium",
      stem: "What is the surface-to-volume ratio of a cube with an edge length of 2 cm?",
      options: ["0.33 per cm", "3 per cm", "6 per cm", "12 per cm"],
      answer: 1,
      explanation: "Formula (2): $6 / 2 = 3$ per cm (surface 24 cm², volume 8 cm³).",
    },
    {
      difficulty: "medium",
      stem: "A metal cube with an edge length of 10 cm has a mass of 1 kg. What is the mass of a cube of the same metal with an edge length of 5 cm?",
      options: ["125 g", "250 g", "500 g", "1 kg"],
      answer: 0,
      explanation: "$k = 1/2$, so the volume and the mass are $\\times (1/2)^3 = 1/8$: $1{,}000$ g $/ 8 = 125$ g.",
    },
    {
      difficulty: "medium",
      stem: "Why does an elephant lose body heat more slowly, relative to its size, than a mouse?",
      options: [
        "Because it has a larger surface-to-volume ratio.",
        "Because it has a smaller surface-to-volume ratio.",
        "Because its volume grows more slowly than its surface.",
        "Because large animals produce no heat.",
      ],
      answer: 1,
      explanation: "Heat is produced in the volume and lost through the surface. A large animal has relatively little surface per volume (formula 2), so it cools down more slowly.",
    },
    {
      difficulty: "high",
      stem: "A cube with an edge length of 4 cm is cut into cubes with an edge length of 1 cm. By what factor does the total surface area increase?",
      options: ["2", "4", "16", "64"],
      answer: 1,
      explanation: "Before: $6 \\cdot 4^2 = 96$ cm². After: $64$ small cubes with $6$ cm² each $= 384$ cm². $384 / 96 = 4$.",
    },
    {
      difficulty: "high",
      stem: "A balloon is inflated until its volume is 8 times as large, keeping its shape. How does its surface area change?",
      options: ["×2", "×4", "×8", "×16"],
      answer: 1,
      explanation: "Volume $\\times 8 = 2^3$ means $k = 2$. The surface grows by $k^2 = 4$.",
    },
  ],
};

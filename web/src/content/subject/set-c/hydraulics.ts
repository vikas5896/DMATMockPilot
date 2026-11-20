import type { SubjectText } from "../types";

export const HYDRAULICS: SubjectText = {
  passage: {
    id: "c-hydraulics",
    title: "Pressure in Liquids and the Hydraulic Lift",
    field: "Mechanical Engineering",
    blocks: [
      {
        k: "p",
        text: "**Pressure** is force per area. It is measured in pascal (1 Pa = 1 N/m²); a common larger unit is the bar (1 bar = 100,000 Pa).",
      },
      { k: "formula", tex: "p = \\frac{F}{A}", label: "(1)" },
      {
        k: "p",
        text: "In a liquid enclosed in a container, pressure applied at one point is transmitted equally to every part of the liquid (**Pascal's principle**). A **hydraulic lift** uses this: two pistons of different size close a system filled with oil. A small force $F_1$ on the small piston (area $A_1$) creates a pressure that acts on the large piston (area $A_2$) as well:",
      },
      { k: "formula", tex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\quad\\Rightarrow\\quad F_2 = F_1 \\cdot \\frac{A_2}{A_1}", label: "(2)" },
      {
        k: "p",
        text: "Oil can hardly be compressed, so the volume pushed out of the small cylinder equals the volume entering the large one: $A_1 \\cdot s_1 = A_2 \\cdot s_2$, where $s$ is the distance a piston moves. The large piston therefore moves a much shorter distance. Without losses, the work $F \\cdot s$ done on the small piston equals the work done by the large piston.",
      },
      {
        k: "p",
        text: "A liquid also exerts pressure because of its own weight. At a depth $h$ below the surface, the additional pressure is $p = \\rho \\cdot g \\cdot h$, with the density of water $\\rho = 1{,}000$ kg/m³ and $g \\approx 10$ m/s².",
      },
      {
        k: "table",
        caption: "Table 1. Hydraulic car lift in a workshop.",
        head: ["Part", "Value"],
        rows: [
          ["Area of the small piston", "5 cm²"],
          ["Area of the large piston", "500 cm²"],
          ["Force applied to the small piston", "150 N"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which quantity is the same at the small and the large piston?",
      options: ["The force", "The pressure", "The distance moved", "The area"],
      answer: 1,
      explanation: "By Pascal's principle the pressure is transmitted equally. Force and distance differ by the ratio of the areas.",
    },
    {
      difficulty: "low",
      stem: "Which force can the large piston of the lift in Table 1 exert?",
      options: ["1.5 N", "150 N", "1,500 N", "15,000 N"],
      answer: 3,
      explanation: "Formula (2): $F_2 = 150$ N $\\cdot \\frac{500}{5} = 150 \\cdot 100 = 15{,}000$ N.",
    },
    {
      difficulty: "medium",
      stem: "What pressure does the force of 150 N create in the oil?",
      options: ["30 Pa", "0.3 bar", "3 bar", "30 bar"],
      answer: 2,
      explanation: "$5$ cm² $= 0.0005$ m². Formula (1): $150 / 0.0005 = 300{,}000$ Pa $= 3$ bar.",
    },
    {
      difficulty: "medium",
      stem: "The car is to be raised by 10 cm. How far must the small piston be pushed in total?",
      options: ["0.1 cm", "10 cm", "1 m", "10 m"],
      answer: 3,
      explanation: "$A_1 s_1 = A_2 s_2$: $s_1 = 10$ cm $\\cdot \\frac{500}{5} = 1{,}000$ cm $= 10$ m (in practice in many short pump strokes).",
    },
    {
      difficulty: "medium",
      stem: "What is the additional pressure caused by the water at a depth of 20 m?",
      options: ["0.2 bar", "2 bar", "20 bar", "200 bar"],
      answer: 1,
      explanation: "$p = 1{,}000 \\cdot 10 \\cdot 20 = 200{,}000$ Pa $= 2$ bar.",
    },
    {
      difficulty: "high",
      stem: "Which statement about the hydraulic lift (without losses) is correct?",
      options: [
        "It multiplies both the force and the work.",
        "It multiplies the force, but the work stays the same.",
        "It multiplies the work, but the force stays the same.",
        "It reduces both the force and the work.",
      ],
      answer: 1,
      explanation: "The force is multiplied by 100, but the distance is divided by 100: $150$ N $\\cdot 10$ m $= 15{,}000$ N $\\cdot 0.1$ m $= 1{,}500$ J on both sides.",
    },
    {
      difficulty: "high",
      stem: "A different lift with the same large piston (500 cm²) is to lift 16,000 N with a force of 200 N. Which area must its small piston have?",
      options: ["4 cm²", "6.25 cm²", "8 cm²", "80 cm²"],
      answer: 1,
      explanation: "The force ratio is $16{,}000 / 200 = 80$, so the area ratio must also be 80: $A_1 = 500 / 80 = 6.25$ cm².",
    },
  ],
};

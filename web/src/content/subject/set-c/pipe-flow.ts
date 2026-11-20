import type { SubjectText } from "../types";

export const PIPE_FLOW: SubjectText = {
  passage: {
    id: "c-pipe-flow",
    title: "Water Flow in Pipes",
    field: "Civil Engineering",
    blocks: [
      {
        k: "p",
        text: "In water supply, engineers describe how much water flows through a pipe by the **volume flow rate** $Q$: the volume that passes a cross-section per unit of time, for example in litres per second (1 m³ = 1,000 L). It is linked to the cross-sectional area $A$ of the pipe and the average flow speed $v$:",
      },
      { k: "formula", tex: "Q = A \\cdot v", label: "(1)" },
      {
        k: "p",
        text: "Water is practically incompressible. In a pipe without branches, the same volume must therefore pass every cross-section per second (**continuity equation**). Where the pipe becomes narrower, the water flows faster:",
      },
      { k: "formula", tex: "A_1 \\cdot v_1 = A_2 \\cdot v_2", label: "(2)" },
      {
        k: "p",
        text: "For a round pipe with inner diameter $d$, the cross-sectional area is $A = \\pi d^2 / 4$; in this text use $\\pi \\approx 3$. Because the area grows with the square of the diameter, a pipe with half the diameter has only a quarter of the area.",
      },
      {
        k: "table",
        caption: "Table 1. Water supply of a new apartment building.",
        head: ["Part", "Value"],
        rows: [
          ["Main pipe: inner diameter", "10 cm"],
          ["Main pipe: flow speed", "1 m/s"],
          ["Branch pipes: inner diameter", "5 cm each"],
          ["Water tank on the roof: volume", "12 m³"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many cubic metres are 450 litres?",
      options: ["0.045 m³", "0.45 m³", "4.5 m³", "450,000 m³"],
      answer: 1,
      explanation: "1 m³ = 1,000 L, so $450 / 1{,}000 = 0.45$ m³.",
    },
    {
      difficulty: "low",
      stem: "In a pipe without branches, the diameter is halved. How does the flow speed change?",
      options: ["It halves.", "It doubles.", "It becomes 4 times as high.", "It becomes a quarter."],
      answer: 2,
      explanation: "Half the diameter gives a quarter of the area. By formula (2), the speed must become 4 times as high.",
    },
    {
      difficulty: "low",
      stem: "Why does water flow faster where a pipe becomes narrower?",
      options: [
        "Because the water is compressed there.",
        "Because the same volume per second must pass through a smaller area.",
        "Because the pressure in narrow pipes is always higher.",
        "Because friction is lower in narrow pipes.",
      ],
      answer: 1,
      explanation: "This is the continuity equation: water is practically incompressible, so the volume flow rate $Q$ is the same everywhere in the pipe.",
    },
    {
      difficulty: "medium",
      stem: "What is the volume flow rate in the main pipe (with $\\pi \\approx 3$)?",
      options: ["0.75 L/s", "7.5 L/s", "30 L/s", "75 L/s"],
      answer: 1,
      explanation: "$A = 3 \\cdot 0.1^2 / 4 = 0.0075$ m². Formula (1): $Q = 0.0075 \\cdot 1 = 0.0075$ m³/s $= 7.5$ L/s.",
    },
    {
      difficulty: "medium",
      stem: "The roof tank is to be filled within 2 hours. Which average volume flow rate is needed?",
      options: ["about 0.6 L/s", "about 1.7 L/s", "6 L/s", "100 L/s"],
      answer: 1,
      explanation: "$12$ m³ $= 12{,}000$ L; 2 h $= 7{,}200$ s. $12{,}000 / 7{,}200 \\approx 1.67$ L/s.",
    },
    {
      difficulty: "medium",
      stem: "About how long does it take to fill the roof tank with the full flow of the main pipe?",
      options: ["about 1.6 min", "about 27 min", "about 2.7 h", "about 16 h"],
      answer: 1,
      explanation: "$12{,}000$ L $/ 7.5$ L/s $= 1{,}600$ s $\\approx 26.7$ min.",
    },
    {
      difficulty: "high",
      stem: "The main pipe divides into three branch pipes, each with a diameter of 5 cm. All water flows on through them equally. What is the flow speed in each branch?",
      options: ["0.33 m/s", "0.75 m/s", "about 1.33 m/s", "4 m/s"],
      answer: 2,
      explanation: "Each branch has a quarter of the main pipe's area, so the three together have $3/4$ of it. By continuity: $v = 1$ m/s $\\cdot \\frac{4}{3} \\approx 1.33$ m/s. 4 m/s would apply if all the water went through one branch.",
    },
    {
      difficulty: "high",
      stem: "The same flow rate as in the main pipe is to flow through a single narrower pipe at a speed of 4 m/s. Which diameter must this pipe have?",
      options: ["2.5 cm", "5 cm", "7.5 cm", "40 cm"],
      answer: 1,
      explanation: "Four times the speed requires a quarter of the area. Since the area depends on $d^2$, the diameter must be halved: $10 / 2 = 5$ cm.",
    },
  ],
};

import type { SubjectText } from "../types";

export const LEVERS: SubjectText = {
  passage: {
    id: "g-levers",
    title: "Levers, Torque and Cranes",
    field: "Mechanical Engineering",
    blocks: [
      {
        k: "p",
        text: "A force that acts at a distance from a pivot produces a turning effect, the **torque** $M$. It is the force multiplied by the perpendicular distance $r$ between its line of action and the pivot (the **lever arm**):",
      },
      { k: "formula", tex: "M = F \\cdot r", label: "(1)" },
      {
        k: "p",
        text: "A lever is in balance when the torques turning it clockwise are equal to the torques turning it anticlockwise:",
      },
      { k: "formula", tex: "\\sum M_{\\text{clockwise}} = \\sum M_{\\text{anticlockwise}}", label: "(2)" },
      {
        k: "p",
        text: "This is why a long lever arm allows a small force to balance a large one: crowbars, wheelbarrows and spanners all use this principle. The weight of a mass $m$ is $F = m \\cdot g$; use $g = 10$ m/s².",
      },
      {
        k: "p",
        text: "A tower crane uses the same principle. Its jib carries the load on one side of the tower; a **counterweight** on the shorter arm on the other side balances it. The farther out the load hangs, the larger its torque and the smaller the load the crane can carry.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What torque does a force of 50 N produce at a lever arm of 0.4 m?",
      options: ["12.5 N·m", "20 N·m", "50.4 N·m", "125 N·m"],
      answer: 1,
      explanation: "Formula (1): $50 \\cdot 0.4 = 20$ N·m.",
    },
    {
      difficulty: "low",
      stem: "On a seesaw, a child of 30 kg sits 2 m from the pivot. At what distance on the other side must a child of 40 kg sit to balance it?",
      options: ["1.2 m", "1.5 m", "2 m", "2.67 m"],
      answer: 1,
      explanation: "Formula (2): $300 \\cdot 2 = 400 \\cdot r$, so $r = 600 / 400 = 1.5$ m. The heavier child must sit closer.",
    },
    {
      difficulty: "low",
      stem: "A bolt is loosened with a spanner. The spanner's handle is replaced by one twice as long. What force is needed now for the same torque?",
      options: ["Half the force", "The same force", "Twice the force", "Four times the force"],
      answer: 0,
      explanation: "$M = F \\cdot r$: doubling $r$ halves the force needed for the same torque.",
    },
    {
      difficulty: "medium",
      stem: "A crowbar rests on a pivot. A worker pushes with 200 N at 1.2 m from the pivot; the stone rests on the bar 0.2 m from the pivot. What force acts on the stone?",
      options: ["33 N", "240 N", "1,000 N", "1,200 N"],
      answer: 3,
      explanation: "$200 \\cdot 1.2 = F \\cdot 0.2$, so $F = 240 / 0.2 = 1{,}200$ N: six times the applied force.",
    },
    {
      difficulty: "medium",
      stem: "A crane lifts a load of 2,000 kg at 15 m from the tower. Its counterweight hangs 5 m from the tower on the other side. What mass must the counterweight have for balance?",
      options: ["667 kg", "2,000 kg", "6,000 kg", "30,000 kg"],
      answer: 2,
      explanation: "$2{,}000 \\cdot 15 = m \\cdot 5$, so $m = 6{,}000$ kg (the factor $g$ cancels).",
    },
    {
      difficulty: "medium",
      stem: "A wheelbarrow carries a load of 600 N, whose weight acts 0.4 m from the wheel axle. The handles are lifted 1.2 m from the axle. What lifting force is needed?",
      options: ["200 N", "240 N", "600 N", "1,800 N"],
      answer: 0,
      explanation: "The axle is the pivot: $600 \\cdot 0.4 = F \\cdot 1.2$, so $F = 240 / 1.2 = 200$ N.",
    },
    {
      difficulty: "high",
      stem: "The crane with its 6,000 kg counterweight at 5 m moves the load out to 20 m from the tower. What is the largest load it can balance there?",
      options: ["1,500 kg", "2,000 kg", "4,000 kg", "24,000 kg"],
      answer: 0,
      explanation: "Counterweight torque: $6{,}000 \\cdot 5 = 30{,}000$ kg·m. At 20 m: $30{,}000 / 20 = 1{,}500$ kg.",
    },
    {
      difficulty: "high",
      stem: "On one side of a seesaw sit a child of 20 kg at 2 m and a child of 25 kg at 1 m. Where on the other side must an adult of 50 kg sit to balance them?",
      options: ["0.9 m", "1.3 m", "1.5 m", "2.6 m"],
      answer: 1,
      explanation: "Torques add up: $200 \\cdot 2 + 250 \\cdot 1 = 650$ N·m. $500 \\cdot r = 650$ gives $r = 1.3$ m.",
    },
  ],
};

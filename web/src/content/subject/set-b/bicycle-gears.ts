import type { SubjectText } from "../types";

export const BICYCLE_GEARS: SubjectText = {
  passage: {
    id: "b-bicycle-gears",
    title: "Gear Ratios on a Bicycle",
    field: "Mechanical Engineering",
    blocks: [
      {
        k: "p",
        text: "On a bicycle, the pedals turn the front **chainring**, and the chain transmits this motion to a **sprocket** on the rear wheel. If the chainring has $z_1$ teeth and the sprocket $z_2$ teeth, one turn of the pedals moves the chain by $z_1$ teeth and therefore turns the rear wheel $z_1 / z_2$ times. This number is the **gear ratio**:",
      },
      { k: "formula", tex: "i = \\frac{z_1}{z_2}", label: "(1)" },
      {
        k: "p",
        text: "With each turn of the wheel, the bicycle travels one wheel circumference $U$. In this text, $U = 2.1$ m. The distance travelled per pedal turn is $s = i \\cdot U$, and with a pedalling rate (cadence) of $n$ pedal turns per minute, the speed is:",
      },
      { k: "formula", tex: "v = n \\cdot i \\cdot U", label: "(2)" },
      {
        k: "p",
        text: "A **high gear ratio** covers a long distance per pedal turn and is used for high speed on flat roads, but every pedal stroke requires more force. A **low gear ratio** makes pedalling easier, which helps on steep hills, but the bicycle moves less far per pedal turn.",
      },
      {
        k: "table",
        caption: "Table 1. Number of teeth available on a touring bicycle.",
        head: ["Part", "Options"],
        rows: [
          ["Chainrings (front)", "48 teeth, 32 teeth"],
          ["Sprockets (rear)", "12 teeth, 16 teeth, 24 teeth"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the gear ratio with the 48-tooth chainring and the 16-tooth sprocket?",
      options: ["0.33", "3", "32", "64"],
      answer: 1,
      explanation: "Formula (1): $i = 48 / 16 = 3$.",
    },
    {
      difficulty: "low",
      stem: "How far does the bicycle travel per pedal turn with the 48-tooth chainring and the 12-tooth sprocket?",
      options: ["2.1 m", "4.2 m", "8.4 m", "25.2 m"],
      answer: 2,
      explanation: "$i = 48/12 = 4$; $s = 4 \\cdot 2.1$ m $= 8.4$ m.",
    },
    {
      difficulty: "low",
      stem: "Which combination is easiest for climbing a steep hill?",
      options: ["48 front, 12 rear", "48 front, 24 rear", "32 front, 12 rear", "32 front, 24 rear"],
      answer: 3,
      explanation: "The lowest gear ratio makes pedalling easiest: $32/24 \\approx 1.33$ is the smallest of all combinations.",
    },
    {
      difficulty: "medium",
      stem: "Which two combinations have the same gear ratio?",
      options: ["48/12 and 32/12", "48/16 and 32/12", "48/24 and 32/16", "48/16 and 32/24"],
      answer: 2,
      explanation: "$48/24 = 2$ and $32/16 = 2$. The others: $48/12 = 4$, $32/12 \\approx 2.67$, $48/16 = 3$, $32/24 \\approx 1.33$.",
    },
    {
      difficulty: "medium",
      stem: "A sprocket is to be added that gives a gear ratio of 2.4 with the 48-tooth chainring. How many teeth must it have?",
      options: ["12", "20", "24", "115"],
      answer: 1,
      explanation: "$z_2 = z_1 / i = 48 / 2.4 = 20$ teeth.",
    },
    {
      difficulty: "medium",
      stem: "At the same cadence, a cyclist shifts from 48/24 to 48/12. What happens?",
      options: [
        "The speed doubles, and pedalling needs less force.",
        "The speed doubles, and pedalling needs more force.",
        "The speed halves, and pedalling needs more force.",
        "The speed stays the same, and pedalling needs less force.",
      ],
      answer: 1,
      explanation: "The gear ratio rises from 2 to 4, so by formula (2) the speed doubles at the same cadence. A higher ratio requires more force per pedal stroke.",
    },
    {
      difficulty: "high",
      stem: "What is the speed at a cadence of 60 pedal turns per minute with the 48-tooth chainring and the 16-tooth sprocket?",
      options: ["6.3 km/h", "11.3 km/h", "about 22.7 km/h", "37.8 km/h"],
      answer: 2,
      explanation: "Formula (2): $v = 60 \\cdot 3 \\cdot 2.1 = 378$ m/min. Per hour: $378 \\cdot 60 = 22{,}680$ m $\\approx 22.7$ km/h.",
    },
    {
      difficulty: "high",
      stem: "A cyclist wants to ride at 25.2 km/h using 48/12. Which cadence is needed?",
      options: ["30 turns per minute", "50 turns per minute", "75 turns per minute", "120 turns per minute"],
      answer: 1,
      explanation: "$25.2$ km/h $= 25{,}200$ m $/ 60$ min $= 420$ m/min. Per pedal turn the bicycle travels $4 \\cdot 2.1 = 8.4$ m, so $n = 420 / 8.4 = 50$.",
    },
  ],
};

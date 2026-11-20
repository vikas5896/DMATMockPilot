import type { SubjectText } from "../types";

export const CARDIAC_OUTPUT: SubjectText = {
  passage: {
    id: "e-cardiac-output",
    title: "The Heart as a Pump",
    field: "Physiology",
    blocks: [
      {
        k: "p",
        text: "With every beat, the left ventricle of the heart pumps a certain volume of blood into the body's arteries: the **stroke volume** (SV). The volume pumped per minute is the **cardiac output** (CO). It depends on the stroke volume and the **heart rate** (HR, beats per minute):",
      },
      { k: "formula", tex: "\\text{CO} = \\text{HR} \\cdot \\text{SV}", label: "(1)" },
      {
        k: "p",
        text: "An adult has about **5 litres** of blood. During physical exercise, the muscles need much more oxygen, and the heart increases both its rate and its stroke volume. The highest heart rate a person can reach falls with age; a common rule of thumb is: maximum heart rate ≈ 220 − age (in years). Endurance training enlarges the heart, so that trained athletes have a larger stroke volume and therefore need fewer beats at rest.",
      },
      {
        k: "p",
        text: "Blood pressure is given as two values: the higher **systolic** pressure while the heart contracts and the lower **diastolic** pressure while it relaxes, e.g. 120/80 mmHg. Because the heart spends more time relaxing than contracting, the **mean arterial pressure** is estimated as:",
      },
      { k: "formula", tex: "\\text{MAP} \\approx \\text{DBP} + \\frac{\\text{SBP} - \\text{DBP}}{3}", label: "(2)" },
      {
        k: "table",
        caption: "Table 1. Measurements of a healthy 25-year-old.",
        head: ["Situation", "Heart rate (beats/min)", "Stroke volume (mL)"],
        rows: [
          ["At rest", "70", "70"],
          ["During hard exercise", "150", "100"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the cardiac output of the person in Table 1 at rest?",
      options: ["0.49 L/min", "1.0 L/min", "4.9 L/min", "140 L/min"],
      answer: 2,
      explanation: "Formula (1): $70 \\cdot 70$ mL $= 4{,}900$ mL/min $= 4.9$ L/min.",
    },
    {
      difficulty: "low",
      stem: "According to the rule of thumb, what is the maximum heart rate of the 25-year-old?",
      options: ["150 beats/min", "175 beats/min", "195 beats/min", "245 beats/min"],
      answer: 2,
      explanation: "$220 - 25 = 195$ beats per minute.",
    },
    {
      difficulty: "medium",
      stem: "About how many times as high is the cardiac output during hard exercise as at rest?",
      options: ["about 1.4 times", "about 2.1 times", "about 3.1 times", "about 7 times"],
      answer: 2,
      explanation: "Exercise: $150 \\cdot 100$ mL $= 15$ L/min. Rest: 4.9 L/min. $15 / 4.9 \\approx 3.1$. Considering only the heart rate (about 2.1 times) is not enough.",
    },
    {
      difficulty: "medium",
      stem: "At rest, about how long does it take until a volume equal to the whole blood volume has passed through the left ventricle?",
      options: ["about 1 second", "about 1 minute", "about 5 minutes", "about 1 hour"],
      answer: 1,
      explanation: "5 L of blood at 4.9 L/min: about 1 minute.",
    },
    {
      difficulty: "medium",
      stem: "What is the estimated mean arterial pressure for a blood pressure of 120/80 mmHg?",
      options: ["about 93 mmHg", "100 mmHg", "about 107 mmHg", "200 mmHg"],
      answer: 0,
      explanation: "Formula (2): $80 + \\frac{120 - 80}{3} = 80 + 13.3 \\approx 93$ mmHg. The simple average (100 mmHg) ignores that the heart relaxes longer than it contracts.",
    },
    {
      difficulty: "high",
      stem: "A trained athlete has the same cardiac output at rest (4.9 L/min) but a stroke volume of 98 mL. What is the athlete's resting heart rate?",
      options: ["35 beats/min", "50 beats/min", "70 beats/min", "98 beats/min"],
      answer: 1,
      explanation: "$\\text{HR} = \\text{CO} / \\text{SV} = 4{,}900 / 98 = 50$ beats per minute.",
    },
    {
      difficulty: "high",
      stem: "During hard exercise, what percentage of the 25-year-old's maximum heart rate is reached?",
      options: ["about 66 %", "about 77 %", "about 87 %", "about 130 %"],
      answer: 1,
      explanation: "$150 / 195 \\approx 0.77 = 77$ %.",
    },
  ],
};

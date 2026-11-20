import type { SubjectText } from "../types";

export const AVERAGES: SubjectText = {
  passage: {
    id: "g-averages",
    title: "Averages That Trick Our Intuition",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "The **arithmetic mean** of $n$ values is their sum divided by $n$. If the values do not count equally, a **weighted mean** is used: each value is multiplied by its weight, and the sum is divided by the sum of the weights. Universities, for example, weight course grades by the credit points of the course.",
      },
      {
        k: "p",
        text: "The **average speed** of a journey is always the total distance divided by the total time. It equals the arithmetic mean of two speeds only if each speed is driven for the **same time**. If each speed is driven for the **same distance**, the slower part takes longer and counts more. The average speed is then the **harmonic mean**:",
      },
      { k: "formula", tex: "\\bar{v} = \\frac{2 \\, v_1 \\, v_2}{v_1 + v_2}", label: "(1)" },
      {
        k: "p",
        text: "Percentage changes also behave unexpectedly. Changes are multiplied, not added: an increase by $p$ % followed by a decrease by $p$ % gives the factor $(1 + p/100)(1 - p/100) = 1 - (p/100)^2$, which is always less than 1.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the arithmetic mean of 4, 8 and 12?",
      options: ["6", "8", "12", "24"],
      answer: 1,
      explanation: "$(4 + 8 + 12) / 3 = 24 / 3 = 8$.",
    },
    {
      difficulty: "low",
      stem: "A car drives for 1 hour at 60 km/h and then for 1 hour at 80 km/h. What is its average speed?",
      options: ["about 68.6 km/h", "70 km/h", "72 km/h", "140 km/h"],
      answer: 1,
      explanation: "Equal times: $60 + 80 = 140$ km in 2 h, i.e. 70 km/h, which here equals the arithmetic mean.",
    },
    {
      difficulty: "medium",
      stem: "A price rises by 10 % and then falls by 10 %. What is the overall change?",
      options: ["0 %", "−1 %", "+1 %", "−10 %"],
      answer: 1,
      explanation: "$1.1 \\cdot 0.9 = 0.99$: a decrease of 1 %. The 10 % decrease is taken from the higher price.",
    },
    {
      difficulty: "medium",
      stem: "A car drives 60 km at 60 km/h and then 60 km at 120 km/h. What is its average speed?",
      options: ["80 km/h", "85 km/h", "90 km/h", "100 km/h"],
      answer: 0,
      explanation: "Times: 1 h and 0.5 h. Total: 120 km in 1.5 h $= 80$ km/h. Formula (1): $\\frac{2 \\cdot 60 \\cdot 120}{180} = 80$.",
    },
    {
      difficulty: "medium",
      stem: "A student earned the grade 1.0 in a course worth 6 credit points and the grade 2.5 in a course worth 4 credit points. What is the weighted mean grade?",
      options: ["1.6", "1.75", "1.9", "3.5"],
      answer: 0,
      explanation: "$\\frac{6 \\cdot 1.0 + 4 \\cdot 2.5}{6 + 4} = \\frac{16}{10} = 1.6$. The unweighted mean would be 1.75.",
    },
    {
      difficulty: "medium",
      stem: "A cyclist rides to a village at 40 km/h and returns along the same road at 60 km/h. What is the average speed for the whole trip?",
      options: ["48 km/h", "50 km/h", "52 km/h", "100 km/h"],
      answer: 0,
      explanation: "Equal distances, so formula (1): $\\frac{2 \\cdot 40 \\cdot 60}{100} = 48$ km/h.",
    },
    {
      difficulty: "high",
      stem: "A share price falls by 20 %. By what percentage must it then rise to return to its original value?",
      options: ["16.7 %", "20 %", "24 %", "25 %"],
      answer: 3,
      explanation: "After the fall the price is 0.8 times the original. To return to 1: $1 / 0.8 = 1.25$, a rise of 25 %.",
    },
    {
      difficulty: "high",
      stem: "A cyclist climbs a hill at 30 km/h. How fast must she ride down the same road to reach an average speed of 60 km/h for the whole trip?",
      options: ["90 km/h", "120 km/h", "180 km/h", "It is impossible."],
      answer: 3,
      explanation: "For a road of length $d$, the climb alone takes $d/30$, which is exactly the total time allowed for $2d$ at 60 km/h ($2d/60$). No time is left for the descent, however fast she rides.",
    },
  ],
};

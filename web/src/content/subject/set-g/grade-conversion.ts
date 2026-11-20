import type { SubjectText } from "../types";

export const GRADE_CONVERSION: SubjectText = {
  passage: {
    id: "g-grade-conversion",
    title: "Converting Foreign Grades into German Grades",
    field: "Education Studies",
    blocks: [
      {
        k: "p",
        text: "German universities grade on a scale from **1.0** (best) to **4.0** (lowest passing grade); 5.0 means failed. A smaller number is therefore a better grade. Many Master's programmes require a minimum grade, for example 2.5 or better.",
      },
      {
        k: "p",
        text: "To compare applicants from other countries, universities convert foreign grades with the **modified Bavarian formula**:",
      },
      { k: "formula", tex: "N_d = 1 + 3 \\cdot \\frac{N_{max} - N_x}{N_{max} - N_{min}}", label: "(1)" },
      {
        k: "p",
        text: "Here $N_{max}$ is the best grade possible in the foreign system, $N_{min}$ the lowest passing grade there, $N_x$ the grade the applicant achieved and $N_d$ the resulting German grade. The result is given with one decimal place. The best possible foreign grade always becomes 1.0, and the lowest passing grade always becomes 4.0.",
      },
      {
        k: "p",
        text: "The formula shows that the same percentage can lead to different German grades, depending on the passing mark of the foreign system: reaching 70 % counts for more where the passing mark is 40 % than where it is 50 %.",
      },
      {
        k: "table",
        caption: "Table 1. Two grading systems (examples).",
        head: ["System", "Best grade", "Lowest passing grade"],
        rows: [
          ["Percentage marks, university P", "100 %", "40 %"],
          ["CGPA on a 10-point scale", "10.0", "5.0"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which German grade is better?",
      options: ["1.3", "2.7", "3.7", "Both 1.3 and 3.7 are equally good."],
      answer: 0,
      explanation: "On the German scale, smaller numbers are better: 1.0 is the best grade.",
    },
    {
      difficulty: "low",
      stem: "An applicant from university P has 80 %. What is the German grade?",
      options: ["1.0", "1.8", "2.0", "2.5"],
      answer: 2,
      explanation: "Formula (1): $1 + 3 \\cdot \\frac{100 - 80}{100 - 40} = 1 + 3 \\cdot \\frac{20}{60} = 2.0$.",
    },
    {
      difficulty: "medium",
      stem: "An applicant from university P has 70 %. What is the German grade?",
      options: ["2.0", "2.3", "2.5", "3.0"],
      answer: 2,
      explanation: "$1 + 3 \\cdot \\frac{30}{60} = 1 + 1.5 = 2.5$.",
    },
    {
      difficulty: "medium",
      stem: "An applicant has a CGPA of 8.0 on the 10-point scale. What is the German grade?",
      options: ["1.6", "2.0", "2.2", "2.8"],
      answer: 2,
      explanation: "$1 + 3 \\cdot \\frac{10 - 8}{10 - 5} = 1 + 3 \\cdot 0.4 = 2.2$.",
    },
    {
      difficulty: "medium",
      stem: "A Master's programme requires a German grade of 2.5 or better. What percentage must an applicant from university P reach at least?",
      options: ["60 %", "65 %", "70 %", "75 %"],
      answer: 2,
      explanation: "From Question 3: 70 % gives exactly 2.5. Less than 70 % gives a larger (worse) number.",
    },
    {
      difficulty: "high",
      stem: "At another university, the passing mark is 50 %. An applicant from there also has 70 %. What is the German grade?",
      options: ["2.2", "2.5", "2.8", "3.4"],
      answer: 2,
      explanation: "$1 + 3 \\cdot \\frac{100 - 70}{100 - 50} = 1 + 3 \\cdot 0.6 = 2.8$, which does not meet a 2.5 requirement, although the percentage is the same as in Question 3.",
    },
    {
      difficulty: "high",
      stem: "At a university with a passing mark of 50 %, which percentage gives a German grade of 2.0?",
      options: ["about 67 %", "75 %", "80 %", "about 83 %"],
      answer: 3,
      explanation: "$2.0 = 1 + 3 \\cdot \\frac{100 - x}{50}$ gives $\\frac{100 - x}{50} = \\frac{1}{3}$, so $100 - x \\approx 16.7$ and $x \\approx 83.3$ %. With a passing mark of 40 %, 80 % would be enough.",
    },
  ],
};

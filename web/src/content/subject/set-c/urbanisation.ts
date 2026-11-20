import type { SubjectText } from "../types";

export const URBANISATION: SubjectText = {
  passage: {
    id: "c-urbanisation",
    title: "Urbanisation: The Move to the Cities",
    field: "Human Geography",
    blocks: [
      {
        k: "p",
        text: "**Urbanisation** describes the growing share of a country's population that lives in towns and cities. It is measured by the **urbanisation rate**: the urban population as a percentage of the total population.",
      },
      {
        k: "p",
        text: "Cities grow for three reasons: more births than deaths among city dwellers (natural growth), people moving in from rural areas (migration), and villages that grow so much that they are reclassified as towns. Migration is explained by **push factors**, which make people leave the countryside (for example a lack of jobs, droughts or too little farmland), and **pull factors**, which attract them to the cities (for example better-paid jobs, schools, universities and hospitals).",
      },
      {
        k: "p",
        text: "Figure 1 shows the urbanisation rate of three countries. In countries where most people already live in cities, the rate rises only slowly, because it can never exceed 100 % and some people always remain in rural areas.",
      },
      {
        k: "chart",
        caption: "Figure 1. Urbanisation rate (%) of three countries.",
        kind: "line",
        xLabel: "Year",
        yLabel: "Urban population (%)",
        categories: ["1960", "1980", "2000", "2020"],
        series: [
          { name: "Country A", values: [20, 30, 45, 60] },
          { name: "Country B", values: [60, 70, 75, 78] },
          { name: "Country C", values: [10, 15, 25, 40] },
        ],
      },
      {
        k: "table",
        caption: "Table 1. Total population in 2020.",
        head: ["Country", "Population (millions)"],
        rows: [
          ["A", "50"],
          ["B", "80"],
          ["C", "30"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many people lived in the cities of country A in 2020?",
      options: ["3 million", "30 million", "33 million", "60 million"],
      answer: 1,
      explanation: "60 % of 50 million $= 0.6 \\cdot 50 = 30$ million.",
    },
    {
      difficulty: "low",
      stem: "Which country's urbanisation rate rose by the most percentage points between 1960 and 2020?",
      options: ["Country A", "Country B", "Country C", "All rose by the same amount."],
      answer: 0,
      explanation: "A: $60 - 20 = 40$ points; B: $78 - 60 = 18$ points; C: $40 - 10 = 30$ points.",
    },
    {
      difficulty: "low",
      stem: "Which of the following is a pull factor according to the text?",
      options: [
        "Unemployment in rural areas",
        "A long drought",
        "Better-paid jobs in the cities",
        "Too little farmland",
      ],
      answer: 2,
      explanation: "Pull factors attract people to the cities. The other three make people leave the countryside: they are push factors.",
    },
    {
      difficulty: "medium",
      stem: "Which explanation for the slow rise of country B's urbanisation rate since 2000 is given in the text?",
      options: [
        "Country B's population is shrinking.",
        "Most people in B already live in cities, so the rate can only rise slowly.",
        "Country B has no pull factors.",
        "Cities in B are no longer reclassified.",
      ],
      answer: 1,
      explanation: "The text explains that the rate rises only slowly once most people live in cities, because it cannot exceed 100 % and some people always stay rural.",
    },
    {
      difficulty: "medium",
      stem: "How many people lived in the cities of all three countries together in 2020?",
      options: ["104.4 million", "130 million", "160 million", "178 million"],
      answer: 0,
      explanation: "A: $0.60 \\cdot 50 = 30$; B: $0.78 \\cdot 80 = 62.4$; C: $0.40 \\cdot 30 = 12$. Total: $104.4$ million.",
    },
    {
      difficulty: "high",
      stem: "Which country had the largest rural population in 2020?",
      options: ["Country A", "Country B", "Country C", "B and C had the same."],
      answer: 0,
      explanation: "Rural shares: A $40$ % of 50 $= 20$ million; B $22$ % of 80 $= 17.6$ million; C $60$ % of 30 $= 18$ million. C has the highest rural share, but A the most rural people.",
    },
    {
      difficulty: "high",
      stem: "By what percentage did country C's urbanisation rate grow between 1980 and 2020?",
      options: ["25 %", "62.5 %", "about 167 %", "about 267 %"],
      answer: 2,
      explanation: "The rate rose from 15 % to 40 %, i.e. by 25 percentage points. Relative to 15: $25 / 15 \\approx 1.67 = 167$ %. 267 % is the ratio $40/15$.",
    },
  ],
};

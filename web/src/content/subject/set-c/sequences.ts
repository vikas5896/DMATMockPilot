import type { SubjectText } from "../types";

export const SEQUENCES: SubjectText = {
  passage: {
    id: "c-sequences",
    title: "Linear and Exponential Growth",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "A **sequence** is a list of numbers $a_1, a_2, a_3, \\ldots$ that follow a rule. Two types are especially important.",
      },
      {
        k: "p",
        text: "In an **arithmetic sequence**, the same number $d$ is added at every step (linear growth). The $n$-th term and the sum of the first $n$ terms are:",
      },
      { k: "formula", tex: "a_n = a_1 + (n-1) \\cdot d \\qquad S_n = \\frac{n \\cdot (a_1 + a_n)}{2}", label: "(1)" },
      {
        k: "p",
        text: "In a **geometric sequence**, every term is multiplied by the same factor $q$ (exponential growth if $q > 1$, decay if $0 < q < 1$):",
      },
      { k: "formula", tex: "a_n = a_1 \\cdot q^{\\,n-1} \\qquad S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}", label: "(2)" },
      {
        k: "p",
        text: "Exponential growth starts slowly but eventually overtakes any linear growth. **Example.** A company offers an intern two payment schemes for a project of several weeks. In scheme L, the intern receives 100 € in week 1 and 20 € more in every following week. In scheme E, the intern receives 1 € in week 1, and the amount doubles every week.",
      },
      {
        k: "table",
        caption: "Table 1. Weekly payment (€) in the two schemes.",
        head: ["Week", "1", "2", "3", "4", "5", "6", "7", "8"],
        rows: [
          ["Scheme L", "100", "120", "140", "160", "180", "200", "220", "240"],
          ["Scheme E", "1", "2", "4", "8", "16", "32", "64", "128"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much does the intern receive in week 10 under scheme L?",
      options: ["200 €", "260 €", "280 €", "300 €"],
      answer: 2,
      explanation: "Formula (1): $a_{10} = 100 + 9 \\cdot 20 = 280$ €. 300 € would add 20 € ten times instead of nine.",
    },
    {
      difficulty: "low",
      stem: "How much does the intern receive in week 10 under scheme E?",
      options: ["20 €", "256 €", "512 €", "1,024 €"],
      answer: 2,
      explanation: "Formula (2): $a_{10} = 1 \\cdot 2^{9} = 512$ €.",
    },
    {
      difficulty: "low",
      stem: "Which of the following sequences is arithmetic?",
      options: ["2, 4, 8, 16", "5, 8, 11, 14", "1, 4, 9, 16", "3, 6, 12, 24"],
      answer: 1,
      explanation: "In 5, 8, 11, 14 the same number (3) is added each time. 2, 4, 8, 16 and 3, 6, 12, 24 are geometric; 1, 4, 9, 16 are square numbers.",
    },
    {
      difficulty: "medium",
      stem: "What is the total payment for weeks 1 to 8 under scheme L?",
      options: ["1,360 €", "1,600 €", "1,920 €", "2,720 €"],
      answer: 0,
      explanation: "Formula (1): $S_8 = \\frac{8 \\cdot (100 + 240)}{2} = 4 \\cdot 340 = 1{,}360$ €.",
    },
    {
      difficulty: "medium",
      stem: "What is the total payment for weeks 1 to 8 under scheme E?",
      options: ["128 €", "255 €", "256 €", "511 €"],
      answer: 1,
      explanation: "Formula (2): $S_8 = 1 \\cdot \\frac{2^8 - 1}{2 - 1} = 255$ €. Check: $1+2+4+\\ldots+128 = 255$.",
    },
    {
      difficulty: "medium",
      stem: "The value of a machine falls by half every year. It is worth 1,000 € in year 1. What is it worth in year 4?",
      options: ["62.50 €", "125 €", "250 €", "500 €"],
      answer: 1,
      explanation: "Geometric decay with $q = 0.5$: $a_4 = 1{,}000 \\cdot 0.5^3 = 125$ €.",
    },
    {
      difficulty: "high",
      stem: "In which week is the weekly payment of scheme E higher than that of scheme L for the first time?",
      options: ["Week 8", "Week 9", "Week 10", "Week 11"],
      answer: 2,
      explanation: "Week 9: E $= 2^8 = 256$ €, L $= 100 + 8 \\cdot 20 = 260$ € (L still higher). Week 10: E $= 512$ €, L $= 280$ €.",
    },
    {
      difficulty: "high",
      stem: "The project lasts 12 weeks. Which scheme pays more in total, and by how much?",
      options: [
        "Scheme L, by 1,575 €",
        "Scheme E, by 1,575 €",
        "Both pay the same.",
        "Scheme E, by 4,095 €",
      ],
      answer: 1,
      explanation: "L: $a_{12} = 100 + 11 \\cdot 20 = 320$, $S_{12} = \\frac{12 \\cdot (100 + 320)}{2} = 2{,}520$ €. E: $S_{12} = 2^{12} - 1 = 4{,}095$ €. Difference: $4{,}095 - 2{,}520 = 1{,}575$ € in favour of E.",
    },
  ],
};

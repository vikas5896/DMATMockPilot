import type { SubjectText } from "../types";

export const STUDENT_BUDGET: SubjectText = {
  passage: {
    id: "j-student-budget",
    title: "Planning a Student Budget Abroad",
    field: "Personal Finance",
    blocks: [
      {
        k: "p",
        text: "International students usually have to prove that they can pay for their living costs before they receive a visa. A common way is a **blocked account**: the student deposits the required amount for one year, and the bank pays out only a fixed amount per month. In this text, the required amount is **12,000 € per year** (an example value; the real amount is set by the authorities and changes over time).",
      },
      {
        k: "p",
        text: "Monthly costs depend strongly on the city, above all on rent. In addition to the monthly costs, universities charge a **semester contribution** twice a year, which often includes a public transport ticket. Many students also work part-time to cover extra costs; in this text they earn **13 € per hour**.",
      },
      {
        k: "table",
        caption: "Table 1. Monthly costs of a student (example values in €).",
        head: ["Item", "Cost per month"],
        rows: [
          ["Rent (shared flat)", "450"],
          ["Food", "200"],
          ["Health insurance", "120"],
          ["Phone and internet", "30"],
          ["Books, clothes, leisure", "150"],
          ["Total", "950"],
        ],
      },
      {
        k: "p",
        text: "The semester contribution is **300 € per semester** (two semesters per year). In the questions, use 1 € = 90 ₹.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which item of Table 1 is the largest monthly cost?",
      options: ["Food", "Rent", "Health insurance", "Books, clothes, leisure"],
      answer: 1,
      explanation: "Rent is 450 € per month, almost half of all monthly costs.",
    },
    {
      difficulty: "low",
      stem: "How much can the student withdraw from the blocked account per month if the yearly amount is paid out in equal parts?",
      options: ["950 €", "1,000 €", "1,200 €", "12,000 €"],
      answer: 1,
      explanation: "$12{,}000 / 12 = 1{,}000$ € per month.",
    },
    {
      difficulty: "low",
      stem: "What are the monthly costs in Table 1 in rupees?",
      options: ["10,556 ₹", "85,500 ₹", "90,000 ₹", "855,000 ₹"],
      answer: 1,
      explanation: "$950 \\cdot 90 = 85{,}500$ ₹.",
    },
    {
      difficulty: "medium",
      stem: "What are the student's average monthly costs if the semester contribution is spread evenly over the year?",
      options: ["950 €", "975 €", "1,000 €", "1,250 €"],
      answer: 2,
      explanation: "$2 \\cdot 300 = 600$ € per year, i.e. $50$ € per month: $950 + 50 = 1{,}000$ €, exactly the monthly payout.",
    },
    {
      difficulty: "medium",
      stem: "What share of the monthly costs in Table 1 is rent?",
      options: ["about 21 %", "about 45 %", "about 47 %", "about 90 %"],
      answer: 2,
      explanation: "$450 / 950 \\approx 0.47$. 45 % would divide by 1,000 € instead of the total in Table 1.",
    },
    {
      difficulty: "medium",
      stem: "A laptop repair costs 260 €. How many hours must the student work to pay for it?",
      options: ["13 hours", "20 hours", "26 hours", "34 hours"],
      answer: 1,
      explanation: "At 13 € per hour: $260 / 13 = 20$ hours of work.",
    },
    {
      difficulty: "high",
      stem: "The landlord raises the rent by 20 %. Including the semester contribution, how many hours per month must the student work to cover the gap left by the blocked account?",
      options: ["about 3 hours", "about 7 hours", "about 9 hours", "about 18 hours"],
      answer: 1,
      explanation: "New rent: $450 \\cdot 1.2 = 540$ €, i.e. +90 €. Costs: $1{,}000 + 90 = 1{,}090$ €; payout 1,000 €. Gap 90 €: $90 / 13 \\approx 7$ hours.",
    },
    {
      difficulty: "high",
      stem: "How many rupees must the student's family deposit for one year in the blocked account?",
      options: ["108,000 ₹", "133,333 ₹", "1,080,000 ₹", "10,800,000 ₹"],
      answer: 2,
      explanation: "$12{,}000 \\cdot 90 = 1{,}080{,}000$ ₹, i.e. 10.8 lakh rupees.",
    },
  ],
};

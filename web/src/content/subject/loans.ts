import type { SubjectText } from "./types";

export const LOANS: SubjectText = {
  passage: {
    id: "loans",
    title: "Interest and Loan Repayment",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "Anyone who borrows money pays a price for using it: interest. The interest rate $r$ states this price as a share of the borrowed amount per year. Two ways of calculating interest are common.",
      },
      {
        k: "p",
        text: "With **simple interest**, interest is paid only on the original amount (the principal) $P$. After $t$ years the interest is:",
      },
      { k: "formula", tex: "I = P \\cdot r \\cdot t", label: "(1)" },
      {
        k: "p",
        text: "With **compound interest**, the interest earned each year is added to the capital and earns interest itself in the following years. Starting from $K_0$, the capital after $n$ years is:",
      },
      { k: "formula", tex: "K_n = K_0 \\cdot (1 + r)^n", label: "(2)" },
      {
        k: "p",
        text: "A quick estimate of how long compound interest needs to double a capital is the **rule of 72**: the doubling time in years is roughly 72 divided by the interest rate in percent.",
      },
      {
        k: "p",
        text: "Loans are usually repaid in instalments. Each instalment consists of an **interest part**, which is always calculated on the amount still owed (the outstanding balance), and a **repayment part**, which reduces that balance. Two types of loan are widespread:",
      },
      {
        k: "list",
        items: [
          "In an **annuity loan**, every instalment has the same size. Because the balance shrinks, the interest part falls over time and the repayment part grows.",
          "In a **repayment loan**, the repayment part is the same every year. The instalment is therefore highest in the first year and falls over time.",
        ],
      },
      {
        k: "table",
        caption: "Table 1. Annuity loan of 10,000 € at 5 % interest per year, repaid in 5 equal annual instalments of 2,309.75 € (all amounts in €).",
        head: ["Year", "Balance at start", "Interest part", "Repayment part", "Balance at end"],
        rows: [
          ["1", "10,000.00", "500.00", "1,809.75", "8,190.25"],
          ["2", "8,190.25", "409.51", "1,900.24", "6,290.01"],
          ["3", "6,290.01", "314.50", "1,995.25", "4,294.76"],
          ["4", "4,294.76", "214.74", "2,095.01", "2,199.75"],
          ["5", "2,199.75", "109.99", "2,199.76", "0.00"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A student deposits 2,000 € for 4 years at 3 % **simple** interest. How much interest does she receive in total?",
      options: ["24 €", "240 €", "251 €", "2,240 €"],
      answer: 1,
      explanation: "Formula (1): $I = 2{,}000 \\cdot 0.03 \\cdot 4 = 240$ €. 251 € would be the compound-interest result; 2,240 € is principal plus interest.",
    },
    {
      difficulty: "low",
      stem: "1,000 € are invested for 2 years at 10 % **compound** interest. What is the capital after 2 years?",
      options: ["1,100 €", "1,200 €", "1,210 €", "1,221 €"],
      answer: 2,
      explanation: "Formula (2): $1{,}000 \\cdot 1.1^2 = 1{,}000 \\cdot 1.21 = 1{,}210$ €. Simple interest would give 1,200 €; the extra 10 € is interest on the first year's interest.",
    },
    {
      difficulty: "low",
      stem: "According to the rule of 72, roughly how long does it take for a capital to double at 6 % compound interest?",
      options: ["6 years", "12 years", "16.7 years", "43 years"],
      answer: 1,
      explanation: "Doubling time ≈ 72 / 6 = 12 years.",
    },
    {
      difficulty: "medium",
      stem: "Which statement about the loan in Table 1 is correct?",
      options: [
        "The interest part falls from year to year, while the repayment part rises.",
        "The interest part stays the same, because the interest rate stays the same.",
        "The repayment part falls from year to year.",
        "The instalment rises from year to year.",
      ],
      answer: 0,
      explanation: "In Table 1 the interest part falls (500.00 → 109.99) and the repayment part rises (1,809.75 → 2,199.76). Their sum, the instalment, stays at 2,309.75 €.",
    },
    {
      difficulty: "medium",
      stem: "Why does the interest part in Table 1 fall over time?",
      options: [
        "The bank lowers the interest rate every year.",
        "Interest is calculated on the outstanding balance, which gets smaller every year.",
        "The instalment becomes larger every year.",
        "Part of the interest is paid back to the borrower.",
      ],
      answer: 1,
      explanation: "The text says the interest part is always calculated on the amount still owed. That balance falls with every repayment, so 5 % of it gets smaller.",
    },
    {
      difficulty: "medium",
      stem: "How much interest does the borrower in Table 1 pay over the whole 5 years?",
      options: ["500.00 €", "1,548.75 €", "2,500.00 €", "11,548.75 €"],
      answer: 1,
      explanation: "Total paid: $5 \\cdot 2{,}309.75 = 11{,}548.75$ €. Minus the 10,000 € borrowed, that leaves 1,548.75 € interest (the interest column adds up to the same amount, apart from a 1-cent rounding difference).",
    },
    {
      difficulty: "high",
      stem: "The same 10,000 € at 5 % are instead taken as a **repayment loan** with a repayment part of 2,000 € per year. How large is the instalment in the first year?",
      options: ["2,000 €", "2,100 €", "2,309.75 €", "2,500 €"],
      answer: 3,
      explanation: "Instalment = repayment part + interest part. In year 1 the interest is 5 % of 10,000 € = 500 €, so the instalment is 2,000 € + 500 € = 2,500 €.",
    },
    {
      difficulty: "high",
      stem: "How much interest is paid in total over the 5 years for the repayment loan described in the previous question?",
      options: ["1,000 €", "1,500 €", "1,548.75 €", "2,500 €"],
      answer: 1,
      explanation: "The balance at the start of each year is 10,000, 8,000, 6,000, 4,000 and 2,000 €. 5 % of each gives 500 + 400 + 300 + 200 + 100 = 1,500 €. This is less than the annuity loan, because the balance falls faster at the start.",
    },
  ],
};

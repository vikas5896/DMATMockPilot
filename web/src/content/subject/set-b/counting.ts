import type { SubjectText } from "../types";

export const COUNTING: SubjectText = {
  passage: {
    id: "b-counting",
    title: "Counting Possibilities: PINs and Passwords",
    field: "Mathematics",
    blocks: [
      {
        k: "p",
        text: "How safe a code is depends on how many different codes are possible. **Combinatorics** provides rules for counting them. The basic rule is the **multiplication principle**: if a choice is made in several independent steps, the numbers of options in the steps are multiplied.",
      },
      {
        k: "p",
        text: "If each of $n$ positions can be filled with any of $k$ symbols (**repetition allowed**), the number of possible codes is:",
      },
      { k: "formula", tex: "N = k^n", label: "(1)" },
      {
        k: "p",
        text: "If no symbol may be used twice (**no repetition**, order matters), there are $k$ options for the first position, $k - 1$ for the second, and so on:",
      },
      { k: "formula", tex: "N = k \\cdot (k-1) \\cdot \\ldots \\cdot (k-n+1)", label: "(2)" },
      {
        k: "p",
        text: "If $n$ different items are chosen from $k$ and their **order does not matter** (as in a lottery), each selection was counted $n!$ times in formula (2), where $n! = n \\cdot (n-1) \\cdot \\ldots \\cdot 1$. The number of selections is therefore:",
      },
      { k: "formula", tex: "\\binom{k}{n} = \\frac{k \\cdot (k-1) \\cdot \\ldots \\cdot (k-n+1)}{n!}", label: "(3)" },
      {
        k: "p",
        text: "An attacker who tries all codes one after another (**brute force**) needs, in the worst case, the number of possible codes divided by the number of attempts per second.",
      },
      {
        k: "table",
        caption: "Table 1. Common sets of symbols.",
        head: ["Symbol set", "Number of symbols k"],
        rows: [
          ["Digits 0–9", "10"],
          ["Lowercase letters a–z", "26"],
          ["Lowercase and uppercase letters", "52"],
          ["Lowercase letters and digits", "36"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many different 4-digit PINs are possible if every digit 0–9 may be used at each position?",
      options: ["40", "5,040", "9,999", "10,000"],
      answer: 3,
      explanation: "Formula (1): $10^4 = 10{,}000$ (from 0000 to 9999). 9,999 forgets the code 0000.",
    },
    {
      difficulty: "low",
      stem: "How many passwords of exactly 2 lowercase letters are possible?",
      options: ["52", "325", "650", "676"],
      answer: 3,
      explanation: "Repetition is allowed: $26^2 = 676$. 650 would be the count without repetition, 325 without repetition and order.",
    },
    {
      difficulty: "medium",
      stem: "How many 4-digit PINs are possible if all four digits must be different?",
      options: ["210", "5,040", "6,561", "10,000"],
      answer: 1,
      explanation: "Formula (2): $10 \\cdot 9 \\cdot 8 \\cdot 7 = 5{,}040$. 210 ignores the order (formula 3).",
    },
    {
      difficulty: "medium",
      stem: "In a game, players choose 3 different numbers from 1 to 10; the order does not matter. How many different selections are there?",
      options: ["30", "120", "720", "1,000"],
      answer: 1,
      explanation: "Formula (3): $\\frac{10 \\cdot 9 \\cdot 8}{3!} = \\frac{720}{6} = 120$.",
    },
    {
      difficulty: "medium",
      stem: "A website asks users to choose 2 different security questions from a list of 6. The order does not matter. How many choices are possible?",
      options: ["12", "15", "30", "36"],
      answer: 1,
      explanation: "Formula (3): $\\frac{6 \\cdot 5}{2!} = 15$. 30 would count each pair twice (in both orders).",
    },
    {
      difficulty: "medium",
      stem: "How many times more 3-character passwords are possible with lowercase and uppercase letters than with lowercase letters only?",
      options: ["2 times", "3 times", "6 times", "8 times"],
      answer: 3,
      explanation: "$\\frac{52^3}{26^3} = \\left(\\frac{52}{26}\\right)^3 = 2^3 = 8$.",
    },
    {
      difficulty: "high",
      stem: "A password consists of 6 lowercase letters. Which change increases the number of possible passwords the most?",
      options: [
        "Adding one more lowercase letter (7 lowercase letters).",
        "Allowing uppercase letters as well (6 letters from 52 symbols).",
        "Allowing digits as well (6 characters from 36 symbols).",
        "Using 8 digits instead of letters.",
      ],
      answer: 1,
      explanation: "Factors compared with $26^6$: one more letter gives $\\times 26$; 52 symbols give $(52/26)^6 = 2^6 = 64$; 36 symbols give $(36/26)^6 \\approx 7$; $10^8 = 100$ million is even less than $26^6 \\approx 309$ million.",
    },
    {
      difficulty: "high",
      stem: "An attacker can test 10,000 passwords per second. At most, about how long does it take to find a password of 4 lowercase letters?",
      options: ["less than 1 second", "about 46 seconds", "about 13 minutes", "about 2 days"],
      answer: 1,
      explanation: "$26^4 = 676^2 = 456{,}976$ possible passwords; $456{,}976 / 10{,}000 \\approx 46$ s.",
    },
  ],
};

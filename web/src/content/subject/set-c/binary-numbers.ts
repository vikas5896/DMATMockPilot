import type { SubjectText } from "../types";

export const BINARY_NUMBERS: SubjectText = {
  passage: {
    id: "c-binary-numbers",
    title: "Binary and Hexadecimal Numbers",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "In the decimal system, the value of a digit depends on its position: in 352, the 3 stands for $3 \\cdot 100$. Computers use the same idea with the **base 2** (binary system). It has only the digits 0 and 1, and the positions stand for powers of two. For example:",
      },
      { k: "formula", tex: "1011_2 = 1 \\cdot 2^3 + 0 \\cdot 2^2 + 1 \\cdot 2^1 + 1 \\cdot 2^0 = 8 + 0 + 2 + 1 = 11", label: "(1)" },
      {
        k: "p",
        text: "Each binary digit is a **bit**. With $n$ bits, $2^n$ different values can be represented; as whole numbers starting at 0, these are 0 to $2^n - 1$. To convert a decimal number into binary, one can repeatedly subtract the largest power of two that fits.",
      },
      {
        k: "p",
        text: "Long binary numbers are hard to read, so programmers often use the **hexadecimal system** (base 16). It uses the digits 0–9 and the letters A–F for the values 10–15. One hexadecimal digit corresponds to exactly four bits. For example, $2\\text{F}_{16} = 2 \\cdot 16 + 15 = 47$.",
      },
      {
        k: "table",
        caption: "Table 1. Powers of two.",
        head: ["n", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        rows: [["2ⁿ", "1", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1,024"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which decimal number does the binary number $1101_2$ represent?",
      options: ["11", "13", "26", "1,101"],
      answer: 1,
      explanation: "$1 \\cdot 8 + 1 \\cdot 4 + 0 \\cdot 2 + 1 \\cdot 1 = 13$.",
    },
    {
      difficulty: "low",
      stem: "How is the decimal number 25 written in binary?",
      options: ["10011", "10101", "11001", "11010"],
      answer: 2,
      explanation: "$25 = 16 + 8 + 1$: positions 16, 8 and 1 are set, so $11001_2$.",
    },
    {
      difficulty: "low",
      stem: "How many different values can be represented with 10 bits?",
      options: ["10", "100", "512", "1,024"],
      answer: 3,
      explanation: "$2^{10} = 1{,}024$ (Table 1).",
    },
    {
      difficulty: "medium",
      stem: "What is the largest whole number that can be stored with 6 bits?",
      options: ["6", "32", "63", "64"],
      answer: 2,
      explanation: "6 bits give $2^6 = 64$ values: 0 to $64 - 1 = 63$.",
    },
    {
      difficulty: "medium",
      stem: "Which decimal number does the hexadecimal number $3\\text{A}_{16}$ represent?",
      options: ["310", "46", "58", "64"],
      answer: 2,
      explanation: "A stands for 10: $3 \\cdot 16 + 10 = 58$.",
    },
    {
      difficulty: "high",
      stem: "How many bits are needed at least to give each of 1,000 students a different number?",
      options: ["9", "10", "100", "1,000"],
      answer: 1,
      explanation: "9 bits give only $2^9 = 512$ values, 10 bits give $2^{10} = 1{,}024 \\ge 1{,}000$.",
    },
    {
      difficulty: "high",
      stem: "A screen stores each colour with 8 bits each for red, green and blue. How many different colours are possible?",
      options: ["768", "65,536", "about 16.8 million", "about 4.3 billion"],
      answer: 2,
      explanation: "$3 \\cdot 8 = 24$ bits in total: $2^{24} = 2^{10} \\cdot 2^{10} \\cdot 2^4 \\approx 1{,}000 \\cdot 1{,}000 \\cdot 16 \\approx 16.8$ million.",
    },
  ],
};

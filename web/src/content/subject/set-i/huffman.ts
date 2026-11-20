import type { SubjectText } from "../types";

export const HUFFMAN: SubjectText = {
  passage: {
    id: "i-huffman",
    title: "Shorter Codes for Frequent Symbols",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "Computers store text as sequences of bits. With a **fixed-length code**, every symbol gets the same number of bits: for 4 different symbols, 2 bits are enough (00, 01, 10, 11), because $2^2 = 4$.",
      },
      {
        k: "p",
        text: "If some symbols occur much more often than others, a **variable-length code** can save space: frequent symbols get short codes, rare symbols longer ones. The **average code length** is the sum of each symbol's code length multiplied by its frequency (as a fraction):",
      },
      { k: "formula", tex: "\\bar{\\ell} = \\sum_i p_i \\cdot \\ell_i", label: "(1)" },
      {
        k: "p",
        text: "For the bits to be decoded without separators, no code word may be the beginning of another code word (**prefix property**). The **Huffman method** constructs such a code with the smallest possible average length. If all symbols are equally frequent, it gives no advantage over a fixed-length code.",
      },
      {
        k: "table",
        caption: "Table 1. A Huffman code for a source with four symbols.",
        head: ["Symbol", "Frequency", "Code word"],
        rows: [
          ["A", "50 %", "0"],
          ["B", "25 %", "10"],
          ["C", "12.5 %", "110"],
          ["D", "12.5 %", "111"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many bits per symbol does a fixed-length code for 4 symbols need?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "$2^2 = 4$ different code words are possible with 2 bits.",
    },
    {
      difficulty: "low",
      stem: "Which symbol in Table 1 receives the shortest code word, and why?",
      options: [
        "D, because it comes last",
        "A, because it is the most frequent",
        "C, because it is rare",
        "All symbols get equally long code words.",
      ],
      answer: 1,
      explanation: "Variable-length codes give the shortest code words to the most frequent symbols; A occurs 50 % of the time.",
    },
    {
      difficulty: "medium",
      stem: "Which symbols does the bit sequence 010111 represent with the code in Table 1?",
      options: ["A B D", "A C B", "B A D", "A A C A"],
      answer: 0,
      explanation: "Read from the left: 0 = A, then 10 = B, then 111 = D. Thanks to the prefix property, there is only one way to split the bits.",
    },
    {
      difficulty: "medium",
      stem: "What is the average code length of the code in Table 1?",
      options: ["1.5 bits", "1.75 bits", "2 bits", "2.25 bits"],
      answer: 1,
      explanation: "Formula (1): $0.5 \\cdot 1 + 0.25 \\cdot 2 + 0.125 \\cdot 3 + 0.125 \\cdot 3 = 0.5 + 0.5 + 0.75 = 1.75$ bits.",
    },
    {
      difficulty: "medium",
      stem: "A message of 1,000 symbols from this source is stored. How many bits are saved compared with the fixed-length code?",
      options: ["125 bits", "250 bits", "750 bits", "1,750 bits"],
      answer: 1,
      explanation: "Fixed: $1{,}000 \\cdot 2 = 2{,}000$ bits; Huffman: $1{,}000 \\cdot 1.75 = 1{,}750$ bits. Saving: 250 bits (12.5 %).",
    },
    {
      difficulty: "high",
      stem: "Someone proposes the code A = 0, B = 01, C = 11. Why is it a problem?",
      options: [
        "Because it uses too many bits.",
        "Because 0 is the beginning of 01, so a sequence such as 011 can be split in more than one way.",
        "Because C should get the shortest code.",
        "Because codes must have the same length.",
      ],
      answer: 1,
      explanation: "The prefix property is violated: 011 could be A followed by C (0 | 11) or B followed by the start of another symbol (01 | 1).",
    },
    {
      difficulty: "high",
      stem: "In another source, all four symbols occur equally often (25 % each). What average code length does a Huffman code achieve?",
      options: ["1 bit", "1.75 bits", "2 bits", "2.5 bits"],
      answer: 2,
      explanation: "With equal frequencies there is nothing to gain: the best code gives every symbol 2 bits, just like the fixed-length code.",
    },
  ],
};

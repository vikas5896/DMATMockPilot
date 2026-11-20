import type { SubjectText } from "../types";

export const CHECK_DIGITS: SubjectText = {
  passage: {
    id: "g-check-digits",
    title: "Detecting Errors with Check Digits",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "When numbers are typed, copied or transmitted, errors happen. Instead of checking every number by hand, computers add a little redundant information that makes many errors detectable. Such methods **detect** errors but cannot say which digit is wrong, so they cannot **correct** them.",
      },
      {
        k: "p",
        text: "The simplest method in data transmission is the **parity bit**. An extra bit is added to a group of bits so that the total number of 1s is even. If a single bit is flipped during transmission, the number of 1s becomes odd and the error is detected. If two bits are flipped, the number of 1s is even again and the error goes unnoticed.",
      },
      {
        k: "p",
        text: "Identification numbers such as product barcodes use a **check digit**. A university uses 7-digit student IDs: six digits followed by a check digit $c$. The six digits are multiplied alternately by the weights 1, 3, 1, 3, 1, 3 and added; $c$ is chosen so that this sum plus $c$ is divisible by 10. For example, for 4 0 2 6 1 7: $4 \\cdot 1 + 0 \\cdot 3 + 2 \\cdot 1 + 6 \\cdot 3 + 1 \\cdot 1 + 7 \\cdot 3 = 46$, so $c = 4$ and the ID is 4026174.",
      },
      {
        k: "p",
        text: "This method detects every error in a single digit. It also detects most swaps of two neighbouring digits, but not when the two digits differ by exactly 5: then the weighted sum changes by a multiple of 10.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which parity bit must be added to the bits 1011001 so that the number of 1s is even?",
      options: ["0", "1", "2", "4"],
      answer: 0,
      explanation: "1011001 contains four 1s, which is already even, so the parity bit is 0.",
    },
    {
      difficulty: "low",
      stem: "What can a check digit do?",
      options: [
        "It detects many errors but cannot correct them.",
        "It corrects every wrong digit automatically.",
        "It detects every possible error.",
        "It encrypts the number.",
      ],
      answer: 0,
      explanation: "The text states that these methods detect errors but cannot say which digit is wrong.",
    },
    {
      difficulty: "medium",
      stem: "Is the student ID 1234567 valid?",
      options: [
        "Yes, the weighted sum plus check digit is 50.",
        "No, the weighted sum plus check digit is 52.",
        "Yes, because all digits are different.",
        "No, because a check digit cannot be 7.",
      ],
      answer: 1,
      explanation: "$1 + 2 \\cdot 3 + 3 + 4 \\cdot 3 + 5 + 6 \\cdot 3 = 45$; $45 + 7 = 52$ is not divisible by 10. The correct check digit would be 5.",
    },
    {
      difficulty: "medium",
      stem: "What is the check digit for the first six digits 3 1 4 1 5 9?",
      options: ["0", "3", "5", "7"],
      answer: 2,
      explanation: "$3 \\cdot 1 + 1 \\cdot 3 + 4 \\cdot 1 + 1 \\cdot 3 + 5 \\cdot 1 + 9 \\cdot 3 = 45$, so $c = 5$.",
    },
    {
      difficulty: "medium",
      stem: "In the ID 4026174, the digit 6 is mistyped as 8. Is the error detected?",
      options: [
        "Yes: the weighted sum rises by 6, so the total is no longer divisible by 10.",
        "No: changes of 2 are not detected.",
        "Yes, but only because 8 is even.",
        "No: only swaps are detected.",
      ],
      answer: 0,
      explanation: "The 6 has weight 3: the sum changes by $2 \\cdot 3 = 6$, giving $50 + 6 = 56$. Every single-digit error is detected.",
    },
    {
      difficulty: "high",
      stem: "Which typing error is NOT detected by the student-ID check digit?",
      options: [
        "Swapping the neighbouring digits 2 and 7",
        "Swapping the neighbouring digits 3 and 4",
        "Typing 1 instead of 9 in one position",
        "Typing 0 instead of 5 in a position with weight 3",
      ],
      answer: 0,
      explanation: "2 and 7 differ by 5. Swapping them changes the sum by $(7 - 2) \\cdot (3 - 1) = 10$, a multiple of 10. Single-digit errors and the swap of 3 and 4 are detected.",
    },
    {
      difficulty: "high",
      stem: "During transmission of a group of bits with a parity bit, exactly two bits are flipped. What happens?",
      options: [
        "The error is detected, because two bits are wrong.",
        "The error is not detected, because the number of 1s is even again.",
        "The parity bit corrects both bits.",
        "The receiver knows which two bits are wrong.",
      ],
      answer: 1,
      explanation: "Each flip changes the number of 1s by one; two flips restore an even count, so the check passes.",
    },
  ],
};

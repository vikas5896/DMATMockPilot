import type { SubjectText } from "../types";

export const MODULAR_CIPHERS: SubjectText = {
  passage: {
    id: "j-modular-ciphers",
    title: "Modular Arithmetic and the Caesar Cipher",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "In **modular arithmetic**, numbers \"wrap around\" after reaching a fixed value, the **modulus** $n$. The expression $a \\bmod n$ is the remainder when $a$ is divided by $n$; for example, $29 \\bmod 26 = 3$. Clocks work this way: 5 hours after 22:00 it is 03:00, because $27 \\bmod 24 = 3$.",
      },
      {
        k: "p",
        text: "Modular arithmetic is the basis of many encryption methods. One of the oldest is the **Caesar cipher**. Each letter is given a number (A = 0, B = 1, …, Z = 25) and shifted by a fixed **key** $k$:",
      },
      { k: "formula", tex: "E(x) = (x + k) \\bmod 26 \\qquad D(y) = (y - k) \\bmod 26", label: "(1)" },
      {
        k: "p",
        text: "With $k = 3$, A becomes D, B becomes E, and Z wraps around to C. Encrypting twice with keys $k_1$ and $k_2$ is the same as encrypting once with $(k_1 + k_2) \\bmod 26$.",
      },
      {
        k: "p",
        text: "The Caesar cipher is easy to break. There are only 25 useful keys, which a computer (or a patient person) can simply try one after another. Even faster is **frequency analysis**: in English texts, E is the most common letter, so the most common letter of a long ciphertext probably stands for E.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is $29 \\bmod 26$?",
      options: ["1", "3", "26", "29"],
      answer: 1,
      explanation: "$29 = 1 \\cdot 26 + 3$: the remainder is 3.",
    },
    {
      difficulty: "low",
      stem: "It is 10:00. What time will it be 17 hours later?",
      options: ["03:00", "07:00", "17:00", "27:00"],
      answer: 0,
      explanation: "$10 + 17 = 27$, and $27 \\bmod 24 = 3$: 03:00 the next day.",
    },
    {
      difficulty: "medium",
      stem: "How is the word CAT encrypted with the Caesar cipher and key k = 3?",
      options: ["DBU", "FDW", "ZXQ", "CAT"],
      answer: 1,
      explanation: "C (2) → 5 = F, A (0) → 3 = D, T (19) → 22 = W: FDW.",
    },
    {
      difficulty: "medium",
      stem: "The ciphertext KHOOR was produced with key k = 3. What is the plaintext?",
      options: ["HELLO", "NKRRU", "HOUSE", "JGNNQ"],
      answer: 0,
      explanation: "Shift each letter back by 3: K → H, H → E, O → L, O → L, R → O.",
    },
    {
      difficulty: "medium",
      stem: "Which letter does Z become with key k = 5?",
      options: ["A", "D", "E", "U"],
      answer: 2,
      explanation: "Z = 25; $(25 + 5) \\bmod 26 = 30 \\bmod 26 = 4$, which is E.",
    },
    {
      difficulty: "high",
      stem: "A message is encrypted first with key 10 and then the result again with key 20. Which single key gives the same result?",
      options: ["4", "10", "20", "30"],
      answer: 0,
      explanation: "$(10 + 20) \\bmod 26 = 30 \\bmod 26 = 4$. Encrypting twice gives no extra security.",
    },
    {
      difficulty: "high",
      stem: "In a long English text encrypted with a Caesar cipher, the most common letter is H. Which key was most probably used?",
      options: ["3", "4", "7", "23"],
      answer: 0,
      explanation: "H most probably stands for E. E = 4, H = 7: $k = 7 - 4 = 3$.",
    },
  ],
};

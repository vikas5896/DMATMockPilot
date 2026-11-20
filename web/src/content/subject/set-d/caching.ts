import type { SubjectText } from "../types";

export const CACHING: SubjectText = {
  passage: {
    id: "d-caching",
    title: "Caches and the Memory Hierarchy",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "A computer's processor works much faster than its main memory (RAM) can deliver data. Computers therefore use a **memory hierarchy**: a small but very fast memory, the **cache**, keeps copies of recently used data close to the processor. Larger storage such as RAM and solid-state drives (SSD) is slower but can hold much more.",
      },
      {
        k: "p",
        text: "When the processor needs a value, it first looks in the cache. If the value is there (a **hit**), it is delivered quickly. If not (a **miss**), it must additionally be fetched from RAM. The share of accesses that are hits is the **hit rate** $h$. In a simple model, the average access time is:",
      },
      { k: "formula", tex: "t_{\\text{avg}} = t_{\\text{cache}} + (1 - h) \\cdot t_{\\text{RAM}}", label: "(1)" },
      {
        k: "p",
        text: "Caches work well because programs show **locality**: data that was used recently is likely to be used again soon (for example inside a loop), and data stored next to it is likely to be used next.",
      },
      {
        k: "table",
        caption: "Table 1. Typical access times (rounded).",
        head: ["Memory", "Access time"],
        rows: [
          ["Cache", "1 ns"],
          ["RAM", "100 ns"],
          ["SSD", "100,000 ns (0.1 ms)"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A cache has a hit rate of 90 %. What share of the accesses are misses?",
      options: ["1 %", "9 %", "10 %", "90 %"],
      answer: 2,
      explanation: "Misses: $1 - 0.9 = 0.1 = 10$ %.",
    },
    {
      difficulty: "low",
      stem: "How many times slower is an access to RAM than an access to the cache?",
      options: ["10 times", "100 times", "1,000 times", "100,000 times"],
      answer: 1,
      explanation: "Table 1: $100$ ns $/ 1$ ns $= 100$.",
    },
    {
      difficulty: "medium",
      stem: "What is the average access time with a hit rate of 90 %?",
      options: ["1 ns", "10 ns", "11 ns", "91 ns"],
      answer: 2,
      explanation: "Formula (1): $1 + 0.1 \\cdot 100 = 1 + 10 = 11$ ns.",
    },
    {
      difficulty: "medium",
      stem: "A program runs through the same small list of numbers again and again in a loop. Why is its cache hit rate high?",
      options: [
        "Because loops do not need memory.",
        "Because recently used data is used again soon (locality).",
        "Because the cache is larger than the RAM.",
        "Because the list is stored on the SSD.",
      ],
      answer: 1,
      explanation: "The same data is used repeatedly, so after the first pass it is already in the cache. This is the locality described in the text.",
    },
    {
      difficulty: "medium",
      stem: "Reading one value from the SSD takes as long as reading how many values one after another from RAM?",
      options: ["10", "100", "1,000", "100,000"],
      answer: 2,
      explanation: "$100{,}000$ ns $/ 100$ ns $= 1{,}000$.",
    },
    {
      difficulty: "high",
      stem: "The hit rate rises from 90 % to 99 %. About how many times faster does the average memory access become?",
      options: ["1.1 times", "2 times", "5.5 times", "10 times"],
      answer: 2,
      explanation: "At 99 %: $1 + 0.01 \\cdot 100 = 2$ ns, compared with 11 ns at 90 %: $11 / 2 = 5.5$. A small change in the hit rate has a large effect because misses are so costly.",
    },
    {
      difficulty: "high",
      stem: "Which hit rate is needed for an average access time of 3 ns?",
      options: ["97 %", "98 %", "99 %", "99.7 %"],
      answer: 1,
      explanation: "$1 + (1 - h) \\cdot 100 = 3$ gives $(1 - h) = 0.02$, so $h = 0.98 = 98$ %.",
    },
  ],
};

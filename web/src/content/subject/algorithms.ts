import type { SubjectText } from "./types";

export const ALGORITHMS: SubjectText = {
  passage: {
    id: "algorithms",
    title: "Searching and Efficiency of Algorithms",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "An algorithm is a precise step-by-step procedure for solving a problem. A basic task is to find an element in a list of $n$ elements.",
      },
      {
        k: "p",
        text: "**Linear search** compares the elements one after another with the element being searched for. In the worst case, when the element is at the end or missing, it needs $n$ comparisons.",
      },
      {
        k: "p",
        text: "**Binary search** only works on a *sorted* list. It compares the searched element with the middle element of the list. Depending on the result, it continues only in the left or right half and repeats the step. Since the remaining range halves with every comparison, it needs at most about",
      },
      { k: "formula", tex: "\\log_2(n) + 1", label: "(1)" },
      {
        k: "p",
        text: "comparisons, where $\\log_2(n)$ is the number of times $n$ can be halved until 1 remains.",
      },
      {
        k: "p",
        text: "Computer scientists describe how the running time grows with $n$ using **O-notation**. Linear search is $O(n)$: twice as many elements take about twice as long. Binary search is $O(\\log n)$. Simple sorting methods are $O(n^2)$: twice as many elements take about four times as long. Efficient sorting methods are $O(n \\log n)$, which is still more work than a single linear search.",
      },
      {
        k: "table",
        caption: "Table 1. Values of log₂(n).",
        head: ["n", "8", "1,024", "about 1 million (2²⁰)"],
        rows: [["log₂(n)", "3", "10", "20"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many comparisons does linear search need in the worst case for a list of 1,000 elements?",
      options: ["10", "100", "500", "1,000"],
      answer: 3,
      explanation: "In the worst case, linear search compares with every element: $n$ = 1,000 comparisons.",
    },
    {
      difficulty: "low",
      stem: "Which condition must a list meet for binary search to be used?",
      options: [
        "It must be sorted.",
        "It must contain fewer than 1,024 elements.",
        "It must not contain any numbers.",
        "Its length must be an even number.",
      ],
      answer: 0,
      explanation: "Binary search decides which half to continue in by comparing with the middle element. That only works if the list is sorted.",
    },
    {
      difficulty: "medium",
      stem: "At most how many comparisons does binary search need for a sorted list of 1,024 elements?",
      options: ["About 11", "About 32", "About 512", "About 1,024"],
      answer: 0,
      explanation: "Formula (1) with Table 1: $\\log_2(1{,}024) + 1 = 10 + 1 = 11$.",
    },
    {
      difficulty: "medium",
      stem: "A sorted list grows from 1,024 to about 1 million elements. How does the maximum number of comparisons for binary search change?",
      options: [
        "From about 11 to about 21",
        "It becomes about 1,000 times larger.",
        "It doubles.",
        "It stays exactly the same.",
      ],
      answer: 0,
      explanation: "Table 1: $\\log_2$ rises from 10 to 20, so the maximum rises from 11 to 21 comparisons, although the list is about 1,000 times longer.",
    },
    {
      difficulty: "medium",
      stem: "A sorting method with running time $O(n^2)$ needs 1 second for 1,000 elements. Roughly how long does it need for 2,000 elements?",
      options: ["1 second", "2 seconds", "4 seconds", "8 seconds"],
      answer: 2,
      explanation: "For $O(n^2)$, doubling $n$ makes the running time about $2^2 = 4$ times as long: about 4 seconds.",
    },
    {
      difficulty: "high",
      stem: "An unsorted list is to be searched **only once** for one element. Which approach is faster?",
      options: [
        "Linear search directly, because even efficient sorting needs more work than one linear search.",
        "First sort efficiently, then binary search, because binary search is $O(\\log n)$.",
        "Both are always equally fast.",
        "Binary search directly on the unsorted list.",
      ],
      answer: 0,
      explanation: "Sorting costs at least $O(n \\log n)$, more than the $O(n)$ of one linear search. Sorting pays off only when the list is searched many times. Binary search on an unsorted list gives wrong results.",
    },
    {
      difficulty: "high",
      stem: "In a sorted list of about 1 million elements, one comparison takes 1 microsecond. What are the worst-case search times?",
      options: [
        "Linear search: about 1 second; binary search: about 21 microseconds",
        "Linear search: about 1 millisecond; binary search: about 1 microsecond",
        "Both about 1 second",
        "Linear search: about 21 microseconds; binary search: about 1 second",
      ],
      answer: 0,
      explanation: "Linear: 1 million comparisons · 1 µs = 1 s. Binary: $20 + 1 = 21$ comparisons · 1 µs = 21 µs.",
    },
  ],
};

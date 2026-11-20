import type { SubjectText } from "../types";

export const SEAT_ALLOCATION: SubjectText = {
  passage: {
    id: "d-seat-allocation",
    title: "From Votes to Seats: The D'Hondt Method",
    field: "Political Science",
    blocks: [
      {
        k: "p",
        text: "In **proportional representation**, parties receive seats in parliament roughly in proportion to their votes. Because seats cannot be split, a rule is needed to turn votes into whole seats. One widely used rule is the **D'Hondt method**:",
      },
      {
        k: "list",
        items: [
          "Divide the votes of every party by 1, 2, 3, 4, … to obtain a series of **quotients** for each party.",
          "Allocate the seats one by one to the largest quotients of all parties together, until all seats are filled.",
        ],
      },
      {
        k: "p",
        text: "Many countries also use an **electoral threshold**: parties with less than a certain share of the votes, often 5 %, receive no seats at all, and their votes are ignored in the allocation.",
      },
      {
        k: "p",
        text: "Compared with exact proportionality, the D'Hondt method tends to **favour larger parties**: they often receive a slightly larger share of the seats than of the votes.",
      },
      {
        k: "p",
        text: "**Example.** A city council has **10 seats**. The threshold is 5 %. Table 1 shows the result of the election (100,000 valid votes).",
      },
      {
        k: "table",
        caption: "Table 1. Votes for the parties (in thousands).",
        head: ["Party", "A", "B", "C", "D", "E"],
        rows: [["Votes (thousands)", "46", "30", "14", "6", "4"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which party receives no seats because of the threshold?",
      options: ["Party B", "Party C", "Party D", "Party E"],
      answer: 3,
      explanation: "E has $4{,}000$ of $100{,}000$ votes $= 4$ % $< 5$ %. D has exactly 6 % and passes the threshold.",
    },
    {
      difficulty: "low",
      stem: "What is party A's third quotient?",
      options: ["about 11.5 thousand", "about 15.3 thousand", "23 thousand", "138 thousand"],
      answer: 1,
      explanation: "The third quotient is the votes divided by 3: $46 / 3 \\approx 15.3$ thousand.",
    },
    {
      difficulty: "medium",
      stem: "Which party receives the third seat?",
      options: ["Party A", "Party B", "Party C", "Party D"],
      answer: 0,
      explanation: "Largest quotients: A 46 (seat 1), B 30 (seat 2), then A $46/2 = 23$ (seat 3), which is larger than B's second quotient (15) and C's first (14).",
    },
    {
      difficulty: "medium",
      stem: "With exact proportionality among the parties that passed the threshold, about how many of the 10 seats would party A receive?",
      options: ["4.6", "4.8", "5.0", "6.0"],
      answer: 1,
      explanation: "Only the votes of A–D count: $46 + 30 + 14 + 6 = 96$ thousand. A's share: $46/96 \\cdot 10 \\approx 4.8$ seats. 4.6 would wrongly include E's votes.",
    },
    {
      difficulty: "medium",
      stem: "Party D receives no seat. Other results unchanged, about how many more votes would D have needed to win a seat?",
      options: ["about 2,000", "about 4,000", "about 8,000", "It is impossible for D to win a seat."],
      answer: 0,
      explanation: "The 10th seat goes to A's sixth quotient, $46/6 \\approx 7.7$ thousand. D's first quotient (6 thousand) would have to exceed this, so D needed roughly 1,700 – 2,000 more votes.",
    },
    {
      difficulty: "high",
      stem: "How many seats does party A receive under the D'Hondt method?",
      options: ["4", "5", "6", "7"],
      answer: 2,
      explanation: "The 10 largest quotients: 46 (A), 30 (B), 23 (A), 15.3 (A), 15 (B), 14 (C), 11.5 (A), 10 (B), 9.2 (A), 7.7 (A). A gets 6 seats, B 3, C 1. The next quotient would be B's 7.5.",
    },
    {
      difficulty: "high",
      stem: "Which statement is supported by this election result?",
      options: [
        "The D'Hondt method gave every party exactly its share of the votes.",
        "The largest party received a larger share of the seats than of the votes.",
        "The smallest parties received more seats than their share of the votes.",
        "Party B received a larger share of the seats than of the votes.",
      ],
      answer: 1,
      explanation: "A has 46 % of the votes but 60 % of the seats (6 of 10), as expected from the text: D'Hondt favours larger parties. B has 30 % of the votes and 30 % of the seats.",
    },
  ],
};

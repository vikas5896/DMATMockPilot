import type { SubjectText } from "../types";

export const GAME_THEORY: SubjectText = {
  passage: {
    id: "i-game-theory",
    title: "Strategic Decisions: The Pricing Dilemma",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "**Game theory** studies decisions whose outcome depends on what others decide. A game is often shown as a **payoff table**: each cell gives the results for both players for one combination of choices.",
      },
      {
        k: "p",
        text: "A strategy is **dominant** if it gives a player a better result than any other strategy, whatever the other player does. A combination of strategies is an **equilibrium** if no player can improve their own result by changing only their own choice. In some games, the equilibrium is worse for both players than another possible outcome; this situation is known as a **social dilemma** or prisoners' dilemma. If the game is repeated many times, players can punish undercutting in later rounds, which makes cooperation easier.",
      },
      {
        k: "p",
        text: "**Example.** Two coaching institutes, A and B, compete in the same city. Each can charge a **high** or a **low** fee. Table 1 shows their annual profits in million rupees; the first number is A's profit, the second B's.",
      },
      {
        k: "table",
        caption: "Table 1. Profits (A, B) in million ₹.",
        head: ["", "B charges high", "B charges low"],
        rows: [
          ["A charges high", "10, 10", "2, 14"],
          ["A charges low", "14, 2", "5, 5"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is A's profit if A charges a high fee and B a low fee?",
      options: ["2 million ₹", "5 million ₹", "10 million ₹", "14 million ₹"],
      answer: 0,
      explanation: "Row \"A charges high\", column \"B charges low\": (2, 14). A earns 2 million ₹.",
    },
    {
      difficulty: "low",
      stem: "What is the combined profit of both institutes if both charge high fees?",
      options: ["10 million ₹", "16 million ₹", "20 million ₹", "28 million ₹"],
      answer: 2,
      explanation: "$10 + 10 = 20$ million ₹, the highest combined profit in the table.",
    },
    {
      difficulty: "low",
      stem: "What is a dominant strategy?",
      options: [
        "A strategy that gives the highest combined profit.",
        "A strategy that is best for a player whatever the other player does.",
        "A strategy chosen by the larger company.",
        "A strategy that both players choose at the same time.",
      ],
      answer: 1,
      explanation: "This is the definition in the text. It refers to one player's own result, not to the combined profit.",
    },
    {
      difficulty: "medium",
      stem: "B charges a high fee. Which choice gives A the higher profit?",
      options: ["High fee (10)", "Low fee (14)", "Both give the same.", "It depends on B's profit."],
      answer: 1,
      explanation: "In the column \"B charges high\": A earns 10 with a high fee and 14 with a low fee.",
    },
    {
      difficulty: "medium",
      stem: "B charges a low fee. Which choice gives A the higher profit?",
      options: ["High fee (2)", "Low fee (5)", "Both give the same.", "It depends on B's profit."],
      answer: 1,
      explanation: "In the column \"B charges low\": A earns 2 with a high fee and 5 with a low fee. So the low fee is dominant for A.",
    },
    {
      difficulty: "medium",
      stem: "Which outcome is the equilibrium of this game?",
      options: ["Both charge high fees.", "Both charge low fees.", "A high, B low.", "A low, B high."],
      answer: 1,
      explanation: "The low fee is dominant for both (the table is symmetric). At (low, low), neither can gain by switching alone: switching to high would give 2 instead of 5.",
    },
    {
      difficulty: "high",
      stem: "How much combined profit do the institutes lose in the equilibrium, compared with both charging high fees?",
      options: ["5 million ₹", "10 million ₹", "15 million ₹", "20 million ₹"],
      answer: 1,
      explanation: "Equilibrium: $5 + 5 = 10$; cooperation: $10 + 10 = 20$. They lose 10 million ₹: a social dilemma.",
    },
    {
      difficulty: "high",
      stem: "Suppose the profit for undercutting (14 in Table 1) falls to 8 for both institutes, while all other values stay the same. What changes?",
      options: [
        "Nothing; the low fee is still dominant.",
        "The high fee becomes dominant for both.",
        "Both charging high fees becomes an equilibrium, and so does both charging low fees.",
        "No equilibrium exists any more.",
      ],
      answer: 2,
      explanation: "If B charges high, A now prefers high (10 > 8); if B charges low, A still prefers low (5 > 2). No strategy is dominant, and both (high, high) and (low, low) are equilibria.",
    },
  ],
};

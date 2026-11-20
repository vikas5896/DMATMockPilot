import type { SubjectText } from "../types";

export const INVENTORY: SubjectText = {
  passage: {
    id: "h-inventory",
    title: "When to Reorder: Inventory Management",
    field: "Logistics",
    blocks: [
      {
        k: "p",
        text: "Shops and factories must decide when and how much to reorder. If they order too late, goods run out; if they order too much, money is tied up in stock. Between placing an order and receiving it lies the **lead time**. A new order must therefore be placed while there is still enough stock for the lead time. Because demand and delivery times vary, companies also keep a **safety stock** as a buffer:",
      },
      { k: "formula", tex: "\\text{reorder point} = \\text{daily demand} \\cdot \\text{lead time (days)} + \\text{safety stock}", label: "(1)" },
      {
        k: "p",
        text: "If each order brings $Q$ units and stock falls evenly until the next delivery arrives, the **average stock** is about half an order plus the safety stock: $Q/2 + \\text{safety stock}$.",
      },
      {
        k: "p",
        text: "Two kinds of costs depend on the order quantity. Every order causes a fixed **ordering cost** (administration, transport), so large orders mean fewer orders per year. Storing goods causes a **holding cost** per unit and year (space, insurance, capital), so large orders mean more stock on average.",
      },
      {
        k: "table",
        caption: "Table 1. A bookshop selling exam-preparation books.",
        head: ["Item", "Value"],
        rows: [
          ["Sales", "20 books per day, 300 selling days per year"],
          ["Lead time", "5 days"],
          ["Safety stock", "40 books"],
          ["Order quantity", "400 books"],
          ["Ordering cost", "50 € per order"],
          ["Holding cost", "2 € per book and year"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many books are sold during the lead time?",
      options: ["5", "20", "100", "140"],
      answer: 2,
      explanation: "$20$ books per day $\\cdot 5$ days $= 100$ books.",
    },
    {
      difficulty: "low",
      stem: "How many books does the shop sell per year?",
      options: ["600", "6,000", "7,300", "12,000"],
      answer: 1,
      explanation: "$20 \\cdot 300 = 6{,}000$ books.",
    },
    {
      difficulty: "low",
      stem: "What is the purpose of the safety stock?",
      options: [
        "To reduce the ordering cost.",
        "To bridge unexpected demand or delays in delivery.",
        "To increase the average stock as much as possible.",
        "To shorten the lead time.",
      ],
      answer: 1,
      explanation: "The text describes the safety stock as a buffer against variation in demand and delivery times.",
    },
    {
      difficulty: "medium",
      stem: "At what stock level must the shop place a new order?",
      options: ["40 books", "100 books", "140 books", "440 books"],
      answer: 2,
      explanation: "Formula (1): $20 \\cdot 5 + 40 = 140$ books.",
    },
    {
      difficulty: "medium",
      stem: "How many orders does the shop place per year?",
      options: ["5", "15", "20", "30"],
      answer: 1,
      explanation: "$6{,}000 / 400 = 15$ orders.",
    },
    {
      difficulty: "medium",
      stem: "What is the shop's average stock?",
      options: ["200 books", "240 books", "400 books", "440 books"],
      answer: 1,
      explanation: "$400 / 2 + 40 = 240$ books.",
    },
    {
      difficulty: "high",
      stem: "What are the total annual ordering and holding costs?",
      options: ["480 €", "750 €", "1,230 €", "1,550 €"],
      answer: 2,
      explanation: "Ordering: $15 \\cdot 50 = 750$ €. Holding: $240 \\cdot 2 = 480$ €. Total: 1,230 €.",
    },
    {
      difficulty: "high",
      stem: "The shop considers ordering 800 books at a time instead of 400. What would the total annual ordering and holding costs be?",
      options: ["880 €", "1,230 €", "1,255 €", "1,680 €"],
      answer: 2,
      explanation: "Orders: $6{,}000 / 800 = 7.5$, ordering cost $375$ €. Average stock: $400 + 40 = 440$, holding cost $880$ €. Total: 1,255 €, slightly more than with 400 books.",
    },
  ],
};

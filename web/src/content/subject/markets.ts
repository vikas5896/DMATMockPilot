import type { SubjectText } from "./types";

export const MARKETS: SubjectText = {
  passage: {
    id: "markets",
    title: "Supply, Demand and Price",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "On a market, the **demand** shows how much of a good buyers want at each price: the higher the price, the less they buy. The **supply** shows how much sellers offer: the higher the price, the more they produce. The price at which the quantity demanded equals the quantity supplied is the **equilibrium price**.",
      },
      {
        k: "p",
        text: "Consider a market for a product, with price $p$ in euros and quantities $Q$ in thousand units:",
      },
      { k: "formula", tex: "Q_D = 100 - 2p \\qquad Q_S = 10 + p", label: "(1)" },
      {
        k: "p",
        text: "If the state sets a **maximum price** below the equilibrium price, buyers want more than sellers offer: there is a *shortage*. A **minimum price** above the equilibrium leads to a *surplus*.",
      },
      {
        k: "p",
        text: "How strongly buyers react to a price change is measured by the **price elasticity of demand**:",
      },
      { k: "formula", tex: "E = \\frac{\\text{percentage change in quantity demanded}}{\\text{percentage change in price}}", label: "(2)" },
      {
        k: "list",
        items: [
          "If $|E| > 1$, demand is **elastic**: quantity reacts more strongly than price, and a price increase lowers the sellers' revenue $p \\cdot Q$.",
          "If $|E| < 1$, demand is **inelastic**: quantity reacts less strongly than price, and a price increase raises revenue.",
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the equilibrium price on the market described by (1)?",
      options: ["20 €", "30 €", "40 €", "45 €"],
      answer: 1,
      explanation: "Set $Q_D = Q_S$: $100 - 2p = 10 + p$, so $90 = 3p$ and $p = 30$ €.",
    },
    {
      difficulty: "low",
      stem: "What quantity is traded at the equilibrium price?",
      options: ["30 thousand units", "40 thousand units", "50 thousand units", "70 thousand units"],
      answer: 1,
      explanation: "At $p = 30$: $Q_S = 10 + 30 = 40$ and $Q_D = 100 - 60 = 40$ thousand units.",
    },
    {
      difficulty: "medium",
      stem: "The state sets a maximum price of 20 €. What is the result?",
      options: [
        "A shortage of 30 thousand units",
        "A surplus of 30 thousand units",
        "A shortage of 10 thousand units",
        "Nothing changes, because the price is below equilibrium.",
      ],
      answer: 0,
      explanation: "At 20 €: $Q_D = 100 - 40 = 60$, $Q_S = 10 + 20 = 30$. Buyers want 30 thousand units more than are offered: a shortage.",
    },
    {
      difficulty: "medium",
      stem: "A price rises by 10 %, and the quantity demanded falls by 5 %. How can demand be described?",
      options: [
        "Elastic, with $E = -2$",
        "Inelastic, with $E = -0.5$",
        "Exactly unit-elastic, with $E = -1$",
        "Elastic, with $E = -0.5$",
      ],
      answer: 1,
      explanation: "$E = -5\\,\\% / 10\\,\\% = -0.5$. Since $|E| < 1$, demand is inelastic.",
    },
    {
      difficulty: "medium",
      stem: "Demand for a product is inelastic. What happens to the sellers' revenue if they raise the price?",
      options: ["It rises.", "It falls.", "It stays exactly the same.", "It falls to zero."],
      answer: 0,
      explanation: "With inelastic demand, quantity falls by a smaller percentage than the price rises, so $p \\cdot Q$ increases (as the text states).",
    },
    {
      difficulty: "high",
      stem: "How large is the sellers' total revenue at the equilibrium of (1)?",
      options: ["120,000 €", "1.2 million €", "2.4 million €", "12 million €"],
      answer: 1,
      explanation: "Revenue $= p \\cdot Q = 30$ € · 40,000 units = 1,200,000 € = 1.2 million €.",
    },
    {
      difficulty: "high",
      stem: "The product becomes fashionable and demand changes to $Q_D = 130 - 2p$, while supply stays the same. What is the new equilibrium?",
      options: [
        "$p$ = 40 €, $Q$ = 50 thousand units",
        "$p$ = 30 €, $Q$ = 70 thousand units",
        "$p$ = 45 €, $Q$ = 40 thousand units",
        "$p$ = 40 €, $Q$ = 40 thousand units",
      ],
      answer: 0,
      explanation: "$130 - 2p = 10 + p$ gives $3p = 120$, $p = 40$ €. Then $Q = 10 + 40 = 50$ thousand units. Higher demand raises both price and quantity.",
    },
  ],
};

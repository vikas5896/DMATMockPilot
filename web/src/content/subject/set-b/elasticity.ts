import type { SubjectText } from "../types";

export const ELASTICITY: SubjectText = {
  passage: {
    id: "b-elasticity",
    title: "Price Elasticity of Demand",
    field: "Economics",
    blocks: [
      {
        k: "p",
        text: "When the price of a good changes, buyers react by changing the quantity they buy. How strongly they react is measured by the **price elasticity of demand** $E$. It compares the percentage change in quantity with the percentage change in price:",
      },
      { k: "formula", tex: "E = \\frac{\\%\\,\\text{change in quantity}}{\\%\\,\\text{change in price}}", label: "(1)" },
      {
        k: "p",
        text: "Percentage changes are calculated relative to the starting value. Because quantity usually falls when price rises, $E$ is normally negative. Economists classify demand by the size of $E$ without its sign:",
      },
      {
        k: "list",
        items: [
          "**Elastic** demand: $|E| > 1$. Quantity reacts more strongly than price.",
          "**Inelastic** demand: $|E| < 1$. Quantity reacts less strongly than price.",
          "**Unit elastic** demand: $|E| = 1$.",
        ],
      },
      {
        k: "p",
        text: "A seller's revenue is $R = P \\cdot Q$ (price times quantity). If demand is inelastic, a price increase raises revenue; if demand is elastic, a price increase lowers revenue.",
      },
      {
        k: "p",
        text: "Two related measures use the same idea. The **cross-price elasticity** compares the % change in quantity of one good with the % change in price of another good. It is positive for **substitutes** (goods that replace each other) and negative for **complements** (goods used together). The **income elasticity** compares the % change in quantity with the % change in buyers' income. It is positive for **normal goods** and negative for **inferior goods**, which people buy less of when they become richer.",
      },
      {
        k: "table",
        caption: "Table 1. Weekly cinema tickets sold in a small town at different ticket prices.",
        head: ["Ticket price (€)", "Tickets sold per week", "Revenue per week (€)"],
        rows: [
          ["8", "1,200", "9,600"],
          ["10", "1,000", "10,000"],
          ["12", "800", "9,600"],
          ["14", "500", "7,000"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "The ticket price rises from 10 € to 12 €. By what percentage does the price rise?",
      options: ["2 %", "16.7 %", "20 %", "25 %"],
      answer: 2,
      explanation: "The change (2 €) is calculated relative to the starting value 10 €: $2 / 10 = 0.20 = 20$ %. 16.7 % would wrongly use 12 € as the base.",
    },
    {
      difficulty: "low",
      stem: "What is the price elasticity of demand when the price rises from 10 € to 12 €?",
      options: ["−0.5", "−1.0", "−1.25", "−2.0"],
      answer: 1,
      explanation: "Quantity: $(800 - 1{,}000) / 1{,}000 = -20$ %. Price: $+20$ %. Formula (1): $E = -20 / 20 = -1.0$ (unit elastic).",
    },
    {
      difficulty: "high",
      stem: "What is the price elasticity of demand when the price rises from 12 € to 14 €?",
      options: ["−0.44", "−1.5", "−2.25", "−3.0"],
      answer: 2,
      explanation: "Price: $2/12 = 16.7$ %. Quantity: $-300/800 = -37.5$ %. $E = -37.5 / 16.7 = -2.25$. Demand is elastic here, which is why revenue falls from 9,600 € to 7,000 €.",
    },
    {
      difficulty: "low",
      stem: "At which ticket price is the cinema's weekly revenue highest?",
      options: ["8 €", "10 €", "12 €", "14 €"],
      answer: 1,
      explanation: "Table 1: revenue is 10,000 € at 10 €, more than at any other price. Selling the most tickets (at 8 €) does not give the highest revenue.",
    },
    {
      difficulty: "medium",
      stem: "Which statement about raising the price from 8 € to 10 € is correct?",
      options: [
        "Demand is elastic, so revenue falls.",
        "Demand is inelastic, so revenue rises.",
        "Demand is elastic, but revenue still rises.",
        "Demand is unit elastic, so revenue stays the same.",
      ],
      answer: 1,
      explanation: "Price $+25$ %, quantity $-200/1{,}200 = -16.7$ %, so $|E| = 16.7/25 \\approx 0.67 < 1$: inelastic. As the text says, a price rise then increases revenue (9,600 € → 10,000 €).",
    },
    {
      difficulty: "medium",
      stem: "A streaming service lowers its subscription price by 10 %. As a result, the cinema sells 4 % fewer tickets. Which cross-price elasticity and relationship follow?",
      options: ["−0.4: complements", "+0.4: substitutes", "+2.5: substitutes", "−2.5: complements"],
      answer: 1,
      explanation: "Cross-price elasticity = % change in cinema tickets / % change in streaming price = $-4 / -10 = +0.4$. A positive value means the goods are substitutes.",
    },
    {
      difficulty: "medium",
      stem: "When incomes in the town rise by 5 %, the number of bus journeys falls by 2 %. What does this mean?",
      options: [
        "Income elasticity −0.4: bus travel is an inferior good.",
        "Income elasticity +0.4: bus travel is a normal good.",
        "Income elasticity −2.5: bus travel is an inferior good.",
        "Income elasticity +2.5: bus travel is a normal good.",
      ],
      answer: 0,
      explanation: "Income elasticity = $-2 / 5 = -0.4$. A negative income elasticity means people buy less when they are richer: an inferior good.",
    },
    {
      difficulty: "high",
      stem: "For a good with a price elasticity of −0.5, the price is raised by 10 %. By about how much does the revenue change?",
      options: ["−5 %", "+4.5 %", "+5 %", "+15 %"],
      answer: 1,
      explanation: "Quantity changes by $-0.5 \\cdot 10 = -5$ %. New revenue $= 1.10 \\cdot 0.95 = 1.045$ times the old revenue, i.e. $+4.5$ %. Simply adding $+10$ % and $-5$ % gives the slightly wrong $+5$ %.",
    },
  ],
};

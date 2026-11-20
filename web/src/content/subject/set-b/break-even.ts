import type { SubjectText } from "../types";

export const BREAK_EVEN: SubjectText = {
  passage: {
    id: "b-break-even",
    title: "Costs, Revenue and the Break-Even Point",
    field: "Business Administration",
    blocks: [
      {
        k: "p",
        text: "A company's costs consist of two parts. **Fixed costs** $F$ (rent, salaries, machines) do not depend on how much is produced. **Variable costs** arise for every unit produced (materials, energy); with variable costs $v$ per unit and a quantity $x$, the total costs are:",
      },
      { k: "formula", tex: "C(x) = F + v \\cdot x", label: "(1)" },
      {
        k: "p",
        text: "At a selling price $p$ per unit, the revenue is $R(x) = p \\cdot x$ and the profit is revenue minus costs:",
      },
      { k: "formula", tex: "G(x) = (p - v) \\cdot x - F", label: "(2)" },
      {
        k: "p",
        text: "The difference $p - v$ is called the **contribution margin** per unit: the part of each unit's price that is left to cover the fixed costs. The **break-even point** is the quantity at which profit is exactly zero:",
      },
      { k: "formula", tex: "x_B = \\frac{F}{p - v}", label: "(3)" },
      {
        k: "p",
        text: "Below this quantity the company makes a loss, above it a profit. The **average cost** per unit is $C(x)/x$; it falls as the quantity rises, because the fixed costs are shared by more units.",
      },
      {
        k: "p",
        text: "**Example.** A start-up produces reusable water bottles. Its fixed costs are 24,000 € per month, the variable costs are 7 € per bottle, and it sells each bottle for 15 €. It can produce at most 5,000 bottles per month.",
      },
      {
        k: "table",
        caption: "Table 1. Monthly figures of the start-up (in €).",
        head: ["Bottles per month", "Revenue", "Total costs", "Profit"],
        rows: [
          ["1,000", "15,000", "31,000", "−16,000"],
          ["2,000", "30,000", "38,000", "−8,000"],
          ["3,000", "45,000", "45,000", "0"],
          ["4,000", "60,000", "52,000", "8,000"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the contribution margin per bottle?",
      options: ["7 €", "8 €", "15 €", "22 €"],
      answer: 1,
      explanation: "$p - v = 15 - 7 = 8$ €.",
    },
    {
      difficulty: "low",
      stem: "How many bottles per month must the start-up sell to break even?",
      options: ["1,600", "2,000", "3,000", "3,429"],
      answer: 2,
      explanation: "Formula (3): $24{,}000 / 8 = 3{,}000$, confirmed by Table 1. Dividing by the price (1,600) or by the variable costs (3,429) is wrong.",
    },
    {
      difficulty: "low",
      stem: "Why does the average cost per bottle fall when more bottles are produced?",
      options: [
        "Because the variable costs per bottle fall.",
        "Because the fixed costs are shared by more bottles.",
        "Because the selling price rises.",
        "Because the total costs fall.",
      ],
      answer: 1,
      explanation: "As the text says, the fixed costs are spread over more units. Variable costs per unit and the price stay the same, and total costs actually rise.",
    },
    {
      difficulty: "medium",
      stem: "What is the monthly profit if the start-up produces and sells at full capacity?",
      options: ["16,000 €", "40,000 €", "51,000 €", "75,000 €"],
      answer: 0,
      explanation: "Formula (2) with $x = 5{,}000$: $8 \\cdot 5{,}000 - 24{,}000 = 16{,}000$ €. 40,000 € forgets the fixed costs; 75,000 € is the revenue.",
    },
    {
      difficulty: "medium",
      stem: "The rent rises, so the fixed costs increase to 28,000 € per month. What is the new break-even quantity?",
      options: ["3,000", "3,500", "4,000", "4,667"],
      answer: 1,
      explanation: "$28{,}000 / 8 = 3{,}500$ bottles.",
    },
    {
      difficulty: "medium",
      stem: "What is the average cost per bottle at a monthly quantity of 4,000 bottles?",
      options: ["6 €", "7 €", "13 €", "15 €"],
      answer: 2,
      explanation: "Table 1: total costs of 52,000 € for 4,000 bottles; $52{,}000 / 4{,}000 = 13$ €.",
    },
    {
      difficulty: "high",
      stem: "To win more customers, the start-up lowers the price to 13 €. What is the new break-even quantity?",
      options: ["1,846", "3,000", "4,000", "4,800"],
      answer: 2,
      explanation: "The contribution margin falls to $13 - 7 = 6$ €; $24{,}000 / 6 = 4{,}000$ bottles.",
    },
    {
      difficulty: "high",
      stem: "How many bottles per month must be sold (at 15 €) to make a profit of 12,000 €?",
      options: ["1,500", "3,000", "4,500", "5,143"],
      answer: 2,
      explanation: "From formula (2): $8x - 24{,}000 = 12{,}000$, so $x = 36{,}000 / 8 = 4{,}500$ bottles, which is within the capacity of 5,000.",
    },
  ],
};

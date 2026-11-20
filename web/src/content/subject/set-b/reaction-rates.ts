import type { SubjectText } from "../types";

export const REACTION_RATES: SubjectText = {
  passage: {
    id: "b-reaction-rates",
    title: "How Fast Do Chemical Reactions Run?",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "The **rate** of a chemical reaction describes how quickly reactants are used up or products are formed. If a reaction produces a gas, the rate can be followed by measuring the volume of gas collected. The average rate in a time interval is:",
      },
      { k: "formula", tex: "\\bar{r} = \\frac{\\Delta V}{\\Delta t}", label: "(1)" },
      {
        k: "p",
        text: "Particles can only react when they collide with enough energy. The reaction rate therefore depends on several factors:",
      },
      {
        k: "list",
        items: [
          "**Concentration:** the more reactant particles per volume, the more collisions occur. As a reactant is used up, the reaction slows down.",
          "**Temperature:** a rule of thumb (van 't Hoff rule) states that an increase of 10 °C roughly doubles the rate. In this text, assume exactly a doubling per 10 °C.",
          "**Catalysts:** they lower the energy needed for the reaction and thus speed it up. They are not used up and do not change the amount of product that is finally formed.",
        ],
      },
      {
        k: "p",
        text: "In an experiment at 20 °C, a solution of hydrogen peroxide (H₂O₂) was mixed with a small amount of catalyst. Hydrogen peroxide decomposes into water and oxygen: $2\\,\\text{H}_2\\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O} + \\text{O}_2$. The oxygen was collected and its volume measured every 30 seconds.",
      },
      {
        k: "table",
        caption: "Table 1. Volume of oxygen collected at 20 °C.",
        head: ["Time (s)", "0", "30", "60", "90", "120", "150"],
        rows: [["Oxygen (mL)", "0", "24", "42", "54", "60", "60"]],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the average rate of oxygen production during the first 30 seconds?",
      options: ["0.4 mL/s", "0.8 mL/s", "1.25 mL/s", "24 mL/s"],
      answer: 1,
      explanation: "Formula (1): $24$ mL $/ 30$ s $= 0.8$ mL/s.",
    },
    {
      difficulty: "low",
      stem: "What is the average rate between 60 s and 90 s?",
      options: ["0.2 mL/s", "0.4 mL/s", "0.6 mL/s", "0.9 mL/s"],
      answer: 1,
      explanation: "$\\Delta V = 54 - 42 = 12$ mL in $30$ s: $12 / 30 = 0.4$ mL/s. 0.6 mL/s would be the average over the first 90 s ($54/90$).",
    },
    {
      difficulty: "medium",
      stem: "Why does the reaction become slower over time?",
      options: [
        "Because the catalyst is used up.",
        "Because the concentration of hydrogen peroxide decreases.",
        "Because the temperature falls by 10 °C.",
        "Because the oxygen formed blocks the catalyst.",
      ],
      answer: 1,
      explanation: "The reactant is used up, so fewer collisions occur. The text states that catalysts are not used up; nothing indicates a temperature change.",
    },
    {
      difficulty: "medium",
      stem: "According to Table 1, at what time at the latest was the reaction finished?",
      options: ["90 s", "120 s", "150 s", "This cannot be determined."],
      answer: 1,
      explanation: "Between 120 s and 150 s no more oxygen is formed (60 mL both times), so the reaction was finished at the latest at 120 s.",
    },
    {
      difficulty: "medium",
      stem: "To which temperature must the experiment be heated so that the reaction runs 8 times as fast as at 20 °C?",
      options: ["28 °C", "50 °C", "80 °C", "100 °C"],
      answer: 1,
      explanation: "$8 = 2^3$: three doublings, i.e. $3 \\cdot 10$ °C $= 30$ °C more: $20 + 30 = 50$ °C.",
    },
    {
      difficulty: "high",
      stem: "The experiment is repeated at 40 °C with the same solution. What initial average rate (first 30 s) is expected?",
      options: ["1.6 mL/s", "2.4 mL/s", "3.2 mL/s", "8.0 mL/s"],
      answer: 2,
      explanation: "20 °C more means two doublings: factor $2^2 = 4$. $0.8 \\cdot 4 = 3.2$ mL/s. 1.6 mL/s assumes only one doubling.",
    },
    {
      difficulty: "high",
      stem: "The experiment is repeated at 20 °C with the same amount of hydrogen peroxide but more catalyst. What is expected?",
      options: [
        "Oxygen forms faster; in the end 60 mL are collected.",
        "Oxygen forms faster; in the end more than 60 mL are collected.",
        "Oxygen forms at the same speed; in the end 60 mL are collected.",
        "Oxygen forms more slowly; in the end less than 60 mL are collected.",
      ],
      answer: 0,
      explanation: "A catalyst speeds the reaction up but does not change the amount of product: the same amount of H₂O₂ still gives 60 mL of oxygen.",
    },
  ],
};

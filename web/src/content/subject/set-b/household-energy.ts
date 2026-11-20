import type { SubjectText } from "../types";

export const HOUSEHOLD_ENERGY: SubjectText = {
  passage: {
    id: "b-household-energy",
    title: "Electrical Energy in the Household",
    field: "Electrical Engineering",
    blocks: [
      {
        k: "p",
        text: "The **power** $P$ of an electrical appliance, measured in watts (W), states how much energy it uses per unit of time. The energy used depends on both the power and the operating time $t$:",
      },
      { k: "formula", tex: "E = P \\cdot t", label: "(1)" },
      {
        k: "p",
        text: "Electricity bills measure energy in **kilowatt-hours** (kWh). One kilowatt-hour is the energy an appliance with a power of 1,000 W uses in one hour. The cost is the energy multiplied by the price per kWh; in this text the price is **0.30 € per kWh**.",
      },
      {
        k: "p",
        text: "Power also links the voltage $U$ of the supply (230 V in European households) with the current $I$ that flows through the appliance:",
      },
      { k: "formula", tex: "P = U \\cdot I", label: "(2)" },
      {
        k: "p",
        text: "Appliances with a high power do not necessarily use the most energy, because many of them run only for a short time. Some devices also use a small amount of power in **standby** mode, when they appear to be switched off. Lighting is a further example of large differences: an LED lamp gives the same amount of light as an old 60 W incandescent bulb with a power of only 10 W.",
      },
      {
        k: "table",
        caption: "Table 1. Typical use of some appliances in one household.",
        head: ["Appliance", "Power", "Operating time per day"],
        rows: [
          ["Kettle", "2,000 W", "15 min"],
          ["Refrigerator (average)", "50 W", "24 h"],
          ["Television (on)", "100 W", "4 h"],
          ["Television (standby)", "2 W", "20 h"],
          ["LED lamp", "10 W", "5 h"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much energy does the kettle use per day?",
      options: ["0.05 kWh", "0.5 kWh", "5 kWh", "500 kWh"],
      answer: 1,
      explanation: "Formula (1): $2{,}000$ W $\\cdot 0.25$ h $= 500$ Wh $= 0.5$ kWh.",
    },
    {
      difficulty: "low",
      stem: "What does the refrigerator's electricity cost per day?",
      options: ["0.036 €", "0.36 €", "3.60 €", "15 €"],
      answer: 1,
      explanation: "$50$ W $\\cdot 24$ h $= 1{,}200$ Wh $= 1.2$ kWh; $1.2 \\cdot 0.30$ € $= 0.36$ €.",
    },
    {
      difficulty: "medium",
      stem: "Which appliance in Table 1 uses the most energy per day?",
      options: ["Kettle", "Refrigerator", "Television (on)", "LED lamp"],
      answer: 1,
      explanation: "Per day: kettle 0.5 kWh, refrigerator 1.2 kWh, television 0.4 kWh, LED lamp 0.05 kWh. The kettle has the highest power, but it runs only briefly.",
    },
    {
      difficulty: "medium",
      stem: "What does the television's standby mode cost per year (365 days)?",
      options: ["0.44 €", "4.38 €", "14.60 €", "43.80 €"],
      answer: 1,
      explanation: "Per day: $2$ W $\\cdot 20$ h $= 40$ Wh $= 0.04$ kWh. Per year: $0.04 \\cdot 365 = 14.6$ kWh; $14.6 \\cdot 0.30$ € $= 4.38$ €. 14.60 € is the energy, not the cost.",
    },
    {
      difficulty: "medium",
      stem: "What current flows through the kettle while it is heating?",
      options: ["0.115 A", "about 8.7 A", "11.5 A", "460 A"],
      answer: 1,
      explanation: "Formula (2): $I = P / U = 2{,}000 / 230 \\approx 8.7$ A.",
    },
    {
      difficulty: "high",
      stem: "A household replaces one 60 W bulb by an LED lamp of equal brightness. The lamp is on 5 hours a day. How much money is saved per year (365 days)?",
      options: ["2.74 €", "15.00 €", "27.38 €", "54.75 €"],
      answer: 2,
      explanation: "Saving in power: $60 - 10 = 50$ W. Per year: $50$ W $\\cdot 5$ h $\\cdot 365 = 91{,}250$ Wh $= 91.25$ kWh; $91.25 \\cdot 0.30$ € $\\approx 27.38$ €.",
    },
    {
      difficulty: "high",
      stem: "How long can a 2 kW heater run for 1 € of electricity?",
      options: ["20 min", "1 h 40 min", "3 h 20 min", "6 h 40 min"],
      answer: 1,
      explanation: "1 € buys $1 / 0.30 = 3.33$ kWh. Time $= E / P = 3.33$ kWh $/ 2$ kW $= 1.67$ h $= 1$ h $40$ min. 3 h 20 min forgets to divide by the power.",
    },
  ],
};

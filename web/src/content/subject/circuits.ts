import type { SubjectText } from "./types";

export const CIRCUITS: SubjectText = {
  passage: {
    id: "circuits",
    title: "Electric Circuits in the Household",
    field: "Engineering",
    blocks: [
      {
        k: "p",
        text: "An electric current $I$ (measured in ampere, A) flows through a component when a voltage $U$ (volt, V) is applied. How strongly the component resists the current is given by its resistance $R$ (ohm, Ω). For many components, **Ohm's law** holds:",
      },
      { k: "formula", tex: "U = R \\cdot I", label: "(1)" },
      {
        k: "p",
        text: "If resistors are connected one after another (**in series**), the same current flows through all of them and their resistances add up. If they are connected side by side (**in parallel**), the same voltage lies across each of them and the total resistance is *smaller* than the smallest single resistance:",
      },
      { k: "formula", tex: "R_{series} = R_1 + R_2 \\qquad \\frac{1}{R_{parallel}} = \\frac{1}{R_1} + \\frac{1}{R_2}", label: "(2)" },
      {
        k: "p",
        text: "The electrical power $P$ (watt, W) converted in a component, and the energy $E$ used during a time $t$, are:",
      },
      { k: "formula", tex: "P = U \\cdot I = I^2 \\cdot R \\qquad E = P \\cdot t", label: "(3)" },
      {
        k: "p",
        text: "Electricity bills state energy in kilowatt-hours (kWh): 1 kWh is the energy used by a 1,000 W device running for one hour.",
      },
      {
        k: "p",
        text: "In a household, all sockets of one circuit are connected **in parallel** to the mains voltage of 230 V, so every device gets the full voltage. Each circuit is protected by a fuse that cuts the power if the total current exceeds its rating, here 16 A.",
      },
      {
        k: "table",
        caption: "Table 1. Power rating of some household devices.",
        head: ["Device", "Power (W)"],
        rows: [
          ["Electric kettle", "2,000"],
          ["Fan heater", "1,500"],
          ["Laptop charger", "60"],
          ["LED lamp", "10"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Two resistors of 4 Ω and 6 Ω are connected in series to a voltage of 10 V. What current flows?",
      options: ["0.1 A", "1 A", "2.5 A", "4.2 A"],
      answer: 1,
      explanation: "In series: $R = 4 + 6 = 10$ Ω. Ohm's law: $I = U / R = 10 / 10 = 1$ A.",
    },
    {
      difficulty: "low",
      stem: "What is the total resistance if the same two resistors (4 Ω and 6 Ω) are connected in parallel?",
      options: ["0.42 Ω", "2.4 Ω", "5 Ω", "10 Ω"],
      answer: 1,
      explanation: "$1/R = 1/4 + 1/6 = 3/12 + 2/12 = 5/12$, so $R = 12/5 = 2.4$ Ω. As the text says, it is smaller than the smaller resistor (4 Ω).",
    },
    {
      difficulty: "low",
      stem: "Two equal resistors, each with resistance $R$, are connected in parallel. What is the total resistance?",
      options: ["$2R$", "$R$", "$R/2$", "$R/4$"],
      answer: 2,
      explanation: "$1/R_{parallel} = 1/R + 1/R = 2/R$, so $R_{parallel} = R/2$.",
    },
    {
      difficulty: "medium",
      stem: "The kettle from Table 1 runs for 6 minutes. How much energy does it use?",
      options: ["0.02 kWh", "0.2 kWh", "2 kWh", "12 kWh"],
      answer: 1,
      explanation: "6 minutes = 0.1 h. $E = P \\cdot t = 2$ kW · 0.1 h = 0.2 kWh.",
    },
    {
      difficulty: "medium",
      stem: "Roughly what current does the fan heater from Table 1 draw from the 230 V mains?",
      options: ["0.15 A", "6.5 A", "15 A", "345 A"],
      answer: 1,
      explanation: "From $P = U \\cdot I$: $I = 1{,}500 / 230 \\approx 6.5$ A.",
    },
    {
      difficulty: "medium",
      stem: "Can the kettle and the fan heater run at the same time on one circuit with a 16 A fuse?",
      options: [
        "Yes: together they draw about 15.2 A, which is below 16 A.",
        "No: together they draw about 22 A.",
        "No: a 16 A circuit allows at most 2,300 W.",
        "Yes: in a household circuit the devices share the voltage, so each draws less current.",
      ],
      answer: 0,
      explanation: "The devices are in parallel, so the currents add: $3{,}500$ W / 230 V ≈ 15.2 A < 16 A. The circuit allows up to 230 V · 16 A = 3,680 W.",
    },
    {
      difficulty: "high",
      stem: "A heating element with resistance $R$ is connected to a fixed voltage. A second resistor of the same value $R$ is then added **in series**. What happens to the power converted in the heating element?",
      options: ["It stays the same.", "It halves.", "It falls to a quarter.", "It doubles."],
      answer: 2,
      explanation: "The total resistance doubles, so the current halves. With $P = I^2 \\cdot R$, halving $I$ gives $(1/2)^2 = 1/4$ of the power.",
    },
    {
      difficulty: "high",
      stem: "An old 60 W bulb is replaced by the LED lamp from Table 1. The lamp is on 5 hours a day on 300 days a year. How much energy does this save per year?",
      options: ["15 kWh", "75 kWh", "90 kWh", "750 kWh"],
      answer: 1,
      explanation: "The saving is 60 − 10 = 50 W for 5 · 300 = 1,500 h: 50 W · 1,500 h = 75,000 Wh = 75 kWh.",
    },
  ],
};

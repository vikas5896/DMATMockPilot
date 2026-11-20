import type { SubjectText } from "../types";

export const POWER_TRANSMISSION: SubjectText = {
  passage: {
    id: "h-power-transmission",
    title: "Why Power Lines Use High Voltage",
    field: "Electrical Engineering",
    blocks: [
      {
        k: "p",
        text: "Electrical power is the product of voltage and current: $P = U \\cdot I$. The same power can therefore be transmitted with a high voltage and a small current, or with a low voltage and a large current. The difference matters, because the wires of a power line have a resistance $R$, and part of the power is lost as heat in them:",
      },
      { k: "formula", tex: "P_{\\text{loss}} = I^2 \\cdot R", label: "(1)" },
      {
        k: "p",
        text: "Since the losses grow with the square of the current, raising the voltage by a factor of 10 reduces the current by a factor of 10 and the losses by a factor of 100. Long-distance lines therefore work with very high voltages.",
      },
      {
        k: "p",
        text: "Voltages are changed with **transformers**. A transformer has two coils with $N_1$ and $N_2$ turns. The voltages are in the same ratio as the numbers of turns, and an ideal transformer passes on all the power, so the currents change in the opposite ratio:",
      },
      { k: "formula", tex: "\\frac{U_1}{U_2} = \\frac{N_1}{N_2} \\qquad U_1 \\cdot I_1 = U_2 \\cdot I_2", label: "(2)" },
      {
        k: "p",
        text: "**Example.** A power plant sends **10 MW** through a line with a total resistance of **5 Ω**. In the questions, the voltage of the line is either 20 kV or 100 kV. A small transformer for a lamp has 1,000 turns on the side connected to the 230 V socket and 50 turns on the other side.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What current flows in the line when 10 MW are transmitted at 100 kV?",
      options: ["10 A", "100 A", "1,000 A", "10,000 A"],
      answer: 1,
      explanation: "$I = P / U = 10{,}000{,}000 / 100{,}000 = 100$ A.",
    },
    {
      difficulty: "low",
      stem: "Why do long-distance power lines use high voltages?",
      options: [
        "Because high voltage makes the electricity flow faster.",
        "Because the current is then smaller, and the losses in the wires fall strongly.",
        "Because high voltage increases the resistance of the wires.",
        "Because households need high voltage.",
      ],
      answer: 1,
      explanation: "For the same power, a higher voltage means a smaller current, and by formula (1) the losses fall with the square of the current.",
    },
    {
      difficulty: "medium",
      stem: "How much power is lost in the line at 100 kV?",
      options: ["500 W", "50 kW", "500 kW", "5 MW"],
      answer: 1,
      explanation: "Formula (1): $100^2 \\cdot 5 = 50{,}000$ W $= 50$ kW, i.e. 0.5 % of 10 MW.",
    },
    {
      difficulty: "medium",
      stem: "How much power is lost in the line if the same 10 MW are transmitted at 20 kV?",
      options: ["50 kW", "250 kW", "1.25 MW", "2.5 MW"],
      answer: 2,
      explanation: "$I = 10{,}000{,}000 / 20{,}000 = 500$ A; $500^2 \\cdot 5 = 1{,}250{,}000$ W $= 1.25$ MW.",
    },
    {
      difficulty: "medium",
      stem: "What percentage of the transmitted power is lost at 20 kV?",
      options: ["0.5 %", "2.5 %", "12.5 %", "25 %"],
      answer: 2,
      explanation: "$1.25$ MW $/ 10$ MW $= 12.5$ %, compared with 0.5 % at 100 kV: 25 times as much.",
    },
    {
      difficulty: "medium",
      stem: "What voltage does the lamp transformer deliver on its 50-turn side?",
      options: ["4.6 V", "11.5 V", "46 V", "4,600 V"],
      answer: 1,
      explanation: "Formula (2): $U_2 = 230 \\cdot \\frac{50}{1{,}000} = 11.5$ V.",
    },
    {
      difficulty: "high",
      stem: "The line voltage is raised from 100 kV to 200 kV, with the same 10 MW. How large are the losses now?",
      options: ["100 kW", "50 kW", "25 kW", "12.5 kW"],
      answer: 3,
      explanation: "Twice the voltage gives half the current (50 A) and a quarter of the losses: $50^2 \\cdot 5 = 12{,}500$ W.",
    },
    {
      difficulty: "high",
      stem: "The lamp connected to the transformer uses 23 W. What current flows on the 230 V side (ideal transformer)?",
      options: ["0.1 A", "2 A", "10 A", "20 A"],
      answer: 0,
      explanation: "The same power flows on both sides: $I_1 = 23 / 230 = 0.1$ A. On the 11.5 V side, the current is $23 / 11.5 = 2$ A.",
    },
  ],
};

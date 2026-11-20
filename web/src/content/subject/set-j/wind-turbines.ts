import type { SubjectText } from "../types";

export const WIND_TURBINES: SubjectText = {
  passage: {
    id: "j-wind-turbines",
    title: "The Power of Wind Turbines",
    field: "Energy Engineering",
    blocks: [
      {
        k: "p",
        text: "The power carried by wind through the area $A$ swept by a turbine's rotor grows with the **cube** of the wind speed $v$:",
      },
      { k: "formula", tex: "P_{\\text{wind}} = \\tfrac{1}{2} \\cdot \\rho \\cdot A \\cdot v^3", label: "(1)" },
      {
        k: "p",
        text: "Here $\\rho \\approx 1.2$ kg/m³ is the density of air, and the swept area is a circle, $A = \\pi r^2$. A turbine can never extract all this power, because the air must keep flowing behind the rotor. The physical maximum (the **Betz limit**) is about **59 %**; real turbines reach about 45 %.",
      },
      {
        k: "p",
        text: "Because the wind does not always blow at full strength, a turbine produces much less energy over a year than its **rated power** times all 8,760 hours of the year. The ratio of the actual annual energy to this maximum is the **capacity factor**; for wind turbines on land it is often around 25–35 %.",
      },
      {
        k: "p",
        text: "**Example.** A modern turbine has a rated power of **3 MW** and a rotor diameter of 100 m. Its capacity factor is **30 %**.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What does the Betz limit state?",
      options: [
        "A turbine can extract at most about 59 % of the wind's power.",
        "A turbine stops at wind speeds above 59 km/h.",
        "Only 59 % of turbines produce electricity at any time.",
        "A turbine must have at least 59 m rotor diameter.",
      ],
      answer: 0,
      explanation: "The Betz limit is the physical maximum share of the wind's power a turbine can extract.",
    },
    {
      difficulty: "low",
      stem: "What does a capacity factor of 30 % mean?",
      options: [
        "The turbine runs only 30 % of the time.",
        "The turbine produces 30 % of the energy it would produce at rated power all year.",
        "The turbine extracts 30 % of the wind's power.",
        "30 % of the energy is lost in the cables.",
      ],
      answer: 1,
      explanation: "The capacity factor compares the actual annual energy with rated power × 8,760 hours.",
    },
    {
      difficulty: "medium",
      stem: "The wind speed doubles. How does the power in the wind change?",
      options: ["×2", "×4", "×6", "×8"],
      answer: 3,
      explanation: "Formula (1): $P \\sim v^3$, and $2^3 = 8$.",
    },
    {
      difficulty: "medium",
      stem: "A new turbine design has twice the rotor diameter. How does the power in the wind through its rotor change (same wind speed)?",
      options: ["×2", "×4", "×8", "×16"],
      answer: 1,
      explanation: "The swept area grows with $r^2$: twice the diameter means 4 times the area, and the power is proportional to the area.",
    },
    {
      difficulty: "medium",
      stem: "What is the power in the wind flowing through 1 m² at a wind speed of 10 m/s?",
      options: ["6 W", "60 W", "600 W", "6,000 W"],
      answer: 2,
      explanation: "Formula (1): $0.5 \\cdot 1.2 \\cdot 1 \\cdot 10^3 = 600$ W.",
    },
    {
      difficulty: "medium",
      stem: "The wind speed rises from 6 m/s to 9 m/s. By what factor does the power in the wind increase?",
      options: ["1.5", "2.25", "about 3.4", "4.5"],
      answer: 2,
      explanation: "$(9/6)^3 = 1.5^3 = 3.375 \\approx 3.4$.",
    },
    {
      difficulty: "high",
      stem: "How much electrical energy does the 3 MW turbine produce per year?",
      options: ["about 0.9 GWh", "about 7.9 GWh", "about 26 GWh", "about 263 GWh"],
      answer: 1,
      explanation: "$3$ MW $\\cdot 8{,}760$ h $\\cdot 0.3 = 7{,}884$ MWh $\\approx 7.9$ GWh. 26 GWh would assume full power all year.",
    },
    {
      difficulty: "high",
      stem: "A household uses 3,000 kWh per year. About how many households can the turbine supply over the year?",
      options: ["about 260", "about 2,600", "about 8,800", "about 26,000"],
      answer: 1,
      explanation: "$7{,}884{,}000$ kWh $/ 3{,}000$ kWh $\\approx 2{,}600$ households.",
    },
  ],
};

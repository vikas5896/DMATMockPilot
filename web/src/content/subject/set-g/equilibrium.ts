import type { SubjectText } from "../types";

export const EQUILIBRIUM: SubjectText = {
  passage: {
    id: "g-equilibrium",
    title: "Chemical Equilibrium",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "Many reactions can run in both directions. In a closed container, the forward reaction slows down as reactants are used up, while the backward reaction speeds up as products accumulate. Eventually both run at the same rate: the system has reached **chemical equilibrium**. The concentrations then stay constant, but they are generally not equal, and both reactions continue (dynamic equilibrium).",
      },
      {
        k: "p",
        text: "For a reaction $\\text{A} + \\text{B} \\rightleftharpoons \\text{C} + \\text{D}$, the concentrations at equilibrium satisfy:",
      },
      { k: "formula", tex: "K = \\frac{[\\text{C}] \\cdot [\\text{D}]}{[\\text{A}] \\cdot [\\text{B}]}", label: "(1)" },
      {
        k: "p",
        text: "The **equilibrium constant** $K$ depends only on the temperature. If the same expression calculated for the current concentrations (the reaction quotient $Q$) is smaller than $K$, the reaction proceeds forward until $Q = K$; if it is larger, it proceeds backward. A **catalyst** speeds up both directions equally: equilibrium is reached faster, but its position does not change.",
      },
      {
        k: "p",
        text: "**Le Chatelier's principle:** if an equilibrium is disturbed, it shifts so as to reduce the disturbance. Adding a reactant shifts it towards the products; for reactions of gases, raising the pressure favours the side with fewer gas molecules; heating favours the direction that absorbs heat.",
      },
      {
        k: "p",
        text: "An important industrial example is the synthesis of ammonia, which releases heat (exothermic in the forward direction): $\\text{N}_2 + 3\\,\\text{H}_2 \\rightleftharpoons 2\\,\\text{NH}_3$.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which statement about a chemical equilibrium is correct?",
      options: [
        "Both reactions have stopped.",
        "The forward and backward reactions run at the same rate.",
        "The concentrations of all substances are equal.",
        "Only the forward reaction continues.",
      ],
      answer: 1,
      explanation: "At equilibrium both reactions continue at equal rates, so the concentrations stay constant, though usually at different values.",
    },
    {
      difficulty: "low",
      stem: "More of substance A is added to an equilibrium A + B ⇌ C + D. What happens?",
      options: [
        "The equilibrium shifts towards C and D.",
        "The equilibrium shifts towards A and B.",
        "Nothing changes.",
        "The equilibrium constant increases.",
      ],
      answer: 0,
      explanation: "Le Chatelier: the system reduces the disturbance by using up some of the added A, forming more products. $K$ stays the same.",
    },
    {
      difficulty: "medium",
      stem: "At equilibrium, [A] = 0.2, [B] = 0.5, [C] = 0.4 and [D] = 0.5 mol/L. What is K?",
      options: ["0.5", "1", "2", "4"],
      answer: 2,
      explanation: "Formula (1): $K = \\frac{0.4 \\cdot 0.5}{0.2 \\cdot 0.5} = \\frac{0.2}{0.1} = 2$.",
    },
    {
      difficulty: "medium",
      stem: "In the ammonia synthesis, the pressure is increased. How does the equilibrium shift?",
      options: [
        "Towards ammonia, because that side has fewer gas molecules.",
        "Towards nitrogen and hydrogen, because that side has more gas molecules.",
        "It does not shift, because all substances are gases.",
        "Towards ammonia, because the reaction is exothermic.",
      ],
      answer: 0,
      explanation: "Left side: $1 + 3 = 4$ gas molecules; right side: 2. Higher pressure favours the side with fewer molecules, i.e. ammonia.",
    },
    {
      difficulty: "medium",
      stem: "The ammonia equilibrium is heated. What happens to the amount of ammonia?",
      options: ["It increases.", "It decreases.", "It stays the same.", "It first increases, then stays the same."],
      answer: 1,
      explanation: "The forward reaction releases heat, so the backward reaction absorbs heat. Heating favours the heat-absorbing direction: ammonia decomposes.",
    },
    {
      difficulty: "high",
      stem: "For the reaction with K = 2, a mixture contains [A] = [B] = [C] = [D] = 0.5 mol/L. What happens?",
      options: [
        "Nothing, because the mixture is at equilibrium.",
        "The reaction proceeds forward, because Q = 1 is smaller than K.",
        "The reaction proceeds backward, because Q is larger than K.",
        "The reaction proceeds backward, because all concentrations are equal.",
      ],
      answer: 1,
      explanation: "$Q = \\frac{0.5 \\cdot 0.5}{0.5 \\cdot 0.5} = 1 < K = 2$: more products must form until $Q = K$.",
    },
    {
      difficulty: "high",
      stem: "A catalyst is added to the ammonia synthesis at constant temperature and pressure. What is the effect?",
      options: [
        "More ammonia at equilibrium.",
        "Less ammonia at equilibrium.",
        "Equilibrium is reached faster, with the same amount of ammonia.",
        "The equilibrium constant increases.",
      ],
      answer: 2,
      explanation: "A catalyst speeds up both directions equally. It shortens the time to equilibrium but does not change its position or $K$.",
    },
  ],
};

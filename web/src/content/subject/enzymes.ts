import type { SubjectText } from "./types";

export const ENZYMES: SubjectText = {
  passage: {
    id: "enzymes",
    title: "Enzyme Kinetics",
    field: "Life Sciences",
    blocks: [
      {
        k: "p",
        text: "Enzymes are proteins that speed up chemical reactions in living cells. An enzyme binds a molecule called the **substrate** and converts it into a product. How fast this happens, the reaction rate $v$, depends on the substrate concentration $[S]$.",
      },
      {
        k: "p",
        text: "At low substrate concentrations, most enzyme molecules are idle, and doubling $[S]$ nearly doubles the rate. At high concentrations, almost all enzyme molecules are busy (the enzyme is *saturated*), and the rate approaches a maximum $V_{max}$. This behaviour is described by the Michaelis–Menten equation:",
      },
      { k: "formula", tex: "v = \\frac{V_{max} \\cdot [S]}{K_m + [S]}", label: "(1)" },
      {
        k: "p",
        text: "The **Michaelis constant** $K_m$ is the substrate concentration at which the rate is exactly half of $V_{max}$. A small $K_m$ means the enzyme already works fast at low substrate concentrations; it has a high *affinity* for its substrate.",
      },
      {
        k: "p",
        text: "Inhibitors are molecules that slow enzymes down. A **competitive inhibitor** competes with the substrate for the same binding site. It raises the apparent $K_m$, but with enough substrate the inhibitor is pushed aside, so $V_{max}$ stays the same. A **non-competitive inhibitor** binds elsewhere and lowers $V_{max}$, while $K_m$ stays the same.",
      },
      {
        k: "table",
        caption: "Table 1. Reaction rate v (µmol/min) of enzyme E at different substrate concentrations, without inhibitor and with inhibitor X.",
        head: ["[S] (mmol/L)", "1", "2", "4", "8", "16", "32"],
        rows: [
          ["v without inhibitor", "20.0", "33.3", "50.0", "66.7", "80.0", "88.9"],
          ["v with inhibitor X", "7.7", "14.3", "25.0", "40.0", "57.1", "72.7"],
        ],
      },
      {
        k: "chart",
        caption: "Figure 1. Data from Table 1.",
        kind: "line",
        xLabel: "[S] (mmol/L)",
        yLabel: "v (µmol/min)",
        categories: ["1", "2", "4", "8", "16", "32"],
        series: [
          { name: "without inhibitor", values: [20, 33.3, 50, 66.7, 80, 88.9] },
          { name: "with inhibitor X", values: [7.7, 14.3, 25, 40, 57.1, 72.7] },
        ],
      },
      {
        k: "p",
        text: "For enzyme E without inhibitor, $V_{max}$ = 100 µmol/min.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the reaction rate $v$ when the substrate concentration equals $K_m$?",
      options: ["$V_{max}$", "$V_{max}/2$", "$V_{max}/4$", "zero"],
      answer: 1,
      explanation: "By definition, $K_m$ is the concentration at which $v = V_{max}/2$. Check with (1): $v = V_{max} K_m / (K_m + K_m) = V_{max}/2$.",
    },
    {
      difficulty: "low",
      stem: "What is $K_m$ of enzyme E without inhibitor?",
      options: ["1 mmol/L", "4 mmol/L", "16 mmol/L", "50 mmol/L"],
      answer: 1,
      explanation: "$V_{max}$ = 100 µmol/min, so half of it is 50 µmol/min. Table 1 shows v = 50.0 at [S] = 4 mmol/L, so $K_m$ = 4 mmol/L.",
    },
    {
      difficulty: "medium",
      stem: "Using equation (1), what rate does enzyme E reach without inhibitor at $[S]$ = 12 mmol/L?",
      options: ["50 µmol/min", "66.7 µmol/min", "75 µmol/min", "90 µmol/min"],
      answer: 2,
      explanation: "$v = 100 \\cdot 12 / (4 + 12) = 1200 / 16 = 75$ µmol/min.",
    },
    {
      difficulty: "medium",
      stem: "What happens to the rate when $[S]$ is much larger than $K_m$?",
      options: [
        "$v$ is close to $V_{max}$ and hardly changes when $[S]$ rises further.",
        "$v$ is proportional to $[S]$.",
        "$v$ is close to $V_{max}/2$.",
        "$v$ falls, because the enzyme is overloaded.",
      ],
      answer: 0,
      explanation: "If $[S] \\gg K_m$, then $K_m + [S] \\approx [S]$ and (1) gives $v \\approx V_{max}$. The enzyme is saturated, so more substrate hardly helps.",
    },
    {
      difficulty: "medium",
      stem: "Which kind of inhibitor is X most likely to be?",
      options: [
        "A competitive inhibitor",
        "A non-competitive inhibitor",
        "An inhibitor that destroys all enzyme molecules",
        "Not an inhibitor, but an activator",
      ],
      answer: 0,
      explanation: "With X the rates are lower, but the gap closes as [S] rises (Figure 1): the curves approach the same maximum. That means $K_m$ rose while $V_{max}$ stayed the same, which is the sign of a competitive inhibitor.",
    },
    {
      difficulty: "medium",
      stem: "Between which substrate concentrations in Table 1 does the rate with inhibitor X reach 50 µmol/min?",
      options: ["2 and 4 mmol/L", "4 and 8 mmol/L", "8 and 16 mmol/L", "16 and 32 mmol/L"],
      answer: 2,
      explanation: "With X, v is 40.0 at 8 mmol/L and 57.1 at 16 mmol/L, so 50 is reached between them. The apparent $K_m$ is therefore above 8 mmol/L, much higher than the 4 mmol/L without inhibitor.",
    },
    {
      difficulty: "high",
      stem: "A non-competitive inhibitor halves $V_{max}$ of enzyme E. What rate does E then reach at $[S]$ = 4 mmol/L?",
      options: ["12.5 µmol/min", "25 µmol/min", "33.3 µmol/min", "50 µmol/min"],
      answer: 1,
      explanation: "A non-competitive inhibitor leaves $K_m$ = 4 mmol/L unchanged. With $V_{max}$ = 50: $v = 50 \\cdot 4 / (4 + 4) = 25$ µmol/min.",
    },
    {
      difficulty: "high",
      stem: "Enzyme A has $K_m$ = 0.5 mmol/L, enzyme B has $K_m$ = 5 mmol/L for the same substrate. Which statement is correct?",
      options: [
        "A has the higher affinity for the substrate and already works at half its maximum rate at 0.5 mmol/L.",
        "B has the higher affinity, because it needs more substrate.",
        "A must have the higher $V_{max}$.",
        "Both have the same affinity, because they use the same substrate.",
      ],
      answer: 0,
      explanation: "A small $K_m$ means high affinity: A reaches $V_{max}/2$ already at 0.5 mmol/L. $K_m$ says nothing about $V_{max}$, so the third option does not follow.",
    },
  ],
};

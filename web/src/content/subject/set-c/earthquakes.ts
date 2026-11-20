import type { SubjectText } from "../types";

export const EARTHQUAKES: SubjectText = {
  passage: {
    id: "c-earthquakes",
    title: "Measuring the Size of Earthquakes",
    field: "Geophysics",
    blocks: [
      {
        k: "p",
        text: "Earthquakes release energy that has built up as rocks are slowly deformed along faults. Their size is described by the **magnitude** $M$, which is calculated from the ground motion recorded by seismometers. The magnitude scale is **logarithmic**: an earthquake one magnitude higher produces ground motion with a 10 times larger amplitude.",
      },
      { k: "formula", tex: "\\frac{\\text{amplitude}_1}{\\text{amplitude}_2} = 10^{\\,M_1 - M_2}", label: "(1)" },
      {
        k: "p",
        text: "The energy released grows even faster: each additional magnitude unit means about 32 times as much energy, and two units about 1,000 times as much:",
      },
      { k: "formula", tex: "\\frac{E_1}{E_2} = 10^{\\,1.5\\,(M_1 - M_2)}", label: "(2)" },
      {
        k: "p",
        text: "Small earthquakes are far more frequent than large ones: worldwide, there are roughly ten times as many earthquakes in each lower magnitude class (Table 1).",
      },
      {
        k: "p",
        text: "Magnitude must not be confused with **intensity**. An earthquake has one magnitude, which describes the energy released at its source. The intensity describes how strongly the shaking is felt and how much damage it causes at a particular place; it depends on the distance from the source, the type of ground and the buildings.",
      },
      {
        k: "table",
        caption: "Table 1. Average number of earthquakes worldwide per year (rounded).",
        head: ["Magnitude", "Number per year"],
        rows: [
          ["8.0 and more", "1"],
          ["7.0 – 7.9", "15"],
          ["6.0 – 6.9", "130"],
          ["5.0 – 5.9", "1,300"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many times larger is the ground-motion amplitude of a magnitude 6 earthquake than that of a magnitude 4 earthquake?",
      options: ["2 times", "20 times", "100 times", "1,000 times"],
      answer: 2,
      explanation: "Formula (1): $10^{6 - 4} = 10^2 = 100$.",
    },
    {
      difficulty: "low",
      stem: "About how many times as much energy does a magnitude 6.0 earthquake release as a magnitude 5.0 earthquake?",
      options: ["1.5 times", "10 times", "about 32 times", "100 times"],
      answer: 2,
      explanation: "The text states about 32 times per magnitude unit; formula (2): $10^{1.5} \\approx 31.6$. 10 times applies to the amplitude, not the energy.",
    },
    {
      difficulty: "low",
      stem: "After an earthquake, two towns at different distances from its source report very different shaking. Which explanation is correct?",
      options: [
        "The earthquake had two different magnitudes.",
        "The intensity depends on the place, while the magnitude is a single value for the earthquake.",
        "Each town calculated the magnitude with a different scale.",
        "The amplitude grows with the distance from the source.",
      ],
      answer: 1,
      explanation: "One earthquake has one magnitude. The intensity, i.e. the shaking felt at a place, depends on distance, ground and buildings.",
    },
    {
      difficulty: "medium",
      stem: "About how many earthquakes of magnitude 6.0 to 6.9 occur worldwide per week on average?",
      options: ["about 0.4", "about 2.5", "about 13", "about 130"],
      answer: 1,
      explanation: "Table 1: 130 per year; $130 / 52 = 2.5$ per week.",
    },
    {
      difficulty: "medium",
      stem: "How many times as much energy does a magnitude 7 earthquake release as a magnitude 5 earthquake?",
      options: ["2 times", "100 times", "1,000 times", "10,000 times"],
      answer: 2,
      explanation: "Formula (2): $10^{1.5 \\cdot 2} = 10^3 = 1{,}000$, as the text states for two magnitude units. 100 times is the amplitude ratio.",
    },
    {
      difficulty: "medium",
      stem: "Earthquake X produces a ground-motion amplitude 1,000 times larger than earthquake Y. By how much do their magnitudes differ?",
      options: ["by 1", "by 3", "by 30", "by 1,000"],
      answer: 1,
      explanation: "Formula (1): $10^{\\Delta M} = 1{,}000 = 10^3$, so $\\Delta M = 3$.",
    },
    {
      difficulty: "high",
      stem: "About how many magnitude 6 earthquakes together release as much energy as one magnitude 7 earthquake?",
      options: ["2", "10", "about 32", "1,000"],
      answer: 2,
      explanation: "One magnitude unit means about 32 times the energy, so about 32 earthquakes of magnitude 6 release as much energy as one of magnitude 7.",
    },
    {
      difficulty: "high",
      stem: "Of all earthquakes of magnitude 5.0 or more per year (Table 1), about what share has a magnitude of 7.0 or more?",
      options: ["about 1 %", "about 5 %", "about 10 %", "about 16 %"],
      answer: 0,
      explanation: "Magnitude 7.0 or more: $1 + 15 = 16$. All of magnitude 5.0 or more: $1 + 15 + 130 + 1{,}300 = 1{,}446$. $16 / 1{,}446 \\approx 1.1$ %.",
    },
  ],
};

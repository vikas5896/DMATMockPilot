import type { SubjectText } from "../types";

export const DECIBELS: SubjectText = {
  passage: {
    id: "e-decibels",
    title: "Measuring Sound in Decibels",
    field: "Acoustics",
    blocks: [
      {
        k: "p",
        text: "The physical strength of a sound is its **intensity** $I$, the power per area in W/m². The human ear can hear intensities from about $10^{-12}$ W/m² (the threshold of hearing, $I_0$) up to more than 1 W/m². To handle this huge range, the **sound level** $L$ is given on a logarithmic scale in decibels (dB):",
      },
      { k: "formula", tex: "L = 10 \\cdot \\log_{10}\\!\\left(\\frac{I}{I_0}\\right)\\ \\text{dB}", label: "(1)" },
      {
        k: "list",
        items: [
          "**+10 dB** means 10 times the intensity, **+20 dB** 100 times, and so on.",
          "**+3 dB** means roughly twice the intensity. Two equally loud sources together are therefore about 3 dB louder than one.",
          "Our ears do not perceive intensity directly: a sound that is 10 dB higher is perceived as about **twice as loud**.",
          "In the open, the intensity of a small source falls with the square of the distance: doubling the distance lowers the level by about **6 dB**.",
        ],
      },
      {
        k: "p",
        text: "Long exposure to loud sound damages hearing. A common guideline allows 8 hours per day at 85 dB; for every additional 3 dB, the safe time is halved.",
      },
      {
        k: "table",
        caption: "Table 1. Typical sound levels.",
        head: ["Sound", "Level (dB)"],
        rows: [
          ["Whisper", "30"],
          ["Normal conversation", "60"],
          ["Busy road", "80"],
          ["Rock concert", "110"],
          ["Threshold of pain", "130"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many times greater is the sound intensity of a busy road than that of a normal conversation?",
      options: ["1.3 times", "20 times", "100 times", "1,000 times"],
      answer: 2,
      explanation: "The difference is $80 - 60 = 20$ dB, which means $10^2 = 100$ times the intensity.",
    },
    {
      difficulty: "low",
      stem: "Which sound in Table 1 has 1,000 times the intensity of a whisper?",
      options: ["Normal conversation", "Busy road", "Rock concert", "Threshold of pain"],
      answer: 0,
      explanation: "1,000 times $= 10^3$ means $+30$ dB: $30 + 30 = 60$ dB, a normal conversation.",
    },
    {
      difficulty: "medium",
      stem: "A machine produces 80 dB. A second, identical machine is switched on next to it. What is the total level?",
      options: ["80 dB", "83 dB", "86 dB", "160 dB"],
      answer: 1,
      explanation: "Two equal sources double the intensity, which is about $+3$ dB: 83 dB. Decibels cannot simply be added.",
    },
    {
      difficulty: "medium",
      stem: "About how many times as loud as a busy road is a rock concert perceived?",
      options: ["3 times", "8 times", "30 times", "1,000 times"],
      answer: 1,
      explanation: "The difference is 30 dB. Each 10 dB is perceived as twice as loud: $2^3 = 8$. The intensity, in contrast, is 1,000 times higher.",
    },
    {
      difficulty: "medium",
      stem: "According to the guideline, how long per day may a worker be exposed to 91 dB?",
      options: ["2 hours", "4 hours", "6 hours", "8 hours"],
      answer: 0,
      explanation: "85 dB: 8 h; 88 dB: 4 h; 91 dB: 2 h, because the safe time halves for every 3 dB.",
    },
    {
      difficulty: "high",
      stem: "At a distance of 2 m from a loudspeaker standing in the open, the level is 100 dB. What is the level at 8 m?",
      options: ["25 dB", "88 dB", "94 dB", "97 dB"],
      answer: 1,
      explanation: "From 2 m to 8 m the distance doubles twice (2 → 4 → 8): $2 \\cdot 6 = 12$ dB less, so 88 dB.",
    },
    {
      difficulty: "high",
      stem: "What is the sound intensity of a normal conversation (60 dB)?",
      options: ["$10^{-6}$ W/m²", "$10^{-60}$ W/m²", "60 W/m²", "$10^{6}$ W/m²"],
      answer: 0,
      explanation: "Formula (1): $60 = 10 \\cdot \\log_{10}(I / 10^{-12})$, so $I / 10^{-12} = 10^6$ and $I = 10^{-6}$ W/m².",
    },
  ],
};

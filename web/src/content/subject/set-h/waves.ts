import type { SubjectText } from "../types";

export const WAVES: SubjectText = {
  passage: {
    id: "h-waves",
    title: "Frequency, Wavelength and Speed of Waves",
    field: "Physics",
    blocks: [
      {
        k: "p",
        text: "A wave repeats itself in time and in space. The **frequency** $f$ is the number of oscillations per second (in hertz, Hz); the **period** $T = 1/f$ is the duration of one oscillation. The **wavelength** $\\lambda$ is the distance between two neighbouring crests. In one period, the wave moves forward by one wavelength, so its speed is:",
      },
      { k: "formula", tex: "v = f \\cdot \\lambda", label: "(1)" },
      {
        k: "p",
        text: "The speed depends on the medium, not on the frequency. Sound travels at about **340 m/s** in air and about **1,500 m/s** in water. Radio waves and light travel at $3 \\cdot 10^8$ m/s. When a wave passes from one medium into another, its frequency stays the same; its speed and therefore its wavelength change.",
      },
      {
        k: "p",
        text: "Humans hear frequencies from about 20 Hz to 20 kHz. Distances can be measured with echoes: a pulse travels to an obstacle and back, so the distance is $d = v \\cdot t / 2$, where $t$ is the time until the echo returns. Because light arrives almost instantly, the distance to a thunderstorm can be estimated from the delay between lightning and thunder.",
      },
      {
        k: "table",
        caption: "Table 1. Prefixes.",
        head: ["Prefix", "Factor"],
        rows: [
          ["kilo (k)", "$10^3$"],
          ["mega (M)", "$10^6$"],
          ["milli (m)", "$10^{-3}$"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the wavelength of a 340 Hz sound wave in air?",
      options: ["0.1 m", "1 m", "3.4 m", "340 m"],
      answer: 1,
      explanation: "Formula (1): $\\lambda = v / f = 340 / 340 = 1$ m.",
    },
    {
      difficulty: "low",
      stem: "What is the period of an alternating current with a frequency of 50 Hz?",
      options: ["0.02 s", "0.5 s", "2 s", "50 s"],
      answer: 0,
      explanation: "$T = 1 / 50 = 0.02$ s $= 20$ ms.",
    },
    {
      difficulty: "medium",
      stem: "What is the wavelength of an FM radio station broadcasting at 100 MHz?",
      options: ["0.3 m", "3 m", "30 m", "300 m"],
      answer: 1,
      explanation: "$\\lambda = 3 \\cdot 10^8 / (100 \\cdot 10^6) = 3$ m.",
    },
    {
      difficulty: "medium",
      stem: "What is the wavelength in air of the highest frequency humans can hear (20 kHz)?",
      options: ["1.7 mm", "1.7 cm", "17 cm", "17 m"],
      answer: 1,
      explanation: "$340 / 20{,}000 = 0.017$ m $= 1.7$ cm. 17 m is the wavelength of the lowest audible frequency (20 Hz).",
    },
    {
      difficulty: "medium",
      stem: "Thunder is heard 3 seconds after the lightning is seen. About how far away is the storm?",
      options: ["about 100 m", "about 340 m", "about 1 km", "about 3 km"],
      answer: 2,
      explanation: "Light arrives almost instantly; sound needs 3 s: $340 \\cdot 3 = 1{,}020$ m, about 1 km. No division by 2, because the sound travels only one way.",
    },
    {
      difficulty: "high",
      stem: "A ship's sonar sends a sound pulse down into the sea. The echo from the sea floor returns after 0.4 s. How deep is the sea there?",
      options: ["68 m", "300 m", "600 m", "3,750 m"],
      answer: 1,
      explanation: "In water: $d = 1{,}500 \\cdot 0.4 / 2 = 300$ m. 600 m forgets that the pulse travels down and back; 68 m uses the speed in air.",
    },
    {
      difficulty: "high",
      stem: "A sound wave passes from air into water. What happens?",
      options: [
        "Frequency and wavelength stay the same; the speed increases.",
        "The frequency increases; the wavelength stays the same.",
        "The frequency stays the same; speed and wavelength increase.",
        "The speed stays the same; the wavelength decreases.",
      ],
      answer: 2,
      explanation: "The frequency is fixed by the source. The speed rises from 340 to 1,500 m/s, so by formula (1) the wavelength increases by the same factor (about 4.4).",
    },
  ],
};

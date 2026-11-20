import type { SubjectText } from "../types";

export const CAPTURE_RECAPTURE: SubjectText = {
  passage: {
    id: "g-capture-recapture",
    title: "Counting Animals That Cannot Be Counted",
    field: "Wildlife Biology",
    blocks: [
      {
        k: "p",
        text: "It is rarely possible to count all fish in a lake or all beetles in a forest. Biologists therefore estimate population sizes with the **capture–recapture method**. First, a number $M$ of animals is caught, marked harmlessly and released. After the marked animals have mixed with the others, a second sample of $C$ animals is caught, of which $R$ carry a mark.",
      },
      {
        k: "p",
        text: "The idea: the share of marked animals in the second sample should equal the share of marked animals in the whole population, $R / C = M / N$. This gives the **Lincoln–Petersen estimate** of the population size $N$:",
      },
      { k: "formula", tex: "N \\approx \\frac{M \\cdot C}{R}", label: "(1)" },
      {
        k: "p",
        text: "The estimate is only reliable if several assumptions hold:",
      },
      {
        k: "list",
        items: [
          "The population is **closed** between the two catches: no births, deaths, immigration or emigration.",
          "Marks are not lost and do not harm the animals.",
          "The marked animals mix completely with the unmarked ones.",
          "Marked and unmarked animals are equally likely to be caught.",
        ],
      },
      {
        k: "p",
        text: "**Example.** In a pond, 60 fish are caught, marked and released. A week later, 50 fish are caught; 10 of them are marked.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the estimated number of fish in the pond?",
      options: ["120", "300", "500", "3,000"],
      answer: 1,
      explanation: "Formula (1): $N \\approx \\frac{60 \\cdot 50}{10} = 300$.",
    },
    {
      difficulty: "low",
      stem: "What share of the second catch carried a mark?",
      options: ["10 %", "16.7 %", "20 %", "83.3 %"],
      answer: 2,
      explanation: "$10 / 50 = 20$ %. The method assumes that 20 % of the whole population is marked, so $60 / N = 0.2$ and $N = 300$.",
    },
    {
      difficulty: "low",
      stem: "What does the assumption of a \"closed\" population mean?",
      options: [
        "The pond has no inflow or outflow of water.",
        "No animals are born, die, arrive or leave between the two catches.",
        "Only marked animals may be caught the second time.",
        "The pond is fenced so that no people can fish there.",
      ],
      answer: 1,
      explanation: "The population must stay the same between the catches; otherwise the share of marked animals changes.",
    },
    {
      difficulty: "medium",
      stem: "Instead of 50, the second catch contains 80 fish, of which 16 are marked. What is the estimate now?",
      options: ["240", "300", "375", "480"],
      answer: 1,
      explanation: "$\\frac{60 \\cdot 80}{16} = 300$: the same estimate, because the share of marked fish (20 %) is the same.",
    },
    {
      difficulty: "medium",
      stem: "If the pond really contained 600 fish, how many marked fish would be expected in a second catch of 50?",
      options: ["5", "10", "12", "20"],
      answer: 0,
      explanation: "Share of marked fish: $60 / 600 = 10$ %; 10 % of 50 $= 5$.",
    },
    {
      difficulty: "high",
      stem: "Some marks fall off between the two catches. How does this affect the estimate?",
      options: [
        "The population is underestimated.",
        "The population is overestimated.",
        "The estimate is not affected.",
        "The estimate becomes zero.",
      ],
      answer: 1,
      explanation: "Fewer marked fish are recognised, so $R$ is too small. Because $R$ is in the denominator of formula (1), the estimate becomes too large.",
    },
    {
      difficulty: "high",
      stem: "Marked fish learn that the trap contains food and are caught more easily the second time. How does this affect the estimate?",
      options: [
        "The population is underestimated.",
        "The population is overestimated.",
        "The estimate is not affected.",
        "Only the number of marked fish changes, not the estimate.",
      ],
      answer: 0,
      explanation: "Too many marked fish are caught, so $R$ is too large and the estimate $M \\cdot C / R$ too small.",
    },
  ],
};

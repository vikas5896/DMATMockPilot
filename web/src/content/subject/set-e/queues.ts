import type { SubjectText } from "../types";

export const QUEUES: SubjectText = {
  passage: {
    id: "e-queues",
    title: "Waiting Lines and Little's Law",
    field: "Operations Research",
    blocks: [
      {
        k: "p",
        text: "Queues form wherever people or jobs arrive for a service: at counters, in hospitals, in call centres or in computer networks. A simple but very general rule links three averages of any such system that runs in a stable way (**Little's law**):",
      },
      { k: "formula", tex: "L = \\lambda \\cdot W", label: "(1)" },
      {
        k: "p",
        text: "Here $L$ is the average number of people in the system (waiting or being served), $\\lambda$ is the arrival rate (people per unit of time), and $W$ is the average time a person spends in the system. The law holds no matter in which order people are served.",
      },
      {
        k: "p",
        text: "Whether a queue stays stable depends on the **utilisation** $\\rho$: the arrival rate divided by the total service capacity (the number of people all counters together can serve per unit of time). If $\\rho$ is below 1 (100 %), the queue stays finite on average, although waiting times grow sharply as $\\rho$ approaches 1. If $\\rho$ is 1 or more, more people arrive than can be served, and the queue keeps growing.",
      },
      {
        k: "p",
        text: "**Example.** At the start of the semester, students arrive at a university's enrolment office at an average rate of **30 per hour**. Each counter can serve **12 students per hour**, and **3 counters** are open.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many students can the three counters serve per hour in total?",
      options: ["12", "30", "36", "42"],
      answer: 2,
      explanation: "$3 \\cdot 12 = 36$ students per hour.",
    },
    {
      difficulty: "low",
      stem: "What is the smallest number of open counters for which the queue does not keep growing?",
      options: ["2", "3", "4", "30"],
      answer: 1,
      explanation: "Two counters serve only 24 students per hour, fewer than the 30 who arrive. Three counters (36 per hour) are enough.",
    },
    {
      difficulty: "low",
      stem: "In a stable system, the average time in the system doubles while the arrival rate stays the same. What happens to the average number of people in the system?",
      options: ["It halves.", "It stays the same.", "It doubles.", "It becomes four times as large."],
      answer: 2,
      explanation: "Little's law: $L = \\lambda \\cdot W$. With $\\lambda$ unchanged, doubling $W$ doubles $L$.",
    },
    {
      difficulty: "medium",
      stem: "What is the utilisation of the office with three counters?",
      options: ["about 40 %", "about 83 %", "100 %", "120 %"],
      answer: 1,
      explanation: "$\\rho = 30 / 36 \\approx 0.83 = 83$ %. 120 % would be $36/30$, the wrong way round.",
    },
    {
      difficulty: "medium",
      stem: "On average, students spend 20 minutes in the office. On average, how many students are in the office at the same time?",
      options: ["6", "10", "20", "600"],
      answer: 1,
      explanation: "$W = 20$ min $= 1/3$ h. Formula (1): $L = 30 \\cdot \\frac{1}{3} = 10$ students. 600 forgets to convert minutes into hours.",
    },
    {
      difficulty: "medium",
      stem: "On another day, 15 students are in the office on average, with the same arrival rate. How long does a student stay in the office on average?",
      options: ["2 minutes", "15 minutes", "30 minutes", "2 hours"],
      answer: 2,
      explanation: "$W = L / \\lambda = 15 / 30 = 0.5$ h $= 30$ minutes.",
    },
    {
      difficulty: "high",
      stem: "A café on campus has on average 120 customers arriving per hour, and each stays 45 minutes. How many customers are in the café on average?",
      options: ["45", "90", "120", "160"],
      answer: 1,
      explanation: "$L = 120 \\cdot 0.75 = 90$ customers.",
    },
    {
      difficulty: "high",
      stem: "On the last day of enrolment, 40 students arrive per hour, and still only 3 counters are open. What happens?",
      options: [
        "The queue stays as long as on a normal day.",
        "The queue becomes somewhat longer but stays stable.",
        "The queue keeps growing for as long as the rate continues.",
        "Students spend less time in the office.",
      ],
      answer: 2,
      explanation: "Utilisation $= 40 / 36 > 1$: more students arrive than can be served, so the queue keeps growing. Little's law does not apply to such an unstable system.",
    },
  ],
};

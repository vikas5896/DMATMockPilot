import type { SubjectText } from "../types";

export const CRITICAL_PATH: SubjectText = {
  passage: {
    id: "d-critical-path",
    title: "Project Planning with the Critical Path",
    field: "Project Management",
    blocks: [
      {
        k: "p",
        text: "A project consists of **activities** that take a certain time. Some activities can only start when others are finished (their **predecessors**); others can run in parallel. To find out how long the whole project takes, planners calculate for every activity its **earliest start**: the time when all its predecessors are finished at the earliest. An activity with several predecessors can only start when the last of them is finished.",
      },
      {
        k: "p",
        text: "The longest chain of dependent activities from the start to the end of the project is the **critical path**. Its length is the shortest possible project duration. Any delay of an activity on the critical path delays the whole project.",
      },
      {
        k: "p",
        text: "Activities that are not on the critical path have a **float**: the time by which they can be delayed without delaying the project. It equals the latest possible start minus the earliest possible start. A delay smaller than or equal to the float does not change the project duration.",
      },
      {
        k: "p",
        text: "**Example.** A small team builds a website. The project starts on day 0; durations are in working days.",
      },
      {
        k: "table",
        caption: "Table 1. Activities of the website project.",
        head: ["Activity", "Description", "Duration (days)", "Predecessors"],
        rows: [
          ["A", "Collect requirements", "3", "–"],
          ["B", "Design the layout", "5", "A"],
          ["C", "Write the content", "4", "A"],
          ["D", "Programming", "8", "B"],
          ["E", "Testing", "2", "C, D"],
          ["F", "Prepare the launch", "1", "E"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which activities can start as soon as activity A is finished?",
      options: ["Only B", "B and C", "B, C and D", "All other activities"],
      answer: 1,
      explanation: "Table 1: B and C have A as their only predecessor. D needs B; E needs C and D.",
    },
    {
      difficulty: "low",
      stem: "Which activity should the project manager watch most closely to avoid a delay of the launch?",
      options: ["Writing the content (C)", "Programming (D)", "Neither, both have a float", "Both equally, both have a float of 9 days"],
      answer: 1,
      explanation: "D lies on the critical path, so every day of delay in D delays the project. C has a float.",
    },
    {
      difficulty: "low",
      stem: "What is the shortest possible duration of the whole project?",
      options: ["10 days", "19 days", "23 days", "26 days"],
      answer: 1,
      explanation: "Path A–B–D–E–F: $3 + 5 + 8 + 2 + 1 = 19$ days. Path A–C–E–F takes only 10 days. 23 days adds all durations, although B and C run in parallel.",
    },
    {
      difficulty: "medium",
      stem: "Which is the critical path?",
      options: ["A–C–E–F", "A–B–D–E–F", "A–B–C–D–E–F", "B–D–E"],
      answer: 1,
      explanation: "The longest chain from start to end is A–B–D–E–F with 19 days.",
    },
    {
      difficulty: "medium",
      stem: "On which day can programming (D) start at the earliest?",
      options: ["Day 3", "Day 5", "Day 8", "Day 11"],
      answer: 2,
      explanation: "D needs B, which needs A: $3 + 5 = 8$, so D starts on day 8 at the earliest.",
    },
    {
      difficulty: "medium",
      stem: "Programming (D) takes 3 days longer than planned. How long does the project now take?",
      options: ["19 days", "21 days", "22 days", "25 days"],
      answer: 2,
      explanation: "D is on the critical path, so the project is delayed by the full 3 days: $19 + 3 = 22$ days.",
    },
    {
      difficulty: "high",
      stem: "What is the float of activity C (writing the content)?",
      options: ["0 days", "4 days", "9 days", "12 days"],
      answer: 2,
      explanation: "E can only start on day $3 + 5 + 8 = 16$. C must therefore finish by day 16 and start by day $16 - 4 = 12$ at the latest. Earliest start: day 3. Float: $12 - 3 = 9$ days.",
    },
    {
      difficulty: "high",
      stem: "Writing the content (C) takes 10 days instead of 4. How long does the project take now?",
      options: ["19 days", "20 days", "25 days", "29 days"],
      answer: 0,
      explanation: "The delay of 6 days is smaller than C's float of 9 days: C finishes on day $3 + 10 = 13$, before D finishes on day 16. The project still takes 19 days.",
    },
  ],
};

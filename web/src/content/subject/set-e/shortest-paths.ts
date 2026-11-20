import type { SubjectText } from "../types";

export const SHORTEST_PATHS: SubjectText = {
  passage: {
    id: "e-shortest-paths",
    title: "Finding Shortest Routes in a Network",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "Navigation apps model road networks as **graphs**: towns are **nodes**, and roads between them are **edges** with a length. A route is a sequence of edges; its length is the sum of the edge lengths. The shortest route is not always the one with the fewest roads.",
      },
      {
        k: "p",
        text: "A classic method to find the shortest routes from a start node to all other nodes is **Dijkstra's algorithm**:",
      },
      {
        k: "list",
        items: [
          "Give the start node the distance 0 and all other nodes the distance \"infinite\".",
          "Repeatedly choose the not yet finished node with the smallest distance and mark it as **finished**: its distance is now final.",
          "For each neighbour of this node, check whether the route through it is shorter than the distance known so far; if so, update the neighbour's distance.",
        ],
      },
      {
        k: "p",
        text: "Nodes are therefore finished in the order of their distance from the start. The method works because all road lengths are positive.",
      },
      {
        k: "table",
        caption: "Table 1. Roads between six towns A–F (all roads can be used in both directions).",
        head: ["Road", "Length (km)"],
        rows: [
          ["A – B", "4"],
          ["A – C", "2"],
          ["B – C", "1"],
          ["B – D", "5"],
          ["C – D", "8"],
          ["C – E", "10"],
          ["D – E", "2"],
          ["D – F", "6"],
          ["E – F", "3"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many roads in Table 1 start or end in town D?",
      options: ["2", "3", "4", "5"],
      answer: 2,
      explanation: "B – D, C – D, D – E and D – F: 4 roads.",
    },
    {
      difficulty: "low",
      stem: "Starting from A, which town does Dijkstra's algorithm mark as finished first after A itself?",
      options: ["B", "C", "D", "E"],
      answer: 1,
      explanation: "Neighbours of A: B (4 km) and C (2 km). The node with the smallest distance, C, is finished next.",
    },
    {
      difficulty: "medium",
      stem: "What is the length of the shortest route from A to B?",
      options: ["3 km", "4 km", "5 km", "6 km"],
      answer: 0,
      explanation: "The direct road is 4 km, but A – C – B is only $2 + 1 = 3$ km.",
    },
    {
      difficulty: "medium",
      stem: "What is the length of the shortest route from A to D?",
      options: ["8 km", "9 km", "10 km", "12 km"],
      answer: 0,
      explanation: "A – C – B – D: $2 + 1 + 5 = 8$ km. A – C – D gives 10 km, A – B – D gives 9 km.",
    },
    {
      difficulty: "medium",
      stem: "Road D – F is closed. Does the length of the shortest route from A to F change?",
      options: [
        "No, it stays 13 km.",
        "Yes, it rises from 13 km to 14 km.",
        "Yes, it rises from 14 km to 15 km.",
        "F can no longer be reached.",
      ],
      answer: 0,
      explanation: "The shortest route A – C – B – D – E – F ($2+1+5+2+3 = 13$ km) does not use D – F, so nothing changes.",
    },
    {
      difficulty: "high",
      stem: "What is the length of the shortest route from A to F?",
      options: ["13 km", "14 km", "15 km", "17 km"],
      answer: 0,
      explanation: "Shortest distances: D = 8, E = $8 + 2 = 10$ (better than C – E with 12), F = $10 + 3 = 13$ (better than D – F with 14).",
    },
    {
      difficulty: "high",
      stem: "Road B – D is closed (all other roads are open). What is now the length of the shortest route from A to F?",
      options: ["13 km", "14 km", "15 km", "16 km"],
      answer: 2,
      explanation: "D can now be reached only via C – D: $2 + 8 = 10$. E: $\\min(2 + 10,\\ 10 + 2) = 12$. F: $\\min(10 + 6,\\ 12 + 3) = 15$ km.",
    },
  ],
};

import type { SubjectText } from "../types";

export const BUOYANCY: SubjectText = {
  passage: {
    id: "f-buoyancy",
    title: "Density and Buoyancy",
    field: "Materials Science",
    blocks: [
      {
        k: "p",
        text: "The **density** of a material is its mass per volume: $\\rho = m / V$. It is given in kg/m³ or g/cm³ (1 g/cm³ = 1,000 kg/m³).",
      },
      {
        k: "p",
        text: "A body immersed in a liquid experiences an upward **buoyant force**. According to **Archimedes' principle**, it equals the weight of the liquid that the body displaces:",
      },
      { k: "formula", tex: "F_B = \\rho_{\\text{liquid}} \\cdot V_{\\text{displaced}} \\cdot g", label: "(1)" },
      {
        k: "p",
        text: "Use $g = 10$ m/s². A body floats if its average density is smaller than that of the liquid. It then sinks only until the displaced liquid weighs as much as the body itself. The fraction of its volume below the surface is:",
      },
      { k: "formula", tex: "\\frac{V_{\\text{below}}}{V} = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{liquid}}}", label: "(2)" },
      {
        k: "p",
        text: "This is why a steel ship can float: its hull encloses a lot of air, so the average density of the whole ship is lower than that of water.",
      },
      {
        k: "table",
        caption: "Table 1. Densities (kg/m³).",
        head: ["Material", "Density"],
        rows: [
          ["Fresh water", "1,000"],
          ["Seawater", "1,025"],
          ["Ice", "920"],
          ["Pine wood", "600"],
          ["Steel", "7,800"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "A block has a mass of 500 g and a volume of 1,000 cm³. What is its density?",
      options: ["0.5 g/cm³", "2 g/cm³", "500 g/cm³", "500,000 g/cm³"],
      answer: 0,
      explanation: "$\\rho = 500 / 1{,}000 = 0.5$ g/cm³.",
    },
    {
      difficulty: "low",
      stem: "Which solid material in Table 1 floats in fresh water as a solid block?",
      options: ["Only pine wood", "Pine wood and ice", "Only steel", "None of them"],
      answer: 1,
      explanation: "Pine wood (600) and ice (920) are less dense than water (1,000); steel (7,800) sinks.",
    },
    {
      difficulty: "medium",
      stem: "What fraction of an iceberg's volume is below the surface in fresh water?",
      options: ["8 %", "50 %", "92 %", "100 %"],
      answer: 2,
      explanation: "Formula (2): $920 / 1{,}000 = 0.92 = 92$ %.",
    },
    {
      difficulty: "medium",
      stem: "A stone with a volume of 2 L is fully submerged in fresh water. What is the buoyant force on it?",
      options: ["2 N", "20 N", "200 N", "2,000 N"],
      answer: 1,
      explanation: "$2$ L $= 0.002$ m³. Formula (1): $1{,}000 \\cdot 0.002 \\cdot 10 = 20$ N.",
    },
    {
      difficulty: "medium",
      stem: "A loaded boat sails from a river into the sea. What happens?",
      options: [
        "It sinks deeper, because seawater is denser.",
        "It floats a little higher, because seawater is denser.",
        "Nothing changes.",
        "It sinks, because salt water carries less.",
      ],
      answer: 1,
      explanation: "In denser water, a smaller volume must be displaced to carry the same weight, so the boat rises slightly.",
    },
    {
      difficulty: "high",
      stem: "A steel boat has a mass of 3,000 kg. What volume of fresh water must it displace to float?",
      options: ["about 0.38 m³", "3 m³", "7.8 m³", "3,000 m³"],
      answer: 1,
      explanation: "The displaced water must weigh as much as the boat: $3{,}000$ kg of water $= 3$ m³. 0.38 m³ is the volume of the steel itself, which would sink.",
    },
    {
      difficulty: "high",
      stem: "A pine block with a volume of 0.01 m³ floats in fresh water. What extra mass must be placed on it to push it completely under water?",
      options: ["0.6 kg", "4 kg", "6 kg", "10 kg"],
      answer: 1,
      explanation: "Block mass: $600 \\cdot 0.01 = 6$ kg. Fully submerged it displaces $0.01$ m³ of water $= 10$ kg. Extra mass: $10 - 6 = 4$ kg.",
    },
  ],
};

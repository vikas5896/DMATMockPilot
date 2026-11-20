import type { SubjectText } from "../types";

export const ISOTOPES: SubjectText = {
  passage: {
    id: "i-isotopes",
    title: "Isotopes and Average Atomic Mass",
    field: "Chemistry",
    blocks: [
      {
        k: "p",
        text: "The atoms of an element all have the same number of protons in their nucleus; this number defines the element. The number of neutrons, however, can differ. Atoms of the same element with different numbers of neutrons are called **isotopes**. Their **mass number** is the number of protons plus neutrons; chlorine-37 (written Cl-37), for example, has a mass number of 37.",
      },
      {
        k: "p",
        text: "Isotopes behave almost identically in chemical reactions, but they differ in mass. In nature, most elements occur as a mixture of isotopes in fixed proportions (their **natural abundances**). The atomic mass listed in the periodic table is therefore a **weighted average** of the isotope masses:",
      },
      { k: "formula", tex: "\\bar{m} = \\sum_i a_i \\cdot m_i", label: "(1)" },
      {
        k: "p",
        text: "where $a_i$ is the abundance (as a fraction) and $m_i$ the mass of isotope $i$. In this text, the mass of each isotope is taken to be equal to its mass number.",
      },
      {
        k: "table",
        caption: "Table 1. Natural isotopes of two elements.",
        head: ["Element (protons)", "Isotope", "Abundance"],
        rows: [
          ["Chlorine (17)", "Cl-35", "75 %"],
          ["Chlorine (17)", "Cl-37", "25 %"],
          ["Boron (5)", "B-10", "20 %"],
          ["Boron (5)", "B-11", "80 %"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many neutrons does an atom of Cl-37 have?",
      options: ["17", "20", "37", "54"],
      answer: 1,
      explanation: "Neutrons = mass number − protons $= 37 - 17 = 20$.",
    },
    {
      difficulty: "low",
      stem: "In what do two isotopes of the same element differ?",
      options: [
        "In the number of protons",
        "In the number of neutrons",
        "In their chemical behaviour",
        "In the element they belong to",
      ],
      answer: 1,
      explanation: "Isotopes have the same number of protons but different numbers of neutrons, and they behave almost identically chemically.",
    },
    {
      difficulty: "medium",
      stem: "What is the average atomic mass of chlorine?",
      options: ["35.0", "35.5", "36.0", "36.5"],
      answer: 1,
      explanation: "Formula (1): $0.75 \\cdot 35 + 0.25 \\cdot 37 = 26.25 + 9.25 = 35.5$. 36.0 would be the unweighted mean.",
    },
    {
      difficulty: "medium",
      stem: "What is the average atomic mass of boron?",
      options: ["10.2", "10.5", "10.8", "11.0"],
      answer: 2,
      explanation: "$0.2 \\cdot 10 + 0.8 \\cdot 11 = 2 + 8.8 = 10.8$.",
    },
    {
      difficulty: "medium",
      stem: "How many Cl-37 atoms are expected among 1,000 chlorine atoms?",
      options: ["37", "250", "370", "750"],
      answer: 1,
      explanation: "25 % of 1,000 $= 250$.",
    },
    {
      difficulty: "high",
      stem: "An element consists of two isotopes with mass numbers 50 and 52. Its average atomic mass is 50.5. What is the abundance of the heavier isotope?",
      options: ["5 %", "25 %", "50 %", "75 %"],
      answer: 1,
      explanation: "$50 \\cdot (1 - a) + 52 \\cdot a = 50.5$ gives $50 + 2a = 50.5$, so $a = 0.25 = 25$ %.",
    },
    {
      difficulty: "high",
      stem: "A chlorine molecule (Cl₂) consists of two chlorine atoms chosen at random from the natural mixture. What share of the molecules have a mass of 72 (one Cl-35 and one Cl-37)?",
      options: ["6.25 %", "18.75 %", "25 %", "37.5 %"],
      answer: 3,
      explanation: "Two orders are possible (35–37 and 37–35): $2 \\cdot 0.75 \\cdot 0.25 = 0.375 = 37.5$ %. 18.75 % forgets the second order.",
    },
  ],
};

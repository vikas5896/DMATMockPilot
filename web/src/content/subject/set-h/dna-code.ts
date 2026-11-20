import type { SubjectText } from "../types";

export const DNA_CODE: SubjectText = {
  passage: {
    id: "h-dna-code",
    title: "DNA Base Pairs and the Genetic Code",
    field: "Molecular Biology",
    blocks: [
      {
        k: "p",
        text: "DNA consists of two strands wound around each other. Each strand is a chain of four building blocks, the **bases** adenine (A), thymine (T), guanine (G) and cytosine (C). The two strands are held together by pairs of bases, and only two pairings occur: **A with T** and **G with C**. If one strand reads A T G C, the opposite (complementary) strand reads T A C G.",
      },
      {
        k: "p",
        text: "Because of this pairing, double-stranded DNA always contains as much A as T and as much G as C (**Chargaff's rule**). Each base pair contains exactly one A or T on one strand with its partner on the other strand.",
      },
      {
        k: "p",
        text: "Genes contain the instructions for building proteins, which are chains of **20 different amino acids**. The code is read in groups of three bases, the **codons**; each codon stands for one amino acid or for \"stop\". With four bases, there are $4^3 = 64$ possible codons, far more than needed. Most amino acids are therefore coded by several codons, so some changes of a single base (**point mutations**) do not change the protein at all.",
      },
      {
        k: "p",
        text: "In the questions, a gene consists only of the codons for its amino acids plus one stop codon.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "One DNA strand reads A T G C. What is the complementary strand?",
      options: ["A T G C", "T A C G", "G C A T", "C G T A"],
      answer: 1,
      explanation: "A pairs with T, T with A, G with C and C with G: T A C G.",
    },
    {
      difficulty: "low",
      stem: "How many different codons are possible?",
      options: ["12", "20", "64", "81"],
      answer: 2,
      explanation: "Three positions with four bases each: $4^3 = 64$.",
    },
    {
      difficulty: "medium",
      stem: "30 % of the bases in a double-stranded DNA molecule are adenine. What percentage is guanine?",
      options: ["20 %", "30 %", "40 %", "70 %"],
      answer: 0,
      explanation: "A = T = 30 %, together 60 %. The remaining 40 % are G and C in equal parts: 20 % each.",
    },
    {
      difficulty: "medium",
      stem: "How many bases does a gene for a protein of 300 amino acids contain?",
      options: ["300", "303", "900", "903"],
      answer: 3,
      explanation: "$300 \\cdot 3 = 900$ bases for the amino acids plus 3 for the stop codon: 903.",
    },
    {
      difficulty: "medium",
      stem: "Why could a code that reads the bases in pairs (two bases per codon) not work?",
      options: [
        "Because pairs of bases are unstable.",
        "Because it would give only 16 codons, fewer than the 20 amino acids.",
        "Because DNA always contains an odd number of bases.",
        "Because A and T would always be read together.",
      ],
      answer: 1,
      explanation: "$4^2 = 16 < 20$: not every amino acid could have its own codon.",
    },
    {
      difficulty: "high",
      stem: "A double-stranded DNA molecule consists of 1,000 base pairs; 600 of them are G–C pairs. How many adenine bases does the molecule contain in total?",
      options: ["200", "400", "600", "800"],
      answer: 1,
      explanation: "There are $1{,}000 - 600 = 400$ A–T pairs, and each contains exactly one adenine: 400.",
    },
    {
      difficulty: "high",
      stem: "A point mutation changes one base in a codon. The protein is afterwards exactly the same as before. How is this possible?",
      options: [
        "Mutations never affect proteins.",
        "The new codon codes for the same amino acid, because most amino acids have several codons.",
        "The cell repairs the protein instead of the DNA.",
        "Point mutations only change the stop codon.",
      ],
      answer: 1,
      explanation: "With 64 codons for 20 amino acids plus stop, many amino acids have several codons. A change between two such codons leaves the protein unchanged.",
    },
  ],
};

import type { SubjectText } from "../types";

export const INHERITANCE: SubjectText = {
  passage: {
    id: "c-inheritance",
    title: "Inheritance of a Single Trait",
    field: "Genetics",
    blocks: [
      {
        k: "p",
        text: "Many traits of plants and animals are determined by **genes**. A gene can occur in different versions, called **alleles**. Organisms such as pea plants carry two alleles of each gene, one from each parent. The combination of alleles is the **genotype**; the visible trait is the **phenotype**.",
      },
      {
        k: "p",
        text: "In pea plants, the allele **A** for purple flowers is **dominant** over the allele **a** for white flowers, which is **recessive**. Plants with the genotypes AA and Aa therefore have purple flowers; only aa plants have white flowers. A plant with genotype Aa is called a **carrier** of the white allele.",
      },
      {
        k: "p",
        text: "When a plant forms reproductive cells, each cell receives only one of the two alleles, each with a probability of 1/2. The genotypes of the offspring can be predicted by combining all possible cells of the two parents in a grid (**Punnett square**). For independent events, probabilities are multiplied.",
      },
      {
        k: "table",
        caption: "Table 1. Punnett square for the cross Aa × Aa. Each of the four cells has a probability of 1/4.",
        head: ["", "A (from parent 2)", "a (from parent 2)"],
        rows: [
          ["A (from parent 1)", "AA", "Aa"],
          ["a (from parent 1)", "Aa", "aa"],
        ],
      },
      {
        k: "p",
        text: "To find out whether a purple plant is AA or Aa, breeders perform a **test cross** with a white (aa) plant. If any white offspring appear, the purple parent must carry the allele a.",
      },
      {
        k: "p",
        text: "Genes for different traits are often inherited **independently** of each other. In peas, for example, the allele R for round seeds is dominant over r for wrinkled seeds, and this gene is inherited independently of the flower-colour gene.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Two plants with genotype Aa are crossed. What is the probability that an offspring plant has white flowers?",
      options: ["0", "1/4", "1/2", "3/4"],
      answer: 1,
      explanation: "Only the genotype aa gives white flowers. In Table 1, one of four equally likely cells is aa: probability 1/4.",
    },
    {
      difficulty: "low",
      stem: "A plant with genotype AA is crossed with a plant with genotype aa. What do the offspring look like?",
      options: ["All purple", "All white", "3 purple : 1 white", "1 purple : 1 white"],
      answer: 0,
      explanation: "Every offspring receives A from one parent and a from the other: all are Aa and, because A is dominant, purple.",
    },
    {
      difficulty: "medium",
      stem: "From the cross Aa × Aa, 400 seeds grow into plants. About how many of them are expected to have purple flowers?",
      options: ["100", "200", "300", "400"],
      answer: 2,
      explanation: "AA and Aa (3 of 4 cells) are purple: $\\frac{3}{4} \\cdot 400 = 300$.",
    },
    {
      difficulty: "medium",
      stem: "A purple plant of unknown genotype is crossed with a white plant. The offspring are 50 purple and 48 white plants. What is the genotype of the purple parent?",
      options: ["AA", "Aa", "aa", "It cannot be determined."],
      answer: 1,
      explanation: "White offspring (aa) need an a from each parent, so the purple parent must carry a: Aa. The ratio of about 1 : 1 matches Aa × aa.",
    },
    {
      difficulty: "medium",
      stem: "Two people are both carriers of a recessive hereditary disease. Their first child has the disease. What is the probability that their second child also has it?",
      options: ["0", "1/16", "1/4", "1/2"],
      answer: 2,
      explanation: "Each child receives alleles independently of its siblings. For two carriers (Aa × Aa) the probability is 1/4 for every child, whatever happened before.",
    },
    {
      difficulty: "high",
      stem: "Among the purple-flowered offspring of the cross Aa × Aa, which fraction is expected to be carriers (Aa)?",
      options: ["1/4", "1/2", "2/3", "3/4"],
      answer: 2,
      explanation: "Purple offspring are AA (1 cell) or Aa (2 cells). Among these 3 cells, 2 are Aa: 2/3. The answer 1/2 refers to all offspring, not only the purple ones.",
    },
    {
      difficulty: "high",
      stem: "Two plants with the genotype AaRr are crossed. What is the probability that an offspring plant has white flowers and wrinkled seeds?",
      options: ["1/16", "1/8", "1/4", "9/16"],
      answer: 0,
      explanation: "White flowers (aa): 1/4. Wrinkled seeds (rr): 1/4. The genes are inherited independently, so the probabilities are multiplied: $\\frac{1}{4} \\cdot \\frac{1}{4} = \\frac{1}{16}$.",
    },
  ],
};

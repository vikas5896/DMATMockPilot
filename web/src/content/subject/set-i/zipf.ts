import type { SubjectText } from "../types";

export const ZIPF: SubjectText = {
  passage: {
    id: "i-zipf",
    title: "Word Frequencies and Zipf's Law",
    field: "Linguistics",
    blocks: [
      {
        k: "p",
        text: "In every language, a few words are used extremely often, while most words are rare. If all words of a large collection of texts (a **corpus**) are sorted by how often they occur, each word receives a **rank**: rank 1 for the most frequent word, rank 2 for the second most frequent, and so on.",
      },
      {
        k: "p",
        text: "The linguist George Kingsley Zipf observed that the frequency of a word is roughly inversely proportional to its rank: the second word occurs about half as often as the first, the third about a third as often, and so on (**Zipf's law**):",
      },
      { k: "formula", tex: "f(r) \\approx \\frac{f(1)}{r} \\qquad\\Leftrightarrow\\qquad r \\cdot f(r) \\approx \\text{constant}", label: "(1)" },
      {
        k: "p",
        text: "If rank and frequency are plotted with logarithmic scales on both axes, the data points of real corpora lie close to a **straight line** with a slope of about −1. Zipf's law is only an approximation; it fits best for the middle ranks. Language learners can use it: a relatively small number of the most frequent words covers a large share of any text.",
      },
      {
        k: "p",
        text: "**Example.** In an English corpus of **1,000,000 words**, the most frequent word (\"the\") occurs **60,000 times**.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "According to Zipf's law, how often does the word with rank 2 occur in the corpus?",
      options: ["20,000 times", "30,000 times", "58,000 times", "120,000 times"],
      answer: 1,
      explanation: "Formula (1): $60{,}000 / 2 = 30{,}000$.",
    },
    {
      difficulty: "low",
      stem: "According to Zipf's law, how often does the word with rank 10 occur?",
      options: ["600 times", "6,000 times", "10,000 times", "50,000 times"],
      answer: 1,
      explanation: "$60{,}000 / 10 = 6{,}000$.",
    },
    {
      difficulty: "medium",
      stem: "A word occurs 1,200 times in the corpus. Which rank does Zipf's law predict for it?",
      options: ["5", "20", "50", "500"],
      answer: 2,
      explanation: "$r \\approx f(1) / f(r) = 60{,}000 / 1{,}200 = 50$.",
    },
    {
      difficulty: "medium",
      stem: "According to Zipf's law, what share of all words in the corpus do the three most frequent words make up together?",
      options: ["6 %", "11 %", "18 %", "33 %"],
      answer: 1,
      explanation: "$60{,}000 + 30{,}000 + 20{,}000 = 110{,}000$ of 1,000,000 words: 11 %.",
    },
    {
      difficulty: "medium",
      stem: "How many times as often as the word with rank 20 does the word with rank 5 occur?",
      options: ["2 times", "4 times", "15 times", "100 times"],
      answer: 1,
      explanation: "$f(5) / f(20) = (1/5) / (1/20) = 20 / 5 = 4$.",
    },
    {
      difficulty: "high",
      stem: "A novel has 250,000 words and follows the same distribution as the corpus. About how often does the word with rank 1,000 occur in it?",
      options: ["about 6 times", "about 15 times", "about 60 times", "about 250 times"],
      answer: 1,
      explanation: "In the corpus: $60{,}000 / 1{,}000 = 60$ times per million words. The novel has a quarter of a million words: $60 / 4 = 15$ times.",
    },
    {
      difficulty: "high",
      stem: "How do data that follow Zipf's law appear when rank and frequency are plotted on logarithmic scales on both axes?",
      options: [
        "As a straight line rising with slope 1",
        "As a straight line falling with slope about −1",
        "As a horizontal line",
        "As a parabola",
      ],
      answer: 1,
      explanation: "The text states this. From $f = f(1)/r$: $\\log f = \\log f(1) - \\log r$, a straight line with slope −1 on logarithmic axes.",
    },
  ],
};

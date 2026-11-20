import type { SubjectText } from "../types";

export const LENSES: SubjectText = {
  passage: {
    id: "d-lenses",
    title: "Images Formed by Converging Lenses",
    field: "Physics",
    blocks: [
      {
        k: "p",
        text: "A **converging lens** bends parallel light rays so that they meet in the focal point. The distance between the lens and this point is the **focal length** $f$. If an object stands at a distance $g$ in front of the lens, its image forms at a distance $b$ behind the lens, given by the **lens equation**:",
      },
      { k: "formula", tex: "\\frac{1}{f} = \\frac{1}{g} + \\frac{1}{b}", label: "(1)" },
      {
        k: "p",
        text: "The **magnification** compares the size of the image $B$ with the size of the object $G$:",
      },
      { k: "formula", tex: "m = \\frac{B}{G} = \\frac{b}{g}", label: "(2)" },
      {
        k: "list",
        items: [
          "If the object is farther away than $f$, a **real**, upside-down image forms that can be caught on a screen. At $g = 2f$, the image is exactly as large as the object.",
          "If the object is closer to the lens than $f$, no real image forms. Looking through the lens, one sees an enlarged, upright **virtual** image: the lens works as a **magnifying glass**.",
        ],
      },
      {
        k: "p",
        text: "Opticians describe lenses by their **optical power** $D = 1/f$, measured in dioptres (dpt) when $f$ is given in metres. For thin lenses placed directly against each other, the optical powers add up.",
      },
      {
        k: "table",
        caption: "Table 1. Three converging lenses.",
        head: ["Lens", "Focal length"],
        rows: [
          ["A", "5 cm"],
          ["B", "10 cm"],
          ["C", "50 cm"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the optical power of lens C?",
      options: ["0.02 dpt", "0.5 dpt", "2 dpt", "50 dpt"],
      answer: 2,
      explanation: "$f = 50$ cm $= 0.5$ m; $D = 1 / 0.5 = 2$ dpt. 0.02 would wrongly use centimetres.",
    },
    {
      difficulty: "low",
      stem: "An object stands 10 cm in front of lens A. What is true about its image?",
      options: [
        "It is real and exactly as large as the object.",
        "It is real and twice as large as the object.",
        "It is virtual and enlarged.",
        "No image forms.",
      ],
      answer: 0,
      explanation: "$g = 10$ cm $= 2f$ for lens A. The text states that the image is then exactly as large as the object (and real).",
    },
    {
      difficulty: "medium",
      stem: "An object stands 15 cm in front of lens B. At what distance behind the lens does the image form?",
      options: ["5 cm", "6 cm", "25 cm", "30 cm"],
      answer: 3,
      explanation: "Formula (1): $\\frac{1}{b} = \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30}$, so $b = 30$ cm.",
    },
    {
      difficulty: "medium",
      stem: "What is the magnification in the previous situation (object 15 cm in front of lens B)?",
      options: ["0.5", "2", "3", "15"],
      answer: 1,
      explanation: "Formula (2): $m = b / g = 30 / 15 = 2$: the image is twice as large as the object.",
    },
    {
      difficulty: "medium",
      stem: "In which situation does the lens work as a magnifying glass?",
      options: ["Lens A, object 10 cm away", "Lens B, object 15 cm away", "Lens C, object 30 cm away", "Lens C, object 100 cm away"],
      answer: 2,
      explanation: "A magnifying glass needs the object closer than the focal length. Only lens C (50 cm) with the object at 30 cm fulfils $g < f$.",
    },
    {
      difficulty: "high",
      stem: "An object 4 cm tall stands 60 cm in front of lens B. How tall is its image?",
      options: ["0.8 cm", "2 cm", "4 cm", "20 cm"],
      answer: 0,
      explanation: "$\\frac{1}{b} = \\frac{1}{10} - \\frac{1}{60} = \\frac{5}{60}$, so $b = 12$ cm. $m = 12 / 60 = 0.2$; image $= 0.2 \\cdot 4 = 0.8$ cm.",
    },
    {
      difficulty: "high",
      stem: "Lenses A and B are placed directly against each other. What is the focal length of the combination?",
      options: ["about 3.3 cm", "7.5 cm", "15 cm", "50 cm"],
      answer: 0,
      explanation: "$D_A = 1/0.05 = 20$ dpt, $D_B = 1/0.1 = 10$ dpt. Together: $30$ dpt, so $f = 1/30$ m $\\approx 3.3$ cm. Adding focal lengths (15 cm) is wrong.",
    },
  ],
};

import type { SubjectText } from "../types";

export const ENERGY_BALANCE: SubjectText = {
  passage: {
    id: "c-energy-balance",
    title: "Body Weight and Energy Balance",
    field: "Nutrition Science",
    blocks: [
      {
        k: "p",
        text: "The **body mass index** (BMI) is a simple measure that relates body mass $m$ (in kg) to body height $h$ (in m):",
      },
      { k: "formula", tex: "\\text{BMI} = \\frac{m}{h^2}", label: "(1)" },
      {
        k: "p",
        text: "For adults, a BMI below 18.5 counts as underweight, 18.5 to below 25 as normal weight, 25 to below 30 as overweight and 30 or more as obesity. The BMI does not distinguish between muscle and fat, so it can be misleading for very muscular people.",
      },
      {
        k: "p",
        text: "Whether body weight changes depends on the **energy balance**: the energy taken in with food minus the energy the body uses. The daily energy use is estimated as the **basal metabolic rate** (BMR, the energy needed at complete rest) multiplied by a **physical activity level** (PAL) from Table 1. If a person takes in less energy than they use, the body draws on its reserves; roughly **7,000 kcal** correspond to one kilogram of body fat.",
      },
      {
        k: "p",
        text: "Food energy comes from three nutrients: carbohydrates and proteins provide about **4 kcal per gram**, fat about **9 kcal per gram**.",
      },
      {
        k: "table",
        caption: "Table 1. Physical activity levels (PAL).",
        head: ["Lifestyle", "PAL"],
        rows: [
          ["Mostly sitting, little exercise", "1.4"],
          ["Moderately active (regular walking or sport)", "1.6"],
          ["Very active (physical work or daily training)", "1.9"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much energy do 10 g of fat provide?",
      options: ["10 kcal", "40 kcal", "90 kcal", "900 kcal"],
      answer: 2,
      explanation: "Fat provides about 9 kcal per gram: $10 \\cdot 9 = 90$ kcal.",
    },
    {
      difficulty: "low",
      stem: "A moderately active person has a basal metabolic rate of 1,500 kcal per day. What is their estimated daily energy use?",
      options: ["1,500 kcal", "2,100 kcal", "2,400 kcal", "2,850 kcal"],
      answer: 2,
      explanation: "$1{,}500 \\cdot 1.6 = 2{,}400$ kcal. 2,100 kcal uses the PAL for mostly sitting (1.4).",
    },
    {
      difficulty: "medium",
      stem: "A person weighs 81 kg and is 1.80 m tall. What is their BMI, and in which category does it fall?",
      options: ["22.5: normal weight", "25: normal weight", "25: overweight", "45: obesity"],
      answer: 2,
      explanation: "$h^2 = 1.8^2 = 3.24$; $81 / 3.24 = 25$. The category 'overweight' starts at 25. 45 forgets to square the height.",
    },
    {
      difficulty: "medium",
      stem: "A snack bar contains 20 g of carbohydrates, 5 g of protein and 10 g of fat. How much energy does it provide?",
      options: ["140 kcal", "190 kcal", "245 kcal", "315 kcal"],
      answer: 1,
      explanation: "$20 \\cdot 4 + 5 \\cdot 4 + 10 \\cdot 9 = 80 + 20 + 90 = 190$ kcal. 140 kcal counts fat with 4 kcal/g.",
    },
    {
      difficulty: "medium",
      stem: "A person eats 500 kcal less per day than they use. About how long does it take to lose 2 kg of body fat?",
      options: ["1 week", "2 weeks", "4 weeks", "8 weeks"],
      answer: 2,
      explanation: "2 kg of fat $\\approx 14{,}000$ kcal; $14{,}000 / 500 = 28$ days $= 4$ weeks.",
    },
    {
      difficulty: "high",
      stem: "What is the highest body mass at which a person 1.60 m tall still has a normal BMI (below 25)?",
      options: ["just under 40 kg", "just under 56 kg", "just under 64 kg", "just under 72 kg"],
      answer: 2,
      explanation: "$m < 25 \\cdot h^2 = 25 \\cdot 2.56 = 64$ kg.",
    },
    {
      difficulty: "high",
      stem: "A person with a basal metabolic rate of 1,600 kcal changes from a mostly sitting to a very active lifestyle but keeps eating exactly as before, when their energy balance was even. What daily energy deficit results?",
      options: ["300 kcal", "500 kcal", "800 kcal", "1,600 kcal"],
      answer: 2,
      explanation: "Energy use rises from $1{,}600 \\cdot 1.4 = 2{,}240$ to $1{,}600 \\cdot 1.9 = 3{,}040$ kcal, i.e. by $1{,}600 \\cdot 0.5 = 800$ kcal per day.",
    },
  ],
};

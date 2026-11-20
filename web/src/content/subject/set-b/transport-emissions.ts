import type { SubjectText } from "../types";

export const TRANSPORT_EMISSIONS: SubjectText = {
  passage: {
    id: "b-transport-emissions",
    title: "Carbon Dioxide Emissions of Passenger Transport",
    field: "Environmental Science",
    blocks: [
      {
        k: "p",
        text: "To compare the climate impact of different means of transport, emissions are given per **passenger-kilometre** (pkm): the mass of carbon dioxide (CO₂) emitted when one passenger travels one kilometre. For a whole trip, the emissions are this value multiplied by the distance.",
      },
      {
        k: "p",
        text: "For a car, the emissions per kilometre belong to the whole vehicle. They are shared by everybody in it, so the emissions per passenger-kilometre are the vehicle's emissions divided by the number of occupants. Buses, trains and planes already carry many passengers; their values in Table 1 are averages per passenger based on typical occupancy.",
      },
      {
        k: "p",
        text: "A car's emissions can also be estimated from its fuel consumption: burning one litre of petrol releases about **2.3 kg of CO₂**.",
      },
      {
        k: "table",
        caption: "Table 1. Average CO₂ emissions (rounded example values).",
        head: ["Means of transport", "Emissions"],
        rows: [
          ["Car (petrol)", "150 g per vehicle-kilometre"],
          ["Bus", "60 g per passenger-kilometre"],
          ["Long-distance train", "30 g per passenger-kilometre"],
          ["Plane (domestic flight)", "220 g per passenger-kilometre"],
          ["Bicycle", "0 g (no direct emissions)"],
        ],
      },
      {
        k: "p",
        text: "These values describe only the emissions while travelling. Emissions from building vehicles and infrastructure are not included.",
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How much CO₂ is emitted when one person travels 300 km by long-distance train?",
      options: ["0.9 kg", "9 kg", "90 kg", "900 kg"],
      answer: 1,
      explanation: "$300 \\cdot 30$ g $= 9{,}000$ g $= 9$ kg.",
    },
    {
      difficulty: "low",
      stem: "Apart from the bicycle, which means of transport has the lowest emissions per passenger-kilometre according to Table 1?",
      options: ["Car with one occupant", "Bus", "Long-distance train", "Plane"],
      answer: 2,
      explanation: "Train 30 g, bus 60 g, plane 220 g, car with one occupant 150 g per passenger-kilometre.",
    },
    {
      difficulty: "medium",
      stem: "Three people share a car. How do their emissions per passenger-kilometre compare with the bus?",
      options: [
        "50 g: lower than the bus",
        "50 g: lower than the train",
        "150 g: higher than the bus",
        "450 g: higher than the plane",
      ],
      answer: 0,
      explanation: "$150 / 3 = 50$ g per passenger-kilometre, which is less than the bus (60 g) but still more than the train (30 g).",
    },
    {
      difficulty: "medium",
      stem: "For a single passenger, about how many times as much CO₂ does a domestic flight emit as the same distance by train?",
      options: ["about 3 times", "about 5 times", "about 7 times", "about 22 times"],
      answer: 2,
      explanation: "$220 / 30 \\approx 7.3$, so about 7 times as much, independent of the distance.",
    },
    {
      difficulty: "medium",
      stem: "A person drives alone 20 km to work and 20 km back, on 200 days a year. How much CO₂ could be saved per year by cycling instead?",
      options: ["0.12 t", "1.2 t", "12 t", "120 t"],
      answer: 1,
      explanation: "Distance: $40 \\cdot 200 = 8{,}000$ km. Emissions: $8{,}000 \\cdot 150$ g $= 1{,}200{,}000$ g $= 1{,}200$ kg $= 1.2$ t.",
    },
    {
      difficulty: "high",
      stem: "A car uses 8 litres of petrol per 100 km. About how much CO₂ does it emit per vehicle-kilometre?",
      options: ["18 g", "184 g", "230 g", "1,840 g"],
      answer: 1,
      explanation: "Per kilometre it uses $8 / 100 = 0.08$ L; $0.08 \\cdot 2.3$ kg $= 0.184$ kg $= 184$ g.",
    },
    {
      difficulty: "high",
      stem: "What is the smallest number of people that must share a car (150 g per vehicle-kilometre) so that the emissions per passenger are no higher than by train?",
      options: ["2", "3", "5", "6"],
      answer: 2,
      explanation: "Per passenger: $150 / n \\le 30$ requires $n \\ge 5$. With 5 occupants the car reaches exactly 30 g per passenger-kilometre.",
    },
  ],
};

import type { SubjectText } from "../types";

export const ELECTRIC_CARS: SubjectText = {
  passage: {
    id: "e-electric-cars",
    title: "Range and Charging of Electric Cars",
    field: "Automotive Engineering",
    blocks: [
      {
        k: "p",
        text: "The battery of an electric car stores energy, measured in kilowatt-hours (kWh). How far the car can drive depends on its **consumption**, usually given in kWh per 100 km:",
      },
      { k: "formula", tex: "\\text{range} = \\frac{\\text{usable battery capacity}}{\\text{consumption}} \\cdot 100\\ \\text{km}", label: "(1)" },
      {
        k: "p",
        text: "Consumption depends on speed and weather: in cold weather, heating the cabin and the battery can raise it considerably.",
      },
      {
        k: "p",
        text: "The charging time is the energy charged divided by the charging power: $t = E / P$. Fast chargers are normally used only from about 10 % to 80 % of the capacity, because above 80 % the car reduces the charging power to protect the battery. When charging, some energy is lost as heat: about **10 % more** energy must be taken from the grid than is stored in the battery.",
      },
      {
        k: "table",
        caption: "Table 1. Data of an electric car and of a comparable petrol car (example values).",
        head: ["Item", "Value"],
        rows: [
          ["Usable battery capacity", "60 kWh"],
          ["Consumption (mild weather)", "15 kWh per 100 km"],
          ["Charging power at home (wall box)", "11 kW"],
          ["Charging power at a fast charger", "100 kW"],
          ["Electricity price at home", "0.30 € per kWh"],
          ["Electricity price at a fast charger", "0.60 € per kWh"],
          ["Petrol car: cost of fuel", "10.80 € per 100 km"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "What is the range of the electric car in mild weather with a full battery?",
      options: ["150 km", "250 km", "400 km", "900 km"],
      answer: 2,
      explanation: "Formula (1): $60 / 15 \\cdot 100 = 400$ km.",
    },
    {
      difficulty: "low",
      stem: "What does the electricity for 100 km cost when charging at home (ignoring charging losses)?",
      options: ["0.30 €", "4.50 €", "9.00 €", "18.00 €"],
      answer: 1,
      explanation: "$15$ kWh $\\cdot 0.30$ € $= 4.50$ €.",
    },
    {
      difficulty: "medium",
      stem: "About how long does it take to charge the empty battery completely with the wall box?",
      options: ["about 0.6 h", "about 5.5 h", "about 11 h", "about 60 h"],
      answer: 1,
      explanation: "$t = 60$ kWh $/ 11$ kW $\\approx 5.5$ h.",
    },
    {
      difficulty: "medium",
      stem: "How long does the car need at the fast charger to charge from 10 % to 80 %?",
      options: ["about 15 min", "about 25 min", "about 36 min", "about 42 min"],
      answer: 1,
      explanation: "70 % of 60 kWh $= 42$ kWh. $42 / 100 = 0.42$ h $\\approx 25$ min.",
    },
    {
      difficulty: "medium",
      stem: "How many kilometres of range does one hour of charging with the wall box add?",
      options: ["11 km", "about 73 km", "150 km", "165 km"],
      answer: 1,
      explanation: "In one hour: 11 kWh. $11 / 15 \\cdot 100 \\approx 73$ km.",
    },
    {
      difficulty: "medium",
      stem: "How much cheaper per 100 km is the electric car when charged only at fast chargers, compared with the petrol car (ignoring charging losses)?",
      options: ["1.80 €", "4.50 €", "6.30 €", "9.00 €"],
      answer: 0,
      explanation: "Fast charging: $15 \\cdot 0.60 = 9.00$ € per 100 km, compared with 10.80 €: 1.80 € cheaper. Charging at home (4.50 €) would save 6.30 €.",
    },
    {
      difficulty: "high",
      stem: "What does 100 km really cost when charging at home if the charging losses described in the text are included?",
      options: ["4.05 €", "4.50 €", "4.95 €", "5.50 €"],
      answer: 2,
      explanation: "About 10 % more energy is taken from the grid: $15 \\cdot 1.1 = 16.5$ kWh; $16.5 \\cdot 0.30 = 4.95$ €.",
    },
    {
      difficulty: "high",
      stem: "In winter, the consumption rises by 20 %. What is the range with a full battery?",
      options: ["320 km", "about 333 km", "380 km", "480 km"],
      answer: 1,
      explanation: "New consumption: $15 \\cdot 1.2 = 18$ kWh per 100 km. Range: $60 / 18 \\cdot 100 \\approx 333$ km. Simply subtracting 20 % from 400 km (320 km) is not quite right.",
    },
  ],
};

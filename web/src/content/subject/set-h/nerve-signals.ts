import type { SubjectText } from "../types";

export const NERVE_SIGNALS: SubjectText = {
  passage: {
    id: "h-nerve-signals",
    title: "How Fast Do Nerve Signals Travel?",
    field: "Neuroscience",
    blocks: [
      {
        k: "p",
        text: "Nerve cells transmit information as electrical signals along their long extensions, the nerve fibres. The **conduction velocity** depends mainly on two properties: thicker fibres conduct faster, and fibres wrapped in an insulating **myelin sheath** conduct much faster than unmyelinated ones, because the signal jumps from one gap in the sheath to the next.",
      },
      {
        k: "p",
        text: "Pain is carried by two kinds of fibres. Fast, thin myelinated fibres carry sharp, well-localised pain; very slow unmyelinated fibres carry dull, burning pain. This is why, after stubbing a toe, one often feels a sharp pain first and a dull pain a moment later.",
      },
      {
        k: "p",
        text: "In a **reflex**, such as the knee-jerk reflex, the signal travels from a sensory receptor along a sensory fibre to the spinal cord, is passed on at a **synapse** to a motor nerve cell, and travels back along a motor fibre to the muscle. Each synapse delays the signal by about **1 ms**. Diseases that damage the myelin sheath slow down conduction and can cause weakness and numbness.",
      },
      {
        k: "p",
        text: "Doctors measure conduction velocity by stimulating a nerve at two points and recording when the muscle responds. The difference in distance divided by the difference in time gives the velocity.",
      },
      {
        k: "table",
        caption: "Table 1. Typical conduction velocities.",
        head: ["Fibre type", "Function", "Velocity"],
        rows: [
          ["Thick, myelinated", "Muscle control, reflexes", "100 m/s"],
          ["Thin, myelinated", "Sharp pain", "20 m/s"],
          ["Unmyelinated", "Dull pain", "1 m/s"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How long does a signal need to travel 1 m along a thick, myelinated fibre?",
      options: ["1 ms", "10 ms", "100 ms", "1 s"],
      answer: 1,
      explanation: "$t = 1$ m $/ 100$ m/s $= 0.01$ s $= 10$ ms.",
    },
    {
      difficulty: "low",
      stem: "Which fibre type in Table 1 conducts most slowly?",
      options: ["Thick, myelinated", "Thin, myelinated", "Unmyelinated", "All conduct equally fast."],
      answer: 2,
      explanation: "Unmyelinated fibres conduct at only about 1 m/s.",
    },
    {
      difficulty: "medium",
      stem: "A toe is 1.5 m away from the brain. About how much later does the dull pain arrive than the sharp pain?",
      options: ["about 0.075 s", "about 1.4 s", "about 1.5 s", "about 15 s"],
      answer: 1,
      explanation: "Sharp pain: $1.5 / 20 = 0.075$ s. Dull pain: $1.5 / 1 = 1.5$ s. Difference: about 1.4 s.",
    },
    {
      difficulty: "medium",
      stem: "Why do people often feel a sharp pain first and a dull pain later after an injury?",
      options: [
        "The dull pain is caused by a second injury.",
        "The two kinds of pain are carried by fibres with different conduction velocities.",
        "The brain processes dull pain more slowly.",
        "Dull pain starts only when the sharp pain ends.",
      ],
      answer: 1,
      explanation: "Sharp pain travels on fast myelinated fibres (20 m/s), dull pain on slow unmyelinated fibres (1 m/s).",
    },
    {
      difficulty: "medium",
      stem: "What happens to conduction when the myelin sheath of a fibre is damaged?",
      options: ["It becomes faster.", "It becomes slower.", "It does not change.", "It reverses its direction."],
      answer: 1,
      explanation: "The text states that damage to the myelin sheath slows down conduction.",
    },
    {
      difficulty: "high",
      stem: "In the knee-jerk reflex, the signal travels 0.5 m to the spinal cord and 0.5 m back to the muscle on thick fibres, with one synapse in between. What is the total delay?",
      options: ["about 1 ms", "about 5 ms", "about 11 ms", "about 101 ms"],
      answer: 2,
      explanation: "Conduction: $1$ m $/ 100$ m/s $= 10$ ms; plus 1 ms for the synapse: about 11 ms.",
    },
    {
      difficulty: "high",
      stem: "A nerve is stimulated at the elbow and at the wrist, 0.25 m apart. The muscle responds 8 ms after stimulation at the elbow and 5.5 ms after stimulation at the wrist. What is the conduction velocity?",
      options: ["about 31 m/s", "about 45 m/s", "100 m/s", "250 m/s"],
      answer: 2,
      explanation: "Time difference: $8 - 5.5 = 2.5$ ms $= 0.0025$ s. Velocity: $0.25 / 0.0025 = 100$ m/s. Using only one of the times (e.g. $0.25/0.008$) wrongly includes the delay at the muscle.",
    },
  ],
};

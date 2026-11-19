import type { SubjectText } from "./types";

export const SURVEYS: SubjectText = {
  passage: {
    id: "surveys",
    title: "Surveys and Sampling",
    field: "Social Sciences",
    blocks: [
      {
        k: "p",
        text: "Researchers rarely can ask every member of a **population**, for example all students of a university. Instead they question a **sample** and draw conclusions about the population. This works only if the sample is *representative*, meaning it resembles the population in the characteristics that matter.",
      },
      {
        k: "p",
        text: "The safest way to get a representative sample is **random sampling**: every member of the population has the same chance of being selected, for instance by drawing names from a complete list. Other methods carry risks of bias:",
      },
      {
        k: "list",
        items: [
          "**Self-selection bias:** if people decide themselves whether to take part (for example via a public link), those with a special interest in the topic are over-represented.",
          "**Non-response bias:** if some of the selected people do not answer, and they differ systematically from those who do, the result is distorted.",
        ],
      },
      {
        k: "p",
        text: "Even a perfect random sample is subject to chance. For a share (proportion) estimated from a random sample of size $n$, the **margin of error** at the usual 95 % confidence level is roughly:",
      },
      { k: "formula", tex: "\\text{margin of error} \\approx \\frac{1}{\\sqrt{n}}", label: "(1)" },
      {
        k: "p",
        text: "Finally, surveys often find that two characteristics occur together (a **correlation**). This alone does not prove that one causes the other: a third factor, a so-called *confounder*, may influence both.",
      },
      {
        k: "p",
        text: "**Example.** A university with 20,000 students wanted to know how many hours per week its students spend on self-study. It ran two surveys. **Survey A** was an online poll linked on the library website; 400 students took part. **Survey B** drew 400 students at random from the enrolment list; 340 of them answered. Figure 1 shows the results.",
      },
      {
        k: "chart",
        caption: "Figure 1. Share of respondents (%) by weekly self-study hours in Survey A (n = 400) and Survey B (n = 340).",
        kind: "bar",
        xLabel: "Self-study hours per week",
        yLabel: "Share of respondents (%)",
        categories: ["0–5", "6–10", "11–15", "16–20", "more than 20"],
        series: [
          { name: "Survey A (library website)", values: [5, 12, 20, 28, 35] },
          { name: "Survey B (random sample)", values: [22, 30, 25, 15, 8] },
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "Which survey gives the more trustworthy picture of self-study time among all 20,000 students?",
      options: [
        "Survey A, because more students took part.",
        "Survey B, because its participants were chosen at random from the full list.",
        "Both equally, because both asked about 400 students.",
        "Neither, because a sample can never say anything about a population.",
      ],
      answer: 1,
      explanation: "Survey B used random sampling, the method the text calls the safest. Survey A relied on volunteers, which risks self-selection bias; more participants do not fix that.",
    },
    {
      difficulty: "low",
      stem: "What is the most likely reason why Survey A shows much longer study times than Survey B?",
      options: [
        "Students who visit the library website and choose to answer study more than average.",
        "Survey A was carried out during the exam period.",
        "The margin of error of Survey A is larger.",
        "Students in Survey B did not understand the question.",
      ],
      answer: 0,
      explanation: "This is self-selection bias: people who use the library website and care about the topic are over-represented. The text gives no information about timing or misunderstanding.",
    },
    {
      difficulty: "low",
      stem: "In Survey B, what share of respondents study **more than 15** hours per week?",
      options: ["8 %", "15 %", "23 %", "63 %"],
      answer: 2,
      explanation: "Categories 16–20 (15 %) and more than 20 (8 %) together: 15 % + 8 % = 23 %. 63 % is the corresponding value for Survey A.",
    },
    {
      difficulty: "medium",
      stem: "According to formula (1), what is the approximate margin of error for a share estimated from a random sample of 400 people?",
      options: ["1 percentage point", "2.5 percentage points", "5 percentage points", "20 percentage points"],
      answer: 2,
      explanation: "$1/\\sqrt{400} = 1/20 = 0.05$, i.e. 5 percentage points.",
    },
    {
      difficulty: "medium",
      stem: "Starting from a random sample of 400, how large must the sample be to **halve** the margin of error?",
      options: ["800", "1,600", "4,000", "about 566"],
      answer: 1,
      explanation: "The margin of error falls with $1/\\sqrt{n}$. To halve it, $\\sqrt{n}$ must double, so $n$ must be four times as large: 4 · 400 = 1,600.",
    },
    {
      difficulty: "medium",
      stem: "About how many respondents of Survey B reported 0–5 hours of self-study per week?",
      options: ["about 22", "about 75", "about 88", "about 340"],
      answer: 1,
      explanation: "22 % of the 340 respondents: 0.22 · 340 = 74.8, about 75. (88 would be 22 % of 400, but only 340 answered.)",
    },
    {
      difficulty: "high",
      stem: "In Survey B, students who study more also report better grades. A newspaper writes: \"More self-study causes better grades.\" Which objection is the strongest?",
      options: [
        "A third factor, such as interest in the subject, could lead both to more studying and to better grades.",
        "The sample of 340 is too small to find any correlation.",
        "Survey B is a random sample and therefore cannot be used for this question.",
        "Grades cannot be measured in a survey.",
      ],
      answer: 0,
      explanation: "A correlation alone does not prove causation; a confounder can drive both characteristics, as the text explains. The other options are not supported by the text.",
    },
    {
      difficulty: "high",
      stem: "60 of the 400 students selected for Survey B did not answer. In which case would Survey B **overestimate** the average self-study time?",
      options: [
        "If the non-respondents study less on average than the respondents, e.g. because they work part-time.",
        "If the non-respondents study exactly as much as the respondents.",
        "If the non-respondents study more on average than the respondents.",
        "Never, because Survey B is a random sample.",
      ],
      answer: 0,
      explanation: "Non-response bias: if those missing study less, the respondents are the more studious part of the sample and the average comes out too high. A random selection does not protect against non-response.",
    },
  ],
};

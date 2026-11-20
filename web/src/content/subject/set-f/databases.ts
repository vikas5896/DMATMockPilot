import type { SubjectText } from "../types";

export const DATABASES: SubjectText = {
  passage: {
    id: "f-databases",
    title: "Tables, Keys and Joins in Databases",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "A **relational database** stores data in tables. Each row (record) describes one object, and each column describes one property. Every table has a **primary key**: a column whose value is different in every row, so that each row can be identified uniquely. Numbers assigned by the database (IDs) are typically used, because natural properties such as names may occur twice and may change.",
      },
      {
        k: "p",
        text: "Tables are linked through **foreign keys**: a column that contains primary-key values of another table. Instead of storing a student's name in every enrolment, the enrolment table only stores the student's ID. Each fact is then stored in exactly one place, which avoids contradictions when data changes.",
      },
      {
        k: "p",
        text: "To combine linked tables, a database performs a **join**. An (inner) join produces one result row for every pair of rows whose keys match; rows without a match do not appear in the result.",
      },
      {
        k: "table",
        caption: "Table 1. Table Students.",
        head: ["id (primary key)", "name", "city"],
        rows: [
          ["1", "Asha", "Pune"],
          ["2", "Ben", "Berlin"],
          ["3", "Chen", "Pune"],
          ["4", "Dina", "Delhi"],
        ],
      },
      {
        k: "table",
        caption: "Table 2. Table Enrolments (student_id is a foreign key to Students.id).",
        head: ["student_id", "course"],
        rows: [
          ["1", "Mathematics"],
          ["1", "Physics"],
          ["2", "Mathematics"],
          ["3", "Chemistry"],
          ["3", "Mathematics"],
          ["3", "Physics"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many students in Table 1 live in Pune?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "Asha and Chen: 2 students.",
    },
    {
      difficulty: "low",
      stem: "Which column of the Students table is suitable as the primary key?",
      options: ["name", "city", "id", "name and city together"],
      answer: 2,
      explanation: "Only the id is guaranteed to be different in every row. Cities repeat (Pune twice), and names can repeat in larger tables.",
    },
    {
      difficulty: "medium",
      stem: "How many rows does the inner join of Students and Enrolments (on Students.id = Enrolments.student_id) contain?",
      options: ["4", "6", "10", "24"],
      answer: 1,
      explanation: "Each of the 6 enrolment rows matches exactly one student, so the join has 6 rows. Dina, without enrolments, adds none.",
    },
    {
      difficulty: "medium",
      stem: "How many students are enrolled in Mathematics?",
      options: ["1", "2", "3", "4"],
      answer: 2,
      explanation: "Enrolments with Mathematics: student IDs 1, 2 and 3 (Asha, Ben, Chen).",
    },
    {
      difficulty: "medium",
      stem: "Which student does not appear in the result of the inner join?",
      options: ["Asha", "Ben", "Chen", "Dina"],
      answer: 3,
      explanation: "Dina (id 4) has no row in Enrolments. Rows without a match do not appear in an inner join.",
    },
    {
      difficulty: "high",
      stem: "How many enrolments belong to students who live in Pune?",
      options: ["2", "3", "5", "6"],
      answer: 2,
      explanation: "Pune students: Asha (id 1) with 2 enrolments and Chen (id 3) with 3 enrolments: $2 + 3 = 5$.",
    },
    {
      difficulty: "high",
      stem: "Suppose the Enrolments table stored the student's name instead of the ID. Which problem arises when a student changes her name?",
      options: [
        "The join produces more rows than before.",
        "The name must be changed in several rows; if one is forgotten, the data contradicts itself.",
        "The primary key of Students becomes invalid.",
        "No problem, because names are unique.",
      ],
      answer: 1,
      explanation: "The name would be stored once per enrolment. As the text explains, storing each fact in exactly one place (via the ID) avoids such contradictions.",
    },
  ],
};

import type { SubjectText } from "../types";
import { BICYCLE_GEARS } from "./bicycle-gears";
import { BREAK_EVEN } from "./break-even";
import { COUNTING } from "./counting";
import { DATA_TRANSFER } from "./data-transfer";
import { ELASTICITY } from "./elasticity";
import { HALF_LIFE } from "./half-life";
import { HOUSEHOLD_ENERGY } from "./household-energy";
import { REACTION_RATES } from "./reaction-rates";
import { SPACING } from "./spacing";
import { TRANSPORT_EMISSIONS } from "./transport-emissions";

/** Set B (Academic Test 2 and Full Mock 2): 10 original texts, 74 questions. Fields alternate. */
export const SET_B: SubjectText[] = [
  ELASTICITY, // 1 Economics (8)
  HALF_LIFE, // 2 Pharmacology (7)
  HOUSEHOLD_ENERGY, // 3 Electrical Engineering (7)
  SPACING, // 4 Psychology (7)
  COUNTING, // 5 Mathematics (8)
  TRANSPORT_EMISSIONS, // 6 Environmental Science (7)
  BREAK_EVEN, // 7 Business Administration (8)
  REACTION_RATES, // 8 Chemistry (7)
  BICYCLE_GEARS, // 9 Mechanical Engineering (8)
  DATA_TRANSFER, // 10 Computer Science (7)
];

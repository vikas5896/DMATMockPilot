import type { SubjectText } from "../types";
import { CARDIAC_OUTPUT } from "./cardiac-output";
import { COMBUSTION } from "./combustion";
import { DECIBELS } from "./decibels";
import { DEPENDENCY_RATIO } from "./dependency-ratio";
import { ELECTRIC_CARS } from "./electric-cars";
import { INCOME_TAX } from "./income-tax";
import { QUEUES } from "./queues";
import { SCALING } from "./scaling";
import { SHORTEST_PATHS } from "./shortest-paths";
import { WATER_FOOTPRINT } from "./water-footprint";

/** Set E (Academic Test 5 and Full Mock 5): 10 original texts, 74 questions. Fields alternate. */
export const SET_E: SubjectText[] = [
  INCOME_TAX, // 1 Public Finance (8)
  CARDIAC_OUTPUT, // 2 Physiology (7)
  DECIBELS, // 3 Acoustics (7)
  DEPENDENCY_RATIO, // 4 Demography (7)
  SCALING, // 5 Mathematics (8)
  WATER_FOOTPRINT, // 6 Agricultural Science (7)
  QUEUES, // 7 Operations Research (8)
  COMBUSTION, // 8 Chemistry (7)
  ELECTRIC_CARS, // 9 Automotive Engineering (8)
  SHORTEST_PATHS, // 10 Computer Science (7)
];

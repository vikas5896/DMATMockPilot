import type { SubjectText } from "../types";
import { BINARY_NUMBERS } from "./binary-numbers";
import { EARTHQUAKES } from "./earthquakes";
import { ENERGY_BALANCE } from "./energy-balance";
import { HYDRAULICS } from "./hydraulics";
import { INFLATION } from "./inflation";
import { INHERITANCE } from "./inheritance";
import { PH_VALUE } from "./ph-value";
import { PIPE_FLOW } from "./pipe-flow";
import { SEQUENCES } from "./sequences";
import { URBANISATION } from "./urbanisation";

/** Set C (Academic Test 3 and Full Mock 3): 10 original texts, 74 questions. Fields alternate. */
export const SET_C: SubjectText[] = [
  INFLATION, // 1 Economics (8)
  INHERITANCE, // 2 Genetics (7)
  HYDRAULICS, // 3 Mechanical Engineering (7)
  URBANISATION, // 4 Human Geography (7)
  SEQUENCES, // 5 Mathematics (8)
  ENERGY_BALANCE, // 6 Nutrition Science (7)
  EARTHQUAKES, // 7 Geophysics (8)
  PH_VALUE, // 8 Chemistry (7)
  PIPE_FLOW, // 9 Civil Engineering (8)
  BINARY_NUMBERS, // 10 Computer Science (7)
];

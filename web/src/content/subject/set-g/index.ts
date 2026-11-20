import type { SubjectText } from "../types";
import { AVERAGES } from "./averages";
import { CAPTURE_RECAPTURE } from "./capture-recapture";
import { CHECK_DIGITS } from "./check-digits";
import { COMPARATIVE_ADVANTAGE } from "./comparative-advantage";
import { DEPRECIATION } from "./depreciation";
import { DOSAGE } from "./dosage";
import { EQUILIBRIUM } from "./equilibrium";
import { GRADE_CONVERSION } from "./grade-conversion";
import { HEAT_CAPACITY } from "./heat-capacity";
import { LEVERS } from "./levers";

/** Set G (Academic Test 7 and Full Mock 7): 10 original texts, 74 questions. Fields alternate. */
export const SET_G: SubjectText[] = [
  COMPARATIVE_ADVANTAGE, // 1 Economics (8)
  DOSAGE, // 2 Pharmacy (7)
  HEAT_CAPACITY, // 3 Thermodynamics (7)
  GRADE_CONVERSION, // 4 Education Studies (7)
  AVERAGES, // 5 Mathematics (8)
  CAPTURE_RECAPTURE, // 6 Wildlife Biology (7)
  DEPRECIATION, // 7 Accounting (8)
  EQUILIBRIUM, // 8 Chemistry (7)
  LEVERS, // 9 Mechanical Engineering (8)
  CHECK_DIGITS, // 10 Computer Science (7)
];

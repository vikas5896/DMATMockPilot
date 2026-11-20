import type { SubjectText } from "../types";
import { ALTITUDE } from "./altitude";
import { CHUNKING } from "./chunking";
import { LOGARITHMS } from "./logarithms";
import { MODULAR_CIPHERS } from "./modular-ciphers";
import { PRICING_GST } from "./pricing-gst";
import { RECYCLING } from "./recycling";
import { SOLUBILITY } from "./solubility";
import { STUDENT_BUDGET } from "./student-budget";
import { WIND_TURBINES } from "./wind-turbines";
import { WORK_POWER } from "./work-power";

/** Set J (Academic Test 10 and Full Mock 10): 10 original texts, 74 questions. Fields alternate. */
export const SET_J: SubjectText[] = [
  STUDENT_BUDGET, // 1 Personal Finance (8)
  ALTITUDE, // 2 Physiology (7)
  WORK_POWER, // 3 Physics (7)
  CHUNKING, // 4 Cognitive Psychology (7)
  LOGARITHMS, // 5 Mathematics (8)
  RECYCLING, // 6 Environmental Engineering (7)
  PRICING_GST, // 7 Business Administration (8)
  SOLUBILITY, // 8 Chemistry (7)
  WIND_TURBINES, // 9 Energy Engineering (8)
  MODULAR_CIPHERS, // 10 Computer Science (7)
];

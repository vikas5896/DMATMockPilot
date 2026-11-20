import type { SubjectText } from "../types";
import { BACKUPS } from "./backups";
import { DNA_CODE } from "./dna-code";
import { GDP } from "./gdp";
import { INCOME_INEQUALITY } from "./income-inequality";
import { INVENTORY } from "./inventory";
import { NERVE_SIGNALS } from "./nerve-signals";
import { POWER_TRANSMISSION } from "./power-transmission";
import { PYTHAGORAS } from "./pythagoras";
import { RAINWATER } from "./rainwater";
import { WAVES } from "./waves";

/** Set H (Academic Test 8 and Full Mock 8): 10 original texts, 74 questions. Fields alternate. */
export const SET_H: SubjectText[] = [
  GDP, // 1 Economics (8)
  NERVE_SIGNALS, // 2 Neuroscience (7)
  WAVES, // 3 Physics (7)
  INCOME_INEQUALITY, // 4 Sociology (7)
  PYTHAGORAS, // 5 Mathematics (8)
  RAINWATER, // 6 Water Management (7)
  INVENTORY, // 7 Logistics (8)
  DNA_CODE, // 8 Molecular Biology (7)
  POWER_TRANSMISSION, // 9 Electrical Engineering (8)
  BACKUPS, // 10 Computer Science (7)
];

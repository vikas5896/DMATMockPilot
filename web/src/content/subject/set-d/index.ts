import type { SubjectText } from "../types";
import { CACHING } from "./caching";
import { CRITICAL_PATH } from "./critical-path";
import { DIAGNOSTIC_TESTS } from "./diagnostic-tests";
import { DICE_PROBABILITY } from "./dice-probability";
import { EXCHANGE_RATES } from "./exchange-rates";
import { FOOD_CHAINS } from "./food-chains";
import { GAS_LAWS } from "./gas-laws";
import { LENSES } from "./lenses";
import { SEAT_ALLOCATION } from "./seat-allocation";
import { SOLAR_POWER } from "./solar-power";

/** Set D (Academic Test 4 and Full Mock 4): 10 original texts, 74 questions. Fields alternate. */
export const SET_D: SubjectText[] = [
  EXCHANGE_RATES, // 1 Economics (8)
  DIAGNOSTIC_TESTS, // 2 Medicine (7)
  LENSES, // 3 Physics (7)
  SEAT_ALLOCATION, // 4 Political Science (7)
  DICE_PROBABILITY, // 5 Mathematics (8)
  FOOD_CHAINS, // 6 Ecology (7)
  CRITICAL_PATH, // 7 Project Management (8)
  GAS_LAWS, // 8 Physical Chemistry (7)
  SOLAR_POWER, // 9 Renewable Energy (8)
  CACHING, // 10 Computer Science (7)
];

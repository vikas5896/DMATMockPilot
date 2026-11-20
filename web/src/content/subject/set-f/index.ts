import type { SubjectText } from "../types";
import { BACTERIAL_GROWTH } from "./bacterial-growth";
import { BUOYANCY } from "./buoyancy";
import { CO2_EQUIVALENTS } from "./co2-equivalents";
import { CONVERSION_FUNNEL } from "./conversion-funnel";
import { DATABASES } from "./databases";
import { FRAMING } from "./framing";
import { FREE_FALL } from "./free-fall";
import { LABOUR_MARKET } from "./labour-market";
import { LINEAR_FUNCTIONS } from "./linear-functions";
import { RAMPS } from "./ramps";

/** Set F (Academic Test 6 and Full Mock 6): 10 original texts, 74 questions. Fields alternate. */
export const SET_F: SubjectText[] = [
  LABOUR_MARKET, // 1 Economics (8)
  BACTERIAL_GROWTH, // 2 Microbiology (7)
  FREE_FALL, // 3 Physics (7)
  FRAMING, // 4 Behavioural Science (7)
  LINEAR_FUNCTIONS, // 5 Mathematics (8)
  CO2_EQUIVALENTS, // 6 Climate Science (7)
  CONVERSION_FUNNEL, // 7 Marketing (8)
  BUOYANCY, // 8 Materials Science (7)
  RAMPS, // 9 Architecture (8)
  DATABASES, // 10 Computer Science (7)
];

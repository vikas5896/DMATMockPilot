import type { SubjectText } from "../types";
import { GAME_THEORY } from "./game-theory";
import { HERD_IMMUNITY } from "./herd-immunity";
import { HUFFMAN } from "./huffman";
import { ISOTOPES } from "./isotopes";
import { NET_PROMOTER } from "./net-promoter";
import { PENDULUM } from "./pendulum";
import { SEA_LEVEL } from "./sea-level";
import { STOPPING_DISTANCE } from "./stopping-distance";
import { TOURNAMENTS } from "./tournaments";
import { ZIPF } from "./zipf";

/** Set I (Academic Test 9 and Full Mock 9): 10 original texts, 74 questions. Fields alternate. */
export const SET_I: SubjectText[] = [
  GAME_THEORY, // 1 Economics (8)
  HERD_IMMUNITY, // 2 Epidemiology (7)
  PENDULUM, // 3 Physics (7)
  ZIPF, // 4 Linguistics (7)
  TOURNAMENTS, // 5 Mathematics (8)
  SEA_LEVEL, // 6 Earth Science (7)
  NET_PROMOTER, // 7 Business Administration (8)
  ISOTOPES, // 8 Chemistry (7)
  STOPPING_DISTANCE, // 9 Traffic Engineering (8)
  HUFFMAN, // 10 Computer Science (7)
];

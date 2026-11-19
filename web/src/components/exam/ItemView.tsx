"use client";

import type {
  Answer,
  AnswerKey,
  EquationsAnswer,
  FigureSequenceAnswer,
  Item,
  LatinSquareAnswer,
} from "@/lib/exam/types";
import { EquationsView } from "./EquationsView";
import { FigureSequenceView } from "./FigureSequenceView";
import { LatinSquareView } from "./LatinSquareView";
import { PassageMcqView } from "@/components/subject/PassageMcqView";

type Props = {
  item: Item;
  answer: Answer | undefined;
  onAnswer?: (a: Answer) => void;
  /** pass the key to render in review mode */
  reviewKey?: AnswerKey;
  ofTotal?: number;
};

export function ItemView({ item, answer, onAnswer, reviewKey, ofTotal }: Props) {
  switch (item.type) {
    case "figure-sequence":
      return (
        <FigureSequenceView
          item={item}
          answer={answer as FigureSequenceAnswer | undefined}
          onAnswer={onAnswer}
          correct={reviewKey?.type === "figure-sequence" ? reviewKey.correct : undefined}
        />
      );
    case "equations":
      return (
        <EquationsView
          item={item}
          answer={answer as EquationsAnswer | undefined}
          onAnswer={onAnswer}
          correct={reviewKey?.type === "equations" ? reviewKey.correct : undefined}
        />
      );
    case "passage-mcq":
      return (
        <PassageMcqView
          item={item}
          answer={answer as number | null | undefined}
          onAnswer={onAnswer}
          correct={reviewKey?.type === "passage-mcq" ? reviewKey.correct : undefined}
          ofTotal={ofTotal}
        />
      );
    case "latin-square":
      return (
        <LatinSquareView
          item={item}
          answer={answer as LatinSquareAnswer | undefined}
          onAnswer={onAnswer}
          correct={reviewKey?.type === "latin-square" ? reviewKey.correct : undefined}
        />
      );
  }
}

"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftDifference } from "../video-draft-comparison-types";

export function VideoDraftDifferencePanel({ differences }: { differences: VideoDraftDifference[] }) {
  return (
    <PreviewFoundationCard title="Differences">
      <PreviewFoundationCopy>Differences explain what changed so the next action is based on evidence, not guesswork.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={differences.map((difference) => `${difference.category}: ${difference.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}

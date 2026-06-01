"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftScorecard } from "../video-draft-comparison-types";

export function VideoDraftScorecardPanel({ scorecards }: { scorecards: VideoDraftScorecard[] }) {
  return (
    <PreviewFoundationCard title="Scorecards">
      <PreviewFoundationCopy>Scorecards keep strengths and concerns visible before choosing a winner or retry.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={scorecards.flatMap((scorecard) => [...scorecard.strengths, ...scorecard.concerns].map((item) => `${scorecard.draftId}: ${item}`))} />
    </PreviewFoundationCard>
  );
}

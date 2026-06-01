import type { VideoDraftComparisonSummary } from "./video-draft-comparison-types";
import { buildVideoDraftComparison } from "./video-draft-comparison";
import { buildVideoDraftComparisonHandoff } from "./video-draft-comparison-handoff";
import { buildVideoDraftDifference } from "./video-draft-difference";
import { buildDefaultVideoDraftRecords } from "./video-draft-record";
import { buildVideoDraftScorecard } from "./video-draft-scorecard";
import { buildVideoDraftSelection } from "./video-draft-selection";

export function buildVideoDraftComparisonSummary(): VideoDraftComparisonSummary {
  const drafts = buildDefaultVideoDraftRecords();
  const comparison = buildVideoDraftComparison({ leftDraftId: drafts[0]?.id ?? "video-draft-record-a", rightDraftId: drafts[1]?.id ?? "video-draft-record-b" });
  const scorecards = drafts.map((draft, index) =>
    buildVideoDraftScorecard({
      id: `video-draft-scorecard-${index + 1}`,
      draftId: draft.id,
      strengths: ["review notes can be compared", "settings can be explained"],
      concerns: ["no real video playback yet", "needs future artifact evidence"],
    })
  );
  const differences = comparison.categories.map((category, index) =>
    buildVideoDraftDifference({
      id: `video-draft-difference-${index + 1}`,
      category,
      plainEnglish: `${category} should be compared before choosing keep, retry, upscale, or finish.`,
    })
  );
  const selection = buildVideoDraftSelection();
  const handoff = buildVideoDraftComparisonHandoff();

  return {
    drafts,
    comparison,
    scorecards,
    differences,
    selection,
    handoff,
    summary: summarizeVideoDraftComparison({ drafts, comparison, scorecards, differences, selection, handoff, summary: "" }),
  };
}

export function summarizeVideoDraftComparison(summary: VideoDraftComparisonSummary): string {
  return `${summary.drafts.length} draft slots compared across ${summary.comparison.categories.length} categories with no playback or file reading.`;
}

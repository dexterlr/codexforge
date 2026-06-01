import type { VideoDraftComparison, VideoDraftComparisonCategory } from "./video-draft-comparison-types";

export function buildVideoDraftComparison(input: Partial<VideoDraftComparison> = {}): VideoDraftComparison {
  const categories: VideoDraftComparisonCategory[] = [
    "prompt",
    "workflow",
    "keyframes",
    "duration",
    "motion quality",
    "visual quality",
    "consistency",
    "artifacts",
    "render cost/time posture",
    "next action",
  ];

  return {
    id: input.id ?? "video-draft-comparison",
    leftDraftId: input.leftDraftId ?? "video-draft-record-a",
    rightDraftId: input.rightDraftId ?? "video-draft-record-b",
    categories: input.categories ?? categories,
  };
}

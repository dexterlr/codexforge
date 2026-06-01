import type { VideoFailureRetryPlan } from "./video-failure-recovery-types";

export function buildVideoFailureRetryPlan(input: Partial<VideoFailureRetryPlan> = {}): VideoFailureRetryPlan {
  return {
    id: input.id ?? "video-failure-retry-plan",
    label: input.label ?? "Safe retry plan",
    steps: input.steps ?? ["Fix the most likely cause.", "Lower risky settings.", "Rebuild the job package.", "Ask for approval before any future retry."],
    runAllowed: false,
  };
}

import type { VideoSafetyCheck, VideoSafetyDecision, VideoSafetyDecisionStatus } from "./video-generation-safety-types";

function selectVideoSafetyDecisionStatus(checks: VideoSafetyCheck[]): VideoSafetyDecisionStatus {
  if (checks.some((check) => check.status === "block")) return "blocked-policy";
  if (checks.some((check) => check.category === "cloud" && check.status === "warn")) return "needs-cloud-review";
  if (checks.some((check) => check.category === "workflow" && check.status === "warn")) return "needs-workflow-review";
  if (checks.some((check) => check.category === "artifact" && check.status === "warn")) return "needs-artifact-plan";
  if (checks.some((check) => check.category === "local" && check.status === "warn")) return "needs-health-review";
  return "ready-for-real-local-trial-planning";
}

export function buildVideoSafetyDecision(
  checks: VideoSafetyCheck[],
  input: Partial<VideoSafetyDecision> = {}
): VideoSafetyDecision {
  const status = input.status ?? selectVideoSafetyDecisionStatus(checks);
  const blockers =
    input.blockers ??
    checks.filter((check) => check.status === "block" || check.status === "warn").map((check) => check.check);

  return {
    id: input.id ?? "video-safety-decision",
    status,
    plainEnglish:
      input.plainEnglish ??
      "The audit is for future real trial planning only. Generation remains blocked until the decision is ready and approved.",
    blockers,
    nextStep:
      input.nextStep ??
      (status === "ready-for-real-local-trial-planning"
        ? "Plan a small approved local trial next."
        : "Resolve warnings and blockers before planning any real trial."),
  };
}

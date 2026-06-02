import type { LocalVsCloudDecision, LocalVsCloudDecisionId, LocalVsCloudTask } from "./local-vs-cloud-types";

function chooseDecision(task: LocalVsCloudTask): LocalVsCloudDecisionId {
  if (task.privacySensitive) return "local-first";
  if (!task.localDraftAvailable) return "local-draft-then-review";
  if (task.finalQualityNeeded) return "cloud-final-review";
  return "local-final-candidate";
}

export function buildLocalVsCloudDecision(
  task: LocalVsCloudTask,
  input: Partial<LocalVsCloudDecision> = {}
): LocalVsCloudDecision {
  const decision = input.decision ?? chooseDecision(task);
  return {
    id: input.id ?? `${task.id}-decision`,
    decision,
    label: input.label ?? decision.replace(/-/g, " "),
    plainEnglish:
      input.plainEnglish ??
      (decision === "cloud-final-review"
        ? "Use cloud only as a reviewed final-quality option after local work is not good enough."
        : "Use local first because it is cheaper, more private, and easier to review."),
    reasons:
      input.reasons ??
      [
        "local generation saves money",
        "nothing is uploaded yet",
        "cloud providers are optional fallback only",
        "final render needs approval",
      ],
  };
}

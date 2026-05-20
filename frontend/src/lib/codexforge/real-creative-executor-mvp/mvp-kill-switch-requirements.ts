import type { MvpKillSwitchRequirements, MvpRequirement } from "./real-creative-mvp-types";
import { summarizeMvpRequirementStatus } from "./real-creative-mvp-types";

export function buildMvpKillSwitchRequirement(input: MvpRequirement): MvpRequirement {
  return input;
}

export function buildMvpKillSwitchRequirements(selectedCandidateId = "artifact-capture-only"): MvpKillSwitchRequirements {
  const labels = [
    "queued job cancellation",
    "running job cancellation future-only",
    "timeout policy",
    "partial artifact handling",
    "log preservation",
    "failure state handling",
    "manual stop instructions",
    "no current process termination in Phase 72",
    "future executor must implement stop boundary before real render",
  ];
  const requirements = labels.map((label) =>
    buildMvpKillSwitchRequirement({
      requirementId: label.replace(/[^a-z0-9]+/g, "-"),
      label,
      status: label.includes("future") ? "warning" : "satisfied",
      detail: `${label} is required before real render execution.`,
      evidence: "Phase 72 kill-switch posture.",
      blocker: label.includes("stop boundary"),
    })
  );
  const group: Omit<MvpKillSwitchRequirements, "summary"> = {
    groupId: "real-creative-mvp-kill-switch-requirements",
    selectedCandidateId,
    status: summarizeMvpRequirementStatus(requirements),
    requirements,
    blockerCount: 0,
    warningCount: requirements.filter((item) => item.status === "warning").length,
    noCurrentProcessTerminationInPhase72: true,
  };

  return { ...group, summary: summarizeMvpKillSwitchRequirements(group) };
}

export function summarizeMvpKillSwitchRequirements(group: Omit<MvpKillSwitchRequirements, "summary"> | MvpKillSwitchRequirements): string[] {
  return [
    `Kill-switch status: ${group.status}.`,
    "No current process termination in Phase 72.",
    "Future executor must implement stop boundary before real render.",
  ];
}

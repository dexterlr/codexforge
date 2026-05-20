import type { MvpRequirement, MvpRequirementGroup } from "./real-creative-mvp-types";
import { summarizeMvpRequirementStatus } from "./real-creative-mvp-types";

export function buildMvpApprovalRequirement(input: MvpRequirement): MvpRequirement {
  return input;
}

export function buildMvpApprovalRequirements(selectedCandidateId = "artifact-capture-only"): MvpRequirementGroup {
  const labels = [
    "operator explicitly selects candidate",
    "operator acknowledges executor kind",
    "operator acknowledges output boundary",
    "operator acknowledges side effects",
    "operator acknowledges resource/time risk",
    "operator acknowledges cancellation limits",
    "operator acknowledges rollback limits",
    "operator acknowledges artifact review",
    "operator confirms no secrets",
    "operator confirms latest-message authority",
  ];
  const requirements = labels.map((label) =>
    buildMvpApprovalRequirement({
      requirementId: label.replace(/[^a-z0-9]+/g, "-"),
      label,
      status: "satisfied",
      detail: `${label}; no approval means no future execution.`,
      evidence: "Approval packet requirement in Phase 72 design.",
      blocker: true,
    })
  );
  const group: Omit<MvpRequirementGroup, "summary"> = {
    groupId: "real-creative-mvp-approval-requirements",
    selectedCandidateId,
    status: summarizeMvpRequirementStatus(requirements),
    requirements,
    blockerCount: 0,
    warningCount: 0,
  };

  return { ...group, summary: summarizeMvpApprovalRequirements(group) };
}

export function summarizeMvpApprovalRequirements(group: Omit<MvpRequirementGroup, "summary"> | MvpRequirementGroup): string[] {
  return [
    `Approval status: ${group.status}.`,
    `${group.requirements.length} approval requirements must be acknowledged.`,
    "No approval means no future execution.",
  ];
}

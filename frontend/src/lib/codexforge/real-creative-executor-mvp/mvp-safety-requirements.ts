import type { MvpRequirement, MvpRequirementGroup } from "./real-creative-mvp-types";
import { summarizeMvpRequirementStatus } from "./real-creative-mvp-types";

export function buildMvpSafetyRequirement(input: MvpRequirement): MvpRequirement {
  return input;
}

export function buildMvpSafetyRequirements(selectedCandidateId = "artifact-capture-only"): MvpRequirementGroup {
  const requirements = [
    buildMvpSafetyRequirement({ requirementId: "no-arbitrary-command", label: "no arbitrary command", status: "satisfied", detail: "MVP design has no arbitrary command path.", evidence: "No command execution control exists.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "no-arbitrary-endpoint", label: "no arbitrary endpoint", status: "satisfied", detail: "MVP design has no arbitrary endpoint path.", evidence: "No local HTTP calls in deterministic files.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "no-external-network", label: "no external network", status: "satisfied", detail: "No provider or external network dependency.", evidence: "Design-only local data.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "no-secrets", label: "no secrets", status: "satisfied", detail: "No API keys or secrets are requested.", evidence: "Approval requires operator confirms no secrets.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "path-boundary-enforced", label: "path boundary enforced", status: "warning", detail: "Future executor must implement path guard before file output.", evidence: "Output boundary rules are explicit.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "output-root-enforced", label: "output root enforced", status: "warning", detail: "Future implementation must enforce artifact root.", evidence: "Artifact root required.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "artifact-overwrite-policy", label: "artifact overwrite policy", status: "warning", detail: "Overwrite requires explicit future approval.", evidence: "No overwrite unless explicitly allowed.", blocker: false }),
    buildMvpSafetyRequirement({ requirementId: "approval-packet-complete", label: "approval packet complete", status: "satisfied", detail: "Approval packet requirements are listed.", evidence: "No approval means no future execution.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "health-probe-evidence-present", label: "health probe evidence present", status: "warning", detail: "Required only for local tool candidates.", evidence: "Artifact capture candidate does not require local tool probe.", blocker: false }),
    buildMvpSafetyRequirement({ requirementId: "dry-run-evidence-present", label: "dry-run evidence present", status: "satisfied", detail: "Sandbox evidence is required before future execution.", evidence: "Creative Execution Sandbox handoff.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "kill-switch-plan-present", label: "kill-switch plan present", status: "satisfied", detail: "Queued cancellation and future stop boundary are required.", evidence: "Kill-switch requirements panel.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "cancellation-plan-present", label: "cancellation plan present", status: "satisfied", detail: "Cancellation limits are visible.", evidence: "No current process termination in Phase 72.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "artifact-review-required", label: "artifact review required", status: "satisfied", detail: "Artifact review is mandatory.", evidence: "/artifacts/review handoff.", blocker: true }),
    buildMvpSafetyRequirement({ requirementId: "logs-captured", label: "logs captured", status: "warning", detail: "Future executor must preserve logs.", evidence: "Log preservation requirement.", blocker: false }),
    buildMvpSafetyRequirement({ requirementId: "latest-message-authority-preserved", label: "latest-message authority preserved", status: "satisfied", detail: "Newest operator instruction remains authoritative.", evidence: "Approval and UI copy include preserve latest-message authority.", blocker: true }),
  ];
  const status = summarizeMvpRequirementStatus(requirements);
  const blockerCount = requirements.filter((item) => item.status === "blocker" || (item.blocker && item.status === "missing")).length;
  const warningCount = requirements.filter((item) => item.status === "warning").length;
  const group: Omit<MvpRequirementGroup, "summary"> = {
    groupId: "real-creative-mvp-safety-requirements",
    selectedCandidateId,
    status,
    requirements,
    blockerCount,
    warningCount,
  };

  return { ...group, summary: summarizeMvpSafetyRequirements(group) };
}

export function summarizeMvpSafetyRequirements(group: Omit<MvpRequirementGroup, "summary"> | MvpRequirementGroup): string[] {
  return [
    `Safety status: ${group.status}.`,
    `Safety blockers: ${group.blockerCount}; warnings: ${group.warningCount}.`,
    "No arbitrary command, no arbitrary endpoint, no external network, no secrets.",
    "Preserve latest-message authority.",
  ];
}

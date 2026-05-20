import type {
  DryRunEvidenceAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type DryRunCheckKey =
  | "sandboxRunExists"
  | "dryRunResultExists"
  | "fakeArtifactsLabeled"
  | "fakeLogsLabeled"
  | "verificationReportExists"
  | "noRealExecutionOccurred"
  | "cancellationSimulationExists"
  | "resultHandoffExists"
  | "futureExecutorPacketExists"
  | "evidenceIsContextNotAuthority";

const CHECKS: Array<{
  key: DryRunCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "sandboxRunExists", label: "sandbox run exists", critical: true, missingStatus: "blocker", detail: "Creative Execution Sandbox must provide lifecycle context before future execution readiness.", nextStep: "Run sandbox simulation." },
  { key: "dryRunResultExists", label: "dry-run result exists", critical: true, missingStatus: "blocker", detail: "Dry-run results are required evidence before any health probe or real executor MVP candidate.", nextStep: "Review dry-run result." },
  { key: "fakeArtifactsLabeled", label: "fake artifacts labeled", critical: true, missingStatus: "blocker", detail: "Placeholder artifacts need clear labeling.", nextStep: "Label fake artifacts." },
  { key: "fakeLogsLabeled", label: "fake logs labeled", critical: true, missingStatus: "blocker", detail: "Simulated logs must be clearly labeled as fake.", nextStep: "Label fake logs." },
  { key: "verificationReportExists", label: "verification report exists", critical: true, missingStatus: "blocker", detail: "Verification report evidence is required before future handoff.", nextStep: "Review verification report." },
  { key: "noRealExecutionOccurred", label: "no real execution occurred", critical: true, missingStatus: "blocker", detail: "Dry-run evidence is invalid if any real render, command, endpoint call, local app launch, or file write occurred.", nextStep: "Stop and stabilize before continuing." },
  { key: "cancellationSimulationExists", label: "cancellation simulation exists", critical: true, missingStatus: "blocker", detail: "Cancellation posture must be simulated before future execution design.", nextStep: "Review cancellation simulation." },
  { key: "resultHandoffExists", label: "result handoff exists", critical: false, missingStatus: "warning", detail: "Result handoff should link dry-run evidence to review surfaces.", nextStep: "Prepare result handoff." },
  { key: "futureExecutorPacketExists", label: "future executor packet exists", critical: false, missingStatus: "warning", detail: "Future executor packet is review context only and cannot authorize execution.", nextStep: "Prepare future executor packet." },
  { key: "evidenceIsContextNotAuthority", label: "evidence is context, not authority", critical: true, missingStatus: "blocker", detail: "Dry-run evidence informs review but does not override operator approval or latest-message authority.", nextStep: "Reframe evidence as context only." },
];

export function buildDryRunEvidenceItem(input: {
  input: RealCreativeReadinessInput;
  key: DryRunCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("dry-run-evidence-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Dry-run evidence is visible and labeled." : "Dry-run evidence is missing or unsafe.",
    critical: input.critical,
    nextStep: passed ? "Keep dry-run evidence review-first." : input.nextStep,
  };
}

export function buildDryRunEvidenceAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): DryRunEvidenceAudit {
  const items = CHECKS.map((check) => buildDryRunEvidenceItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("dry-run-evidence-audit", [
      input.auditId,
      input.targetExecutorKind,
    ]),
    targetExecutorKind: input.targetExecutorKind,
    status,
    items,
    blockerCount: items.filter((item) => item.status === "blocker" || item.status === "needs-config").length,
    warningCount: items.filter((item) => item.status === "warning").length,
    summary: [] as string[],
  };

  return { ...audit, summary: summarizeDryRunEvidenceAudit(audit) };
}

export function summarizeDryRunEvidenceAudit(
  audit: Pick<DryRunEvidenceAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Dry-run evidence status: ${audit.status}.`,
    `${audit.items.length} dry-run evidence checks reviewed; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Dry-run evidence audit checks sandbox run, dry-run result, fake artifacts/logs, verification report, no real execution occurred, cancellation simulation, handoff, future packet, and evidence is context, not authority.",
  ];
}

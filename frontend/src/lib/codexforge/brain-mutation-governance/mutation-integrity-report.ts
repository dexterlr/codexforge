import type {
  BrainMutationIntegrityCheck,
  BrainMutationIntegrityInput,
  BrainMutationIntegrityReport,
  BrainMutationIntegrityStatus,
} from "./brain-mutation-governance-types";
import {
  BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH,
  buildBrainMutationGovernanceStableKey,
} from "./brain-mutation-governance-types";

function statusFrom(
  value: boolean | null | undefined,
  fallback: BrainMutationIntegrityStatus
): BrainMutationIntegrityStatus {
  if (value === true || value === undefined || value === null) return "pass";
  return fallback;
}

export function buildBrainMutationIntegrityCheck(input: {
  id?: string;
  label: string;
  status: BrainMutationIntegrityStatus;
  detail: string;
  nextSafeAction?: string;
}): BrainMutationIntegrityCheck {
  return {
    id: input.id ?? buildBrainMutationGovernanceStableKey("brain-mutation-integrity", input.label),
    label: input.label,
    status: input.status,
    detail: input.detail,
    nextSafeAction: input.nextSafeAction ?? "Review this integrity check before mutation readiness.",
  };
}

export function buildBrainMutationIntegrityReport(
  input: BrainMutationIntegrityInput = {}
): BrainMutationIntegrityReport {
  const checks: BrainMutationIntegrityCheck[] = [
    buildBrainMutationIntegrityCheck({
      label: "canonical graph schema path visible",
      status: statusFrom(input.canonicalGraphSchemaPathVisible, "blocker"),
      detail: `Integrity report checks canonical graph schema path: ${BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH}.`,
      nextSafeAction: "Confirm canonical graph schema path is visible before policy approval.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "runtime event executor exists",
      status: statusFrom(input.runtimeEventExecutorExists, "blocker"),
      detail: "Guarded Runtime Event Executor boundary must exist before append-only event execution.",
      nextSafeAction: "Review Runtime Event Executor.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "runtime event journal exists",
      status: statusFrom(input.runtimeEventJournalExists, "blocker"),
      detail: "Runtime Event Journal must remain visible as append-only audit posture.",
      nextSafeAction: "Review runtime event journal.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "memory promotion gate exists",
      status: statusFrom(input.memoryPromotionGateExists, "risk"),
      detail: "Memory Promotion Gate must govern memory.promoted before executor handoff.",
      nextSafeAction: "Review memory promotion gate.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "direct UI mutation blocked",
      status: statusFrom(input.directUiMutationBlocked, "blocker"),
      detail: "Integrity report checks direct UI mutation blocked and no graph mutation from UI.",
      nextSafeAction: "Inspect direct mutation signal if this check fails.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "appendEvent UI calls absent if supplied",
      status: statusFrom(input.appendEventUiCallsAbsent, "blocker"),
      detail: "appendEvent is executor-domain-only and must be absent from supplied UI labels.",
      nextSafeAction: "Route append-only events through Runtime Event Executor.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "reducer preview available",
      status: statusFrom(input.reducerPreviewAvailable, "risk"),
      detail: "Runtime Event Replay Simulator readiness makes reducer preview, impact analysis, risk detection, and rollback guidance visible before mutation readiness.",
      nextSafeAction: "Review runtime event replay.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "policy confirmation visible",
      status: statusFrom(input.policyConfirmationVisible, "warning"),
      detail: "Policy confirmation should be visible before any request-ready boundary.",
      nextSafeAction: "Review mutation policy panel.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "audit ledger visible",
      status: statusFrom(input.auditLedgerVisible, "warning"),
      detail: "Audit ledger or Runtime Event Journal entry must be visible for mutation lifecycle review.",
      nextSafeAction: "Review runtime event journal and executor audit ledger.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "smoke coverage present",
      status: statusFrom(input.smokeCoveragePresent, "risk"),
      detail: "Integrity report checks smoke coverage present for Brain Mutation Governance.",
      nextSafeAction: "Run brain mutation governance smoke manually.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "legacy brain-graph import absent",
      status: statusFrom(input.legacyBrainGraphImportAbsent, "blocker"),
      detail: "Legacy brain-graph import must be absent; canonical graph schema is required.",
      nextSafeAction: "Remove legacy import from the supplied mutation boundary.",
    }),
    buildBrainMutationIntegrityCheck({
      label: "latest-message authority preserved",
      status: statusFrom(input.latestMessageAuthorityPreserved, "blocker"),
      detail: "Preserve latest-message authority before any review or handoff.",
      nextSafeAction: "Resolve instruction conflicts before feature work.",
    }),
  ];

  const report: BrainMutationIntegrityReport = {
    id: "brain-mutation-integrity-report",
    checks,
    passCount: checks.filter((check) => check.status === "pass").length,
    warningCount: checks.filter((check) => check.status === "warning").length,
    riskCount: checks.filter((check) => check.status === "risk").length,
    blockerCount: checks.filter((check) => check.status === "blocker").length,
    unknownCount: checks.filter((check) => check.status === "unknown").length,
    summary: [],
  };

  return { ...report, summary: summarizeBrainMutationIntegrityReport(report) };
}

export function summarizeBrainMutationIntegrityReport(
  report: Pick<BrainMutationIntegrityReport, "passCount" | "warningCount" | "riskCount" | "blockerCount" | "unknownCount">
): string[] {
  return [
    `${report.passCount} integrity checks pass.`,
    `${report.warningCount} warning, ${report.riskCount} risk, ${report.blockerCount} blocker, and ${report.unknownCount} unknown checks visible.`,
    "Integrity checks cover canonical schema, executor, journal, memory promotion gate, direct UI mutation blocked, reducer preview, policy confirmation, audit ledger, smoke coverage, legacy import absence, and latest-message authority.",
  ];
}

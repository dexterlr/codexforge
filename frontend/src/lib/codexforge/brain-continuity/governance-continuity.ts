import type { BrainContinuityCheck, BrainContinuityInput, BrainContinuityPosture, BrainGovernanceContinuity } from "./brain-continuity-types";
import { booleanStatus, buildBrainContinuityStableKey } from "./brain-continuity-types";

function derivePosture(checks: readonly BrainContinuityCheck[]): BrainContinuityPosture {
  if (checks.some((check) => check.status === "blocked")) return "blocked";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "unknown")) return "needs-review";
  return "healthy";
}

export function buildBrainGovernanceContinuityCheck(args: { id: string; label: string; visible?: boolean | null; detail: string; nextAction: string }): BrainContinuityCheck {
  const status = booleanStatus(args.visible);
  return { id: buildBrainContinuityStableKey("brain-governance-continuity", args.id), label: args.label, status, detail: args.detail, reviewRequired: status !== "pass", nextAction: args.nextAction };
}

export function buildBrainGovernanceContinuity(input: BrainContinuityInput = {}): BrainGovernanceContinuity {
  const checks = [
    buildBrainGovernanceContinuityCheck({ id: "canonical-schema-enforced", label: "Canonical schema enforced", visible: input.canonicalSchemaEnforced ?? true, detail: "governance continuity checks canonical schema.", nextAction: "Review canonical schema." }),
    buildBrainGovernanceContinuityCheck({ id: "legacy-brain-graph-import-blocked", label: "Legacy brain-graph import blocked", visible: input.legacyBrainGraphImportBlocked ?? true, detail: "governance continuity checks legacy brain-graph import blocked.", nextAction: "Keep legacy imports blocked." }),
    buildBrainGovernanceContinuityCheck({ id: "direct-ui-graph-mutation-blocked", label: "Direct UI graph mutation blocked", visible: input.directUiGraphMutationBlocked ?? true, detail: "governance continuity checks direct UI graph mutation blocked.", nextAction: "Do not mutate Brain graph from UI." }),
    buildBrainGovernanceContinuityCheck({ id: "appendEvent-ui-calls-blocked", label: "appendEvent UI calls blocked", visible: input.appendEventUiCallsBlocked ?? true, detail: "appendEvent UI calls are blocked from continuity.", nextAction: "Use journal review only." }),
    buildBrainGovernanceContinuityCheck({ id: "runtime-event-executor-exists", label: "Runtime event executor exists", visible: input.runtimeEventExecutorExists ?? true, detail: "Guarded Runtime Event Executor boundary exists.", nextAction: "Review executor readiness." }),
    buildBrainGovernanceContinuityCheck({ id: "runtime-event-journal-exists", label: "Runtime event journal exists", visible: input.runtimeEventJournalExists ?? true, detail: "Runtime Event Journal exists for audit.", nextAction: "Review journal health." }),
    buildBrainGovernanceContinuityCheck({ id: "memory-promotion-gate-exists", label: "Memory promotion gate exists", visible: input.memoryPromotionGateExists ?? true, detail: "Memory Promotion Gate exists and remains review-gated.", nextAction: "Review memory promotion gate." }),
    buildBrainGovernanceContinuityCheck({ id: "brain-snapshot-manager-exists", label: "Brain snapshot manager exists", visible: input.brainSnapshotManagerExists ?? true, detail: "Brain Snapshot Manager exists for snapshot posture.", nextAction: "Review Brain snapshots." }),
    buildBrainGovernanceContinuityCheck({ id: "restore-gate-exists", label: "Restore gate exists", visible: input.restoreGateExists ?? true, detail: "Snapshot Restore Gate exists and restore remains blocked.", nextAction: "Review snapshot restore gate." }),
    buildBrainGovernanceContinuityCheck({ id: "reducer-preview-required", label: "Reducer preview required", visible: input.reducerPreviewRequired ?? true, detail: "Reducer preview required before any mutation boundary.", nextAction: "Inspect reducer preview." }),
    buildBrainGovernanceContinuityCheck({ id: "latest-message-authority-preserved", label: "Latest-message authority preserved", visible: input.latestMessageAuthorityPreserved ?? true, detail: "Latest-message authority preserved for continuity review.", nextAction: "Stop and stabilize if authority is unclear." }),
  ];
  const posture = derivePosture(checks);
  return {
    id: "brain-governance-continuity",
    checks,
    posture,
    passCount: checks.filter((check) => check.status === "pass").length,
    warningCount: checks.filter((check) => check.status === "unknown" || check.status === "warning").length,
    riskCount: checks.filter((check) => check.status === "risk").length,
    blockedCount: checks.filter((check) => check.status === "blocked").length,
    summary: summarizeBrainGovernanceContinuity({ checks, posture } as BrainGovernanceContinuity),
  };
}

export function summarizeBrainGovernanceContinuity(model: Pick<BrainGovernanceContinuity, "checks" | "posture">): string[] {
  return [`Governance posture is ${model.posture}.`, `${model.checks.length} governance checks are visible.`, "Governance continuity is read-only and review-gated."];
}

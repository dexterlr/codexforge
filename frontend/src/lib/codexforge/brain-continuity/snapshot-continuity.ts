import type { BrainContinuityCheck, BrainContinuityInput, BrainContinuityPosture, BrainSnapshotContinuity } from "./brain-continuity-types";
import { booleanStatus, buildBrainContinuityStableKey } from "./brain-continuity-types";

function posture(checks: readonly BrainContinuityCheck[]): BrainContinuityPosture {
  if (checks.some((check) => check.status === "blocked")) return "blocked";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "unknown")) return "needs-review";
  return "healthy";
}

export function buildBrainSnapshotContinuityItem(args: { id: string; label: string; visible?: boolean | null; detail: string; nextAction: string }): BrainContinuityCheck {
  const status = booleanStatus(args.visible);
  return { id: buildBrainContinuityStableKey("brain-snapshot-continuity", args.id), label: args.label, status, detail: args.detail, reviewRequired: status !== "pass", nextAction: args.nextAction };
}

export function buildBrainSnapshotContinuity(input: BrainContinuityInput = {}): BrainSnapshotContinuity {
  const items = [
    buildBrainSnapshotContinuityItem({ id: "latest-snapshot-available", label: "Latest snapshot available", visible: input.latestSnapshotAvailable ?? true, detail: "Latest snapshot availability is visible for continuity review.", nextAction: "Review Brain snapshots." }),
    buildBrainSnapshotContinuityItem({ id: "snapshot-integrity-checked", label: "Snapshot integrity checked", visible: input.snapshotIntegrityChecked ?? true, detail: "Snapshot integrity is checked before replay or restore planning.", nextAction: "Review snapshot integrity." }),
    buildBrainSnapshotContinuityItem({ id: "snapshot-comparison-available", label: "Snapshot comparison available", visible: input.snapshotComparisonAvailable ?? true, detail: "Snapshot comparison is available for restore evidence.", nextAction: "Compare snapshots before restore planning." }),
    buildBrainSnapshotContinuityItem({ id: "snapshot-replay-selector-available", label: "Snapshot replay selector available", visible: input.snapshotReplaySelectorAvailable ?? true, detail: "Snapshot replay selector is available for Runtime Event Replay.", nextAction: "Select snapshot for replay preview." }),
    buildBrainSnapshotContinuityItem({ id: "snapshot-rollback-plan-visible", label: "Snapshot rollback plan visible", visible: input.snapshotRollbackPlanVisible ?? true, detail: "Rollback plan is visible as review context only.", nextAction: "Review rollback plan." }),
    buildBrainSnapshotContinuityItem({ id: "snapshot-restore-blocked-by-default", label: "Snapshot restore blocked by default", visible: true, detail: "snapshot restore blocked by default; continuity does not execute restore.", nextAction: "Review Snapshot Restore Gate." }),
    buildBrainSnapshotContinuityItem({ id: "canonical-graph-schema-visible", label: "Canonical graph schema visible", visible: input.schemaKnown ?? true, detail: "Canonical Brain graph schema is visible for snapshot posture.", nextAction: "Review canonical graph schema." }),
    buildBrainSnapshotContinuityItem({ id: "saveBrainGraph-from-ui-blocked", label: "saveBrainGraph from UI blocked", visible: input.directUiGraphMutationBlocked ?? true, detail: "saveBrainGraph from UI blocked for continuity and restore surfaces.", nextAction: "Keep snapshot review read-only." }),
  ];
  const currentPosture = posture(items);
  return {
    id: "brain-snapshot-continuity",
    items,
    posture: currentPosture,
    readyCount: items.filter((item) => item.status === "pass").length,
    reviewCount: items.filter((item) => item.reviewRequired).length,
    blockedCount: items.filter((item) => item.status === "blocked").length,
    summary: summarizeBrainSnapshotContinuity({ items, posture: currentPosture } as BrainSnapshotContinuity),
  };
}

export function summarizeBrainSnapshotContinuity(model: Pick<BrainSnapshotContinuity, "items" | "posture">): string[] {
  return [`Brain snapshot posture is ${model.posture}.`, `${model.items.length} snapshot continuity items are visible.`, "Snapshot continuity is read-only and does not persist snapshots."];
}

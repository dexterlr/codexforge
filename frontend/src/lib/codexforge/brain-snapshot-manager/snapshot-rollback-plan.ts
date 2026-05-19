import type { BrainSnapshotModel, BrainSnapshotRollbackOption, BrainSnapshotRollbackPlan } from "./brain-snapshot-types";
import { compareBrainSnapshots } from "./snapshot-comparison";

export function buildBrainSnapshotRollbackOption(input: BrainSnapshotRollbackOption): BrainSnapshotRollbackOption {
  return input;
}

export function buildBrainSnapshotRollbackPlan(args: {
  currentSnapshot: BrainSnapshotModel;
  targetSnapshot: BrainSnapshotModel;
}): BrainSnapshotRollbackPlan {
  const comparison = compareBrainSnapshots(args.targetSnapshot, args.currentSnapshot);
  const options: BrainSnapshotRollbackOption[] = [
    buildBrainSnapshotRollbackOption({ id: "no-rollback-inspect-first", kind: "inspect-first", label: "No rollback; inspect first", detail: "Review snapshot comparison, integrity, replay output, memory governance, and audit evidence before planning any corrective action.", allowedInPhase50: true, riskLevel: "low" }),
    buildBrainSnapshotRollbackOption({ id: "reject-pending-runtime-event", kind: "reject-pending-runtime-event", label: "Reject pending runtime event", detail: "If a pending runtime event caused the risky delta, reject it through governance rather than restoring graph state.", allowedInPhase50: true, riskLevel: "medium" }),
    buildBrainSnapshotRollbackOption({ id: "corrective-runtime-event-after-approval", kind: "create-corrective-runtime-event-after-approval", label: "Create corrective runtime event after approval", detail: "Prepare corrective event only after approval; Phase 50 does not appendEvent from UI.", allowedInPhase50: false, riskLevel: "high" }),
    buildBrainSnapshotRollbackOption({ id: "future-guarded-snapshot-executor", kind: "future-guarded-snapshot-executor", label: "Restore previous graph only in future guarded snapshot executor", detail: "Snapshot restore is blocked in Phase 50 and must never restore automatically.", allowedInPhase50: false, riskLevel: "critical" }),
    buildBrainSnapshotRollbackOption({ id: "stop-and-stabilize", kind: "stop-and-stabilize", label: "Stop and stabilize", detail: "Pause mutation planning and review runtime event journal, replay simulator, governance console, and stabilization posture.", allowedInPhase50: true, riskLevel: "medium" }),
  ];

  const plan: BrainSnapshotRollbackPlan = {
    currentSnapshotId: args.currentSnapshot.id,
    targetSnapshotId: args.targetSnapshot.id,
    options,
    reviewSteps: [
      "Compare current snapshot to target snapshot.",
      "Review runtime event journal before any rollback plan.",
      "Review replay simulator output and reducer preview.",
      "Review memory governance for promotion and contradiction risk.",
      "Prepare corrective event only after approval.",
      "Never restore automatically and never mutate live graph from UI.",
      "Preserve evidence and audit ledger.",
    ],
    summary: [],
  };
  plan.summary = summarizeBrainSnapshotRollbackPlan(plan).concat(comparison.summary);
  return plan;
}

export function summarizeBrainSnapshotRollbackPlan(plan: BrainSnapshotRollbackPlan): string[] {
  return [
    `Rollback plan compares current ${plan.currentSnapshotId} to target ${plan.targetSnapshotId}.`,
    "Rollback planning is conceptual and read-only; never restore automatically.",
    "Review runtime event journal and replay simulator before any future guarded corrective action.",
  ];
}

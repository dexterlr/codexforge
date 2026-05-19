import type {
  BrainContinuityNextAction,
  BrainContinuityNextActionKind,
  BrainContinuityNextActionPlan,
  BrainContinuityRoute,
  BrainContinuitySignal,
  BrainGovernanceContinuity,
  BrainSnapshotContinuity,
  MemoryGrowthModel,
  RuntimeEventJournalHealth,
  RuntimeReplayContinuity,
  SnapshotRestoreContinuityRisk,
} from "./brain-continuity-types";
import { BRAIN_CONTINUITY_VALIDATION_COMMANDS, buildBrainContinuityStableKey } from "./brain-continuity-types";

function action(actionKind: BrainContinuityNextActionKind, title: string, detail: string, targetRoute: BrainContinuityRoute, priority: "primary" | "secondary" = "secondary", reviewRequired = true): BrainContinuityNextAction {
  return { id: buildBrainContinuityStableKey("brain-continuity-next-action", actionKind, title), action: actionKind, title, detail, priority, targetRoute, reviewRequired };
}

export function selectBrainContinuityNextAction(args: {
  signals?: readonly BrainContinuitySignal[];
  memoryGrowth?: MemoryGrowthModel;
  journalHealth?: RuntimeEventJournalHealth;
  snapshotContinuity?: BrainSnapshotContinuity;
  replayContinuity?: RuntimeReplayContinuity;
  restoreRisk?: SnapshotRestoreContinuityRisk;
  governanceContinuity?: BrainGovernanceContinuity;
} = {}): BrainContinuityNextAction {
  if (args.signals?.some((signal) => signal.severity === "blocker")) return action("stop and stabilize", "Stop and stabilize", "Blockers are visible; stop feature work and review continuity risks.", "/stabilization", "primary");
  if (args.governanceContinuity?.posture === "blocked" || args.governanceContinuity?.posture === "risk") return action("review Brain mutation governance", "Review Brain mutation governance", "Direct mutation risk comes before all feature work.", "/brain-governance", "primary");
  if (args.restoreRisk?.posture === "blocked" || args.restoreRisk?.posture === "risk") return action("review snapshot restore gate", "Review snapshot restore gate", "Restore risk comes before runtime execution.", "/snapshot-restore", "primary");
  if (args.journalHealth?.posture !== "healthy") return action("review runtime event journal", "Review runtime event journal", "Journal health comes before promotion.", "/runtime-journal", "primary");
  if (args.snapshotContinuity?.posture !== "healthy") return action("review Brain snapshots", "Review Brain snapshots", "Snapshot integrity comes before replay readiness.", "/brain-snapshots", "primary");
  if (args.replayContinuity?.posture !== "healthy") return action("review runtime replay", "Review runtime replay", "Replay readiness comes before restore planning.", "/runtime-replay", "primary");
  if (args.memoryGrowth?.posture === "risk" || args.memoryGrowth?.posture === "warning" || args.memoryGrowth?.posture === "blocked") return action("review memory inbox", "Review memory inbox", "Memory risks come before promotion.", "/memory-inbox", "primary");
  return action("commit clean checkpoint", "Recommend commit clean checkpoint", "Continuity is clean enough to checkpoint or continue next phase; the UI never commits.", "smoke suite", "primary", true);
}

export function buildBrainContinuityNextActionPlan(args: Parameters<typeof selectBrainContinuityNextAction>[0] = {}): BrainContinuityNextActionPlan {
  const selected = selectBrainContinuityNextAction(args);
  const orderedActions = [
    selected,
    action("review memory inbox", "Review memory inbox", "Review pending memory before promotion.", "/memory-inbox"),
    action("review memory promotion gate", "Review memory promotion gate", "Review promotion policy and preview before memory.promoted events.", "/memory"),
    action("review runtime event journal", "Review runtime event journal", "Check audit visibility before promotion.", "/runtime-journal"),
    action("review runtime event executor", "Review runtime event executor", "Confirm guarded executor readiness without executing events.", "/runtime-journal"),
    action("review Brain mutation governance", "Review Brain mutation governance", "Check canonical schema and direct mutation boundaries.", "/brain-governance"),
    action("review runtime replay", "Review runtime replay", "Confirm replay is preview-only.", "/runtime-replay"),
    action("review Brain snapshots", "Review Brain snapshots", "Confirm snapshot integrity and comparison.", "/brain-snapshots"),
    action("review snapshot restore gate", "Review snapshot restore gate", "Confirm restore blocked by default and evidence posture.", "/snapshot-restore"),
    action("run Brain runtime smoke manually", "Run Brain runtime smoke manually", "Manual validation only; continuity UI does not run tests.", "smoke suite"),
    action("run snapshot restore smoke manually", "Run snapshot restore smoke manually", "Manual validation only; continuity UI does not run tests.", "smoke suite"),
    action("continue next phase", "Continue next phase", "Continue only when continuity posture remains clean.", "/mission"),
  ].filter((item, index, list) => list.findIndex((candidate) => candidate.action === item.action) === index);
  const blockers = args.signals?.filter((signal) => signal.severity === "blocker").map((signal) => signal.title) ?? [];
  const warnings = args.signals?.filter((signal) => signal.severity === "warning" || signal.severity === "risk").map((signal) => signal.title) ?? [];
  return {
    id: "brain-continuity-next-action-plan",
    selected,
    orderedActions,
    blockers,
    warnings,
    validationCommands: [...BRAIN_CONTINUITY_VALIDATION_COMMANDS],
    summary: summarizeBrainContinuityNextAction(selected),
  };
}

export function summarizeBrainContinuityNextAction(actionOrPlan: BrainContinuityNextAction | BrainContinuityNextActionPlan): string[] {
  const selected = "selected" in actionOrPlan ? actionOrPlan.selected : actionOrPlan;
  return [`Next safe continuity action: ${selected.action}.`, selected.detail, "Next action selection is deterministic and review-gated."];
}

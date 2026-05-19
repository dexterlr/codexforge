import type { BrainContinuityCheck, BrainContinuityInput, BrainContinuityPosture, RuntimeReplayContinuity } from "./brain-continuity-types";
import { booleanStatus, buildBrainContinuityStableKey } from "./brain-continuity-types";

function derive(checks: readonly BrainContinuityCheck[]): BrainContinuityPosture {
  if (checks.some((check) => check.status === "blocked")) return "blocked";
  if (checks.some((check) => check.status === "unknown")) return "needs-review";
  return "healthy";
}

export function buildRuntimeReplayContinuityCheck(args: { id: string; label: string; visible?: boolean | null; detail: string; nextAction: string }): BrainContinuityCheck {
  const status = booleanStatus(args.visible);
  return { id: buildBrainContinuityStableKey("runtime-replay-continuity", args.id), label: args.label, status, detail: args.detail, reviewRequired: status !== "pass", nextAction: args.nextAction };
}

export function buildRuntimeReplayContinuity(input: BrainContinuityInput = {}): RuntimeReplayContinuity {
  const checks = [
    buildRuntimeReplayContinuityCheck({ id: "replay-simulator-available", label: "Replay simulator available", visible: input.replaySimulatorAvailable ?? true, detail: "Runtime Event Replay Simulator is available.", nextAction: "Review runtime replay." }),
    buildRuntimeReplayContinuityCheck({ id: "reducer-simulation-available", label: "Reducer simulation available", visible: input.reducerSimulationAvailable ?? true, detail: "Reducer simulation is available for preview.", nextAction: "Inspect reducer simulation." }),
    buildRuntimeReplayContinuityCheck({ id: "replay-uses-cloned-data", label: "Replay uses cloned data", visible: input.replayUsesClonedData ?? true, detail: "Replay uses cloned data and does not mutate supplied graph.", nextAction: "Keep replay preview-only." }),
    buildRuntimeReplayContinuityCheck({ id: "appendEvent-absent-in-replay", label: "appendEvent absent in replay", visible: true, detail: "appendEvent absent in replay UI and continuity UI.", nextAction: "Do not append runtime events from replay." }),
    buildRuntimeReplayContinuityCheck({ id: "replay-risk-detector-available", label: "Replay risk detector available", visible: input.replayRiskDetectorAvailable ?? true, detail: "Replay risk detector is available.", nextAction: "Review replay risks." }),
    buildRuntimeReplayContinuityCheck({ id: "rollback-advisor-available", label: "Rollback advisor available", visible: input.rollbackAdvisorAvailable ?? true, detail: "Rollback advisor is available as read-only guidance.", nextAction: "Review rollback advice." }),
    buildRuntimeReplayContinuityCheck({ id: "memory-promoted-replay-supported", label: "memory.promoted replay supported", visible: true, detail: "memory.promoted replay supported for audit simulation.", nextAction: "Review memory promotion replay." }),
    buildRuntimeReplayContinuityCheck({ id: "snapshot-selection-supported", label: "Snapshot selection supported", visible: input.snapshotSelectionSupported ?? true, detail: "Snapshot selection supported before replay.", nextAction: "Review Brain snapshots first." }),
    buildRuntimeReplayContinuityCheck({ id: "replay-preview-only", label: "Replay is preview-only", visible: true, detail: "replay continuity says preview-only; no replay persistence.", nextAction: "Use replay evidence for review only." }),
  ];
  const currentPosture = derive(checks);
  return {
    id: "runtime-replay-continuity",
    checks,
    posture: currentPosture,
    readyCount: checks.filter((check) => check.status === "pass").length,
    warningCount: checks.filter((check) => check.status === "unknown" || check.status === "warning").length,
    blockedCount: checks.filter((check) => check.status === "blocked").length,
    summary: summarizeRuntimeReplayContinuity({ checks, posture: currentPosture } as RuntimeReplayContinuity),
  };
}

export function summarizeRuntimeReplayContinuity(model: Pick<RuntimeReplayContinuity, "checks" | "posture">): string[] {
  return [`Runtime replay posture is ${model.posture}.`, `${model.checks.length} replay readiness checks are visible.`, "Replay readiness must precede restore planning."];
}

import { buildBrainContinuitySignals, summarizeBrainContinuitySignals } from "./continuity-signal-model";
import { buildMemoryGrowthModel } from "./memory-growth-model";
import { buildRuntimeEventJournalHealth } from "./event-journal-health";
import { buildBrainSnapshotContinuity } from "./snapshot-continuity";
import { buildRuntimeReplayContinuity } from "./replay-continuity";
import { buildSnapshotRestoreContinuityRisk } from "./restore-continuity-risk";
import { buildBrainGovernanceContinuity } from "./governance-continuity";
import { buildBrainContinuityNextActionPlan } from "./continuity-next-action";
import type { BrainContinuityInput, BrainContinuityPosture, BrainContinuitySession, BrainContinuitySummary } from "./brain-continuity-types";

function worstPosture(postures: readonly BrainContinuityPosture[]): BrainContinuityPosture {
  if (postures.includes("blocked")) return "blocked";
  if (postures.includes("risk")) return "risk";
  if (postures.includes("warning")) return "warning";
  if (postures.includes("needs-review")) return "needs-review";
  if (postures.includes("unknown")) return "unknown";
  return "healthy";
}

export function buildBrainContinuitySummary(input: BrainContinuityInput = {}): BrainContinuitySession {
  const signals = buildBrainContinuitySignals(input);
  const signalSummary = summarizeBrainContinuitySignals(signals);
  const memoryGrowth = buildMemoryGrowthModel(input);
  const journalHealth = buildRuntimeEventJournalHealth(input);
  const snapshotContinuity = buildBrainSnapshotContinuity(input);
  const replayContinuity = buildRuntimeReplayContinuity(input);
  const restoreRisk = buildSnapshotRestoreContinuityRisk(input);
  const governanceContinuity = buildBrainGovernanceContinuity(input);
  const nextActionPlan = buildBrainContinuityNextActionPlan({ signals, memoryGrowth, journalHealth, snapshotContinuity, replayContinuity, restoreRisk, governanceContinuity });
  const overallPosture = worstPosture([memoryGrowth.posture, journalHealth.posture, snapshotContinuity.posture, replayContinuity.posture, restoreRisk.posture, governanceContinuity.posture]);
  const continuitySummary: BrainContinuitySummary = {
    id: "brain-continuity-summary",
    overallPosture,
    signalCount: signalSummary.signalCount,
    blockerCount: signalSummary.blockerCount,
    warningCount: signalSummary.warningCount + signalSummary.riskCount,
    memoryGrowthPosture: memoryGrowth.posture,
    journalHealthPosture: journalHealth.posture,
    snapshotPosture: snapshotContinuity.posture,
    replayPosture: replayContinuity.posture,
    restoreRiskPosture: restoreRisk.posture,
    governancePosture: governanceContinuity.posture,
    nextSafeAction: nextActionPlan.selected.action,
    summary: summarizeBrainContinuitySession({
      overallPosture,
      signalCount: signalSummary.signalCount,
      blockerCount: signalSummary.blockerCount,
      warningCount: signalSummary.warningCount + signalSummary.riskCount,
      memoryGrowthPosture: memoryGrowth.posture,
      journalHealthPosture: journalHealth.posture,
      snapshotPosture: snapshotContinuity.posture,
      replayPosture: replayContinuity.posture,
      restoreRiskPosture: restoreRisk.posture,
      governancePosture: governanceContinuity.posture,
      nextSafeAction: nextActionPlan.selected.action,
    } as BrainContinuitySummary),
  };
  const handoff = [
    "Brain Continuity Dashboard handoff",
    "",
    `Overall posture: ${continuitySummary.overallPosture}`,
    `Next safe action: ${continuitySummary.nextSafeAction}`,
    "Read-only: no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI, no auto-persistence.",
    "Preserve latest-message authority.",
  ].join("\n");
  return { signals, signalSummary, memoryGrowth, journalHealth, snapshotContinuity, replayContinuity, restoreRisk, governanceContinuity, nextActionPlan, continuitySummary, handoff };
}

export function summarizeBrainContinuitySession(summary: BrainContinuitySummary): string[] {
  return [
    `Overall Brain continuity posture is ${summary.overallPosture}.`,
    `${summary.signalCount} signals, ${summary.blockerCount} blockers, and ${summary.warningCount} warnings are visible.`,
    `Postures: memory ${summary.memoryGrowthPosture}, journal ${summary.journalHealthPosture}, snapshots ${summary.snapshotPosture}, replay ${summary.replayPosture}, restore ${summary.restoreRiskPosture}, governance ${summary.governancePosture}.`,
    `Next safe action is ${summary.nextSafeAction}.`,
  ];
}

import { buildContinuityHandoffBrainPosture } from "./handoff-brain-posture";
import { buildContinuityHandoffExport } from "./handoff-export";
import { buildContinuityHandoffMemoryPosture } from "./handoff-memory-posture";
import { buildContinuityHandoffNextActionPlan } from "./handoff-next-actions";
import { buildContinuityHandoffPacket } from "./handoff-packet-builder";
import { buildContinuityHandoffRiskSummary } from "./handoff-risk-summary";
import { buildContinuityHandoffRollbackPosture } from "./handoff-rollback-posture";
import { buildContinuityHandoffState } from "./handoff-state-model";
import { buildContinuityHandoffValidationPlan } from "./handoff-validation-plan";
import type { ContinuityHandoffInput, ContinuityHandoffSession, ContinuityHandoffSummary } from "./continuity-handoff-types";

export function buildContinuityHandoffSummary(input: ContinuityHandoffInput = {}): ContinuityHandoffSession {
  const state = buildContinuityHandoffState(input);
  const risks = buildContinuityHandoffRiskSummary(input);
  const validationPlan = buildContinuityHandoffValidationPlan();
  const rollbackPosture = buildContinuityHandoffRollbackPosture();
  const memoryPosture = buildContinuityHandoffMemoryPosture(input);
  const brainPosture = buildContinuityHandoffBrainPosture(input);
  const nextActions = buildContinuityHandoffNextActionPlan({ risks, buildPassed: input.buildPassed, smokePassed: input.smokePassed, mutationRiskVisible: input.mutationRiskVisible, memoryRiskVisible: input.pendingMemoryCandidates !== null && input.pendingMemoryCandidates !== undefined && input.pendingMemoryCandidates > 0, restoreRiskVisible: input.restoreRiskVisible, clean: input.buildPassed === true && input.smokePassed === true });
  const packet = buildContinuityHandoffPacket({ state, risks, validationPlan, rollbackPosture, memoryPosture, brainPosture, nextActions });
  const exportPayload = buildContinuityHandoffExport({ packet, validationPlan, rollbackPosture, memoryPosture });
  const sessionSummary: ContinuityHandoffSummary = {
    id: "continuity-handoff-summary",
    packetReady: true,
    riskCount: risks.riskCount,
    blockerCount: risks.blockerCount,
    validationCommandCount: validationPlan.commands.length,
    rollbackOptionCount: rollbackPosture.options.length,
    memoryPosture: memoryPosture.memoryInboxStatus,
    brainPosture: brainPosture.brainContinuityStatus,
    nextSafeAction: nextActions.selected.action,
    summary: [],
  };
  return {
    state,
    risks,
    validationPlan,
    rollbackPosture,
    memoryPosture,
    brainPosture,
    nextActions,
    packet,
    exportPayload,
    sessionSummary: { ...sessionSummary, summary: summarizeContinuityHandoffSession(sessionSummary) },
  };
}

export function summarizeContinuityHandoffSession(summary: ContinuityHandoffSummary): string[] {
  return [
    `Packet ready: ${summary.packetReady ? "yes" : "no"}.`,
    `${summary.riskCount} risks, ${summary.blockerCount} blockers, ${summary.validationCommandCount} validation commands, and ${summary.rollbackOptionCount} rollback options are visible.`,
    `Memory posture ${summary.memoryPosture}; Brain posture ${summary.brainPosture}.`,
    `Next safe action is ${summary.nextSafeAction}.`,
  ];
}

export * from "./runtime-event-replay-types";
export * from "./replay-input";
export * from "./replay-snapshot-model";
export * from "./replay-event-sequence";
export * from "./replay-reducer-simulator";
export * from "./replay-impact-analysis";
export * from "./replay-risk-detector";
export * from "./replay-rollback-advisor";
export * from "./replay-summary";

export {
  buildRuntimeReplaySnapshot,
  normalizeRuntimeReplaySnapshot,
} from "./replay-snapshot-model";
export {
  buildRuntimeReplayEventSequence,
  buildRuntimeReplayEventSequenceItem,
} from "./replay-event-sequence";
export {
  simulateRuntimeEventReplay,
  simulateRuntimeEventReplayStep,
} from "./replay-reducer-simulator";
export {
  buildRuntimeReplayImpactAnalysis,
  buildRuntimeReplayImpactItem,
} from "./replay-impact-analysis";
export {
  buildRuntimeReplayRiskReport,
  buildRuntimeReplayRiskItem,
} from "./replay-risk-detector";
export {
  buildRuntimeReplayRollbackAdvice,
  buildRuntimeReplayRollbackOption,
} from "./replay-rollback-advisor";

import type {
  RuntimeEventReplayInputDraft,
  RuntimeEventReplaySession,
  RuntimeReplayEventSequenceInput,
  RuntimeReplaySnapshotInput,
} from "./runtime-event-replay-types";
import {
  buildRuntimeEventReplayInput,
  validateRuntimeEventReplayInput,
} from "./replay-input";
import { buildRuntimeReplaySnapshot } from "./replay-snapshot-model";
import { buildRuntimeReplayEventSequence } from "./replay-event-sequence";
import { simulateRuntimeEventReplay } from "./replay-reducer-simulator";
import { buildRuntimeReplayImpactAnalysis } from "./replay-impact-analysis";
import { buildRuntimeReplayRiskReport } from "./replay-risk-detector";
import { buildRuntimeReplayRollbackAdvice } from "./replay-rollback-advisor";
import { buildRuntimeEventReplaySummary } from "./replay-summary";

export function buildRuntimeEventReplaySession(input: {
  replayInput?: RuntimeEventReplayInputDraft;
  snapshot?: RuntimeReplaySnapshotInput;
  sequence?: RuntimeReplayEventSequenceInput;
} = {}): RuntimeEventReplaySession {
  const replayInput = buildRuntimeEventReplayInput(input.replayInput);
  const inputValidation = validateRuntimeEventReplayInput(replayInput);
  const snapshot = buildRuntimeReplaySnapshot({
    snapshotId: replayInput.selectedGraphSnapshotId,
    integrityNotes: replayInput.graphSnapshotSummary,
    ...(input.snapshot ?? {}),
  });
  const sequence = buildRuntimeReplayEventSequence({
    selectedEventIds: replayInput.selectedEventIds,
    sourceJournalIds: replayInput.sourceJournalIds,
    sourceRequestIds: replayInput.sourceRequestIds,
    scope: replayInput.replayScope,
    ...(input.sequence ?? {}),
  });
  const simulation = simulateRuntimeEventReplay({
    replayInput,
    inputValidation,
    snapshot,
    sequence,
  });
  const impact = buildRuntimeReplayImpactAnalysis(simulation);
  const riskReport = buildRuntimeReplayRiskReport({
    replayInput,
    snapshot,
    sequence,
    simulation,
    impact,
  });
  const rollbackAdvice = buildRuntimeReplayRollbackAdvice({ simulation, riskReport });
  const summary = buildRuntimeEventReplaySummary({ simulation, impact, riskReport });

  return {
    input: replayInput,
    inputValidation,
    snapshot,
    sequence,
    simulation,
    impact,
    riskReport,
    rollbackAdvice,
    summary,
  };
}

import type {
  RuntimeEventReplayInput,
  RuntimeEventReplayInputDraft,
  RuntimeEventReplayInputValidation,
} from "./runtime-event-replay-types";
import {
  buildRuntimeEventReplayStableKey,
  isRuntimeEventReplayMode,
  isRuntimeEventReplayScope,
  stableRuntimeEventReplayDigest,
  uniqueRuntimeEventReplayStrings,
} from "./runtime-event-replay-types";

function normalizeMode(value?: string | null): RuntimeEventReplayInput["replayMode"] {
  return isRuntimeEventReplayMode(value) ? value : "reducer-preview";
}

function normalizeScope(value?: string | null): RuntimeEventReplayInput["replayScope"] {
  return isRuntimeEventReplayScope(value) ? value : "selected-events";
}

function buildReplayId(input: {
  selectedEventIds: readonly string[];
  selectedGraphSnapshotId: string;
  replayMode: string;
}): string {
  const digest = stableRuntimeEventReplayDigest([
    [...input.selectedEventIds].sort(),
    input.selectedGraphSnapshotId,
    input.replayMode,
  ]);
  return buildRuntimeEventReplayStableKey("runtime-event-replay", digest);
}

export function buildRuntimeEventReplayInput(
  draft: RuntimeEventReplayInputDraft = {}
): RuntimeEventReplayInput {
  const selectedEventIds = uniqueRuntimeEventReplayStrings(draft.selectedEventIds);
  const selectedGraphSnapshotId = String(draft.selectedGraphSnapshotId ?? "snapshot:empty-preview").trim();
  const replayMode = normalizeMode(draft.replayMode);
  const replayScope = normalizeScope(draft.replayScope);
  const input: RuntimeEventReplayInput = {
    id:
      draft.id?.trim() ||
      buildReplayId({
        selectedEventIds,
        selectedGraphSnapshotId,
        replayMode,
      }),
    sourceJournalIds: uniqueRuntimeEventReplayStrings(draft.sourceJournalIds),
    sourceRequestIds: uniqueRuntimeEventReplayStrings(draft.sourceRequestIds),
    eventTypes: uniqueRuntimeEventReplayStrings(draft.eventTypes),
    selectedEventIds,
    selectedGraphSnapshotId,
    graphSnapshotSummary: uniqueRuntimeEventReplayStrings(draft.graphSnapshotSummary),
    replayMode,
    replayScope,
    operatorNote: draft.operatorNote?.trim() || undefined,
    noMutationGuarantee: true,
    summary: [],
  };

  return { ...input, summary: summarizeRuntimeEventReplayInput(input) };
}

export function validateRuntimeEventReplayInput(
  input: RuntimeEventReplayInput
): RuntimeEventReplayInputValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.noMutationGuarantee) {
    blockedReasons.push("Replay input must carry the no-mutation guarantee.");
  }

  if (!input.selectedGraphSnapshotId.trim()) {
    blockedReasons.push("A selected graph snapshot id is required for replay.");
  }

  if (input.selectedEventIds.length === 0) {
    warnings.push("No selected event ids were supplied; replay may use a caller-provided sequence only.");
  }

  if (input.sourceJournalIds.length === 0) {
    warnings.push("No source journal ids were supplied; journal evidence is context only.");
  }

  if (input.eventTypes.some((type) => type === "unknown")) {
    blockedReasons.push("Unknown runtime event types must be blocked before reducer preview.");
  }

  const valid = blockedReasons.length === 0;
  return {
    valid,
    blockedReasons,
    warnings,
    summary: [
      valid ? "Replay input is valid for preview-only simulation." : "Replay input is blocked.",
      `${input.selectedEventIds.length} selected event id(s), ${input.sourceJournalIds.length} journal id(s), and ${input.sourceRequestIds.length} request id(s).`,
      "No graph mutation, no event append, no event execution, no auto-persistence.",
      ...blockedReasons.map((reason) => `Blocked: ${reason}`),
      ...warnings.map((warning) => `Warning: ${warning}`),
    ],
  };
}

export function summarizeRuntimeEventReplayInput(input: RuntimeEventReplayInput): string[] {
  return [
    `Replay ${input.id} uses ${input.replayMode} mode and ${input.replayScope} scope.`,
    `Selected snapshot: ${input.selectedGraphSnapshotId}.`,
    `${input.selectedEventIds.length} selected event id(s) across ${input.eventTypes.length} event type(s).`,
    "Preview-only no-mutation guarantee is active.",
  ];
}

import type {
  CodexForgeBrainPanelDataSignal,
  CodexForgeBrainPanelDataSource,
  CodexForgeBrainPanelDataStatus,
  CodexForgeBrainPanelDataSeverity,
  CodexForgeBrainPanelId,
} from "./panel-data-types";

type SourceClassificationInput = {
  liveCount?: number;
  fixtureCount?: number;
  requiredLiveCount?: number;
  stale?: boolean;
};

type SourceClassificationResult = {
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
};

type PanelSignalInput = {
  id: string;
  panelId: CodexForgeBrainPanelId;
  label: string;
  detail?: string;
  source: CodexForgeBrainPanelDataSource;
  status?: CodexForgeBrainPanelDataStatus;
  severity?: CodexForgeBrainPanelDataSeverity;
  score?: number;
  timestamp?: number;
  reason?: string;
  evidence?: readonly string[];
  nextSafeAction?: string;
  refs?: CodexForgeBrainPanelDataSignal["refs"];
};

type MergeSignalsInput = {
  liveSignals?: readonly CodexForgeBrainPanelDataSignal[];
  fixtureSignals?: readonly CodexForgeBrainPanelDataSignal[];
  limit?: number;
};

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function severityRank(value: CodexForgeBrainPanelDataSeverity): number {
  if (value === "critical") return 5;
  if (value === "high") return 4;
  if (value === "medium") return 3;
  if (value === "low") return 2;
  return 1;
}

function statusRank(value: CodexForgeBrainPanelDataStatus): number {
  if (value === "unavailable") return 5;
  if (value === "stale") return 4;
  if (value === "partial") return 3;
  if (value === "empty") return 2;
  return 1;
}

export function sortBrainPanelDataSignals(
  signals: readonly CodexForgeBrainPanelDataSignal[]
): CodexForgeBrainPanelDataSignal[] {
  return [...signals].sort(
    (left, right) =>
      severityRank(right.severity) - severityRank(left.severity) ||
      statusRank(right.status) - statusRank(left.status) ||
      right.timestamp - left.timestamp ||
      left.id.localeCompare(right.id)
  );
}

export function classifyBrainPanelDataSource(
  input: SourceClassificationInput
): SourceClassificationResult {
  const liveCount = Math.max(0, input.liveCount ?? 0);
  const fixtureCount = Math.max(0, input.fixtureCount ?? 0);
  const requiredLiveCount = Math.max(1, input.requiredLiveCount ?? 1);

  if (liveCount > 0 && fixtureCount > 0 && liveCount < requiredLiveCount) {
    return {
      source: "mixed",
      status: input.stale ? "stale" : "partial",
    };
  }

  if (liveCount > 0 && fixtureCount > 0) {
    return {
      source: "mixed",
      status: input.stale ? "stale" : "partial",
    };
  }

  if (liveCount > 0) {
    return {
      source: "live",
      status: input.stale ? "stale" : "ready",
    };
  }

  if (fixtureCount > 0) {
    return {
      source: "fixture",
      status: input.stale ? "stale" : "ready",
    };
  }

  return {
    source: "unavailable",
    status: "unavailable",
  };
}

export function buildBrainPanelDataSignal(
  input: PanelSignalInput
): CodexForgeBrainPanelDataSignal {
  return {
    id: input.id,
    panelId: input.panelId,
    label: input.label,
    detail: input.detail ?? input.label,
    source: input.source,
    status: input.status ?? (input.source === "unavailable" ? "unavailable" : "ready"),
    severity: input.severity ?? "info",
    score: clampScore(input.score ?? 0.5),
    timestamp: input.timestamp ?? 0,
    reason: input.reason ?? input.label,
    evidence: [...(input.evidence ?? [])].sort((left, right) => left.localeCompare(right)),
    nextSafeAction:
      input.nextSafeAction ?? "Inspect this panel before using it as decision support.",
    readOnly: true,
    refs: input.refs,
  };
}

export function summarizeBrainPanelDataSource(input: {
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  liveCount?: number;
  fixtureCount?: number;
  panelId?: CodexForgeBrainPanelId;
}): string {
  const label = input.panelId ? `${input.panelId} panel` : "Panel";
  if (input.source === "live") {
    return `${label} is live-backed with ${input.liveCount ?? 0} live signals.`;
  }
  if (input.source === "mixed") {
    return `${label} is mixed: ${input.liveCount ?? 0} live signals and ${input.fixtureCount ?? 0} fixture fallbacks.`;
  }
  if (input.source === "fixture") {
    return `${label} is fixture-backed with ${input.fixtureCount ?? 0} deterministic signals.`;
  }
  return `${label} is unavailable because no supplied data produced signals.`;
}

export function mergePanelLiveAndFixtureSignals(
  input: MergeSignalsInput
): CodexForgeBrainPanelDataSignal[] {
  const byId = new Map<string, CodexForgeBrainPanelDataSignal>();

  for (const signal of input.fixtureSignals ?? []) {
    byId.set(signal.id, signal);
  }

  for (const signal of input.liveSignals ?? []) {
    byId.set(signal.id, signal);
  }

  return sortBrainPanelDataSignals([...byId.values()]).slice(0, input.limit ?? 12);
}

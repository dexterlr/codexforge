import type {
  CodexForgeBrainPanelDataReadiness,
  CodexForgeBrainPanelId,
} from "@/lib/codexforge/brain/runtime/panels";
import type {
  CodexForgeBrainLoadStatus,
  CodexForgeBrainQualityGate,
  CodexForgeBrainQualitySummary,
  CodexForgeBrainSnapshotPanelGateInput,
  CodexForgeBrainSnapshotPanelGateResult,
} from "./quality-types";

const PANEL_ORDER: readonly CodexForgeBrainPanelId[] = [
  "graph",
  "memory",
  "risk",
  "prediction",
  "agents",
  "replay",
  "lineage",
  "semantic-heatmap",
  "knowledge-topology",
  "recommendations",
  "insight-queue",
  "runtime-health",
  "system-status",
  "focus-mode",
  "drilldown",
  "live-snapshot",
];

function mapPanelStatus(
  readiness: readonly CodexForgeBrainPanelDataReadiness[]
): CodexForgeBrainLoadStatus {
  if (readiness.length === 0) return "blocked";
  if (readiness.some((item) => item.status === "unavailable" && item.source === "unavailable")) {
    return "recoverable-error";
  }
  if (readiness.every((item) => item.status === "empty")) return "empty";
  if (
    readiness.some((item) =>
      item.source === "fixture" ||
      item.source === "mixed" ||
      item.status === "partial" ||
      item.status === "stale" ||
      item.status === "empty"
    )
  ) {
    return "partial";
  }
  return "ready";
}

export function selectBlockedBrainPanels(
  readiness: Partial<Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>>
): CodexForgeBrainPanelId[] {
  return PANEL_ORDER.filter((panelId) => {
    const item = readiness[panelId];
    return !item || (item.source === "unavailable" && item.status === "unavailable");
  });
}

export function buildBrainSnapshotPanelGate(input: {
  kind: "snapshot" | "panel";
  status: CodexForgeBrainLoadStatus;
  evidence: readonly string[];
  blockedCount?: number;
  fixtureCount?: number;
  mixedCount?: number;
}): CodexForgeBrainQualityGate {
  if (input.kind === "snapshot") {
    return {
      id: "brain.snapshot.quality",
      label: "Snapshot quality",
      status: input.status,
      severity: input.status === "ready" ? "info" : input.status === "empty" ? "low" : "medium",
      reason:
        input.status === "ready"
          ? "Runtime snapshot is live and ready for panel adapters."
          : input.status === "empty"
            ? "Runtime snapshot is live but has no graph nodes."
            : "Runtime snapshot is unavailable or fixture-backed.",
      evidence: input.evidence,
      nextSafeAction:
        input.status === "ready"
          ? "Continue reviewing live snapshot-backed panels."
          : "Use fixture fallback labels and retry live graph load when safe.",
      readOnly: true,
    };
  }

  return {
    id: "brain.panels.quality",
    label: "Panel adapters",
    status: input.status,
    severity:
      input.status === "ready"
        ? "info"
        : (input.blockedCount ?? 0) > 0
          ? "high"
          : "medium",
    reason:
      input.status === "ready"
        ? "Panel adapters are live-backed and ready."
        : `${input.fixtureCount ?? 0} fixture, ${input.mixedCount ?? 0} mixed, ${input.blockedCount ?? 0} blocked panels detected.`,
    evidence: input.evidence,
    nextSafeAction:
      (input.blockedCount ?? 0) > 0
        ? "Inspect blocked panel readiness before trusting panel output."
        : "Treat mixed and fixture panels as advisory until live evidence is supplied.",
    readOnly: true,
  };
}

export function evaluateBrainSnapshotPanelGates(
  input: CodexForgeBrainSnapshotPanelGateInput
): CodexForgeBrainSnapshotPanelGateResult {
  const readiness = PANEL_ORDER
    .map((panelId) => input.panelReadiness?.[panelId])
    .filter((item): item is CodexForgeBrainPanelDataReadiness => Boolean(item));
  const livePanels = readiness.filter((item) => item.source === "live").map((item) => item.panelId);
  const mixedPanels = readiness.filter((item) => item.source === "mixed").map((item) => item.panelId);
  const fixturePanels = readiness.filter((item) => item.source === "fixture").map((item) => item.panelId);
  const unavailablePanels = readiness.filter((item) => item.source === "unavailable").map((item) => item.panelId);
  const stalePanels = readiness.filter((item) => item.status === "stale").map((item) => item.panelId);
  const emptyPanels = readiness.filter((item) => item.status === "empty").map((item) => item.panelId);
  const blockedPanels = selectBlockedBrainPanels(input.panelReadiness ?? {});
  const snapshotStatus: CodexForgeBrainLoadStatus =
    input.snapshot?.status === "ready"
      ? "ready"
      : input.snapshot?.status === "empty"
        ? "empty"
        : input.snapshot
          ? "partial"
          : "partial";
  const panelStatus = mapPanelStatus(readiness);

  return {
    snapshotStatus,
    panelStatus,
    snapshotGate: buildBrainSnapshotPanelGate({
      kind: "snapshot",
      status: snapshotStatus,
      evidence: [
        `snapshot:${input.snapshot?.status ?? "unavailable"}`,
        `generatedAt:${input.snapshot?.generatedAt ?? input.now ?? 0}`,
      ],
    }),
    panelGate: buildBrainSnapshotPanelGate({
      kind: "panel",
      status: panelStatus,
      evidence: [
        `live:${livePanels.length}`,
        `mixed:${mixedPanels.length}`,
        `fixture:${fixturePanels.length}`,
        `unavailable:${unavailablePanels.length}`,
        `stale:${stalePanels.length}`,
        `empty:${emptyPanels.length}`,
      ],
      blockedCount: blockedPanels.length,
      fixtureCount: fixturePanels.length,
      mixedCount: mixedPanels.length,
    }),
    blockedPanels,
    livePanels,
    mixedPanels,
    fixturePanels,
    unavailablePanels,
    stalePanels,
    emptyPanels,
  };
}

export function summarizeBrainSnapshotPanelGates(
  result: CodexForgeBrainSnapshotPanelGateResult,
  generatedAt = 0
): CodexForgeBrainQualitySummary {
  return {
    generatedAt,
    readOnly: true,
    loadPhase: result.snapshotStatus === "empty" ? "empty" : "loaded",
    graphStatus: "ready",
    snapshotStatus: result.snapshotStatus,
    panelStatus: result.panelStatus,
    sourceStatus: `${result.livePanels.length} live / ${result.mixedPanels.length} mixed / ${result.fixturePanels.length} fixture`,
    gates: [result.snapshotGate, result.panelGate],
    nextSafeAction: result.panelGate.nextSafeAction,
  };
}

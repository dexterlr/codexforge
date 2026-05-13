import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataReadiness,
  CodexForgeBrainPanelDataSource,
  CodexForgeBrainPanelDataStatus,
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelIntegrationSummary,
} from "./panel-data-types";
import { CODEXFORGE_BRAIN_PANEL_IDS } from "./panel-data-types";

type AdapterMap = Partial<Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>>;

function clampReadinessScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function sourceScore(source: CodexForgeBrainPanelDataSource): number {
  if (source === "live") return 1;
  if (source === "mixed") return 0.72;
  if (source === "fixture") return 0.44;
  return 0;
}

function statusScore(status: CodexForgeBrainPanelDataStatus): number {
  if (status === "ready") return 1;
  if (status === "partial") return 0.66;
  if (status === "stale") return 0.48;
  if (status === "empty") return 0.22;
  return 0;
}

function panelLabel(panelId: CodexForgeBrainPanelId): string {
  return panelId
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function scoreBrainPanelIntegrationReadiness(input: {
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  signalCount?: number;
}): number {
  const signalBonus = Math.min(0.12, Math.max(0, input.signalCount ?? 0) * 0.015);
  return clampReadinessScore(
    sourceScore(input.source) * 0.58 + statusScore(input.status) * 0.34 + signalBonus
  );
}

export function buildBrainPanelIntegrationReadinessMap(
  adapters: AdapterMap
): Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness> {
  return Object.fromEntries(
    CODEXFORGE_BRAIN_PANEL_IDS.map((panelId) => {
      const adapter = adapters[panelId];
      const source = adapter?.source ?? "unavailable";
      const status = adapter?.status ?? "unavailable";
      const score = scoreBrainPanelIntegrationReadiness({
        source,
        status,
        signalCount: adapter?.signals.length ?? 0,
      });
      const nextSafeAction =
        adapter?.nextSafeAction ??
        (source === "fixture"
          ? "Wire a live snapshot signal before relying on this panel."
          : "Supply runtime snapshot data for this panel.");

      return [
        panelId,
        {
          panelId,
          source,
          status,
          score,
          label: panelLabel(panelId),
          summary:
            adapter?.reason ??
            `${panelLabel(panelId)} has no supplied panel adapter result.`,
          evidence: adapter?.evidence ?? [],
          nextSafeAction,
          readOnly: true,
        },
      ];
    })
  ) as Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>;
}

export function selectLiveBackedBrainPanels(
  readiness: Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>
): CodexForgeBrainPanelId[] {
  return CODEXFORGE_BRAIN_PANEL_IDS.filter(
    (panelId) => readiness[panelId]?.source === "live"
  );
}

export function summarizeBrainPanelIntegrationReadiness(
  readiness: Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>,
  generatedAt = 0
): CodexForgeBrainPanelIntegrationSummary {
  const ordered = CODEXFORGE_BRAIN_PANEL_IDS.map((panelId) => readiness[panelId]);
  const livePanels = ordered
    .filter((item) => item.source === "live")
    .map((item) => item.panelId);
  const mixedPanels = ordered
    .filter((item) => item.source === "mixed")
    .map((item) => item.panelId);
  const fixturePanels = ordered
    .filter((item) => item.source === "fixture")
    .map((item) => item.panelId);
  const unavailablePanels = ordered
    .filter((item) => item.source === "unavailable")
    .map((item) => item.panelId);
  const readyPanels = ordered
    .filter((item) => item.status === "ready")
    .map((item) => item.panelId);
  const partialPanels = ordered
    .filter((item) => item.status === "partial")
    .map((item) => item.panelId);
  const stalePanels = ordered
    .filter((item) => item.status === "stale")
    .map((item) => item.panelId);
  const emptyPanels = ordered
    .filter((item) => item.status === "empty")
    .map((item) => item.panelId);
  const unavailableStatusPanels = ordered
    .filter((item) => item.status === "unavailable")
    .map((item) => item.panelId);
  const score = clampReadinessScore(
    ordered.reduce((total, item) => total + item.score, 0) /
      Math.max(1, ordered.length)
  );
  const nextSafeAction =
    fixturePanels[0]
      ? `Replace ${fixturePanels[0]} fixture fallback with supplied runtime snapshot evidence.`
      : unavailablePanels[0]
        ? `Supply panel data for ${unavailablePanels[0]}.`
        : "Continue reviewing panels as read-only runtime signals.";

  return {
    generatedAt,
    readOnly: true,
    totalPanels: ordered.length,
    score,
    livePanels,
    mixedPanels,
    fixturePanels,
    unavailablePanels,
    readyPanels,
    partialPanels,
    stalePanels,
    emptyPanels,
    unavailableStatusPanels,
    readiness: ordered,
    text: `${livePanels.length} live, ${mixedPanels.length} mixed, ${fixturePanels.length} fixture, ${unavailablePanels.length} unavailable panels.`,
    nextSafeAction,
  };
}

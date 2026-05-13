import type {
  CodexForgeRuntimeHealthDashboard,
  CodexForgeRuntimeHealthSignal,
  CodexForgeRuntimeHealthSummary,
  CodexForgeRuntimeNextSafeAction,
  CodexForgeRuntimeSmokeCoverageItem,
  CodexForgeRuntimeSubsystemReadiness,
} from "./health-types";

type DashboardLike = Omit<CodexForgeRuntimeHealthDashboard, "summary">;

const FALLBACK_ACTION: CodexForgeRuntimeNextSafeAction = {
  id: "health:inspect-runtime",
  label: "Inspect runtime health",
  detail: "Review the top health signal and subsystem evidence before any repair.",
  readOnly: true,
  approvalRequired: false,
};

function severityRank(value: string): number {
  switch (value) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}

export function selectRuntimeHealthHotspots(dashboard: DashboardLike): {
  topDegradedSubsystem?: CodexForgeRuntimeSubsystemReadiness;
  topBlockedSubsystem?: CodexForgeRuntimeSubsystemReadiness;
  topMissingSmokeCoverage?: CodexForgeRuntimeSmokeCoverageItem;
  topSafetyWarning?: string;
  topRuntimeDiagnostic?: CodexForgeRuntimeHealthSignal;
} {
  const topBlockedSubsystem = dashboard.subsystemReadiness.find(
    (item) => item.status === "blocked"
  );
  const topDegradedSubsystem = dashboard.subsystemReadiness.find(
    (item) => item.status === "degraded" || item.status === "partial"
  );
  const topMissingSmokeCoverage = [...dashboard.smokeCoverage]
    .sort((a, b) => a.coverageLevel - b.coverageLevel || a.id.localeCompare(b.id))
    .find((item) => item.coverageLevel < 1);
  const topSafetyWarning = [...dashboard.safetyPosture.warnings].sort((a, b) =>
    a.localeCompare(b)
  )[0];
  const topRuntimeDiagnostic = [...dashboard.diagnostics].sort((a, b) => {
    const severityDelta = severityRank(b.severity) - severityRank(a.severity);
    if (severityDelta !== 0) return severityDelta;
    return a.id.localeCompare(b.id);
  })[0];

  return {
    topDegradedSubsystem,
    topBlockedSubsystem,
    topMissingSmokeCoverage,
    topSafetyWarning,
    topRuntimeDiagnostic,
  };
}

export function recommendRuntimeHealthNextSafeAction(
  dashboard: DashboardLike
): CodexForgeRuntimeNextSafeAction {
  return (
    dashboard.nextSafeActions.find((item) => item.readOnly && !item.approvalRequired) ??
    dashboard.signals.find((item) => item.nextSafeAction.readOnly)?.nextSafeAction ??
    FALLBACK_ACTION
  );
}

export function summarizeCognitiveSystemStatus(
  dashboard: DashboardLike
): string {
  const hotspots = selectRuntimeHealthHotspots(dashboard);
  const subsystem = hotspots.topBlockedSubsystem ?? hotspots.topDegradedSubsystem;
  const smoke = hotspots.topMissingSmokeCoverage;
  return [
    `Cognitive system status ${dashboard.status} with health score ${dashboard.healthScore}.`,
    subsystem ? `Top subsystem: ${subsystem.label} is ${subsystem.status}.` : "",
    smoke ? `Smoke coverage gap: ${smoke.label}.` : "",
    hotspots.topSafetyWarning ? `Safety warning: ${hotspots.topSafetyWarning}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function summarizeRuntimeHealthDashboard(
  dashboard: DashboardLike
): CodexForgeRuntimeHealthSummary {
  const hotspots = selectRuntimeHealthHotspots(dashboard);
  const nextSafeAction = recommendRuntimeHealthNextSafeAction(dashboard);
  const text = summarizeCognitiveSystemStatus(dashboard);

  return {
    generatedAt: dashboard.generatedAt,
    status: dashboard.status,
    healthScore: dashboard.healthScore,
    text,
    warnings: dashboard.warnings,
    risks: dashboard.risks,
    blockers: dashboard.blockers,
    nextSafeAction,
    ...hotspots,
  };
}

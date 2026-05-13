import {
  evaluateBrainRuntimeHealth,
} from "@/lib/codexforge/brain/runtime/runtime-health";
import {
  getCodexForgeBrainRuntimeContract,
} from "@/lib/codexforge/brain/runtime/runtime-contract";
import {
  runBrainRuntimeDiagnostics,
} from "@/lib/codexforge/brain/runtime/runtime-diagnostics";
import {
  buildRuntimeSafetyPosture,
} from "./safety-posture";
import {
  buildSmokeCoverageMap,
  scoreSmokeCoverage,
} from "./smoke-coverage";
import {
  buildSubsystemReadiness,
  scoreSubsystemReadiness,
} from "./subsystem-readiness";
import {
  summarizeRuntimeHealthDashboard,
} from "./health-summarizer";
import type {
  CodexForgeRuntimeHealthBuildInput,
  CodexForgeRuntimeHealthDashboard,
  CodexForgeRuntimeHealthSeverity,
  CodexForgeRuntimeHealthSignal,
  CodexForgeRuntimeNextSafeAction,
  CodexForgeRuntimeSubsystemStatus,
} from "./health-types";

const SEVERITY_RANK: Record<CodexForgeRuntimeHealthSeverity, number> = {
  critical: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function defaultAction(label: string): CodexForgeRuntimeNextSafeAction {
  return {
    id: "health:inspect",
    label: "Inspect evidence",
    detail: label,
    readOnly: true,
    approvalRequired: false,
  };
}

function statusFromSeverity(
  severity: CodexForgeRuntimeHealthSeverity
): CodexForgeRuntimeSubsystemStatus {
  switch (severity) {
    case "critical":
      return "blocked";
    case "high":
      return "degraded";
    case "medium":
      return "partial";
    case "low":
      return "unknown";
    default:
      return "ready";
  }
}

export function normalizeRuntimeHealthSeverity(
  value: string | undefined
): CodexForgeRuntimeHealthSeverity {
  switch (value) {
    case "critical":
    case "blocker":
      return "critical";
    case "high":
    case "risk":
    case "error":
      return "high";
    case "medium":
    case "warning":
      return "medium";
    case "low":
      return "low";
    default:
      return "info";
  }
}

export function buildRuntimeHealthSignal(
  input: Partial<CodexForgeRuntimeHealthSignal> & {
    id: string;
    title: string;
    detail: string;
  }
): CodexForgeRuntimeHealthSignal {
  const severity = normalizeRuntimeHealthSeverity(input.severity);
  return {
    id: input.id,
    title: input.title,
    detail: input.detail,
    severity,
    status: input.status ?? statusFromSeverity(severity),
    source: input.source ?? "runtime health",
    relatedSubsystem: input.relatedSubsystem,
    evidence: [...(input.evidence ?? [])].sort((a, b) => a.localeCompare(b)),
    reasons: [...(input.reasons ?? [])].sort((a, b) => a.localeCompare(b)),
    nextSafeAction: input.nextSafeAction ?? defaultAction("Review this health signal before repair."),
  };
}

export function buildRuntimeHealthSection(
  id: string,
  signals: readonly CodexForgeRuntimeHealthSignal[]
): readonly CodexForgeRuntimeHealthSignal[] {
  return [...signals]
    .map((signal) => ({ ...signal, id: `${id}:${signal.id}` }))
    .sort((a, b) => {
      const severityDelta = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
      if (severityDelta !== 0) return severityDelta;
      return a.id.localeCompare(b.id);
    });
}

function signalsFromInput(input: CodexForgeRuntimeHealthBuildInput): readonly CodexForgeRuntimeHealthSignal[] {
  const runtimeHealth = input.runtimeHealth ?? evaluateBrainRuntimeHealth();
  const diagnostics = input.runtimeDiagnostics ?? runBrainRuntimeDiagnostics();
  const signals: CodexForgeRuntimeHealthSignal[] = [];

  for (const warning of runtimeHealth.warnings) {
    signals.push(
      buildRuntimeHealthSignal({
        id: `runtime-warning:${warning}`,
        title: "Runtime health warning",
        detail: warning,
        severity: "medium",
        source: "runtime health",
        relatedSubsystem: "graph-runtime",
        evidence: [runtimeHealth.version],
        reasons: [warning],
      })
    );
  }

  for (const risk of runtimeHealth.risks) {
    signals.push(
      buildRuntimeHealthSignal({
        id: `runtime-risk:${risk}`,
        title: "Runtime health risk",
        detail: risk,
        severity: "high",
        source: "runtime health",
        relatedSubsystem: "graph-runtime",
        evidence: [runtimeHealth.canonicalSchemaPath],
        reasons: [risk],
      })
    );
  }

  for (const diagnostic of diagnostics) {
    signals.push(
      buildRuntimeHealthSignal({
        id: `diagnostic:${diagnostic.id}`,
        title: diagnostic.title,
        detail: diagnostic.summary,
        severity: normalizeRuntimeHealthSeverity(diagnostic.severity),
        source: "runtime diagnostics",
        relatedSubsystem: "health-dashboard",
        evidence: diagnostic.evidence,
        reasons: [diagnostic.code],
      })
    );
  }

  if (input.recommendationSummary) {
    signals.push(
      buildRuntimeHealthSignal({
        id: "recommendations:summary",
        title: "Recommendation readiness",
        detail: `${input.recommendationSummary.total} recommendations with ${input.recommendationSummary.approvalRequiredActions} approval-required actions.`,
        severity: input.recommendationSummary.approvalRequiredActions > 0 ? "medium" : "info",
        source: "recommendations",
        relatedSubsystem: "recommendations",
        evidence: [`total:${input.recommendationSummary.total}`],
        reasons: ["recommendation summary supplied"],
        nextSafeAction: input.recommendationSummary.nextSafeAction
          ? {
              id: input.recommendationSummary.nextSafeAction.id,
              label: input.recommendationSummary.nextSafeAction.label,
              detail: input.recommendationSummary.nextSafeAction.description,
              readOnly: input.recommendationSummary.nextSafeAction.readOnly,
              approvalRequired: input.recommendationSummary.nextSafeAction.approvalRequired,
            }
          : undefined,
      })
    );
  }

  if (input.topologySummary) {
    signals.push(
      buildRuntimeHealthSignal({
        id: "semantic-topology:summary",
        title: "Topology readiness",
        detail: input.topologySummary.text,
        severity: input.topologySummary.staleOrContradictoryAreas.length > 0 ? "medium" : "info",
        source: "semantic topology",
        relatedSubsystem: "semantic-topology",
        evidence: input.topologySummary.highestRiskHotspots,
        reasons: [input.topologySummary.nextSafeAction],
      })
    );
  }

  return buildRuntimeHealthSection("runtime-health", signals);
}

export function buildRuntimeHealthDashboard(
  input: CodexForgeRuntimeHealthBuildInput = {}
): CodexForgeRuntimeHealthDashboard {
  const generatedAt = input.generatedAt ?? 1735689600000;
  const runtimeHealth = input.runtimeHealth ?? evaluateBrainRuntimeHealth();
  const runtimeContract = input.runtimeContract ?? getCodexForgeBrainRuntimeContract();
  const subsystemReadiness = buildSubsystemReadiness({
    ...input,
    runtimeHealth,
    runtimeContract,
  });
  const smokeCoverage = buildSmokeCoverageMap(input.smokeCoverageDescriptors);
  const safetyPosture = buildRuntimeSafetyPosture(input);
  const diagnostics = signalsFromInput({ ...input, runtimeHealth, runtimeContract }).filter(
    (signal) => signal.source === "runtime diagnostics"
  );
  const signals = signalsFromInput({ ...input, runtimeHealth, runtimeContract });

  const subsystemScore =
    subsystemReadiness.reduce((sum, item) => sum + scoreSubsystemReadiness(item), 0) /
    Math.max(1, subsystemReadiness.length);
  const smokeScore = scoreSmokeCoverage(smokeCoverage);
  const safetyScore = safetyPosture.status === "blocked" ? 0 : safetyPosture.status === "ready" ? 1 : 0.72;
  const healthScore = Math.round(clamp01(subsystemScore * 0.55 + smokeScore * 0.25 + safetyScore * 0.2) * 100);

  const blockers = signals
    .filter((signal) => signal.severity === "critical")
    .map((signal) => signal.title)
    .sort((a, b) => a.localeCompare(b));
  const risks = signals
    .filter((signal) => signal.severity === "high")
    .map((signal) => signal.title)
    .sort((a, b) => a.localeCompare(b));
  const warnings = [
    ...signals
      .filter((signal) => signal.severity === "medium")
      .map((signal) => signal.title),
    ...safetyPosture.warnings,
  ].sort((a, b) => a.localeCompare(b));
  const status: "ok" | "degraded" | "blocked" =
    blockers.length > 0
      ? "blocked"
      : risks.length > 0 || warnings.length > 0 || healthScore < 80
        ? "degraded"
        : "ok";
  const nextSafeActions = [
    ...signals.map((signal) => signal.nextSafeAction),
    ...subsystemReadiness.map((item) => item.nextSafeAction),
    ...safetyPosture.readOnlyActions,
  ].filter((item) => item.readOnly && !item.approvalRequired);

  const dashboardWithoutSummary = {
    generatedAt,
    status,
    healthScore,
    runtimeHealth,
    runtimeContract,
    diagnostics,
    signals,
    subsystemReadiness,
    smokeCoverage,
    safetyPosture,
    warnings,
    risks,
    blockers,
    nextSafeActions,
  };

  const summary = summarizeRuntimeHealthDashboard(dashboardWithoutSummary);

  return {
    ...dashboardWithoutSummary,
    summary,
  };
}

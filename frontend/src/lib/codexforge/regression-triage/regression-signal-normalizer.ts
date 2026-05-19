import {
  REGRESSION_REVIEW_STATES,
  REGRESSION_SEVERITIES,
  REGRESSION_SIGNAL_TYPES,
  REGRESSION_SOURCE_KINDS,
  buildRegressionTriageStableKey,
  scoreRegressionHint,
  uniqueRegressionStrings,
  type RegressionPostApplyVerificationResult,
  type RegressionRawSignal,
  type RegressionRelatedFixRecommendation,
  type RegressionReviewState,
  type RegressionSeverity,
  type RegressionSignal,
  type RegressionSignalNormalizerInput,
  type RegressionSignalSourceKind,
  type RegressionSignalSummary,
  type RegressionSignalType,
} from "./regression-triage-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isRawSignalArray(value: RegressionSignalNormalizerInput | readonly RegressionRawSignal[]): value is readonly RegressionRawSignal[] {
  return Array.isArray(value);
}

function normalizeType(value: unknown, text: string, sourceKind: RegressionSignalSourceKind): RegressionSignalType {
  if (REGRESSION_SIGNAL_TYPES.includes(value as RegressionSignalType)) return value as RegressionSignalType;

  const lower = text.toLowerCase();
  if (lower.includes("duplicate key") || lower.includes("same key") || lower.includes("unique key")) return "duplicate-react-key";
  if (lower.includes("mojibake") || /\\u00c3|\\u00c2|\\ufffd/i.test(text)) return "mojibake-risk";
  if (lower.includes("git diff --check") || lower.includes("whitespace error")) return "diff-check-failure";
  if (lower.includes("smoke") || lower.includes(".ps1") || sourceKind === "smoke-output") return "smoke-failure";
  if (lower.includes("typescript") || lower.includes("type error") || lower.includes("not assignable") || lower.includes("cannot find name")) return "type-error";
  if (lower.includes("npm run build") || lower.includes("next build") || lower.includes("build failed") || lower.includes("compile error")) return "build-failure";
  if (lower.includes("route") || lower.includes("/api/") || lower.includes("404") || lower.includes("500")) return "route-failure";
  if (lower.includes("policy") || lower.includes("approval boundary") || lower.includes("mutation")) return "policy-regression";
  if (lower.includes("overflow") || lower.includes("layout") || lower.includes("wrap") || lower.includes("minwidth")) return "ui-layout-regression";
  if (lower.includes("contract") || lower.includes("schema") || lower.includes("payload")) return "data-contract-regression";
  if (sourceKind === "browser-warning" || lower.includes("browser warning") || lower.includes("console warning")) return "browser-warning";
  return "unknown-regression";
}

function normalizeSourceKind(value: unknown): RegressionSignalSourceKind {
  return REGRESSION_SOURCE_KINDS.includes(value as RegressionSignalSourceKind)
    ? (value as RegressionSignalSourceKind)
    : "unknown";
}

function normalizeSeverity(value: unknown, type: RegressionSignalType): RegressionSeverity {
  if (REGRESSION_SEVERITIES.includes(value as RegressionSeverity)) return value as RegressionSeverity;
  if (type === "build-failure" || type === "smoke-failure" || type === "policy-regression") return "blocker";
  if (type === "type-error" || type === "route-failure" || type === "diff-check-failure") return "error";
  if (type === "browser-warning" || type === "duplicate-react-key" || type === "mojibake-risk" || type === "ui-layout-regression") return "warning";
  return "info";
}

function normalizeReviewState(value: unknown, severity: RegressionSeverity, stale: boolean): RegressionReviewState {
  if (REGRESSION_REVIEW_STATES.includes(value as RegressionReviewState)) return value as RegressionReviewState;
  if (stale) return "stale";
  if (severity === "blocker") return "blocked";
  if (severity === "warning" || severity === "error") return "needs-review";
  return "new";
}

function normalizeSourceLine(value: RegressionRawSignal["sourceLine"]): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.max(0, Math.floor(parsed));
  }
  return null;
}

function textForSignal(signal: RegressionRawSignal): string {
  return [
    signal.type,
    signal.severity,
    signal.title,
    signal.summary,
    signal.snippet,
    signal.sourceCommand,
    signal.relatedSmokeScript,
    signal.relatedRoute,
    signal.filePath,
    ...(signal.relatedFiles ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function rawPostApplySignals(result: RegressionPostApplyVerificationResult | RegressionRawSignal): RegressionRawSignal[] {
  if ("signals" in result && Array.isArray(result.signals)) {
    return result.signals.map((signal) => ({
      ...signal,
      sourceKind: signal.sourceKind ?? "post-apply-verification",
    }));
  }

  const failed = "failed" in result ? result.failed === true : false;
  const status = "status" in result ? result.status?.trim() : null;
  const summary = "summary" in result ? result.summary?.trim() : null;
  const warnings = "warnings" in result && Array.isArray(result.warnings) ? result.warnings : [];
  if (!failed && !status && !summary && warnings.length === 0) return [];
  const rawSignal = result as RegressionRawSignal;

  return [
    {
      ...result,
      type: failed || status === "failed" ? "smoke-failure" : rawSignal.type,
      title: "Post-apply verification result",
      snippet: summary || warnings.join(" "),
      sourceCommand: "command" in result ? result.command ?? null : rawSignal.sourceCommand,
      sourceKind: "post-apply-verification",
    },
  ];
}

function relatedFixSignal(value: RegressionRelatedFixRecommendation | string): RegressionRawSignal {
  if (typeof value === "string") {
    return {
      type: "unknown-regression",
      title: "Related fix recommendation",
      snippet: value,
      sourceKind: "grounded-fix-recommendation",
      confidence: "medium",
      regressionLikelihood: "low",
    };
  }

  return {
    id: value.id ?? undefined,
    type: "unknown-regression",
    title: value.title ?? "Related fix recommendation",
    snippet: value.summary ?? "Fix recommendation supplied as regression triage context.",
    relatedFiles: value.targetFiles ?? [],
    sourceKind: "grounded-fix-recommendation",
    confidence: "medium",
    regressionLikelihood: "low",
  };
}

function collectRawSignals(input: RegressionSignalNormalizerInput | readonly RegressionRawSignal[]): RegressionRawSignal[] {
  if (isRawSignalArray(input)) return [...input];

  const raw: RegressionRawSignal[] = [];
  raw.push(...(input.verificationSignals ?? []).map((signal) => ({ ...signal, sourceKind: signal.sourceKind ?? "verification-ingestion" })));
  // Validation Runner output capture handoff is accepted when supplied as reviewed verificationSignals; no auto-ingestion.
  if (input.postApplyResult) raw.push(...rawPostApplySignals(input.postApplyResult));
  raw.push(
    ...(input.browserWarnings ?? []).map((warning, index) =>
      typeof warning === "string"
        ? {
            id: buildRegressionTriageStableKey("browser-warning", index, warning),
            type: "browser-warning" as const,
            title: "Browser warning signal",
            snippet: warning,
            sourceKind: "browser-warning" as const,
            confidence: "medium" as const,
            regressionLikelihood: "medium" as const,
          }
        : { ...warning, sourceKind: warning.sourceKind ?? "browser-warning" }
    )
  );
  raw.push(...(input.buildOutputSignals ?? []).map((signal) => ({ ...signal, sourceKind: signal.sourceKind ?? "build-output" })));
  raw.push(...(input.smokeOutputSignals ?? []).map((signal) => ({ ...signal, sourceKind: signal.sourceKind ?? "smoke-output" })));

  if (input.manualOperatorNote?.trim()) {
    raw.push({
      type: "unknown-regression",
      title: "Manual operator note",
      snippet: input.manualOperatorNote,
      sourceKind: "manual-operator-note",
      confidence: "medium",
      regressionLikelihood: "medium",
    });
  }

  if (input.changedFiles?.length) {
    raw.push({
      type: "unknown-regression",
      title: "Changed files supplied for regression triage",
      snippet: "Changed files are context for impact mapping, not proof of cause.",
      sourceKind: "changed-files",
      relatedFiles: input.changedFiles,
      confidence: "low",
      regressionLikelihood: "low",
    });
  }

  if (input.targetFiles?.length) {
    raw.push({
      type: "unknown-regression",
      title: "Target files supplied for regression triage",
      snippet: "Target files are context for impact mapping, not proof of cause.",
      sourceKind: "target-files",
      relatedFiles: input.targetFiles,
      confidence: "low",
      regressionLikelihood: "low",
    });
  }

  if (input.relatedFixRecommendation) raw.push(relatedFixSignal(input.relatedFixRecommendation));
  return raw;
}

export function normalizeRegressionSignal(signal: RegressionRawSignal, index = 0): RegressionSignal {
  const sourceKind = normalizeSourceKind(signal.sourceKind);
  const relatedFiles = uniqueRegressionStrings([signal.filePath, ...(signal.relatedFiles ?? [])]);
  const text = textForSignal(signal);
  const type = normalizeType(signal.type, text, sourceKind);
  const severity = normalizeSeverity(signal.severity, type);
  const confidence = scoreRegressionHint(signal.confidence, 0.52);
  const regressionLikelihood = scoreRegressionHint(signal.regressionLikelihood, severity === "blocker" ? 0.82 : 0.54);
  const stale = signal.stale === true;
  const reviewState = normalizeReviewState(signal.reviewState, severity, stale);
  const title = signal.title?.trim() || signal.summary?.trim() || `${type} signal`;
  const snippet = signal.snippet?.trim() || signal.summary?.trim() || title;
  const sourceLine = normalizeSourceLine(signal.sourceLine);
  const id =
    signal.id?.trim() ||
    buildRegressionTriageStableKey("regression-signal", type, severity, sourceKind, title, relatedFiles.join("|"), sourceLine, index);

  return {
    id,
    type,
    severity,
    title,
    snippet,
    sourceCommand: signal.sourceCommand?.trim() || null,
    sourceLine,
    relatedFiles,
    relatedSmokeScript: signal.relatedSmokeScript?.trim() || null,
    relatedRoute: signal.relatedRoute?.trim() || null,
    confidence,
    regressionLikelihood,
    stale,
    reviewState,
    sourceKind,
  };
}

const severityRank: Record<RegressionSeverity, number> = {
  blocker: 0,
  error: 1,
  warning: 2,
  info: 3,
};

export function normalizeRegressionSignals(
  input: RegressionSignalNormalizerInput | readonly RegressionRawSignal[] = []
): RegressionSignal[] {
  return collectRawSignals(input)
    .filter((signal) => isRecord(signal))
    .map((signal, index) => normalizeRegressionSignal(signal, index))
    .sort((a, b) => {
      const severity = severityRank[a.severity] - severityRank[b.severity];
      if (severity !== 0) return severity;
      const likelihood = b.regressionLikelihood - a.regressionLikelihood;
      if (likelihood !== 0) return likelihood;
      const confidence = b.confidence - a.confidence;
      if (confidence !== 0) return confidence;
      const fileRank = a.relatedFiles.join("|").localeCompare(b.relatedFiles.join("|"));
      if (fileRank !== 0) return fileRank;
      return a.id.localeCompare(b.id);
    });
}

export function summarizeRegressionSignals(signals: readonly RegressionSignal[] = []): RegressionSignalSummary {
  const blockerCount = signals.filter((signal) => signal.severity === "blocker").length;
  const warningCount = signals.filter((signal) => signal.severity === "warning").length;
  const staleCount = signals.filter((signal) => signal.stale || signal.reviewState === "stale").length;
  const fileCount = uniqueRegressionStrings(signals.flatMap((signal) => signal.relatedFiles)).length;

  return {
    id: "regression-signal-summary",
    signalCount: signals.length,
    blockerCount,
    warningCount,
    staleCount,
    fileCount,
    summary: [
      `${signals.length} regression signals normalized.`,
      `${blockerCount} blockers and ${warningCount} warnings require operator review.`,
      `${fileCount} related files are available for deterministic impact mapping.`,
      `${staleCount} signals are marked stale and need current verification.`,
    ],
  };
}

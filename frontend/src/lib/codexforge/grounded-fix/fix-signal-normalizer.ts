import {
  buildGroundedFixStableKey,
  clampGroundedFixScore,
  importanceFromGroundedFixScore,
  uniqueGroundedFixStrings,
  type GroundedFixImportance,
  type GroundedFixRawSignal,
  type GroundedFixSignal,
  type GroundedFixSignalSummary,
  type GroundedFixSignalType,
  type GroundedFixSourceType,
} from "./grounded-fix-types";

const signalTypes: GroundedFixSignalType[] = [
  "chat-evidence",
  "memory-candidate",
  "read-only-execution",
  "file-intelligence",
  "patch-preview-plan",
  "task-readiness",
  "manual-goal",
];

const sourceTypes: GroundedFixSourceType[] = [
  "evidence-grounded-chat",
  "evidence-memory",
  "read-only-step-execution",
  "files",
  "patch-preview",
  "execution-readiness",
  "task",
  "manual",
];

function normalizeType(value: unknown): GroundedFixSignalType {
  return signalTypes.includes(value as GroundedFixSignalType)
    ? (value as GroundedFixSignalType)
    : "manual-goal";
}

function normalizeSourceType(value: unknown): GroundedFixSourceType {
  return sourceTypes.includes(value as GroundedFixSourceType)
    ? (value as GroundedFixSourceType)
    : "manual";
}

function confidenceScore(value: GroundedFixRawSignal["confidence"]): number {
  if (value === "high") return 0.86;
  if (value === "medium") return 0.58;
  if (value === "low") return 0.28;
  return clampGroundedFixScore(value ?? 0.5);
}

function importanceScore(value: GroundedFixRawSignal["importance"], confidence: number): number {
  if (typeof value === "number") return clampGroundedFixScore(value);
  if (value === "critical") return 0.96;
  if (value === "high") return 0.76;
  if (value === "medium") return 0.52;
  if (value === "low") return 0.24;
  return confidence;
}

function normalizeWarnings(signal: GroundedFixRawSignal, needle: string): string[] {
  const warnings = signal.warnings ?? [];
  return uniqueGroundedFixStrings(
    warnings.filter((warning) => warning.toLowerCase().includes(needle))
  );
}

export function normalizeFixSignal(
  signal: GroundedFixRawSignal,
  index = 0
): GroundedFixSignal {
  const type = normalizeType(signal.type);
  const sourceType = normalizeSourceType(signal.sourceType);
  const confidence = confidenceScore(signal.confidence);
  const scoredImportance = importanceScore(signal.importance, confidence);
  const filePath = signal.filePath?.trim() || null;
  const sourceId = signal.sourceId?.trim() || buildGroundedFixStableKey(sourceType, index);
  const title = signal.title?.trim() || signal.summary?.trim() || "Grounded fix signal";
  const summary = signal.summary?.trim() || title;
  const staleWarnings = uniqueGroundedFixStrings([
    ...(signal.stale ? ["Stale evidence warning"] : []),
    ...normalizeWarnings(signal, "stale"),
  ]);
  const weakWarnings = uniqueGroundedFixStrings([
    ...(signal.weak || confidence < 0.45 ? ["Weak evidence warning"] : []),
    ...normalizeWarnings(signal, "weak"),
  ]);
  const contradictionWarnings = normalizeWarnings(signal, "contradict");
  const id =
    signal.id?.trim() ||
    buildGroundedFixStableKey("fix-signal", type, sourceType, sourceId, filePath, signal.lineNumber, index);

  return {
    id,
    type,
    title,
    summary,
    sourceType,
    sourceId,
    filePath,
    lineNumber: typeof signal.lineNumber === "number" ? signal.lineNumber : null,
    match: signal.match?.trim() || null,
    confidence,
    importance: importanceFromGroundedFixScore(scoredImportance) as GroundedFixImportance,
    importanceScore: scoredImportance,
    riskHints: uniqueGroundedFixStrings([...(signal.riskHints ?? [])]),
    staleWarnings,
    weakWarnings,
    contradictionWarnings,
    sourceRefs: [...(signal.sourceRefs ?? [])].sort((a, b) =>
      buildGroundedFixStableKey(a.type, a.id, a.label).localeCompare(
        buildGroundedFixStableKey(b.type, b.id, b.label)
      )
    ),
  };
}

export function normalizeFixSignals(signals: readonly GroundedFixRawSignal[] = []): GroundedFixSignal[] {
  return signals
    .map((signal, index) => normalizeFixSignal(signal, index))
    .sort((a, b) => {
      const fileRank = String(a.filePath ?? "").localeCompare(String(b.filePath ?? ""));
      if (fileRank !== 0) return fileRank;
      const importanceRank = b.importanceScore - a.importanceScore;
      if (importanceRank !== 0) return importanceRank;
      const confidenceRank = b.confidence - a.confidence;
      if (confidenceRank !== 0) return confidenceRank;
      return a.id.localeCompare(b.id);
    });
}

export function summarizeFixSignals(signals: readonly GroundedFixSignal[] = []): GroundedFixSignalSummary {
  const fileCount = uniqueGroundedFixStrings(signals.map((signal) => signal.filePath)).length;
  const weakCount = signals.filter((signal) => signal.weakWarnings.length > 0).length;
  const staleCount = signals.filter((signal) => signal.staleWarnings.length > 0).length;

  return {
    id: "grounded-fix-signal-summary",
    signalCount: signals.length,
    fileCount,
    weakCount,
    staleCount,
    summary: [
      `${signals.length} grounded fix signals normalized.`,
      `${fileCount} files are referenced by signals.`,
      `${weakCount} weak and ${staleCount} stale warnings require operator review.`,
    ],
  };
}

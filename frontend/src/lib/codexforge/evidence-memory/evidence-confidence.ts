import {
  clampEvidenceMemoryScore,
  type NormalizedEvidenceItem,
} from "./evidence-memory-types";

function repeatedEvidenceCount(item: NormalizedEvidenceItem, allItems: readonly NormalizedEvidenceItem[] = []): number {
  return allItems.filter(
    (candidate) =>
      candidate.id !== item.id &&
      candidate.value.trim().toLowerCase() === item.value.trim().toLowerCase()
  ).length;
}

function hasHint(item: NormalizedEvidenceItem, terms: string[]): boolean {
  const haystack = [
    item.label,
    item.value,
    item.snippet,
    item.filePath ?? "",
    ...item.warnings,
  ]
    .join(" ")
    .toLowerCase();

  return terms.some((term) => haystack.includes(term));
}

export function scoreEvidenceConfidence(
  item: NormalizedEvidenceItem,
  allItems: readonly NormalizedEvidenceItem[] = []
): number {
  const repeated = repeatedEvidenceCount(item, allItems);
  const statusAdjustment =
    item.resultStatus === "completed"
      ? 0.08
      : item.resultStatus === "failed" || item.resultStatus === "blocked"
        ? -0.2
        : item.resultStatus === "pending" || item.resultStatus === "skipped"
          ? -0.12
          : -0.08;
  const sourceAdjustment =
    item.sourceType === "read-only-evidence-item"
      ? 0.05
      : item.sourceType === "read-only-result-line"
        ? 0.06
        : item.sourceType === "read-only-result-path"
          ? 0.04
          : 0.02;
  const specificityAdjustment =
    (item.filePath ? 0.08 : 0) + (item.lineNumber !== null ? 0.06 : 0);
  const repeatedAdjustment = Math.min(0.12, repeated * 0.04);
  const warningAdjustment =
    item.type === "warning" ? -0.1 : item.type === "error" ? -0.08 : 0;
  const staleAdjustment = hasHint(item, ["stale", "unknown", "outdated"]) ? -0.16 : 0;
  const contradictionAdjustment = hasHint(item, ["contradict", "conflict", "inconsistent"]) ? -0.22 : 0;

  return clampEvidenceMemoryScore(
    item.confidence +
      statusAdjustment +
      sourceAdjustment +
      specificityAdjustment +
      repeatedAdjustment +
      warningAdjustment +
      staleAdjustment +
      contradictionAdjustment
  );
}

export function scoreEvidenceImportance(
  item: NormalizedEvidenceItem,
  allItems: readonly NormalizedEvidenceItem[] = []
): number {
  const repeated = repeatedEvidenceCount(item, allItems);
  const typeScore =
    item.type === "error"
      ? 0.9
      : item.type === "warning"
        ? 0.78
        : item.type === "line"
          ? 0.74
          : item.type === "file" || item.type === "path"
            ? 0.62
            : item.type === "match" || item.type === "snippet"
              ? 0.58
              : item.type === "summary"
                ? 0.48
                : 0.42;
  const specificity = (item.filePath ? 0.1 : 0) + (item.lineNumber !== null ? 0.08 : 0);
  const testBoost = hasHint(item, ["test", "smoke", "build", "validation"]) ? 0.12 : 0;
  const decisionBoost = hasHint(item, ["decision", "policy", "approval", "blocked"]) ? 0.1 : 0;
  const repeatedBoost = Math.min(0.08, repeated * 0.03);

  return clampEvidenceMemoryScore(typeScore + specificity + testBoost + decisionBoost + repeatedBoost);
}

export function explainEvidenceConfidence(
  item: NormalizedEvidenceItem,
  allItems: readonly NormalizedEvidenceItem[] = []
): string[] {
  const score = scoreEvidenceConfidence(item, allItems);
  const repeated = repeatedEvidenceCount(item, allItems);

  return [
    `Confidence ${(score * 100).toFixed(0)} from ${item.sourceType} with result status ${item.resultStatus}.`,
    item.filePath
      ? `File specificity present: ${item.filePath}${item.lineNumber !== null ? `:${item.lineNumber}` : ""}.`
      : "No file-specific source path was captured.",
    repeated > 0 ? `${repeated} repeated evidence signal(s) reinforce this item.` : "Single evidence signal; review before relying on it.",
    hasHint(item, ["stale", "unknown", "outdated"]) ? "Stale or unknown status hint lowers confidence." : "No stale hint detected.",
    hasHint(item, ["contradict", "conflict", "inconsistent"]) ? "Contradiction hint requires manual review." : "No contradiction hint detected.",
  ];
}

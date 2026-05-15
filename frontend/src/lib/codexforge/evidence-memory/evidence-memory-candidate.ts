import {
  explainEvidenceConfidence,
  scoreEvidenceConfidence,
  scoreEvidenceImportance,
} from "./evidence-confidence";
import {
  buildEvidenceMemoryStableKey,
  importanceFromScore,
  uniqueEvidenceMemoryStrings,
  type EvidenceMemoryCandidate,
  type EvidenceMemoryCandidateKind,
  type EvidenceMemoryCandidateSummary,
  type NormalizedEvidenceBundle,
  type NormalizedEvidenceItem,
} from "./evidence-memory-types";

function selectCandidateKind(item: NormalizedEvidenceItem): EvidenceMemoryCandidateKind {
  const text = `${item.label} ${item.value} ${item.filePath ?? ""}`.toLowerCase();

  if (item.type === "error") return "failure-note";
  if (item.type === "warning") return "risk";
  if (text.includes("test") || text.includes("smoke") || text.includes("build")) return "test-evidence";
  if (text.includes("decision") || text.includes("approval") || text.includes("policy")) return "decision-context";
  if (item.type === "file" || item.type === "path") return "file-summary";
  if (item.type === "line" || item.type === "match" || item.type === "snippet") return "implementation-detail";
  if (text.includes("todo") || text.includes("follow-up") || text.includes("next")) return "follow-up";
  if (item.type === "summary" || item.type === "result-status") return "observation";
  return "fact";
}

function titleForEvidence(item: NormalizedEvidenceItem, kind: EvidenceMemoryCandidateKind): string {
  const path = item.filePath ? ` in ${item.filePath}` : "";
  const line = item.lineNumber !== null ? `:${item.lineNumber}` : "";
  const prefix =
    kind === "risk"
      ? "Risk"
      : kind === "failure-note"
        ? "Failure note"
        : kind === "file-summary"
          ? "File evidence"
          : kind === "implementation-detail"
            ? "Implementation detail"
            : kind === "test-evidence"
              ? "Test evidence"
              : "Evidence observation";

  return `${prefix}: ${item.label}${path}${line}`;
}

function contentForEvidence(item: NormalizedEvidenceItem): string {
  const source = item.filePath
    ? `Source: ${item.filePath}${item.lineNumber !== null ? `:${item.lineNumber}` : ""}.`
    : `Source: ${item.toolName}.`;
  return `${item.label}: ${item.snippet || item.value}\n${source}\nEvidence is from approved read-only execution and must be reviewed before memory promotion.`;
}

function reviewStateForEvidence(item: NormalizedEvidenceItem, confidence: number): EvidenceMemoryCandidate["reviewState"] {
  const warningText = item.warnings.join(" ").toLowerCase();
  if (confidence < 0.35 || warningText.includes("contradict") || warningText.includes("stale")) return "blocked";
  if (confidence < 0.5 || item.resultStatus !== "completed") return "deferred";
  return "needs-review";
}

export function buildEvidenceMemoryCandidate(
  item: NormalizedEvidenceItem,
  allItems: readonly NormalizedEvidenceItem[] = []
): EvidenceMemoryCandidate {
  const kind = selectCandidateKind(item);
  const confidence = scoreEvidenceConfidence(item, allItems);
  const importanceScore = scoreEvidenceImportance(item, allItems);
  const reviewState = reviewStateForEvidence(item, confidence);
  const blockedReasons = [
    "Review required before memory promotion",
    item.resultStatus === "completed" ? "" : `Result status ${item.resultStatus} requires review.`,
    confidence < 0.5 ? "Low-confidence candidates need manual verification." : "",
    item.warnings.some((warning) => warning.toLowerCase().includes("stale")) ? "Stale evidence blocks automatic promotion." : "",
    item.warnings.some((warning) => warning.toLowerCase().includes("contradict")) ? "Contradictory evidence blocks promotion." : "",
  ].filter(Boolean);
  const relatedFilePaths = uniqueEvidenceMemoryStrings([item.filePath]);
  const candidate: EvidenceMemoryCandidate = {
    id: buildEvidenceMemoryStableKey("evidence-memory-candidate", kind, item.id),
    kind,
    title: titleForEvidence(item, kind),
    content: contentForEvidence(item),
    sourceEvidenceIds: [item.id],
    sourceExecutionIds: [item.sourceExecutionId],
    relatedFilePaths,
    relatedTaskId: item.relatedTaskId,
    relatedStepId: item.relatedStepId,
    suggestedTags: uniqueEvidenceMemoryStrings([
      "read-only-execution",
      "execution-evidence",
      kind,
      item.type,
      item.toolName,
      item.filePath ? "file-specific" : null,
    ]),
    confidence,
    importance: importanceFromScore(importanceScore),
    importanceScore,
    reviewState,
    promotionBlockedUntilReview: true,
    blockedReasons,
    warnings: uniqueEvidenceMemoryStrings(item.warnings),
    summary: [],
  };

  return {
    ...candidate,
    summary: [
      `${candidate.kind} candidate from ${item.type} evidence.`,
      `Confidence ${(candidate.confidence * 100).toFixed(0)} and importance ${candidate.importance}.`,
      `Review state ${candidate.reviewState}; promotion blocked until review.`,
      ...explainEvidenceConfidence(item, allItems).slice(0, 2),
    ],
  };
}

export function buildEvidenceMemoryCandidates(
  evidence: NormalizedEvidenceBundle | readonly NormalizedEvidenceItem[]
): EvidenceMemoryCandidate[] {
  const items = "items" in evidence ? evidence.items : evidence;
  const byId = new Map<string, EvidenceMemoryCandidate>();

  for (const item of items) {
    const candidate = buildEvidenceMemoryCandidate(item, items);
    byId.set(candidate.id, candidate);
  }

  return Array.from(byId.values()).sort((left, right) => {
    if (right.confidence !== left.confidence) return right.confidence - left.confidence;
    if (right.importanceScore !== left.importanceScore) return right.importanceScore - left.importanceScore;
    return left.id.localeCompare(right.id);
  });
}

export function summarizeEvidenceMemoryCandidates(
  candidates: readonly EvidenceMemoryCandidate[]
): string[] {
  const blocked = candidates.filter((candidate) => candidate.reviewState === "blocked").length;
  const deferred = candidates.filter((candidate) => candidate.reviewState === "deferred").length;
  const needsReview = candidates.filter((candidate) => candidate.reviewState === "needs-review").length;

  return [
    `${candidates.length} evidence memory candidate(s) built from read-only evidence.`,
    `${needsReview} candidate(s) need review, ${deferred} deferred, ${blocked} blocked.`,
    "Candidates are sorted by confidence descending, importance descending, then candidate id.",
    "No candidate is auto-promoted; every candidate remains review-gated.",
  ];
}

export function buildEvidenceMemoryCandidateSummary(
  candidates: readonly EvidenceMemoryCandidate[]
): EvidenceMemoryCandidateSummary {
  return {
    id: "evidence-memory-candidate-summary",
    candidates: [...candidates],
    summary: summarizeEvidenceMemoryCandidates(candidates),
  };
}

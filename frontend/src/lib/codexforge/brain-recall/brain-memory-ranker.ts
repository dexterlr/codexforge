import type { BrainMemoryIndexItem, BrainMemoryScore, BrainRecallQuery } from "./brain-recall-types";

const IMPORTANCE_WEIGHT: Record<string, number> = {
  unknown: 0,
  low: 2,
  medium: 5,
  high: 9,
  critical: 14,
};

function hasAnyNeedle(haystack: string[], needles: string[]): boolean {
  return needles.some((needle) => haystack.some((item) => item.toLowerCase().includes(needle)));
}

function recencyScore(updatedAt: number, newest: number): number {
  if (!Number.isFinite(updatedAt) || !Number.isFinite(newest) || newest <= 0) return 0;
  const distance = Math.max(0, newest - updatedAt);
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  return Math.max(0, 8 - Math.floor(distance / thirtyDays));
}

function passesFilters(item: BrainMemoryIndexItem, query: BrainRecallQuery): boolean {
  if (query.kindFilters.length && !query.kindFilters.includes(item.kind)) return false;
  if (query.statusFilters.length && !query.statusFilters.includes(item.status)) return false;
  if (query.importanceFilters.length && !query.importanceFilters.includes(item.importance)) return false;
  if (query.tagFilters.length && !query.tagFilters.every((tag) => hasAnyNeedle(item.tags, [tag]))) return false;
  if (query.fileHints.length && !hasAnyNeedle(item.relatedFilePaths, query.fileHints)) return false;
  if (query.artifactHints.length && !hasAnyNeedle(item.relatedArtifactIds, query.artifactHints)) return false;
  if (query.runHints.length && !hasAnyNeedle(item.relatedRunIds, query.runHints)) return false;
  return true;
}

export function scoreBrainMemoryResult(
  item: BrainMemoryIndexItem,
  query: BrainRecallQuery,
  newestUpdatedAt = item.updatedAt
): BrainMemoryScore {
  if (!passesFilters(item, query)) {
    return { item, score: 0, reasons: ["Filtered out by query constraints."] };
  }

  let score = 0;
  const reasons: string[] = [];

  for (const term of query.terms) {
    if (!term) continue;
    if (item.label.toLowerCase().includes(term)) {
      score += 16;
      reasons.push(`Title matched "${term}".`);
    }
    if (item.searchableText.includes(term)) {
      score += 10;
      reasons.push(`Memory text matched "${term}".`);
    }
  }

  for (const phrase of query.exactPhrases) {
    if (item.searchableText.includes(phrase)) {
      score += 28;
      reasons.push(`Exact phrase matched "${phrase}".`);
    }
  }

  for (const tag of query.tagFilters) {
    if (hasAnyNeedle(item.tags, [tag])) {
      score += 18;
      reasons.push(`Tag matched "${tag}".`);
    }
  }

  if (query.kindFilters.includes(item.kind)) {
    score += 14;
    reasons.push(`Kind matched ${item.kind}.`);
  }

  if (query.statusFilters.includes(item.status)) {
    score += 9;
    reasons.push(`Status matched ${item.status}.`);
  }

  if (query.fileHints.length && hasAnyNeedle(item.relatedFilePaths, query.fileHints)) {
    score += 20;
    reasons.push("Related file path matched.");
  }

  if (query.artifactHints.length && hasAnyNeedle(item.relatedArtifactIds, query.artifactHints)) {
    score += 16;
    reasons.push("Related artifact matched.");
  }

  if (query.runHints.length && hasAnyNeedle(item.relatedRunIds, query.runHints)) {
    score += 16;
    reasons.push("Related run matched.");
  }

  const importanceScore = IMPORTANCE_WEIGHT[item.importance] ?? 0;
  score += importanceScore;
  if (importanceScore > 0) reasons.push(`Importance contributes ${importanceScore}.`);

  const contextDensity = item.sourceRefs.length + item.relatedNodeIds.length + item.relatedFilePaths.length + item.relatedArtifactIds.length + item.relatedRunIds.length;
  if (contextDensity > 0) {
    score += Math.min(14, contextDensity * 2);
    reasons.push("Related context density increased confidence.");
  }

  const recent = recencyScore(item.updatedAt, newestUpdatedAt);
  if (recent > 0) {
    score += recent;
    reasons.push("Updated recently relative to graph.");
  }

  if (item.pinned) {
    score += 12;
    reasons.push("Pinned memory hint.");
  }

  if (item.criticalHints.length > 0) {
    score += 7;
    reasons.push("Critical or safety hint present.");
  }

  if (query.terms.length === 0 && query.exactPhrases.length === 0 && score > 0) {
    score += 4;
    reasons.push("Filter-only recall matched.");
  }

  return { item, score, reasons: explainBrainMemoryScore({ item, score, reasons }) };
}

export function rankBrainMemoryResults(
  items: BrainMemoryIndexItem[],
  query: BrainRecallQuery,
  limit = 12
): BrainMemoryScore[] {
  const newestUpdatedAt = items.reduce((max, item) => Math.max(max, item.updatedAt), 0);

  return items
    .map((item) => scoreBrainMemoryResult(item, query, newestUpdatedAt))
    .filter((score) => score.score > 0)
    // Deterministic ordering: score descending, importance descending, updatedAt descending, id ascending.
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const importanceDelta = (IMPORTANCE_WEIGHT[b.item.importance] ?? 0) - (IMPORTANCE_WEIGHT[a.item.importance] ?? 0);
      if (importanceDelta !== 0) return importanceDelta;
      if (b.item.updatedAt !== a.item.updatedAt) return b.item.updatedAt - a.item.updatedAt;
      return a.item.id.localeCompare(b.item.id);
    })
    .slice(0, limit);
}

export function explainBrainMemoryScore(score: BrainMemoryScore): string[] {
  return Array.from(new Set(score.reasons)).sort();
}

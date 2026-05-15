import type { BrainRecallResult, BrainRecallResults, BrainRecallSummary } from "./brain-recall-types";

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

export function buildBrainRecallSummary(results: BrainRecallResults): BrainRecallSummary {
  const kindCounts = Array.from(
    results.results.reduce((map, result) => {
      map.set(result.kind, (map.get(result.kind) ?? 0) + 1);
      return map;
    }, new Map<BrainRecallResult["kind"], number>())
  )
    .map(([kind, count]) => ({ kind, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.kind.localeCompare(b.kind);
    });

  const riskHints = unique(
    results.results.flatMap((result) =>
      [result.snippet, ...result.reasons].filter((value) => /risk|blocked|critical|safety|approval/i.test(value))
    )
  );
  const contradictionHints = unique(
    results.results.flatMap((result) =>
      [result.snippet, ...result.reasons].filter((value) => /contradiction|conflict|stale/i.test(value))
    )
  );
  const topResult = results.results[0] ?? null;

  return {
    id: "brain-recall-summary",
    query: results.query.raw,
    resultCount: results.results.length,
    topResult,
    kindCounts,
    riskHints,
    contradictionHints,
    suggestedNextAction: topResult
      ? topResult.suggestedNextAction
      : "Broaden the query, then inspect current files before relying on memory.",
    safeHandoffSummary: topResult
      ? `Use "${topResult.title}" as context only; inspect before editing and prefer current source content.`
      : "No memory was selected for handoff.",
  };
}

export function summarizeBrainRecallSession(summary: BrainRecallSummary): string[] {
  return [
    `${summary.resultCount} recall results for "${summary.query || "empty query"}".`,
    summary.topResult ? `Top recall: ${summary.topResult.title}.` : "No top recall result.",
    summary.safeHandoffSummary,
  ];
}

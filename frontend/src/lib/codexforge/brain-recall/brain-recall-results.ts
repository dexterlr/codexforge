import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { buildBrainMemoryIndex } from "./brain-memory-index";
import { parseBrainRecallQuery } from "./brain-memory-query";
import { rankBrainMemoryResults } from "./brain-memory-ranker";
import { buildBrainRelatedContext } from "./brain-related-context";
import type { BrainMemoryIndexItem, BrainMemoryScore, BrainRecallResult, BrainRecallResults } from "./brain-recall-types";

function snippetFromItem(item: BrainMemoryIndexItem): string {
  const text = item.searchableText.replace(/\s+/g, " ").trim();
  if (!text) return item.label;
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

export function buildBrainRecallResult(
  graph: CodexForgeBrainGraph,
  scored: BrainMemoryScore
): BrainRecallResult {
  const item = scored.item;
  const relatedContext = buildBrainRelatedContext(graph, item);

  return {
    id: `brain-recall-result:${item.nodeId}`,
    nodeId: item.nodeId,
    title: item.label,
    snippet: snippetFromItem(item),
    score: scored.score,
    reasons: scored.reasons,
    kind: item.kind,
    status: item.status,
    importance: item.importance,
    sourceRefs: item.sourceRefs,
    relatedContext,
    suggestedNextAction:
      relatedContext.files.length > 0
        ? "Inspect related files before editing and prefer current file content over recalled memory."
        : "Use this memory as context, then inspect current sources before taking action.",
  };
}

export function buildBrainRecallResults(args: {
  graph: CodexForgeBrainGraph;
  query: string;
  limit?: number;
}): BrainRecallResults {
  const index = buildBrainMemoryIndex(args.graph);
  const query = parseBrainRecallQuery(args.query);
  const ranked = rankBrainMemoryResults(index.items, query, args.limit ?? 12);
  const results = ranked.map((score) => buildBrainRecallResult(args.graph, score));

  return {
    id: "brain-recall-results",
    query,
    results,
    summary: summarizeBrainRecallResults(results),
  };
}

export function summarizeBrainRecallResults(results: BrainRecallResult[]): string[] {
  if (results.length === 0) {
    return [
      "No approved Brain memory matched the deterministic local recall query.",
      "Try kind:, tag:, status:, or file: filters with broader plain text.",
    ];
  }

  return [
    `${results.length} ranked recall cards produced.`,
    `Top result: ${results[0].title} (${results[0].score}).`,
    "Results are ranked without AI calls, network calls, or graph mutation.",
  ];
}

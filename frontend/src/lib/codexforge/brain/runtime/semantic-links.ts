import type {
  CodexForgeBrainEdgeKind,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainScoreSemanticLinksInput,
  CodexForgeBrainSemanticRelationCandidate,
} from "./runtime-types";

const TEXT_FIELDS = [
  "label",
  "summary",
  "goal",
  "content",
  "text",
  "description",
  "filePath",
  "path",
  "repoPath",
  "domain",
] as const;

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function tokenize(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 4 && !/^\d+$/.test(token))
  );
}

function nodeText(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return TEXT_FIELDS.map((field) => asString(data[field])).filter(Boolean).join(" ");
}

function tagOverlap(a: CodexForgeBrainNode, b: CodexForgeBrainNode): number {
  const aTags = new Set(asStringArray((a.data as Record<string, unknown>).tags));
  const bTags = new Set(asStringArray((b.data as Record<string, unknown>).tags));
  let overlap = 0;

  for (const tag of aTags) {
    if (bTags.has(tag)) overlap += 1;
  }

  return overlap;
}

function sourceOverlap(a: CodexForgeBrainNode, b: CodexForgeBrainNode): boolean {
  const aRefs = new Set((a.meta.sourceRefs ?? []).map((ref) => `${ref.type}:${ref.id}`));
  return (b.meta.sourceRefs ?? []).some((ref) => aRefs.has(`${ref.type}:${ref.id}`));
}

function chooseRelationKind(
  a: CodexForgeBrainNode,
  b: CodexForgeBrainNode
): CodexForgeBrainEdgeKind {
  if (a.kind === "diff" || b.kind === "diff") return "references";
  if (a.kind === "repo" || b.kind === "repo") return "about";
  if (a.kind === "memory" || b.kind === "memory") return "relates_to";
  return "references";
}

function scorePair(
  a: CodexForgeBrainNode,
  b: CodexForgeBrainNode,
  focusNodeIds: Set<string>
): CodexForgeBrainSemanticRelationCandidate | null {
  const reasons: string[] = [];
  let score = 0;

  const overlap = tagOverlap(a, b);
  if (overlap > 0) {
    score += overlap * 25;
    reasons.push("shared-tags");
  }

  const aData = a.data as Record<string, unknown>;
  const bData = b.data as Record<string, unknown>;
  const aDomain = asString(aData.domain);
  const bDomain = asString(bData.domain);
  if (aDomain && aDomain === bDomain) {
    score += 20;
    reasons.push("shared-domain");
  }

  const aPath = asString(aData.filePath) ?? asString(aData.path) ?? asString(aData.repoPath);
  const bPath = asString(bData.filePath) ?? asString(bData.path) ?? asString(bData.repoPath);
  if (aPath && bPath && (aPath === bPath || aPath.includes(bPath) || bPath.includes(aPath))) {
    score += 30;
    reasons.push("shared-path");
  }

  const aTokens = tokenize(nodeText(a));
  const bTokens = tokenize(nodeText(b));
  let tokenOverlap = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) tokenOverlap += 1;
  }

  if (tokenOverlap > 0) {
    score += Math.min(40, tokenOverlap * 8);
    reasons.push("shared-terms");
  }

  if (sourceOverlap(a, b)) {
    score += 35;
    reasons.push("shared-source");
  }

  if (focusNodeIds.has(a.id) || focusNodeIds.has(b.id)) {
    score += 12;
    reasons.push("near-focus");
  }

  if (score < 35) return null;

  return {
    from: a.id,
    to: b.id,
    kind: chooseRelationKind(a, b),
    score,
    reasons,
  };
}

export function scoreSemanticLinks(
  input: CodexForgeBrainScoreSemanticLinksInput
): CodexForgeBrainSemanticRelationCandidate[] {
  const focusNodeIds = new Set(input.focusNodeIds ?? []);
  const existing = new Set(
    input.graph.edges.map((edge) => `${edge.from}:${edge.kind}:${edge.to}`)
  );
  const nodes =
    focusNodeIds.size > 0
      ? input.graph.nodes.filter((node) => focusNodeIds.has(node.id) || node.meta.pinned)
      : input.graph.nodes;
  const candidates: CodexForgeBrainSemanticRelationCandidate[] = [];
  const maxPairs = input.maxPairs ?? 400;
  let pairCount = 0;

  for (let leftIndex = 0; leftIndex < nodes.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < nodes.length; rightIndex += 1) {
      if (pairCount >= maxPairs) break;
      pairCount += 1;

      const a = nodes[leftIndex];
      const b = nodes[rightIndex];
      const candidate = scorePair(a, b, focusNodeIds);
      if (!candidate) continue;

      if (
        existing.has(`${candidate.from}:${candidate.kind}:${candidate.to}`) ||
        existing.has(`${candidate.to}:${candidate.kind}:${candidate.from}`)
      ) {
        continue;
      }

      candidates.push(candidate);
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, input.maxCandidates ?? 24);
}

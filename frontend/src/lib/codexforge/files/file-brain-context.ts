import { buildBrainMemoryIngestionPlan } from "@/lib/codexforge/brain/runtime/ingestion";
import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import { calculateFileRisk } from "./file-risk";
import type { CodexForgeFileDependency, CodexForgeFileNode } from "./types";

export type CodexForgeFileBrainMatchReason =
  | "exact-file-path"
  | "exact-repo-path"
  | "id-path"
  | "file-name-text"
  | "subsystem"
  | "route-component"
  | "smoke-test"
  | "dependency"
  | "concept"
  | "connected-edge";

export type CodexForgeFileBrainContextNode = {
  id: string;
  node: CodexForgeBrainNode;
  label: string;
  summary: string;
  kind: CodexForgeBrainNode["kind"];
  status: string;
  importance: string;
  score: number;
  reasons: CodexForgeFileBrainMatchReason[];
};

export type CodexForgeFileBrainEmptyState = {
  title: string;
  detail: string;
  nextAction: string;
};

export type CodexForgeFileBrainContext = {
  filePath: string;
  fileName: string;
  relatedNodes: CodexForgeFileBrainContextNode[];
  relatedEdges: CodexForgeBrainEdge[];
  topConcepts: string[];
  topRisks: string[];
  relatedSmokeScripts: string[];
  confidenceScore: number;
  sourceExplanation: string[];
  emptyState: CodexForgeFileBrainEmptyState | null;
  summary: string;
  readOnly: true;
  deterministic: true;
};

export type CodexForgeFileBrainContextInput = {
  file: CodexForgeFileNode;
  files?: CodexForgeFileNode[];
  dependencies?: CodexForgeFileDependency[];
  graph?: CodexForgeBrainGraph;
};

type AssociationSet = {
  subsystemSlugs: string[];
  routePaths: string[];
  smokeTerms: string[];
};

type NodeScore = {
  node: CodexForgeBrainNode;
  score: number;
  reasons: Set<CodexForgeFileBrainMatchReason>;
};

const MAX_RELATED_NODES = 10;
const MAX_RELATED_EDGES = 16;
const MAX_SOURCE_EXPLANATIONS = 8;

function normalizePath(value: string): string {
  return value
    .trim()
    .replaceAll("\\", "/")
    .replace(/\/+/g, "/")
    .replace(/^\.\//, "")
    .toLowerCase();
}

function compactPath(value: string): string {
  return normalizePath(value).replace(/[^a-z0-9]+/g, "");
}

function stripExtension(value: string): string {
  const lastDot = value.lastIndexOf(".");
  return lastDot > 0 ? value.slice(0, lastDot) : value;
}

function words(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .map((part) => part.trim())
    .filter((part) => part.length > 2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function dataString(node: CodexForgeBrainNode, key: string): string {
  const data = node.data as Record<string, unknown>;
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function dataStringArray(node: CodexForgeBrainNode, key: string): string[] {
  const data = node.data as Record<string, unknown>;
  const value = data[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function nodeLabel(node: CodexForgeBrainNode): string {
  return dataString(node, "label") || node.id;
}

function nodeSummary(node: CodexForgeBrainNode): string {
  return (
    dataString(node, "summary") ||
    dataString(node, "description") ||
    dataString(node, "whyItMatters") ||
    dataString(node, "content") ||
    dataString(node, "text") ||
    dataString(node, "resultSummary") ||
    "Related Brain memory."
  );
}

function searchableNodeText(node: CodexForgeBrainNode): string {
  const values: string[] = [node.id, node.kind];

  if (isRecord(node.data)) {
    for (const value of Object.values(node.data)) {
      if (typeof value === "string" && value.trim()) {
        values.push(value.trim());
      } else if (Array.isArray(value)) {
        values.push(
          ...value.filter((item): item is string => typeof item === "string")
        );
      }
    }
  }

  return values.join(" ").toLowerCase();
}

function sourcePaths(node: CodexForgeBrainNode): string[] {
  return [
    dataString(node, "filePath"),
    dataString(node, "repoPath"),
    dataString(node, "path"),
  ].filter(Boolean);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function addScore(
  scores: Map<string, NodeScore>,
  node: CodexForgeBrainNode,
  score: number,
  reason: CodexForgeFileBrainMatchReason
) {
  const existing = scores.get(node.id);
  if (existing) {
    existing.score += score;
    existing.reasons.add(reason);
    return;
  }

  scores.set(node.id, {
    node,
    score,
    reasons: new Set([reason]),
  });
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b)
  );
}

function inferAssociations(file: CodexForgeFileNode): AssociationSet {
  const haystack = `${file.path} ${file.ownerArea} ${file.area} ${file.kind} ${file.concepts.join(" ")}`.toLowerCase();
  const subsystemSlugs: string[] = [];
  const routePaths: string[] = [];
  const smokeTerms: string[] = [];

  if (haystack.includes("files")) {
    subsystemSlugs.push("files-command-center");
    routePaths.push("/files");
    smokeTerms.push("files", "files-command-center");
  }

  if (haystack.includes("brain") || haystack.includes("graph") || haystack.includes("runtime")) {
    subsystemSlugs.push("brain-runtime");
    smokeTerms.push("brain", "brain-runtime");
  }

  if (haystack.includes("graph")) {
    subsystemSlugs.push("visual-graph");
    smokeTerms.push("graph", "brain-graph");
  }

  if (haystack.includes("chat")) {
    subsystemSlugs.push("chat-engine");
    smokeTerms.push("chat", "workspace");
  }

  if (haystack.includes("history")) {
    subsystemSlugs.push("history-activity-intelligence");
    routePaths.push("/history");
    smokeTerms.push("history");
  }

  if (haystack.includes("storage")) {
    subsystemSlugs.push("storage-local-persistence");
  }

  if (haystack.includes("smoke") || file.kind === "smoke") {
    subsystemSlugs.push("smoke-suite");
    smokeTerms.push("smoke", stripExtension(file.name));
  }

  if (haystack.includes("predictive")) {
    subsystemSlugs.push("predictive-context");
    smokeTerms.push("predictive-context");
  }

  if (haystack.includes("safety") || haystack.includes("approval")) {
    subsystemSlugs.push("operator-safety");
  }

  if (file.path.includes("/app/brain") || file.path.includes("/brain/")) {
    routePaths.push("/brain");
  }

  return {
    subsystemSlugs: uniqueSorted(subsystemSlugs),
    routePaths: uniqueSorted(routePaths),
    smokeTerms: uniqueSorted(smokeTerms),
  };
}

function connectedEdges(
  graph: CodexForgeBrainGraph,
  nodeIds: Set<string>
): CodexForgeBrainEdge[] {
  return graph.edges
    .filter((edge) => nodeIds.has(edge.from) || nodeIds.has(edge.to))
    .sort((a, b) => {
      const weightDelta = (b.weight ?? 0) - (a.weight ?? 0);
      if (weightDelta !== 0) return weightDelta;
      return a.id.localeCompare(b.id);
    });
}

function relatedDependencyPaths(
  file: CodexForgeFileNode,
  dependencies: CodexForgeFileDependency[] = []
): string[] {
  return dependencies
    .filter(
      (dependency) =>
        dependency.fromPath === file.path || dependency.toPath === file.path
    )
    .map((dependency) =>
      dependency.fromPath === file.path ? dependency.toPath : dependency.fromPath
    );
}

function isExactSourcePathMatch(node: CodexForgeBrainNode, filePath: string): boolean {
  const normalizedFilePath = normalizePath(filePath);
  return sourcePaths(node).some((candidate) => normalizePath(candidate) === normalizedFilePath);
}

function isRepoPathMatch(node: CodexForgeBrainNode, filePath: string): boolean {
  const normalizedFilePath = normalizePath(filePath);
  const repoPath = dataString(node, "repoPath");
  return Boolean(repoPath) && normalizePath(repoPath) === normalizedFilePath;
}

function buildNodeResult(score: NodeScore): CodexForgeFileBrainContextNode {
  return {
    id: score.node.id,
    node: score.node,
    label: nodeLabel(score.node),
    summary: nodeSummary(score.node),
    kind: score.node.kind,
    status: score.node.meta.status ?? "idle",
    importance: score.node.meta.importance ?? "low",
    score: clampScore(score.score),
    reasons: Array.from(score.reasons).sort(),
  };
}

function scoreNodeMatches(input: CodexForgeFileBrainContextInput): Map<string, NodeScore> {
  const graph = input.graph ?? buildBrainMemoryIngestionPlan().graph;
  const file = input.file;
  const associations = inferAssociations(file);
  const scores = new Map<string, NodeScore>();
  const normalizedFilePath = normalizePath(file.path);
  const compactFilePath = compactPath(file.path);
  const fileName = file.name.toLowerCase();
  const fileStem = stripExtension(file.name).toLowerCase();
  const fileNameWords = words(fileStem);
  const dependencyPaths = relatedDependencyPaths(file, input.dependencies).map(normalizePath);

  for (const node of graph.nodes) {
    const text = searchableNodeText(node);
    const nodeId = normalizePath(node.id);
    const nodeCompactId = compactPath(node.id);

    if (isExactSourcePathMatch(node, file.path)) {
      addScore(scores, node, 100, "exact-file-path");
    }

    if (isRepoPathMatch(node, file.path)) {
      addScore(scores, node, 90, "exact-repo-path");
    }

    if (nodeId.includes(normalizedFilePath) || nodeCompactId.includes(compactFilePath)) {
      addScore(scores, node, 82, "id-path");
    }

    if (
      text.includes(fileName) ||
      text.includes(fileStem) ||
      (fileNameWords.length > 0 && fileNameWords.every((word) => text.includes(word)))
    ) {
      addScore(scores, node, 42, "file-name-text");
    }

    if (
      associations.subsystemSlugs.some(
        (slug) => nodeId.includes(`subsystem:${slug}`) || text.includes(slug)
      )
    ) {
      addScore(scores, node, 38, "subsystem");
    }

    if (
      associations.routePaths.some(
        (routePath) =>
          normalizePath(dataString(node, "path")) === normalizePath(routePath) ||
          nodeId.includes(`route:${routePath}`) ||
          text.includes(`route ${routePath}`)
      )
    ) {
      addScore(scores, node, 34, "route-component");
    }

    if (
      sourcePaths(node).some((candidate) =>
        dependencyPaths.includes(normalizePath(candidate))
      )
    ) {
      addScore(scores, node, 24, "dependency");
    }

    const matchedConcepts = file.concepts.filter((concept) =>
      words(concept).every((word) => text.includes(word))
    );
    if (matchedConcepts.length > 0) {
      addScore(scores, node, Math.min(24, matchedConcepts.length * 8), "concept");
    }

    if (
      text.includes("smoke") &&
      associations.smokeTerms.some((term) => text.includes(term.toLowerCase()))
    ) {
      addScore(scores, node, 30, "smoke-test");
    }
  }

  const directMatches = new Set(scores.keys());
  const lookup = new Map(graph.nodes.map((node) => [node.id, node]));

  for (const edge of connectedEdges(graph, directMatches)) {
    const otherId = directMatches.has(edge.from) ? edge.to : edge.from;
    const otherNode = lookup.get(otherId);
    if (otherNode) {
      addScore(scores, otherNode, 22 + Math.round((edge.weight ?? 0) * 10), "connected-edge");
    }
  }

  return scores;
}

export function rankFileBrainContextNodes(
  nodes: CodexForgeFileBrainContextNode[]
): CodexForgeFileBrainContextNode[] {
  return [...nodes].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const importanceRank: Record<string, number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
    };
    const importanceDelta =
      (importanceRank[b.importance] ?? 0) - (importanceRank[a.importance] ?? 0);
    if (importanceDelta !== 0) return importanceDelta;
    return a.id.localeCompare(b.id);
  });
}

export function findRelatedBrainNodesForFile(
  input: CodexForgeFileBrainContextInput
): CodexForgeFileBrainContextNode[] {
  return rankFileBrainContextNodes(
    Array.from(scoreNodeMatches(input).values()).map(buildNodeResult)
  ).slice(0, MAX_RELATED_NODES);
}

function extractConcepts(
  file: CodexForgeFileNode,
  nodes: CodexForgeFileBrainContextNode[]
): string[] {
  const values = [...file.concepts];

  for (const item of nodes) {
    const tags = dataStringArray(item.node, "tags");
    values.push(
      ...tags
        .filter((tag) => !["brain-memory-ingestion", "file", "route"].includes(tag))
        .map((tag) => tag.replaceAll("-", " "))
    );

    if (item.node.kind === "memory" || item.node.kind === "decision") {
      values.push(item.label);
    }
  }

  return uniqueSorted(values).slice(0, 8);
}

function extractRisks(file: CodexForgeFileNode): string[] {
  const risk = calculateFileRisk(file);
  const drivers = risk.signals
    .filter((signal) => signal.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((signal) => signal.label);

  return (drivers.length ? drivers : [risk.summary]).slice(0, 5);
}

function extractSmokeScripts(
  file: CodexForgeFileNode,
  nodes: CodexForgeFileBrainContextNode[],
  graph: CodexForgeBrainGraph
): string[] {
  const associations = inferAssociations(file);
  const scripts: string[] = [];

  if (file.path.includes("scripts/smoke-")) {
    scripts.push(file.path);
  }

  for (const item of file.executionHistory) {
    if (item.command.includes("smoke-codexforge-")) {
      scripts.push(item.command);
    }
  }

  for (const item of nodes) {
    const path = dataString(item.node, "filePath") || dataString(item.node, "path");
    const text = searchableNodeText(item.node);
    if (path.includes("scripts/smoke-")) {
      scripts.push(path);
    } else if (text.includes("smoke-codexforge-")) {
      const match = text.match(/scripts\/smoke-codexforge-[a-z0-9-]+\.ps1/);
      if (match?.[0]) scripts.push(match[0]);
    }
  }

  for (const node of graph.nodes) {
    const text = searchableNodeText(node);
    const path = dataString(node, "filePath") || dataString(node, "path");
    if (
      path.includes("scripts/smoke-") &&
      associations.smokeTerms.some((term) => text.includes(term.toLowerCase()))
    ) {
      scripts.push(path);
    }
  }

  return uniqueSorted(scripts).slice(0, 6);
}

function confidenceScore(nodes: CodexForgeFileBrainContextNode[], edges: CodexForgeBrainEdge[]): number {
  if (nodes.length === 0) return 0;
  const topScore = nodes[0]?.score ?? 0;
  return clampScore(topScore * 0.72 + nodes.length * 4 + edges.length * 1.5);
}

function sourceExplanation(nodes: CodexForgeFileBrainContextNode[]): string[] {
  const labels: Record<CodexForgeFileBrainMatchReason, string> = {
    "exact-file-path": "exact Brain filePath/path match",
    "exact-repo-path": "exact Brain repoPath match",
    "id-path": "node id contains normalized file path",
    "file-name-text": "node text mentions the selected file name",
    subsystem: "known subsystem association",
    "route-component": "route or component association",
    "smoke-test": "smoke or test relation",
    dependency: "Files dependency relation",
    concept: "shared concept terms",
    "connected-edge": "connected Brain graph edge",
  };

  return uniqueSorted(nodes.flatMap((node) => node.reasons.map((reason) => labels[reason]))).slice(
    0,
    MAX_SOURCE_EXPLANATIONS
  );
}

export function summarizeFileBrainContext(
  context: Omit<CodexForgeFileBrainContext, "summary"> | CodexForgeFileBrainContext
): string {
  if (context.relatedNodes.length === 0) {
    return `No Brain memory was found for ${context.filePath}; inspect the file and use /brain for broader context.`;
  }

  return `${context.filePath} has ${context.relatedNodes.length} Brain memories, ${context.relatedEdges.length} related edges, and ${context.confidenceScore}/100 context confidence.`;
}

export function buildFileBrainContext(
  input: CodexForgeFileBrainContextInput
): CodexForgeFileBrainContext {
  const graph = input.graph ?? buildBrainMemoryIngestionPlan().graph;
  const relatedNodes = findRelatedBrainNodesForFile({ ...input, graph });
  const relatedNodeIds = new Set(relatedNodes.map((node) => node.id));
  const relatedEdges = connectedEdges(graph, relatedNodeIds).slice(0, MAX_RELATED_EDGES);
  const topConcepts = extractConcepts(input.file, relatedNodes);
  const topRisks = extractRisks(input.file);
  const relatedSmokeScripts = extractSmokeScripts(input.file, relatedNodes, graph);
  const confidence = confidenceScore(relatedNodes, relatedEdges);
  const emptyState =
    relatedNodes.length === 0
      ? {
          title: "No Brain memory found",
          detail:
            "The deterministic Brain seed has no path, route, subsystem, concept, or smoke relation for this file yet.",
          nextAction:
            "Inspect the file first, then open Brain to review nearby project memory before planning.",
        }
      : null;

  const context = {
    filePath: input.file.path,
    fileName: input.file.name,
    relatedNodes,
    relatedEdges,
    topConcepts,
    topRisks,
    relatedSmokeScripts,
    confidenceScore: confidence,
    sourceExplanation: sourceExplanation(relatedNodes),
    emptyState,
    summary: "",
    readOnly: true,
    deterministic: true,
  } satisfies CodexForgeFileBrainContext;

  return {
    ...context,
    summary: summarizeFileBrainContext(context),
  };
}

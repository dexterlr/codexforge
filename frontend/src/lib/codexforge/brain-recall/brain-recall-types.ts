import type {
  CodexForgeBrainGraph,
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainNodeKind,
  CodexForgeBrainSourceRef,
  CodexForgeBrainStatus,
} from "@/lib/codexforge/brain/graph/types";

export type BrainRecallSourceRef = CodexForgeBrainSourceRef;

export type BrainMemoryIndexItem = {
  id: string;
  nodeId: CodexForgeBrainNodeId;
  kind: CodexForgeBrainNodeKind;
  label: string;
  searchableText: string;
  tags: string[];
  status: CodexForgeBrainStatus | "unknown";
  importance: CodexForgeBrainImportance | "unknown";
  updatedAt: number;
  sourceRefs: BrainRecallSourceRef[];
  relatedNodeIds: string[];
  relatedFilePaths: string[];
  relatedArtifactIds: string[];
  relatedRunIds: string[];
  pinned: boolean;
  criticalHints: string[];
};

export type BrainMemoryIndex = {
  id: "brain-memory-index";
  itemCount: number;
  graphUpdatedAt: number;
  items: BrainMemoryIndexItem[];
  summary: string[];
};

export type BrainRecallQuery = {
  id: string;
  raw: string;
  normalizedText: string;
  terms: string[];
  exactPhrases: string[];
  kindFilters: CodexForgeBrainNodeKind[];
  tagFilters: string[];
  statusFilters: Array<CodexForgeBrainStatus | "unknown">;
  importanceFilters: Array<CodexForgeBrainImportance | "unknown">;
  fileHints: string[];
  artifactHints: string[];
  runHints: string[];
  summary: string[];
};

export type BrainMemoryScore = {
  item: BrainMemoryIndexItem;
  score: number;
  reasons: string[];
};

export type BrainRelatedFileContext = {
  path: string;
  reason: string;
};

export type BrainRelatedArtifactContext = {
  artifactId: string;
  label: string;
  reason: string;
};

export type BrainRelatedRunContext = {
  runId: string;
  label: string;
  reason: string;
};

export type BrainNeighborContext = {
  nodeId: string;
  kind: CodexForgeBrainNodeKind;
  label: string;
  relation: string;
};

export type BrainRelatedContext = {
  nodeId: string;
  neighbors: BrainNeighborContext[];
  sourceRefs: BrainRecallSourceRef[];
  files: BrainRelatedFileContext[];
  artifacts: BrainRelatedArtifactContext[];
  runs: BrainRelatedRunContext[];
  productionPackReferences: string[];
  memoryReviewReferences: string[];
  summary: string[];
};

export type BrainRecallResult = {
  id: string;
  nodeId: string;
  title: string;
  snippet: string;
  score: number;
  reasons: string[];
  kind: CodexForgeBrainNodeKind;
  status: BrainMemoryIndexItem["status"];
  importance: BrainMemoryIndexItem["importance"];
  sourceRefs: BrainRecallSourceRef[];
  relatedContext: BrainRelatedContext;
  suggestedNextAction: string;
};

export type BrainRecallResults = {
  id: "brain-recall-results";
  query: BrainRecallQuery;
  results: BrainRecallResult[];
  summary: string[];
};

export type BrainRecallSummary = {
  id: "brain-recall-summary";
  query: string;
  resultCount: number;
  topResult: BrainRecallResult | null;
  kindCounts: Array<{ kind: CodexForgeBrainNodeKind; count: number }>;
  riskHints: string[];
  contradictionHints: string[];
  suggestedNextAction: string;
  safeHandoffSummary: string;
};

export type BrainRecallHandoff = {
  id: "brain-recall-handoff";
  query: string;
  selectedResultIds: string[];
  chatPrompt: string;
  filePrompt: string;
  safetyNotes: string[];
  summary: string[];
};

export type BrainRecallInput = {
  graph: CodexForgeBrainGraph;
  query: string;
  limit?: number;
};

export type BrainRecallGraphNode = CodexForgeBrainNode;

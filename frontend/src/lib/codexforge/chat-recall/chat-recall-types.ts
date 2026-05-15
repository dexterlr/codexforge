import type {
  BrainRecallResult,
  BrainRecallSourceRef,
} from "@/lib/codexforge/brain-recall/brain-recall-types";

export const CHAT_RECALL_CONTEXT_STORAGE_KEY = "codexforge_chat_recall_context_v1";

export type ChatRecallReadiness = "ready" | "weak" | "stale" | "blocked";

export type ChatRecallStaleWarning = {
  stale: boolean;
  label: string;
  reasons: string[];
};

export type ChatRecallSelectionItem = {
  id: string;
  recallResultId: string;
  nodeId: string;
  title: string;
  snippet: string;
  score: number;
  reasons: string[];
  sourceRefs: BrainRecallSourceRef[];
  staleWarning: ChatRecallStaleWarning;
  selected: boolean;
  injectionReadiness: ChatRecallReadiness;
};

export type ChatRecallSelection = {
  id: "chat-recall-selection";
  items: ChatRecallSelectionItem[];
  selectedItems: ChatRecallSelectionItem[];
  summary: string[];
};

export type ChatRecallContextBlock = {
  id: string;
  recallResultId: string;
  nodeId: string;
  memoryTitle: string;
  snippet: string;
  sourceRefs: BrainRecallSourceRef[];
  score: number;
  confidence: "strong" | "weak";
  reasons: string[];
  relatedFiles: string[];
  relatedArtifacts: string[];
  relatedRuns: string[];
  staleWarning: ChatRecallStaleWarning;
  instruction: string;
};

export type ChatRecallContext = {
  id: "chat-recall-context";
  blocks: ChatRecallContextBlock[];
  visibleContextRequired: boolean;
  summary: string[];
};

export type ChatRecallGroundingPolicy = {
  id: "chat-recall-grounding-policy";
  allowContext: boolean;
  rules: string[];
  weakItemIds: string[];
  staleItemIds: string[];
  blockedItemIds: string[];
  summary: string[];
};

export type ChatRecallSafetyBoundary = {
  id: "chat-recall-safety-boundary";
  rules: string[];
  summary: string[];
};

export type ChatRecallHandoff = {
  id: "chat-recall-handoff";
  selectedItemIds: string[];
  promptPrefix: string;
  summary: string[];
};

export type ChatRecallSummary = {
  id: "chat-recall-summary";
  selectedCount: number;
  weakCount: number;
  staleCount: number;
  promptReady: boolean;
  summary: string[];
};

export type ChatRecallPreparedContext = {
  selection: ChatRecallSelection;
  context: ChatRecallContext;
  policy: ChatRecallGroundingPolicy;
  safety: ChatRecallSafetyBoundary;
  handoff: ChatRecallHandoff;
};

export type ChatRecallResultInput = Pick<
  BrainRecallResult,
  | "id"
  | "nodeId"
  | "title"
  | "snippet"
  | "score"
  | "reasons"
  | "sourceRefs"
  | "relatedContext"
>;

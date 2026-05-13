import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainExecutionLineage,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainSemanticRelationCandidate,
} from "../runtime-types";
import type {
  CodexForgeAgentRuntimeMessage,
  CodexForgeAgentRuntimePlan,
} from "@/lib/codexforge/agents/runtime";

export type CodexForgeBrainReplayLaneId =
  | "messages"
  | "tasks"
  | "executions"
  | "diffs"
  | "memory"
  | "concepts"
  | "failures"
  | "recoveries"
  | "agents";

export type CodexForgeBrainReplayItem = {
  id: string;
  laneId: CodexForgeBrainReplayLaneId;
  eventId?: string;
  timestamp: CodexForgeBrainTimestamp;
  label: string;
  summary: string;
  status: "idle" | "active" | "done" | "blocked" | "error";
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  nodeIds: CodexForgeBrainNodeId[];
  edgeIds: string[];
  payload?: Record<string, unknown>;
};

export type CodexForgeBrainReplayLane = {
  id: CodexForgeBrainReplayLaneId;
  label: string;
  items: CodexForgeBrainReplayItem[];
};

export type CodexForgeBrainReplayFrame = {
  id: string;
  index: number;
  timestamp: CodexForgeBrainTimestamp;
  label: string;
  summary: string;
  activeLaneId: CodexForgeBrainReplayLaneId;
  itemIds: string[];
  highlightedNodeIds: CodexForgeBrainNodeId[];
  highlightedEdgeIds: string[];
};

export type CodexForgeBrainReplaySummary = {
  eventCount: number;
  frameCount: number;
  laneCount: number;
  firstTimestamp?: CodexForgeBrainTimestamp;
  latestTimestamp?: CodexForgeBrainTimestamp;
  status: "empty" | "ready";
  text: string;
};

export type CodexForgeBrainLineageNodeKind =
  | "message"
  | "task"
  | "execution"
  | "diff"
  | "failure"
  | "recovery"
  | "memory"
  | "concept"
  | "agent"
  | "handoff"
  | "review"
  | "risk";

export type CodexForgeBrainLineageNode = {
  id: string;
  kind: CodexForgeBrainLineageNodeKind;
  label: string;
  summary: string;
  status: "idle" | "active" | "done" | "blocked" | "error";
  severity: "low" | "medium" | "high" | "critical";
  timestamp?: CodexForgeBrainTimestamp;
  source: "graph" | "event" | "execution-lineage" | "semantic-link" | "agent-runtime" | "fixture";
  graphNodeId?: CodexForgeBrainNodeId;
  payload?: Record<string, unknown>;
};

export type CodexForgeBrainLineageEdge = {
  id: string;
  from: string;
  to: string;
  label: string;
  relation:
    | "message-to-task"
    | "task-to-execution"
    | "execution-to-diff"
    | "execution-to-failure"
    | "failure-to-recovery"
    | "memory-to-concept"
    | "concept-to-source-memory"
    | "agent-to-handoff"
    | "agent-to-review"
    | "reviewer-to-risk";
  severity: "low" | "medium" | "high" | "critical";
  timestamp?: CodexForgeBrainTimestamp;
  source: CodexForgeBrainLineageNode["source"];
};

export type CodexForgeBrainLineageGraph = {
  id: string;
  label: string;
  summary: string;
  nodes: CodexForgeBrainLineageNode[];
  edges: CodexForgeBrainLineageEdge[];
};

export type CodexForgeBrainReplayBuildInput = {
  graph: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  executionLineage?: CodexForgeBrainExecutionLineage;
  semanticLinks?: readonly CodexForgeBrainSemanticRelationCandidate[];
  agentPlan?: CodexForgeAgentRuntimePlan;
  agentMessages?: readonly CodexForgeAgentRuntimeMessage[];
  now?: CodexForgeBrainTimestamp;
};

export type CodexForgeBrainReplayGraphRefs = {
  nodeById: Map<string, CodexForgeBrainNode>;
  edgeById: Map<string, CodexForgeBrainEdge>;
};

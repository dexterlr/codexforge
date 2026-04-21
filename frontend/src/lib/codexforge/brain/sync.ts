import {
  connectNodes,
  dedupeGraph,
  loadBrainGraph,
  saveBrainGraph,
  upsertNode,
  type CodexForgeBrainGraph,
} from "@/lib/codexforge/brain/graph";
import type { CodexForgeChatContext } from "@/lib/codexforge/types";

/* ================= SHARED TYPES ================= */

export type CodexForgeTaskStepStatus =
  | "pending"
  | "running"
  | "done"
  | "error";

export type CodexForgeTaskDomain = string;

export type CodexForgeActiveTaskStep = {
  id: string;
  text: string;
  status: CodexForgeTaskStepStatus;
  result?: string;
  lastRunAt?: number;
};

export type CodexForgeActiveTaskLike = {
  id: string;
  goal: string;
  steps: CodexForgeActiveTaskStep[];
  currentStep: number;
  sourceMessageId: string;
  createdAt: number;
  updatedAt: number;
  domain: CodexForgeTaskDomain;
  tags: string[];
};

export type CodexForgeMemoryItemLike = {
  id: string;
  type: "fact" | "decision" | "task" | "note";
  content: string;
  importance: number;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
  sourceMessageId?: string;
};

export type CodexForgeEngineDiffLike = {
  filePath: string;
  patch: string;
};

export type CodexForgeEngineSnapshotLike = {
  fileCount: number;
  sampledPaths: string[];
};

export type CodexForgeEngineStateLike = {
  phase: string;
  goal: {
    goal: string;
    repoPath: string;
  } | null;
  plan: {
    steps: Array<{
      id: string;
      description: string;
    }>;
  } | null;
  diffs: CodexForgeEngineDiffLike[];
  logs: string[];
  snapshot?: CodexForgeEngineSnapshotLike;
  testOutput?: string;
  error?: string;
};

export type CodexForgeExecutionStateLike = {
  running: boolean;
  stepIndex: number | null;
  taskId: string | null;
  startedAt: number | null;
  lastCompletedAt: number | null;
  lastResultMessageId: string | null;
  lastRunLabel: string;
  engineState: CodexForgeEngineStateLike | null;
};

export type CodexForgeMessageLike = {
  id: string;
  role: "system" | "user" | "assistant";
  text: string;
  ts: number;
  source?: string;
};

export type CodexForgeBrainGraphSummaryPayload = {
  nodeCount: number;
  edgeCount: number;
  updatedAt: number;
  kinds: Record<string, number>;
};

export type CodexForgeBrainGraphContextPayload = {
  graph: CodexForgeBrainGraph;
  summary: CodexForgeBrainGraphSummaryPayload;
  focusNodeIds: string[];
  includeConnectedDepth: number;
};

export type CodexForgeBrainSyncArgs = {
  context: CodexForgeChatContext;
  messages: CodexForgeMessageLike[];
  activeTask: CodexForgeActiveTaskLike | null;
  memory: CodexForgeMemoryItemLike[];
  executionState: CodexForgeExecutionStateLike;
  productName?: string;
  maxBrainMessages?: number;
  maxBrainMemory?: number;
  maxBrainSteps?: number;
  maxBrainDiffs?: number;
};

export type CodexForgeBrainRequestGraphArgs = CodexForgeBrainSyncArgs & {
  maxRequestNodes?: number;
  maxRequestEdges?: number;
  maxRequestFocus?: number;
  includeConnectedDepth?: number;
};

/* ================= DEFAULTS ================= */

const DEFAULT_PRODUCT_NAME = "CodexForge";
const DEFAULT_MAX_BRAIN_MESSAGES = 80;
const DEFAULT_MAX_BRAIN_MEMORY = 32;
const DEFAULT_MAX_BRAIN_STEPS = 24;
const DEFAULT_MAX_BRAIN_DIFFS = 12;
const DEFAULT_MAX_REQUEST_NODES = 48;
const DEFAULT_MAX_REQUEST_EDGES = 120;
const DEFAULT_MAX_REQUEST_FOCUS = 24;
const DEFAULT_REQUEST_DEPTH = 2;

const MESSAGE_FOCUS_LIMIT = 4;
const PINNED_MEMORY_FOCUS_LIMIT = 8;
const MAX_MESSAGE_TEXT = 220;
const MAX_MEMORY_TEXT = 180;
const MAX_DIFF_PREVIEW = 240;
const MAX_RUN_LOGS = 4;
const MAX_RUN_LOG_TEXT = 120;
const MAX_TAGS = 8;
const MAX_SUMMARY_PATHS = 4;

const BRAIN_STATUS = {
  IDLE: "idle",
  ACTIVE: "active",
  DONE: "done",
  BLOCKED: "blocked",
  ERROR: "error",
  ARCHIVED: "archived",
} as const;

const BRAIN_IMPORTANCE = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

/* ================= UTILS ================= */

function now(): number {
  return Date.now();
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString(16);
}

function toIdPart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized.length > 0 ? normalized.slice(0, 80) : stableHash(value);
}

function buildStableId(
  prefix: string,
  ...parts: Array<string | number | null | undefined>
): string {
  const normalizedParts = parts
    .filter((part): part is string | number => part !== null && part !== undefined)
    .map((part) => String(part).trim())
    .filter(Boolean)
    .map(toIdPart);

  return normalizedParts.length > 0
    ? `${prefix}:${normalizedParts.join(":")}`
    : `${prefix}:${stableHash(prefix)}`;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function clampGraphLabel(text: string, max = 96): string {
  return clampText(text, max);
}

function toBrainImportance(level: number) {
  if (level >= 0.95) return BRAIN_IMPORTANCE.CRITICAL;
  if (level >= 0.75) return BRAIN_IMPORTANCE.HIGH;
  if (level >= 0.5) return BRAIN_IMPORTANCE.MEDIUM;
  return BRAIN_IMPORTANCE.LOW;
}

function summarizeEngineState(
  engineState: CodexForgeEngineStateLike | null
): string {
  if (!engineState) {
    return "No engine result recorded.";
  }

  const parts = [
    `Phase: ${engineState.phase}`,
    `Diffs: ${engineState.diffs.length}`,
    `Snapshot files: ${engineState.snapshot?.fileCount ?? 0}`,
  ];

  if (engineState.testOutput) {
    parts.push(`Result: ${engineState.testOutput}`);
  }

  if (engineState.error) {
    parts.push(`Error: ${engineState.error}`);
  }

  return parts.join(" • ");
}

function summarizeTags(tags: string[], max = MAX_TAGS): string[] {
  return dedupeStrings(tags).slice(0, max);
}

function summarizePaths(paths: string[], max = MAX_SUMMARY_PATHS): string[] {
  return dedupeStrings(paths).slice(0, max);
}

function summarizeDiffTargets(diffs: CodexForgeEngineDiffLike[]): string[] {
  return summarizePaths(diffs.map((diff) => diff.filePath).filter(Boolean));
}

function summarizeLogs(logs: string[]): string[] {
  return logs
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .slice(0, MAX_RUN_LOGS)
    .map((value) => clampText(value.trim(), MAX_RUN_LOG_TEXT));
}

function makeMessageSnippet(message: CodexForgeMessageLike): string {
  return clampText(message.text.trim(), MAX_MESSAGE_TEXT);
}

function makeMemorySnippet(item: CodexForgeMemoryItemLike): string {
  return clampText(item.content.trim(), MAX_MEMORY_TEXT);
}

function summarizeStepProgress(task: CodexForgeActiveTaskLike): {
  completed: number;
  running: number;
  errored: number;
  pending: number;
} {
  let completed = 0;
  let running = 0;
  let errored = 0;
  let pending = 0;

  for (const step of task.steps) {
    if (step.status === "done") completed += 1;
    else if (step.status === "running") running += 1;
    else if (step.status === "error") errored += 1;
    else pending += 1;
  }

  return { completed, running, errored, pending };
}

function summarizeTaskState(task: CodexForgeActiveTaskLike): string {
  const progress = summarizeStepProgress(task);
  const currentStep = task.steps[task.currentStep]?.text;

  return [
    `Goal: ${task.goal}`,
    `Domain: ${task.domain}`,
    `Steps: ${progress.completed}/${task.steps.length} done`,
    currentStep ? `Current: ${currentStep}` : "",
    progress.errored > 0 ? `Errors: ${progress.errored}` : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizePlanState(task: CodexForgeActiveTaskLike): string {
  const nextAction = task.steps[task.currentStep]?.text;

  return [
    `Plan for ${task.goal}`,
    `Domain: ${task.domain}`,
    `Step count: ${task.steps.length}`,
    nextAction ? `Next action: ${nextAction}` : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeStepState(
  task: CodexForgeActiveTaskLike,
  step: CodexForgeActiveTaskStep,
  stepIndex: number
): string {
  return [
    `Task: ${task.goal}`,
    `Step ${stepIndex + 1} of ${task.steps.length}`,
    `Status: ${step.status}`,
    step.result ? clampText(step.result, 140) : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeRunState(
  executionState: CodexForgeExecutionStateLike,
  productName: string
): string {
  const engineState = executionState.engineState;
  const logSummary = summarizeLogs(engineState?.logs ?? []);
  const diffTargets = summarizeDiffTargets(engineState?.diffs ?? []);

  return [
    executionState.lastRunLabel || `${productName} execution run`,
    summarizeEngineState(engineState),
    diffTargets.length > 0 ? `Targets: ${diffTargets.join(", ")}` : "",
    logSummary[0] ? `Log: ${logSummary[0]}` : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeSnapshotState(snapshot: CodexForgeEngineSnapshotLike): string {
  const paths = summarizePaths(snapshot.sampledPaths);

  return [
    `${snapshot.fileCount} files`,
    paths.length > 0 ? `Sample: ${paths.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeDiffState(diff: CodexForgeEngineDiffLike): string {
  return [
    diff.filePath,
    diff.patch ? clampText(diff.patch, 140) : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeMemoryState(item: CodexForgeMemoryItemLike): string {
  return [
    `${item.type} memory`,
    item.pinned ? "pinned" : "",
    makeMemorySnippet(item),
  ]
    .filter(Boolean)
    .join(" • ");
}

function summarizeMessageState(message: CodexForgeMessageLike): string {
  return [
    `${message.role} message`,
    message.source ?? "",
    makeMessageSnippet(message),
  ]
    .filter(Boolean)
    .join(" • ");
}

function deriveRunImportance(
  executionState: CodexForgeExecutionStateLike
): "low" | "medium" | "high" | "critical" {
  const phase = executionState.engineState?.phase;

  if (phase === "error") return BRAIN_IMPORTANCE.CRITICAL;
  if (phase === "awaiting_diff_approval" || phase === "awaiting_plan_approval") {
    return BRAIN_IMPORTANCE.HIGH;
  }
  if (executionState.running) return BRAIN_IMPORTANCE.HIGH;
  return BRAIN_IMPORTANCE.MEDIUM;
}

function getNodePriority(node: CodexForgeBrainGraph["nodes"][number]): number {
  let score = 0;

  if (node.meta.pinned) score += 120;

  switch (node.meta.importance) {
    case BRAIN_IMPORTANCE.CRITICAL:
      score += 100;
      break;
    case BRAIN_IMPORTANCE.HIGH:
      score += 75;
      break;
    case BRAIN_IMPORTANCE.MEDIUM:
      score += 45;
      break;
    case BRAIN_IMPORTANCE.LOW:
      score += 20;
      break;
  }

  switch (node.meta.status) {
    case BRAIN_STATUS.ACTIVE:
      score += 70;
      break;
    case BRAIN_STATUS.ERROR:
      score += 85;
      break;
    case BRAIN_STATUS.BLOCKED:
      score += 65;
      break;
    case BRAIN_STATUS.DONE:
      score += 25;
      break;
    case BRAIN_STATUS.IDLE:
      score += 10;
      break;
    case BRAIN_STATUS.ARCHIVED:
      score -= 50;
      break;
  }

  switch (node.kind) {
    case "task":
      score += 95;
      break;
    case "plan":
      score += 90;
      break;
    case "step":
      score += 80;
      break;
    case "run":
      score += 88;
      break;
    case "memory":
      score += 72;
      break;
    case "diff":
      score += 70;
      break;
    case "snapshot":
      score += 62;
      break;
    case "repo":
      score += 60;
      break;
    case "project":
      score += 58;
      break;
    case "workspace":
      score += 55;
      break;
    case "conversation":
      score += 45;
      break;
    case "message":
      score += 22;
      break;
    case "tag":
      score += 8;
      break;
  }

  if (typeof node.meta.updatedAt === "number") {
    score += Math.floor(node.meta.updatedAt / 10_000_000);
  }

  return score;
}

/* ================= SUMMARY ================= */

export function summarizeBrainGraphForPayload(
  graph: CodexForgeBrainGraph
): CodexForgeBrainGraphSummaryPayload {
  const kinds: Record<string, number> = {};

  for (const node of graph.nodes) {
    kinds[node.kind] = (kinds[node.kind] ?? 0) + 1;
  }

  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    updatedAt: graph.meta.updatedAt,
    kinds,
  };
}

/* ================= FOCUS ================= */

export function collectBrainFocusNodeIds(
  args: CodexForgeBrainRequestGraphArgs
): string[] {
  const productName = args.productName ?? DEFAULT_PRODUCT_NAME;
  const maxFocus = args.maxRequestFocus ?? DEFAULT_MAX_REQUEST_FOCUS;
  const ids: string[] = [];

  const projectName = args.context.projectName || productName;
  const workspaceRoot = args.context.workspaceRoot || projectName;

  const push = (...values: string[]) => {
    ids.push(...values);
  };

  push(buildStableId("workspace", workspaceRoot));
  push(buildStableId("project", projectName));

  if (args.context.repoPath) {
    push(buildStableId("repo", args.context.repoPath));
  }

  push(
    buildStableId(
      "conversation",
      projectName,
      args.context.repoPath || args.context.workspaceRoot || "default"
    )
  );

  if (args.activeTask) {
    push(buildStableId("task", args.activeTask.id, args.activeTask.goal));
    push(
      buildStableId(
        "plan",
        args.activeTask.id,
        args.activeTask.goal,
        args.activeTask.domain
      )
    );

    const currentStep = args.activeTask.steps[args.activeTask.currentStep];
    if (currentStep) {
      push(
        buildStableId(
          "step",
          args.activeTask.id,
          args.activeTask.currentStep,
          currentStep.text
        )
      );
    }

    for (const tag of summarizeTags(args.activeTask.tags, 4)) {
      push(buildStableId("tag", tag));
    }
  }

  for (const item of args.memory
    .filter((memoryItem) => memoryItem.pinned)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, PINNED_MEMORY_FOCUS_LIMIT)) {
    push(buildStableId("memory", item.id));
  }

  if (args.executionState.lastRunLabel || args.executionState.engineState) {
    const runId = buildStableId(
      "run",
      args.activeTask?.id || "no-task",
      args.executionState.lastRunLabel ||
        args.executionState.engineState?.phase ||
        "run",
      args.executionState.lastCompletedAt ||
        args.executionState.startedAt ||
        0
    );

    push(runId);

    for (const diff of (args.executionState.engineState?.diffs ?? []).slice(0, 3)) {
      push(buildStableId("diff", runId, diff.filePath));
    }

    const snapshot = args.executionState.engineState?.snapshot;
    if (snapshot) {
      push(
        buildStableId(
          "snapshot",
          runId,
          snapshot.fileCount,
          ...snapshot.sampledPaths.slice(0, 6)
        )
      );
    }
  }

  for (const message of [...args.messages]
    .filter((message) => message.role !== "system")
    .sort((a, b) => b.ts - a.ts)
    .slice(0, MESSAGE_FOCUS_LIMIT)) {
    push(buildStableId("message", message.id));
  }

  return dedupeStrings(ids).slice(0, maxFocus);
}

/* ================= REDUCED GRAPH ================= */

export function buildReducedBrainGraph(
  graph: CodexForgeBrainGraph,
  focusNodeIds: string[],
  depth: number,
  maxNodes = DEFAULT_MAX_REQUEST_NODES,
  maxEdges = DEFAULT_MAX_REQUEST_EDGES
): CodexForgeBrainGraph {
  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));
  const edgeBuckets = new Map<string, CodexForgeBrainGraph["edges"]>();

  for (const edge of graph.edges) {
    const fromList = edgeBuckets.get(edge.from) ?? [];
    fromList.push(edge);
    edgeBuckets.set(edge.from, fromList);

    const toList = edgeBuckets.get(edge.to) ?? [];
    toList.push(edge);
    edgeBuckets.set(edge.to, toList);
  }

  const queue: Array<{ id: string; depth: number; priority: number }> = [];
  const selectedNodeIds = new Set<string>();
  const seen = new Set<string>();

  for (const nodeId of focusNodeIds) {
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    queue.push({
      id: nodeId,
      depth: 0,
      priority: getNodePriority(node) + 500,
    });
  }

  queue.sort((a, b) => b.priority - a.priority);

  if (queue.length === 0) {
    const fallbackNodes = [...graph.nodes]
      .sort((a, b) => getNodePriority(b) - getNodePriority(a))
      .slice(0, Math.min(maxNodes, graph.nodes.length));

    for (const node of fallbackNodes) {
      selectedNodeIds.add(node.id);
    }
  } else {
    while (queue.length > 0 && selectedNodeIds.size < maxNodes) {
      queue.sort((a, b) => {
        if (a.depth !== b.depth) return a.depth - b.depth;
        return b.priority - a.priority;
      });

      const current = queue.shift();
      if (!current) break;
      if (seen.has(current.id)) continue;

      seen.add(current.id);

      const node = nodeMap.get(current.id);
      if (!node) continue;

      selectedNodeIds.add(node.id);

      if (current.depth >= depth) {
        continue;
      }

      const relatedEdges = edgeBuckets.get(current.id) ?? [];
      for (const edge of relatedEdges) {
        const otherId = edge.from === current.id ? edge.to : edge.from;
        if (seen.has(otherId)) continue;

        const otherNode = nodeMap.get(otherId);
        if (!otherNode) continue;

        queue.push({
          id: otherId,
          depth: current.depth + 1,
          priority: getNodePriority(otherNode),
        });
      }
    }
  }

  if (selectedNodeIds.size < maxNodes) {
    const extras = [...graph.nodes]
      .filter((node) => !selectedNodeIds.has(node.id))
      .sort((a, b) => getNodePriority(b) - getNodePriority(a))
      .slice(0, maxNodes - selectedNodeIds.size);

    for (const node of extras) {
      selectedNodeIds.add(node.id);
    }
  }

  const nodes = graph.nodes
    .filter((node) => selectedNodeIds.has(node.id))
    .sort((a, b) => getNodePriority(b) - getNodePriority(a));

  const edges = graph.edges
    .filter(
      (edge) =>
        selectedNodeIds.has(edge.from) && selectedNodeIds.has(edge.to)
    )
    .slice(0, maxEdges);

  return dedupeGraph({
    version: graph.version,
    nodes,
    edges,
    meta: {
      ...graph.meta,
      updatedAt: graph.meta.updatedAt,
    },
  });
}

/* ================= UPSERT HELPERS ================= */

function upsertWorkspaceBrainNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  productName: string
) {
  const workspaceRoot = context.workspaceRoot || productName;
  const label = context.projectName || `${productName} Workspace`;
  const nodeId = buildStableId("workspace", workspaceRoot);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "workspace",
      data: {
        label,
        description: `Primary ${productName} workspace`,
        repoPath: context.repoPath,
        summary: `${productName} local-first workspace root`,
        whyItMatters:
          "The workspace node anchors repo context, project scope, and saved memory.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
        sourceRefs: [{ type: "system", id: "workspace" }],
      },
    }),
    () => ({
      data: {
        label,
        description: `Primary ${productName} workspace`,
        repoPath: context.repoPath,
        summary: `${productName} local-first workspace root`,
        whyItMatters:
          "The workspace node anchors repo context, project scope, and saved memory.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
      },
    })
  );
}

function upsertProjectBrainNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  productName: string
) {
  const projectName = context.projectName || productName;
  const nodeId = buildStableId("project", projectName);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "project",
      data: {
        label: projectName,
        description: `${projectName} project`,
        repoPath: context.repoPath,
        workspaceRoot: context.workspaceRoot,
        summary: `${projectName} is the active product direction.`,
        whyItMatters:
          "The project node groups task, plan, execution, and repo state into one product context.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
        sourceRefs: [{ type: "system", id: "project" }],
      },
    }),
    () => ({
      data: {
        label: projectName,
        description: `${projectName} project`,
        repoPath: context.repoPath,
        workspaceRoot: context.workspaceRoot,
        summary: `${projectName} is the active product direction.`,
        whyItMatters:
          "The project node groups task, plan, execution, and repo state into one product context.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
      },
    })
  );
}

function upsertRepoBrainNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext
) {
  if (!context.repoPath) {
    return null;
  }

  const repoPath = context.repoPath;
  const label =
    repoPath.split("\\").filter(Boolean).slice(-2).join("\\") || "Repo";
  const nodeId = buildStableId("repo", repoPath);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "repo",
      data: {
        label,
        repoPath,
        summary: `Active repo context: ${label}`,
        whyItMatters:
          "The repo node identifies where code, diffs, snapshots, and execution work are happening.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
        sourceRefs: [{ type: "system", id: "repo" }],
      },
    }),
    () => ({
      data: {
        label,
        repoPath,
        summary: `Active repo context: ${label}`,
        whyItMatters:
          "The repo node identifies where code, diffs, snapshots, and execution work are happening.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
      },
    })
  );
}

function upsertConversationBrainNode(
  graph: CodexForgeBrainGraph,
  context: CodexForgeChatContext,
  messages: CodexForgeMessageLike[],
  productName: string
) {
  const conversationId = buildStableId(
    "conversation",
    context.projectName || productName,
    context.repoPath || context.workspaceRoot || "default"
  );

  const lastMessageAt =
    messages.length > 0 ? Math.max(...messages.map((message) => message.ts || 0)) : now();

  const userMessageCount = messages.filter((message) => message.role === "user").length;
  const assistantMessageCount = messages.filter(
    (message) => message.role === "assistant"
  ).length;

  return upsertNode(
    graph,
    (node) => node.id === conversationId,
    () => ({
      id: conversationId,
      kind: "conversation",
      data: {
        label: `${context.projectName || productName} conversation`,
        messageCount: messages.length,
        userMessageCount,
        assistantMessageCount,
        lastMessageAt,
        summary: `${messages.length} messages in active conversation`,
        whyItMatters:
          "The conversation node links current dialogue history to tasks, plans, memory, and execution state.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.MEDIUM,
        sourceRefs: [{ type: "derived", id: conversationId }],
      },
    }),
    () => ({
      data: {
        label: `${context.projectName || productName} conversation`,
        messageCount: messages.length,
        userMessageCount,
        assistantMessageCount,
        lastMessageAt,
        summary: `${messages.length} messages in active conversation`,
        whyItMatters:
          "The conversation node links current dialogue history to tasks, plans, memory, and execution state.",
      },
      meta: {
        status: BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.MEDIUM,
      },
    })
  );
}

function upsertMessageBrainNodes(
  graph: CodexForgeBrainGraph,
  conversationId: string,
  messages: CodexForgeMessageLike[],
  maxBrainMessages: number
) {
  const recentMessages = [...messages]
    .sort((a, b) => b.ts - a.ts)
    .slice(0, maxBrainMessages)
    .reverse();

  for (const message of recentMessages) {
    const nodeId = buildStableId("message", message.id);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "message",
        data: {
          label: clampGraphLabel(`${message.role}: ${message.text}`, 96),
          role: message.role,
          text: makeMessageSnippet(message),
          source: message.source,
          ts: message.ts,
          summary: summarizeMessageState(message),
          whyItMatters:
            message.role === "assistant"
              ? "Assistant messages may contain plans, decisions, or execution guidance."
              : "User messages capture goals, constraints, and requested work.",
        },
        meta: {
          status: BRAIN_STATUS.DONE,
          importance:
            message.role === "assistant"
              ? BRAIN_IMPORTANCE.MEDIUM
              : BRAIN_IMPORTANCE.LOW,
          sourceRefs: [{ type: "chat-message", id: message.id }],
        },
      }),
      () => ({
        data: {
          label: clampGraphLabel(`${message.role}: ${message.text}`, 96),
          role: message.role,
          text: makeMessageSnippet(message),
          source: message.source,
          ts: message.ts,
          summary: summarizeMessageState(message),
          whyItMatters:
            message.role === "assistant"
              ? "Assistant messages may contain plans, decisions, or execution guidance."
              : "User messages capture goals, constraints, and requested work.",
        },
        meta: {
          status: BRAIN_STATUS.DONE,
          importance:
            message.role === "assistant"
              ? BRAIN_IMPORTANCE.MEDIUM
              : BRAIN_IMPORTANCE.LOW,
        },
      })
    );

    connectNodes(graph, conversationId, nodeId, "contains");
  }
}

function upsertMemoryBrainNodes(
  graph: CodexForgeBrainGraph,
  workspaceId: string,
  memory: CodexForgeMemoryItemLike[],
  maxBrainMemory: number
) {
  const prioritizedMemory = [...memory]
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (a.importance !== b.importance) return b.importance - a.importance;
      return b.updatedAt - a.updatedAt;
    })
    .slice(0, maxBrainMemory);

  for (const item of prioritizedMemory) {
    const nodeId = buildStableId("memory", item.id);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "memory",
        data: {
          label: clampGraphLabel(item.content, 72),
          memoryType: item.type,
          content: makeMemorySnippet(item),
          summary: summarizeMemoryState(item),
          whyItMatters:
            item.type === "decision"
              ? "Decision memory can change future plans and execution choices."
              : item.type === "task"
                ? "Task memory helps maintain continuity across sessions."
                : "Memory nodes preserve useful project context beyond a single message.",
        },
        meta: {
          status: item.pinned ? BRAIN_STATUS.ACTIVE : BRAIN_STATUS.DONE,
          importance: toBrainImportance(item.importance),
          pinned: item.pinned,
          sourceRefs: item.sourceMessageId
            ? [{ type: "memory-item", id: item.id }]
            : [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: clampGraphLabel(item.content, 72),
          memoryType: item.type,
          content: makeMemorySnippet(item),
          summary: summarizeMemoryState(item),
          whyItMatters:
            item.type === "decision"
              ? "Decision memory can change future plans and execution choices."
              : item.type === "task"
                ? "Task memory helps maintain continuity across sessions."
                : "Memory nodes preserve useful project context beyond a single message.",
        },
        meta: {
          status: item.pinned ? BRAIN_STATUS.ACTIVE : BRAIN_STATUS.DONE,
          importance: toBrainImportance(item.importance),
          pinned: item.pinned,
        },
      })
    );

    connectNodes(graph, workspaceId, nodeId, "contains");
  }
}

function upsertTaskBrainNode(
  graph: CodexForgeBrainGraph,
  task: CodexForgeActiveTaskLike
) {
  const nodeId = buildStableId("task", task.id, task.goal);
  const progress = summarizeStepProgress(task);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "task",
      data: {
        label: clampGraphLabel(task.goal, 96),
        goal: task.goal,
        domain: task.domain,
        currentStep: task.currentStep,
        totalSteps: task.steps.length,
        completedSteps: progress.completed,
        runningSteps: progress.running,
        errorSteps: progress.errored,
        tags: summarizeTags(task.tags),
        summary: summarizeTaskState(task),
        whyItMatters:
          "The task node is the main unit of current work and should dominate planning context.",
      },
      meta: {
        status: task.steps.every((step) => step.status === "done")
          ? BRAIN_STATUS.DONE
          : task.steps.some((step) => step.status === "error")
            ? BRAIN_STATUS.ERROR
            : BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.CRITICAL,
        sourceRefs: [{ type: "active-task", id: task.id }],
      },
    }),
    () => ({
      data: {
        label: clampGraphLabel(task.goal, 96),
        goal: task.goal,
        domain: task.domain,
        currentStep: task.currentStep,
        totalSteps: task.steps.length,
        completedSteps: progress.completed,
        runningSteps: progress.running,
        errorSteps: progress.errored,
        tags: summarizeTags(task.tags),
        summary: summarizeTaskState(task),
        whyItMatters:
          "The task node is the main unit of current work and should dominate planning context.",
      },
      meta: {
        status: task.steps.every((step) => step.status === "done")
          ? BRAIN_STATUS.DONE
          : task.steps.some((step) => step.status === "error")
            ? BRAIN_STATUS.ERROR
            : BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.CRITICAL,
      },
    })
  );
}

function upsertPlanBrainNode(
  graph: CodexForgeBrainGraph,
  task: CodexForgeActiveTaskLike
) {
  const nodeId = buildStableId("plan", task.id, task.goal, task.domain);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "plan",
      data: {
        label: clampGraphLabel(`${task.goal} plan`, 96),
        goal: task.goal,
        domain: task.domain,
        stepCount: task.steps.length,
        nextAction: task.steps[task.currentStep]?.text,
        tags: summarizeTags(task.tags),
        summary: summarizePlanState(task),
        whyItMatters:
          "The plan node represents the current execution path from goal to concrete steps.",
      },
      meta: {
        status: task.steps.every((step) => step.status === "done")
          ? BRAIN_STATUS.DONE
          : BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
        sourceRefs: [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: clampGraphLabel(`${task.goal} plan`, 96),
        goal: task.goal,
        domain: task.domain,
        stepCount: task.steps.length,
        nextAction: task.steps[task.currentStep]?.text,
        tags: summarizeTags(task.tags),
        summary: summarizePlanState(task),
        whyItMatters:
          "The plan node represents the current execution path from goal to concrete steps.",
      },
      meta: {
        status: task.steps.every((step) => step.status === "done")
          ? BRAIN_STATUS.DONE
          : BRAIN_STATUS.ACTIVE,
        importance: BRAIN_IMPORTANCE.HIGH,
      },
    })
  );
}

function upsertStepBrainNodes(
  graph: CodexForgeBrainGraph,
  task: CodexForgeActiveTaskLike,
  taskNodeId: string,
  planNodeId: string,
  maxBrainSteps: number
) {
  for (const [index, step] of task.steps.slice(0, maxBrainSteps).entries()) {
    const nodeId = buildStableId("step", task.id, index, step.text);
    const isCurrent = index === task.currentStep;

    const stepNode = upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "step",
        data: {
          label: clampGraphLabel(step.text, 84),
          text: clampText(step.text, 160),
          stepIndex: index,
          result: step.result ? clampText(step.result, 160) : undefined,
          lastRunAt: step.lastRunAt,
          summary: summarizeStepState(task, step, index),
          whyItMatters: isCurrent
            ? "This is the current execution focus."
            : "This step is part of the active plan sequence.",
        },
        meta: {
          status:
            step.status === "done"
              ? BRAIN_STATUS.DONE
              : step.status === "running"
                ? BRAIN_STATUS.ACTIVE
                : step.status === "error"
                  ? BRAIN_STATUS.ERROR
                  : BRAIN_STATUS.IDLE,
          importance: isCurrent
            ? BRAIN_IMPORTANCE.CRITICAL
            : BRAIN_IMPORTANCE.MEDIUM,
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: clampGraphLabel(step.text, 84),
          text: clampText(step.text, 160),
          stepIndex: index,
          result: step.result ? clampText(step.result, 160) : undefined,
          lastRunAt: step.lastRunAt,
          summary: summarizeStepState(task, step, index),
          whyItMatters: isCurrent
            ? "This is the current execution focus."
            : "This step is part of the active plan sequence.",
        },
        meta: {
          status:
            step.status === "done"
              ? BRAIN_STATUS.DONE
              : step.status === "running"
                ? BRAIN_STATUS.ACTIVE
                : step.status === "error"
                  ? BRAIN_STATUS.ERROR
                  : BRAIN_STATUS.IDLE,
          importance: isCurrent
            ? BRAIN_IMPORTANCE.CRITICAL
            : BRAIN_IMPORTANCE.MEDIUM,
        },
      })
    );

    connectNodes(graph, taskNodeId, stepNode.id, "contains");
    connectNodes(graph, planNodeId, stepNode.id, "contains");

    if (isCurrent) {
      connectNodes(graph, taskNodeId, stepNode.id, "next_for");
    }
  }
}

function upsertTagBrainNodes(
  graph: CodexForgeBrainGraph,
  ownerIds: string[],
  tags: string[]
) {
  for (const tag of summarizeTags(tags)) {
    const nodeId = buildStableId("tag", tag);

    upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "tag",
        data: {
          label: tag,
          value: tag,
          summary: `Tag: ${tag}`,
          whyItMatters:
            "Tags help the brain cluster related work, tooling, and domain context.",
        },
        meta: {
          status: BRAIN_STATUS.ACTIVE,
          importance: BRAIN_IMPORTANCE.LOW,
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: tag,
          value: tag,
          summary: `Tag: ${tag}`,
          whyItMatters:
            "Tags help the brain cluster related work, tooling, and domain context.",
        },
        meta: {
          status: BRAIN_STATUS.ACTIVE,
          importance: BRAIN_IMPORTANCE.LOW,
        },
      })
    );

    for (const ownerId of ownerIds) {
      connectNodes(graph, ownerId, nodeId, "tagged_with");
    }
  }
}

function upsertRunBrainNode(
  graph: CodexForgeBrainGraph,
  task: CodexForgeActiveTaskLike | null,
  executionState: CodexForgeExecutionStateLike,
  productName: string
) {
  if (!executionState.engineState && !executionState.lastRunLabel) {
    return null;
  }

  const engineState = executionState.engineState;
  const nodeId = buildStableId(
    "run",
    task?.id || "no-task",
    executionState.lastRunLabel || engineState?.phase || "run",
    executionState.lastCompletedAt || executionState.startedAt || 0
  );

  const diffTargets = summarizeDiffTargets(engineState?.diffs ?? []);
  const logSummary = summarizeLogs(engineState?.logs ?? []);

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "run",
      data: {
        label: clampGraphLabel(
          executionState.lastRunLabel || `${productName} execution run`,
          96
        ),
        phase: engineState?.phase,
        resultSummary: summarizeEngineState(engineState),
        diffCount: engineState?.diffs.length ?? 0,
        snapshotFileCount: engineState?.snapshot?.fileCount ?? 0,
        diffTargets,
        logSummary,
        summary: summarizeRunState(executionState, productName),
        whyItMatters:
          "The run node captures the latest execution attempt, outputs, failures, and pending approvals.",
      },
      meta: {
        status:
          engineState?.phase === "done"
            ? BRAIN_STATUS.DONE
            : engineState?.phase === "error"
              ? BRAIN_STATUS.ERROR
              : executionState.running
                ? BRAIN_STATUS.ACTIVE
                : BRAIN_STATUS.DONE,
        importance: deriveRunImportance(executionState),
        sourceRefs: executionState.taskId
          ? [{ type: "execution-state", id: executionState.taskId }]
          : [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: clampGraphLabel(
          executionState.lastRunLabel || `${productName} execution run`,
          96
        ),
        phase: engineState?.phase,
        resultSummary: summarizeEngineState(engineState),
        diffCount: engineState?.diffs.length ?? 0,
        snapshotFileCount: engineState?.snapshot?.fileCount ?? 0,
        diffTargets,
        logSummary,
        summary: summarizeRunState(executionState, productName),
        whyItMatters:
          "The run node captures the latest execution attempt, outputs, failures, and pending approvals.",
      },
      meta: {
        status:
          engineState?.phase === "done"
            ? BRAIN_STATUS.DONE
            : engineState?.phase === "error"
              ? BRAIN_STATUS.ERROR
              : executionState.running
                ? BRAIN_STATUS.ACTIVE
                : BRAIN_STATUS.DONE,
        importance: deriveRunImportance(executionState),
      },
    })
  );
}

function upsertSnapshotBrainNode(
  graph: CodexForgeBrainGraph,
  runNodeId: string,
  executionState: CodexForgeExecutionStateLike
) {
  const snapshot = executionState.engineState?.snapshot;
  if (!snapshot) {
    return null;
  }

  const sampledPaths = snapshot.sampledPaths.slice(0, 6);
  const nodeId = buildStableId(
    "snapshot",
    runNodeId,
    snapshot.fileCount,
    ...sampledPaths
  );

  return upsertNode(
    graph,
    (node) => node.id === nodeId,
    () => ({
      id: nodeId,
      kind: "snapshot",
      data: {
        label: `Snapshot (${snapshot.fileCount} files)`,
        fileCount: snapshot.fileCount,
        sampledPaths,
        summary: summarizeSnapshotState(snapshot),
        whyItMatters:
          "Snapshots record the workspace state used to reason about safe change previews.",
      },
      meta: {
        status: BRAIN_STATUS.DONE,
        importance: BRAIN_IMPORTANCE.MEDIUM,
        sourceRefs: [{ type: "derived", id: nodeId }],
      },
    }),
    () => ({
      data: {
        label: `Snapshot (${snapshot.fileCount} files)`,
        fileCount: snapshot.fileCount,
        sampledPaths,
        summary: summarizeSnapshotState(snapshot),
        whyItMatters:
          "Snapshots record the workspace state used to reason about safe change previews.",
      },
      meta: {
        status: BRAIN_STATUS.DONE,
        importance: BRAIN_IMPORTANCE.MEDIUM,
      },
    })
  );
}

function upsertDiffBrainNodes(
  graph: CodexForgeBrainGraph,
  runNodeId: string,
  executionState: CodexForgeExecutionStateLike,
  maxBrainDiffs: number
) {
  const diffs = executionState.engineState?.diffs ?? [];

  for (const diff of diffs.slice(0, maxBrainDiffs)) {
    const nodeId = buildStableId("diff", runNodeId, diff.filePath);

    const diffNode = upsertNode(
      graph,
      (node) => node.id === nodeId,
      () => ({
        id: nodeId,
        kind: "diff",
        data: {
          label: diff.filePath,
          filePath: diff.filePath,
          patchPreview:
            diff.patch.length > MAX_DIFF_PREVIEW
              ? `${diff.patch.slice(0, MAX_DIFF_PREVIEW - 1)}…`
              : diff.patch,
          summary: summarizeDiffState(diff),
          whyItMatters:
            "Diff nodes represent proposed or generated code/file changes from execution.",
        },
        meta: {
          status: BRAIN_STATUS.DONE,
          importance: BRAIN_IMPORTANCE.MEDIUM,
          sourceRefs: [{ type: "derived", id: nodeId }],
        },
      }),
      () => ({
        data: {
          label: diff.filePath,
          filePath: diff.filePath,
          patchPreview:
            diff.patch.length > MAX_DIFF_PREVIEW
              ? `${diff.patch.slice(0, MAX_DIFF_PREVIEW - 1)}…`
              : diff.patch,
          summary: summarizeDiffState(diff),
          whyItMatters:
            "Diff nodes represent proposed or generated code/file changes from execution.",
        },
        meta: {
          status: BRAIN_STATUS.DONE,
          importance: BRAIN_IMPORTANCE.MEDIUM,
        },
      })
    );

    connectNodes(graph, runNodeId, diffNode.id, "produced");
  }
}

/* ================= PUBLIC SYNC ================= */

export function persistCodexForgeBrainGraph(
  args: CodexForgeBrainSyncArgs
): CodexForgeBrainGraph {
  const productName = args.productName ?? DEFAULT_PRODUCT_NAME;
  const maxBrainMessages = args.maxBrainMessages ?? DEFAULT_MAX_BRAIN_MESSAGES;
  const maxBrainMemory = args.maxBrainMemory ?? DEFAULT_MAX_BRAIN_MEMORY;
  const maxBrainSteps = args.maxBrainSteps ?? DEFAULT_MAX_BRAIN_STEPS;
  const maxBrainDiffs = args.maxBrainDiffs ?? DEFAULT_MAX_BRAIN_DIFFS;

  const graph = loadBrainGraph();

  const workspaceNode = upsertWorkspaceBrainNode(graph, args.context, productName);
  const projectNode = upsertProjectBrainNode(graph, args.context, productName);
  const repoNode = upsertRepoBrainNode(graph, args.context);
  const conversationNode = upsertConversationBrainNode(
    graph,
    args.context,
    args.messages,
    productName
  );

  connectNodes(graph, workspaceNode.id, projectNode.id, "contains");
  connectNodes(graph, projectNode.id, conversationNode.id, "contains");

  if (repoNode) {
    connectNodes(graph, projectNode.id, repoNode.id, "contains");
    connectNodes(graph, conversationNode.id, repoNode.id, "about");
  }

  upsertMessageBrainNodes(
    graph,
    conversationNode.id,
    args.messages,
    maxBrainMessages
  );

  if (args.memory.length > 0) {
    upsertMemoryBrainNodes(
      graph,
      workspaceNode.id,
      args.memory,
      maxBrainMemory
    );
  }

  if (args.activeTask) {
    const taskNode = upsertTaskBrainNode(graph, args.activeTask);
    const planNode = upsertPlanBrainNode(graph, args.activeTask);

    connectNodes(graph, projectNode.id, taskNode.id, "contains");
    connectNodes(graph, conversationNode.id, taskNode.id, "relates_to");
    connectNodes(graph, taskNode.id, planNode.id, "contains");
    connectNodes(graph, planNode.id, taskNode.id, "about");

    upsertStepBrainNodes(
      graph,
      args.activeTask,
      taskNode.id,
      planNode.id,
      maxBrainSteps
    );

    upsertTagBrainNodes(
      graph,
      [workspaceNode.id, projectNode.id, taskNode.id, planNode.id],
      args.activeTask.tags
    );

    for (const item of args.memory.slice(0, maxBrainMemory)) {
      const memoryNodeId = buildStableId("memory", item.id);
      connectNodes(graph, taskNode.id, memoryNodeId, "references");
    }

    const runNode = upsertRunBrainNode(
      graph,
      args.activeTask,
      args.executionState,
      productName
    );

    if (runNode) {
      connectNodes(graph, taskNode.id, runNode.id, "executed_in");
      connectNodes(graph, planNode.id, runNode.id, "generated_by");

      const snapshotNode = upsertSnapshotBrainNode(
        graph,
        runNode.id,
        args.executionState
      );

      if (snapshotNode) {
        connectNodes(graph, runNode.id, snapshotNode.id, "produced");
      }

      upsertDiffBrainNodes(
        graph,
        runNode.id,
        args.executionState,
        maxBrainDiffs
      );
    }
  } else {
    const runNode = upsertRunBrainNode(
      graph,
      null,
      args.executionState,
      productName
    );

    if (runNode) {
      connectNodes(graph, conversationNode.id, runNode.id, "references");

      const snapshotNode = upsertSnapshotBrainNode(
        graph,
        runNode.id,
        args.executionState
      );

      if (snapshotNode) {
        connectNodes(graph, runNode.id, snapshotNode.id, "produced");
      }

      upsertDiffBrainNodes(
        graph,
        runNode.id,
        args.executionState,
        maxBrainDiffs
      );
    }
  }

  const deduped = dedupeGraph(graph);
  return saveBrainGraph(deduped);
}

export function buildRequestBrainGraphContextPayload(
  args: CodexForgeBrainRequestGraphArgs
): CodexForgeBrainGraphContextPayload | undefined {
  try {
    persistCodexForgeBrainGraph(args);

    const fullGraph = dedupeGraph(loadBrainGraph());
    const focusNodeIds = collectBrainFocusNodeIds(args);
    const reducedGraph = buildReducedBrainGraph(
      fullGraph,
      focusNodeIds,
      args.includeConnectedDepth ?? DEFAULT_REQUEST_DEPTH,
      args.maxRequestNodes ?? DEFAULT_MAX_REQUEST_NODES,
      args.maxRequestEdges ?? DEFAULT_MAX_REQUEST_EDGES
    );

    const reducedFocusNodeIds = focusNodeIds.filter((id) =>
      reducedGraph.nodes.some((node) => node.id === id)
    );

    return {
      graph: reducedGraph,
      summary: summarizeBrainGraphForPayload(reducedGraph),
      focusNodeIds: reducedFocusNodeIds,
      includeConnectedDepth:
        args.includeConnectedDepth ?? DEFAULT_REQUEST_DEPTH,
    };
  } catch {
    return undefined;
  }
}
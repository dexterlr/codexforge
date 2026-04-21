import { NextResponse } from "next/server";
import {
  createLocalEngineBrain,
  createOllamaBrain,
  getCodexForgeBrainSelectionInfo,
} from "@/lib/codexforge/brain";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { toCodexForgeChatMeta } from "@/lib/codexforge/brain/types";
import { getCodexForgeServerEngineDependencies } from "@/lib/codexforge/chat/dependencies.server";
import type {
  CodexForgeChatContext,
  CodexForgeChatErrorResponse,
  CodexForgeChatResponse,
  CodexForgeChatSuccessResponse,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgePlanStatus,
} from "@/lib/codexforge/types";

/* ================= CONFIG ================= */

const MODEL_NAME = "codexforge-brain-router-v4";

const LIMITS = {
  maxMessages: 80,
  maxText: 8000,
  maxSystemGuide: 5000,
  maxMemoryItems: 24,
  maxMemoryItemText: 400,
  maxActivePlanSteps: 50,
  maxPlanListItems: 50,
  maxPlanListItemText: 300,
  maxTagText: 80,
  maxCapabilityDomains: 16,
  maxGraphNodes: 80,
  maxGraphEdges: 200,
  maxGraphFocusNodeIds: 24,
  maxGraphKinds: 24,
  maxGraphBriefingItems: 8,
  maxGroundedFiles: 6,
  maxGroundedSignals: 6,
} as const;

const VALID_PLAN_DOMAINS: readonly CodexForgePlanDomain[] = [
  "general",
  "web",
  "research",
  "debug",
  "game-server",
  "movie",
  "video",
  "comfyui",
  "unreal",
  "automation",
] as const;

const VALID_PLAN_STATUSES: readonly CodexForgePlanStatus[] = [
  "draft",
  "active",
  "completed",
  "executed",
  "blocked",
  "needs-approval",
] as const;

const VALID_EXECUTION_PHASES: readonly CodexForgeExecutionPhase[] = [
  "idle",
  "planning",
  "awaiting_plan_approval",
  "diffing",
  "awaiting_diff_approval",
  "applying",
  "testing",
  "done",
  "error",
  "fallback",
] as const;

const VALID_MEMORY_TYPES = ["fact", "decision", "task", "note"] as const;

const COMMAND_MAP: Record<string, BrainRouteMode> = {
  "/plan": "plan",
  "/debug": "debug",
  "/research": "research",
  "/next": "next_step",
} as const;

type CodexForgeMemoryType = (typeof VALID_MEMORY_TYPES)[number];

/* ================= TYPES ================= */

type CodexForgeBrainGraphSummaryPayload = {
  nodeCount: number;
  edgeCount: number;
  updatedAt: number;
  kinds: Record<string, number>;
};

type CodexForgeBrainGraphContextPayload = {
  graph: CodexForgeBrainGraph;
  summary?: CodexForgeBrainGraphSummaryPayload;
  focusNodeIds?: string[];
  includeConnectedDepth?: number;
};

type RouteBody = {
  messages?: unknown;
  context?: unknown;
  graph?: unknown;
};

type GraphDiagnostics = {
  hasGraph: boolean;
  nodeCount: number;
  edgeCount: number;
  focusNodeCount: number;
  focusKinds: string[];
  hasTaskNode: boolean;
  hasPlanNode: boolean;
  hasRunNode: boolean;
  hasMemoryNode: boolean;
  hasRepoNode: boolean;
  repoPaths: string[];
  graphBriefing: string[];
  warnings: string[];
};

type GroundedDiagnostics = {
  primaryFile?: string;
  supportingFiles: string[];
  fileSignals: string[];
  warnings: string[];
};

type BrainRouteMode =
  | "chat"
  | "plan"
  | "debug"
  | "research"
  | "next_step"
  | "execution"
  | "planning";

/* ================= UTILS ================= */

const uid = () =>
  `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function asClampedString(value: unknown, max: number): string | undefined {
  const text = asTrimmedString(value);
  return text ? clampText(text, max) : undefined;
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function asStringArray(
  value: unknown,
  maxItems: number = LIMITS.maxPlanListItems,
  maxText: number = LIMITS.maxPlanListItemText
): string[] {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => clampText(item, maxText));

  return uniqueStrings(normalized).slice(0, maxItems);
}

function asDomain(value: unknown): CodexForgePlanDomain | undefined {
  return typeof value === "string" &&
    VALID_PLAN_DOMAINS.includes(value as CodexForgePlanDomain)
    ? (value as CodexForgePlanDomain)
    : undefined;
}

function asPlanStatus(value: unknown): CodexForgePlanStatus | undefined {
  return typeof value === "string" &&
    VALID_PLAN_STATUSES.includes(value as CodexForgePlanStatus)
    ? (value as CodexForgePlanStatus)
    : undefined;
}

function asExecutionPhase(value: unknown): CodexForgeExecutionPhase | undefined {
  return typeof value === "string" &&
    VALID_EXECUTION_PHASES.includes(value as CodexForgeExecutionPhase)
    ? (value as CodexForgeExecutionPhase)
    : undefined;
}

function asMemoryType(value: unknown): CodexForgeMemoryType | undefined {
  return typeof value === "string" &&
    VALID_MEMORY_TYPES.includes(value as CodexForgeMemoryType)
    ? (value as CodexForgeMemoryType)
    : undefined;
}

function parseBooleanEnv(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

function normalizeWindowsPath(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  return trimmed
    .replaceAll("/", "\\")
    .replace(/\\+/g, "\\")
    .replace(/\\$/, "")
    .toLowerCase();
}

function normalizePathForCompare(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  return trimmed
    .replaceAll("\\", "/")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "")
    .toLowerCase();
}

function getPathFileName(value: string): string {
  const normalized = value.replaceAll("\\", "/");
  const parts = normalized.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? value;
}

function getPathParent(value: string): string | undefined {
  const normalized = value.replaceAll("\\", "/");
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length <= 1) return undefined;
  return parts.slice(0, -1).join("/");
}

function buildJsonHeaders(extra?: HeadersInit): HeadersInit {
  return {
    "Cache-Control": "no-store",
    ...extra,
  };
}

function badRequest(error: string, status = 400) {
  return NextResponse.json<CodexForgeChatErrorResponse>(
    { ok: false, error },
    {
      status,
      headers: buildJsonHeaders(),
    }
  );
}

/* ================= COMMANDS ================= */

function detectCommand(text: string): BrainRouteMode | null {
  const trimmed = text.trim();

  for (const command of Object.keys(COMMAND_MAP)) {
    if (trimmed.startsWith(command)) {
      return COMMAND_MAP[command];
    }
  }

  return null;
}

/* ================= MESSAGE NORMALIZATION ================= */

function normalizeMessage(raw: unknown, idx: number): CodexForgeMessage {
  if (!isRecord(raw)) {
    throw new Error(`Message #${idx + 1} must be an object.`);
  }

  const role = asTrimmedString(raw.role);
  if (role !== "system" && role !== "user" && role !== "assistant") {
    throw new Error(`Message #${idx + 1} has invalid role.`);
  }

  const text = asClampedString(raw.text, LIMITS.maxText);
  if (!text) {
    throw new Error(`Message #${idx + 1} is missing text.`);
  }

  return {
    id: asTrimmedString(raw.id) ?? `msg-${idx + 1}`,
    role,
    text,
    ts: asFiniteNumber(raw.ts) ?? Date.now(),
    structured: null,
    source: "api",
  };
}

function getLastUser(messages: CodexForgeMessage[]): CodexForgeMessage | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") {
      return messages[index];
    }
  }

  return null;
}

/* ================= CONTEXT NORMALIZATION ================= */

function normalizeMemory(raw: unknown): CodexForgeChatContext["memory"] {
  if (!Array.isArray(raw)) return undefined;

  const normalized: NonNullable<CodexForgeChatContext["memory"]> = [];

  for (const item of raw) {
    if (!isRecord(item)) continue;

    const id = asTrimmedString(item.id);
    const type = asMemoryType(item.type);
    const content = asClampedString(item.content, LIMITS.maxMemoryItemText);

    if (!id || !type || !content) continue;

    const importanceRaw = asFiniteNumber(item.importance);

    normalized.push({
      id,
      type,
      content,
      ...(item.pinned === true ? { pinned: true } : {}),
      ...(importanceRaw !== undefined
        ? { importance: Math.min(Math.max(importanceRaw, 0), 1) }
        : {}),
    });

    if (normalized.length >= LIMITS.maxMemoryItems) {
      break;
    }
  }

  return normalized.length > 0 ? normalized : undefined;
}

function normalizeActivePlan(raw: unknown): CodexForgeChatContext["activePlan"] {
  if (!isRecord(raw)) return null;

  const goal = asClampedString(raw.goal, LIMITS.maxText);
  const steps = asStringArray(raw.steps, LIMITS.maxActivePlanSteps);
  const nextAction = asClampedString(raw.nextAction, LIMITS.maxPlanListItemText);
  const status = asPlanStatus(raw.status);
  const intent = asClampedString(raw.intent, 120);
  const domain = asDomain(raw.domain);
  const tags = asStringArray(raw.tags, LIMITS.maxPlanListItems, LIMITS.maxTagText);
  const risks = asStringArray(raw.risks);
  const files = asStringArray(raw.files);
  const commands = asStringArray(raw.commands);
  const notes = asStringArray(raw.notes);

  if (!goal || steps.length === 0) {
    return null;
  }

  return {
    goal,
    steps,
    ...(risks.length > 0 ? { risks } : {}),
    ...(files.length > 0 ? { files } : {}),
    ...(commands.length > 0 ? { commands } : {}),
    ...(notes.length > 0 ? { notes } : {}),
    ...(tags.length > 0 ? { tags } : {}),
    ...(nextAction ? { nextAction } : {}),
    ...(status ? { status } : {}),
    ...(intent ? { intent } : {}),
    ...(domain ? { domain } : {}),
  };
}

function normalizeExecution(raw: unknown): CodexForgeChatContext["execution"] {
  if (!isRecord(raw)) return undefined;

  const execution: NonNullable<CodexForgeChatContext["execution"]> = {
    running: raw.running === true,
    stepIndex: asFiniteNumber(raw.stepIndex) ?? undefined,
    lastRunLabel: asClampedString(raw.lastRunLabel, 300),
    lastCompletedAt: asFiniteNumber(raw.lastCompletedAt),
    enginePhase: asExecutionPhase(raw.enginePhase),
    diffCount: asFiniteNumber(raw.diffCount),
    snapshotFileCount: asFiniteNumber(raw.snapshotFileCount),
  };

  const hasContent =
    execution.running === true ||
    execution.stepIndex !== undefined ||
    execution.lastRunLabel !== undefined ||
    execution.lastCompletedAt !== undefined ||
    execution.enginePhase !== undefined ||
    execution.diffCount !== undefined ||
    execution.snapshotFileCount !== undefined;

  return hasContent ? execution : undefined;
}

function normalizeExecutionRequest(
  raw: unknown
): CodexForgeChatContext["executionRequest"] {
  if (!isRecord(raw)) return undefined;

  const mode = asTrimmedString(raw.mode);
  if (mode !== "execute-task-step") return undefined;

  return {
    taskId: asClampedString(raw.taskId, 120),
    taskGoal: asClampedString(raw.taskGoal, LIMITS.maxText),
    stepIndex: asFiniteNumber(raw.stepIndex),
    stepText: asClampedString(raw.stepText, LIMITS.maxPlanListItemText),
    mode,
  };
}

function normalizeCapabilities(
  raw: unknown
): CodexForgeChatContext["codexforgeCapabilities"] {
  if (!isRecord(raw)) return undefined;

  const domains = asStringArray(
    raw.domains,
    LIMITS.maxCapabilityDomains,
    LIMITS.maxTagText
  ).filter(
    (domain): domain is CodexForgePlanDomain =>
      VALID_PLAN_DOMAINS.includes(domain as CodexForgePlanDomain)
  );

  return domains.length > 0
    ? { domains: uniqueStrings(domains) as CodexForgePlanDomain[] }
    : undefined;
}

function normalizeContext(raw: unknown): CodexForgeChatContext {
  if (!isRecord(raw)) return {};

  const systemGuide = asTrimmedString(raw.systemGuide);

  return {
    projectName: asClampedString(raw.projectName, 160),
    workspaceRoot: asClampedString(raw.workspaceRoot, 500),
    repoPath: asClampedString(raw.repoPath, 500),
    mode: asClampedString(raw.mode, 120),
    systemGuide: systemGuide
      ? clampText(systemGuide, LIMITS.maxSystemGuide)
      : undefined,
    activePlan: normalizeActivePlan(raw.activePlan),
    memory: normalizeMemory(raw.memory),
    execution: normalizeExecution(raw.execution),
    executionRequest: normalizeExecutionRequest(raw.executionRequest),
    codexforgeCapabilities: normalizeCapabilities(raw.codexforgeCapabilities),
  };
}

/* ================= GRAPH NORMALIZATION ================= */

function normalizeGraphNode(raw: unknown) {
  if (!isRecord(raw)) return null;

  const id = asTrimmedString(raw.id);
  const kind = asTrimmedString(raw.kind);
  const data = isRecord(raw.data) ? raw.data : null;
  const meta = isRecord(raw.meta) ? raw.meta : null;

  if (!id || !kind || !data || !meta) {
    return null;
  }

  const createdAt = asFiniteNumber(meta.createdAt) ?? Date.now();
  const updatedAt = asFiniteNumber(meta.updatedAt) ?? createdAt;

  return {
    ...(raw as Record<string, unknown>),
    id,
    kind,
    data,
    meta: {
      ...meta,
      createdAt,
      updatedAt,
    },
    ...(isRecord(raw.graph) ? { graph: raw.graph } : {}),
  };
}

function normalizeGraphEdge(raw: unknown) {
  if (!isRecord(raw)) return null;

  const id = asTrimmedString(raw.id);
  const kind = asTrimmedString(raw.kind);
  const from = asTrimmedString(raw.from);
  const to = asTrimmedString(raw.to);
  const meta = isRecord(raw.meta) ? raw.meta : null;

  if (!id || !kind || !from || !to || !meta) {
    return null;
  }

  const createdAt = asFiniteNumber(meta.createdAt) ?? Date.now();
  const updatedAt = asFiniteNumber(meta.updatedAt) ?? createdAt;

  return {
    ...(raw as Record<string, unknown>),
    id,
    kind,
    from,
    to,
    ...(asTrimmedString(raw.label) ? { label: asTrimmedString(raw.label) } : {}),
    ...(asFiniteNumber(raw.weight) !== undefined
      ? { weight: asFiniteNumber(raw.weight) }
      : {}),
    meta: {
      ...meta,
      createdAt,
      updatedAt,
    },
  };
}

function normalizeGraphSummary(
  raw: unknown
): CodexForgeBrainGraphSummaryPayload | undefined {
  if (!isRecord(raw)) return undefined;

  const nodeCount = asFiniteNumber(raw.nodeCount);
  const edgeCount = asFiniteNumber(raw.edgeCount);
  const updatedAt = asFiniteNumber(raw.updatedAt);
  const rawKinds = isRecord(raw.kinds) ? raw.kinds : null;

  if (
    nodeCount === undefined ||
    edgeCount === undefined ||
    updatedAt === undefined ||
    !rawKinds
  ) {
    return undefined;
  }

  const kindsEntries = Object.entries(rawKinds)
    .filter(
      (entry): entry is [string, number] =>
        typeof entry[0] === "string" &&
        entry[0].trim().length > 0 &&
        typeof entry[1] === "number" &&
        Number.isFinite(entry[1])
    )
    .slice(0, LIMITS.maxGraphKinds);

  return {
    nodeCount,
    edgeCount,
    updatedAt,
    kinds: Object.fromEntries(kindsEntries),
  };
}

function normalizeGraphContext(
  raw: unknown
): CodexForgeBrainGraphContextPayload | undefined {
  if (!isRecord(raw) || !isRecord(raw.graph)) return undefined;

  const graphRecord = raw.graph;
  const version =
    typeof graphRecord.version === "number" && Number.isFinite(graphRecord.version)
      ? graphRecord.version
      : 1;

  const rawNodes = Array.isArray(graphRecord.nodes) ? graphRecord.nodes : [];
  const rawEdges = Array.isArray(graphRecord.edges) ? graphRecord.edges : [];
  const rawMeta = isRecord(graphRecord.meta) ? graphRecord.meta : {};

  const nodes = rawNodes
    .map(normalizeGraphNode)
    .filter(
      (node): node is NonNullable<ReturnType<typeof normalizeGraphNode>> =>
        node !== null
    )
    .slice(0, LIMITS.maxGraphNodes);

  const nodeIds = new Set(nodes.map((node) => node.id));

  const edges = rawEdges
    .map(normalizeGraphEdge)
    .filter(
      (edge): edge is NonNullable<ReturnType<typeof normalizeGraphEdge>> =>
        edge !== null
    )
    .filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to))
    .slice(0, LIMITS.maxGraphEdges);

  const graph: CodexForgeBrainGraph = {
    version: version as CodexForgeBrainGraph["version"],
    nodes: nodes as CodexForgeBrainGraph["nodes"],
    edges: edges as CodexForgeBrainGraph["edges"],
    meta: {
      createdAt: asFiniteNumber(rawMeta.createdAt) ?? Date.now(),
      updatedAt: asFiniteNumber(rawMeta.updatedAt) ?? Date.now(),
      ...(asTrimmedString(rawMeta.workspaceId)
        ? { workspaceId: asTrimmedString(rawMeta.workspaceId) }
        : {}),
      ...(asTrimmedString(rawMeta.projectId)
        ? { projectId: asTrimmedString(rawMeta.projectId) }
        : {}),
    },
  };

  const summary = normalizeGraphSummary(raw.summary);

  const focusNodeIds = asStringArray(raw.focusNodeIds, LIMITS.maxGraphFocusNodeIds, 120)
    .filter((id) => nodeIds.has(id));

  const includeConnectedDepthRaw = asFiniteNumber(raw.includeConnectedDepth);
  const includeConnectedDepth =
    includeConnectedDepthRaw !== undefined
      ? Math.max(0, Math.min(includeConnectedDepthRaw, 4))
      : undefined;

  return {
    graph,
    ...(summary ? { summary } : {}),
    ...(focusNodeIds.length > 0 ? { focusNodeIds } : {}),
    ...(includeConnectedDepth !== undefined ? { includeConnectedDepth } : {}),
  };
}

/* ================= GRAPH DIAGNOSTICS ================= */

function getNodeDataRecord(
  node: CodexForgeBrainGraph["nodes"][number]
): Record<string, unknown> | null {
  return isRecord(node.data) ? (node.data as Record<string, unknown>) : null;
}

function readNodeLabel(node: CodexForgeBrainGraph["nodes"][number]): string {
  const data = getNodeDataRecord(node);
  return (data ? asTrimmedString(data["label"]) : undefined) ?? node.id;
}

function readNodeSummary(
  node: CodexForgeBrainGraph["nodes"][number]
): string | undefined {
  const data = getNodeDataRecord(node);
  if (!data) return undefined;

  return (
    asTrimmedString(data["summary"]) ??
    asTrimmedString(data["goal"]) ??
    asTrimmedString(data["text"]) ??
    asTrimmedString(data["content"]) ??
    asTrimmedString(data["resultSummary"]) ??
    asTrimmedString(data["repoPath"]) ??
    asTrimmedString(data["filePath"])
  );
}

function extractRepoPathsFromGraph(graph: CodexForgeBrainGraph): string[] {
  return uniqueStrings(
    graph.nodes
      .filter((node) => node.kind === "repo")
      .map((node) => {
        const data = getNodeDataRecord(node);
        return data ? asTrimmedString(data["repoPath"]) ?? "" : "";
      })
      .filter(Boolean)
  );
}

function buildGraphDiagnostics(
  context: CodexForgeChatContext,
  graphContext?: CodexForgeBrainGraphContextPayload
): GraphDiagnostics {
  if (!graphContext) {
    return {
      hasGraph: false,
      nodeCount: 0,
      edgeCount: 0,
      focusNodeCount: 0,
      focusKinds: [],
      hasTaskNode: false,
      hasPlanNode: false,
      hasRunNode: false,
      hasMemoryNode: false,
      hasRepoNode: false,
      repoPaths: [],
      graphBriefing: [],
      warnings: [],
    };
  }

  const graph = graphContext.graph;
  const focusIds = new Set(graphContext.focusNodeIds ?? []);
  const focusNodes = graph.nodes.filter((node) => focusIds.has(node.id));
  const focusKinds = uniqueStrings(focusNodes.map((node) => node.kind));

  const hasTaskNode = graph.nodes.some((node) => node.kind === "task");
  const hasPlanNode = graph.nodes.some((node) => node.kind === "plan");
  const hasRunNode = graph.nodes.some((node) => node.kind === "run");
  const hasMemoryNode = graph.nodes.some((node) => node.kind === "memory");
  const hasRepoNode = graph.nodes.some((node) => node.kind === "repo");
  const repoPaths = extractRepoPathsFromGraph(graph);

  const prioritizedNodes = [...graph.nodes]
    .sort((a, b) => {
      const aFocused = focusIds.has(a.id) ? 1 : 0;
      const bFocused = focusIds.has(b.id) ? 1 : 0;
      if (aFocused !== bFocused) return bFocused - aFocused;

      const aUpdated = typeof a.meta.updatedAt === "number" ? a.meta.updatedAt : 0;
      const bUpdated = typeof b.meta.updatedAt === "number" ? b.meta.updatedAt : 0;
      return bUpdated - aUpdated;
    })
    .slice(0, LIMITS.maxGraphBriefingItems);

  const graphBriefing = prioritizedNodes.map((node) => {
    const label = readNodeLabel(node);
    const summary = readNodeSummary(node);
    return summary ? `${node.kind}: ${label} — ${summary}` : `${node.kind}: ${label}`;
  });

  const warnings: string[] = [];

  if ((graphContext.summary?.nodeCount ?? graph.nodes.length) > 0 && focusIds.size === 0) {
    warnings.push("Graph provided without focus nodes.");
  }

  if (context.activePlan && (!hasTaskNode || !hasPlanNode)) {
    warnings.push("Active plan exists in context but task/plan graph nodes are missing.");
  }

  if (context.execution?.enginePhase && !hasRunNode) {
    warnings.push("Execution state exists in context but run graph node is missing.");
  }

  const normalizedContextRepo = normalizeWindowsPath(context.repoPath);
  const normalizedGraphRepos = repoPaths
    .map((path) => normalizeWindowsPath(path))
    .filter((path): path is string => !!path);

  if (
    normalizedContextRepo &&
    normalizedGraphRepos.length > 0 &&
    !normalizedGraphRepos.includes(normalizedContextRepo)
  ) {
    warnings.push("Context repoPath does not match graph repo node path.");
  }

  return {
    hasGraph: true,
    nodeCount: graphContext.summary?.nodeCount ?? graph.nodes.length,
    edgeCount: graphContext.summary?.edgeCount ?? graph.edges.length,
    focusNodeCount: focusIds.size,
    focusKinds,
    hasTaskNode,
    hasPlanNode,
    hasRunNode,
    hasMemoryNode,
    hasRepoNode,
    repoPaths,
    graphBriefing,
    warnings,
  };
}

function buildGraphBriefingLines(diagnostics: GraphDiagnostics): string[] {
  if (!diagnostics.hasGraph) return [];

  const lines: string[] = [];

  lines.push(
    `Graph summary: ${diagnostics.nodeCount} nodes, ${diagnostics.edgeCount} edges.`
  );

  if (diagnostics.focusNodeCount > 0) {
    lines.push(
      `Focused graph nodes: ${diagnostics.focusNodeCount}${
        diagnostics.focusKinds.length > 0
          ? ` (${diagnostics.focusKinds.join(", ")})`
          : ""
      }.`
    );
  }

  if (diagnostics.hasTaskNode) lines.push("Graph includes task context.");
  if (diagnostics.hasPlanNode) lines.push("Graph includes plan context.");
  if (diagnostics.hasRunNode) lines.push("Graph includes execution/run context.");
  if (diagnostics.hasMemoryNode) lines.push("Graph includes memory context.");

  if (diagnostics.repoPaths.length > 0) {
    lines.push(`Graph repo paths: ${diagnostics.repoPaths.join(" | ")}.`);
  }

  for (const item of diagnostics.graphBriefing.slice(0, LIMITS.maxGraphBriefingItems)) {
    lines.push(`Graph focus detail: ${item}`);
  }

  return lines;
}

/* ================= GROUNDED DIAGNOSTICS ================= */

function looksLikePath(value: string): boolean {
  const normalized = normalizePathForCompare(value) ?? value.toLowerCase();
  return (
    normalized.includes("/") ||
    normalized.includes(".") ||
    normalized.startsWith("src") ||
    normalized.startsWith("app") ||
    normalized.startsWith("lib") ||
    normalized.startsWith("components") ||
    normalized.startsWith("pages") ||
    normalized.startsWith("api")
  );
}

function extractPathLikeSegments(text: string): string[] {
  const quoted = text.match(/`([^`]+)`|"([^"]+)"|'([^']+)'/g) ?? [];
  const quotedValues = quoted
    .map((match) => match.replace(/^["'`]|["'`]$/g, "").trim())
    .filter(Boolean);

  const tokenMatches = text.match(
    /(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/g
  ) ?? [];

  return uniqueStrings([...quotedValues, ...tokenMatches].filter(looksLikePath));
}

function inferFileRoleFromPath(filePath: string): string {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();
  const fileName = getPathFileName(normalized);

  if (normalized.includes("/api/") || fileName === "route.ts" || fileName === "route.tsx") {
    return "API route";
  }

  if (normalized.includes("/hooks/") || fileName.startsWith("use-") || fileName.startsWith("use")) {
    return "state hook";
  }

  if (normalized.includes("/components/") || normalized.endsWith(".tsx") || fileName.includes("page")) {
    return "UI component";
  }

  if (fileName.includes("contract") || fileName.includes("types")) {
    return "shared contract";
  }

  if (fileName.includes("engine")) {
    return "core engine logic";
  }

  if (fileName.includes("analysis")) {
    return "analysis layer";
  }

  if (fileName.includes("render")) {
    return "rendering layer";
  }

  if (fileName.includes("brain")) {
    return "brain orchestration";
  }

  if (fileName.includes("tool")) {
    return "tool execution surface";
  }

  return "implementation file";
}

function inferFileEditSuggestion(filePath: string): string {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();

  if (normalized.includes("engine")) {
    return "Likely edit point: engine logic flow or decision branches.";
  }

  if (normalized.includes("route")) {
    return "Likely edit point: request/response contract or handler flow.";
  }

  if (normalized.includes("render")) {
    return "Likely edit point: structured output rendering path.";
  }

  if (normalized.includes("analysis")) {
    return "Likely edit point: inference, scoring, or planning logic.";
  }

  if (normalized.includes("hook") || normalized.includes("/use-")) {
    return "Likely edit point: client state handling or hook behavior.";
  }

  if (normalized.includes("types") || normalized.includes("contract")) {
    return "Likely edit point: shared contract surface; update callers carefully.";
  }

  if (normalized.includes("component") || normalized.endsWith(".tsx")) {
    return "Likely edit point: UI behavior or props/state handling.";
  }

  return "Likely edit point: relevant implementation logic in this file.";
}

function buildGroundedDiagnostics(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext,
  graphDiagnostics: GraphDiagnostics
): GroundedDiagnostics {
  const repoCandidates = uniqueStrings([
    ...(graphDiagnostics.repoPaths ?? []),
    ...(context.activePlan?.files ?? []),
  ]);

  const recentUserText = messages
    .filter((message) => message.role === "user")
    .slice(-4)
    .map((message) => message.text)
    .join("\n");

  const pathCandidates = extractPathLikeSegments(recentUserText);

  const normalizedCandidates = pathCandidates
    .map((candidate) => normalizePathForCompare(candidate))
    .filter((candidate): candidate is string => !!candidate);

  const normalizedRepoCandidates = repoCandidates
    .map((candidate) => normalizePathForCompare(candidate))
    .filter((candidate): candidate is string => !!candidate);

  const matchingRepoFiles = repoCandidates.filter((candidate) => {
    const normalizedCandidate = normalizePathForCompare(candidate);
    if (!normalizedCandidate) return false;

    return normalizedCandidates.some((requested) => {
      return (
        normalizedCandidate === requested ||
        normalizedCandidate.endsWith(`/${requested}`) ||
        requested.endsWith(`/${normalizedCandidate}`) ||
        getPathFileName(normalizedCandidate) === getPathFileName(requested)
      );
    });
  });

  const preferredFiles = uniqueStrings([
    ...matchingRepoFiles,
    ...repoCandidates,
    ...pathCandidates,
  ]).slice(0, LIMITS.maxGroundedFiles);

  const primaryFile = preferredFiles[0];
  const supportingFiles = preferredFiles.slice(1, LIMITS.maxGroundedFiles);

  const fileSignals = primaryFile
    ? uniqueStrings([
        `Primary grounded file: ${primaryFile}`,
        `Primary role: ${inferFileRoleFromPath(primaryFile)}`,
        inferFileEditSuggestion(primaryFile),
        ...supportingFiles.slice(0, 2).map(
          (filePath, index) => `Supporting file ${index + 1}: ${filePath}`
        ),
      ]).slice(0, LIMITS.maxGroundedSignals)
    : [];

  const warnings: string[] = [];

  if (!primaryFile && pathCandidates.length > 0) {
    warnings.push("User referenced files, but no grounded repo file match was confirmed.");
  }

  if (!primaryFile && repoCandidates.length === 0) {
    warnings.push("No grounded repo file context available.");
  }

  if (
    primaryFile &&
    normalizedRepoCandidates.length > 0 &&
    !normalizedRepoCandidates.includes(normalizePathForCompare(primaryFile) ?? "")
  ) {
    warnings.push("Primary grounded file came from the request rather than confirmed repo graph context.");
  }

  return {
    ...(primaryFile ? { primaryFile } : {}),
    supportingFiles,
    fileSignals,
    warnings,
  };
}

/* ================= WARNINGS ================= */

function buildWarnings(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext,
  graphDiagnostics: GraphDiagnostics,
  groundedDiagnostics: GroundedDiagnostics
): string[] {
  const warnings: string[] = [];

  if (messages.length > 40) {
    warnings.push("Large message history.");
  }

  if (!context.repoPath) {
    warnings.push("Missing repoPath.");
  }

  if (!context.systemGuide) {
    warnings.push("Missing systemGuide.");
  }

  if ((context.memory?.length ?? 0) === 0) {
    warnings.push("No injected memory.");
  }

  if (!context.activePlan) {
    warnings.push("No active plan.");
  }

  warnings.push(...graphDiagnostics.warnings);
  warnings.push(...groundedDiagnostics.warnings);

  return uniqueStrings(warnings);
}

/* ================= BRAIN CONFIG ================= */

function buildBrainOptions() {
  const enableOllama = parseBooleanEnv(
    process.env.CODEXFORGE_BRAIN_OLLAMA_ENABLED
  );
  const preferredProvider = enableOllama ? "ollama" : "local-engine";

  return {
    preferredProvider,
    enableFallback: true,
    ollama: {
      enabled: enableOllama,
      model: process.env.CODEXFORGE_BRAIN_OLLAMA_MODEL?.trim() || "qwen3:14b",
      baseUrl:
        process.env.CODEXFORGE_BRAIN_OLLAMA_BASE_URL?.trim() ||
        "http://127.0.0.1:11434",
      timeoutMs: (() => {
        const raw = Number(process.env.CODEXFORGE_BRAIN_OLLAMA_TIMEOUT_MS);
        return Number.isFinite(raw) && raw > 0 ? raw : 60_000;
      })(),
    },
  } as const;
}

function createRouteBrain() {
  const options = buildBrainOptions();
  const selectionInfo = getCodexForgeBrainSelectionInfo(options);

  if (selectionInfo.resolvedProvider === "ollama") {
    return {
      brain: createOllamaBrain(options),
      selectionInfo,
      executableToolNames: [] as string[],
    };
  }

  const serverDependencies = getCodexForgeServerEngineDependencies();
  const executableToolNames =
    serverDependencies.toolExecution.getExecutableToolNames();

  return {
    brain: createLocalEngineBrain(serverDependencies),
    selectionInfo,
    executableToolNames,
  };
}

/* ================= MODE ================= */

function resolveRouteMode(args: {
  commandIntent: BrainRouteMode | null;
  context: CodexForgeChatContext;
  graphDiagnostics: GraphDiagnostics;
}): BrainRouteMode {
  if (args.commandIntent) {
    return args.commandIntent;
  }

  if (args.context.executionRequest?.mode === "execute-task-step") {
    return "execution";
  }

  if (
    args.context.execution?.enginePhase &&
    args.context.execution.enginePhase !== "idle"
  ) {
    return "execution";
  }

  if (args.graphDiagnostics.hasRunNode) {
    return "execution";
  }

  if (
    args.context.activePlan ||
    args.graphDiagnostics.hasTaskNode ||
    args.graphDiagnostics.hasPlanNode
  ) {
    return "planning";
  }

  return "chat";
}

function buildEnrichedContext(
  context: CodexForgeChatContext,
  graphDiagnostics: GraphDiagnostics,
  groundedDiagnostics: GroundedDiagnostics,
  resolvedMode: BrainRouteMode
): CodexForgeChatContext {
  const briefingLines = buildGraphBriefingLines(graphDiagnostics);

  const groundedLines = groundedDiagnostics.fileSignals.length > 0
    ? [
        "Grounded repo hints:",
        ...groundedDiagnostics.fileSignals.map((line) => `- ${line}`),
      ]
    : [];

  const mergedFiles = uniqueStrings([
    ...(groundedDiagnostics.primaryFile ? [groundedDiagnostics.primaryFile] : []),
    ...groundedDiagnostics.supportingFiles,
    ...(context.activePlan?.files ?? []),
  ]);

  const mergedNotes = uniqueStrings([
    ...(context.activePlan?.notes ?? []),
    ...groundedDiagnostics.fileSignals,
  ]);

  const systemGuideParts = [
    context.systemGuide,
    briefingLines.length > 0 ? "" : undefined,
    ...briefingLines,
    groundedLines.length > 0 ? "" : undefined,
    ...groundedLines,
  ].filter(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0
  );

  return {
    ...context,
    mode: resolvedMode,
    systemGuide:
      systemGuideParts.length > 0
        ? clampText(systemGuideParts.join("\n"), LIMITS.maxSystemGuide)
        : context.systemGuide,
    activePlan: context.activePlan
      ? {
          ...context.activePlan,
          ...(mergedFiles.length > 0 ? { files: mergedFiles } : {}),
          ...(mergedNotes.length > 0 ? { notes: mergedNotes } : {}),
        }
      : context.activePlan,
  };
}

/* ================= ROUTE ================= */

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as RouteBody | null;

    if (!body || !isRecord(body)) {
      return badRequest("Expected JSON body.");
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return badRequest("Messages must be a non-empty array.");
    }

    if (body.messages.length > LIMITS.maxMessages) {
      return badRequest("Too many messages.");
    }

    const messages = body.messages.map(normalizeMessage);
    const context = normalizeContext(body.context);
    const graphContext = normalizeGraphContext(body.graph);

    const lastUser = getLastUser(messages);
    if (!lastUser) {
      return badRequest("At least one user message is required.");
    }

    const commandIntent = detectCommand(lastUser.text);
    const graphDiagnostics = buildGraphDiagnostics(context, graphContext);
    const groundedDiagnostics = buildGroundedDiagnostics(
      messages,
      context,
      graphDiagnostics
    );

    const resolvedMode = resolveRouteMode({
      commandIntent,
      context,
      graphDiagnostics,
    });

    const enrichedContext = buildEnrichedContext(
      context,
      graphDiagnostics,
      groundedDiagnostics,
      resolvedMode
    );

    const warnings = buildWarnings(
      messages,
      enrichedContext,
      graphDiagnostics,
      groundedDiagnostics
    );

    const { brain, selectionInfo, executableToolNames } = createRouteBrain();

    console.log("[codexforge/chat] request", {
      messageCount: messages.length,
      commandIntent,
      resolvedMode,
      preferredProvider: selectionInfo.selectedProvider,
      resolvedProvider: selectionInfo.resolvedProvider,
      usedFallback: selectionInfo.usedFallback,
      hasRepoPath: !!enrichedContext.repoPath,
      hasSystemGuide: !!enrichedContext.systemGuide,
      activePlanSteps: enrichedContext.activePlan?.steps.length ?? 0,
      activePlanFiles: enrichedContext.activePlan?.files?.length ?? 0,
      activePlanNotes: enrichedContext.activePlan?.notes?.length ?? 0,
      memoryCount: enrichedContext.memory?.length ?? 0,
      graphNodeCount: graphDiagnostics.nodeCount,
      graphEdgeCount: graphDiagnostics.edgeCount,
      graphFocusNodeCount: graphDiagnostics.focusNodeCount,
      graphFocusKinds: graphDiagnostics.focusKinds,
      graphWarnings: graphDiagnostics.warnings,
      groundedPrimaryFile: groundedDiagnostics.primaryFile ?? null,
      groundedSupportingFiles: groundedDiagnostics.supportingFiles,
      groundedSignals: groundedDiagnostics.fileSignals,
      groundedWarnings: groundedDiagnostics.warnings,
      executableToolCount: executableToolNames.length,
      executableToolNames,
    });

    const outcome = await brain.run({
      messages: messages.map((message) => ({
        id: message.id,
        role: message.role,
        text: message.text,
        ts: message.ts,
      })),
      context: enrichedContext,
      ...(graphContext ? { graph: graphContext } : {}),
      runtime: {
        requestId: uid(),
        now: Date.now(),
        preferredProvider: selectionInfo.resolvedProvider,
        allowFallback: true,
      },
    });

    if (!outcome.ok) {
      console.error("[codexforge/chat] brain failure", {
        provider: outcome.provider,
        retryable: outcome.retryable,
        health: outcome.health,
        error: outcome.error,
        selectedProvider: selectionInfo.selectedProvider,
        resolvedProvider: selectionInfo.resolvedProvider,
        resolvedMode,
        groundedPrimaryFile: groundedDiagnostics.primaryFile ?? null,
        executableToolCount: executableToolNames.length,
      });

      return badRequest(`[${outcome.provider}] ${outcome.error}`, 500);
    }

    const response = outcome.response;

    const meta = toCodexForgeChatMeta(response, {
      projectName: enrichedContext.projectName || "CodexForge",
      generatedPlan: !!response.structured?.plan,
      executionMode:
        enrichedContext.executionRequest?.mode === "execute-task-step",
      domain:
        response.meta.domain ??
        response.structured?.domain ??
        response.structured?.plan?.domain ??
        enrichedContext.activePlan?.domain ??
        "general",
      mode: response.meta.mode ?? enrichedContext.mode ?? resolvedMode ?? "chat",
      intent: commandIntent ?? response.intent,
      usedFallback:
        response.meta.usedFallback || selectionInfo.usedFallback,
      model: response.meta.model || MODEL_NAME,
    });

    const successResponse: CodexForgeChatSuccessResponse = {
      ok: true,
      reply: {
        id: uid(),
        role: "assistant",
        text: response.text,
        ts: Date.now(),
        structured: response.structured ?? undefined,
      },
      meta,
    };

    const mergedWarnings = uniqueStrings([
      ...warnings,
      ...(response.meta.warnings ?? []),
      ...(selectionInfo.fallbackReason ? [selectionInfo.fallbackReason] : []),
    ]);

    console.log("[codexforge/chat] success", {
      provider: response.meta.provider,
      model: response.meta.model,
      mode: response.meta.mode,
      resolvedMode,
      intent: response.intent,
      domain: meta.domain,
      warningCount: mergedWarnings.length,
      durationMs: response.meta.durationMs ?? 0,
      graphUsed: graphDiagnostics.hasGraph && graphDiagnostics.nodeCount > 0,
      graphBriefingCount: graphDiagnostics.graphBriefing.length,
      groundedPrimaryFile: groundedDiagnostics.primaryFile ?? null,
      groundedSupportingFileCount: groundedDiagnostics.supportingFiles.length,
      executableToolCount: executableToolNames.length,
    });

    return NextResponse.json<CodexForgeChatResponse>(successResponse, {
      headers: buildJsonHeaders({
        "x-codexforge-model": successResponse.meta?.model ?? MODEL_NAME,
        "x-codexforge-intent": successResponse.meta?.intent ?? "unknown",
        "x-codexforge-command": commandIntent ?? "none",
        "x-codexforge-mode": resolvedMode,
        "x-codexforge-warning-count": String(mergedWarnings.length),
        "x-codexforge-domain": successResponse.meta?.domain ?? "general",
        "x-codexforge-generated-plan": successResponse.meta?.generatedPlan
          ? "true"
          : "false",
        "x-codexforge-execution-mode": successResponse.meta?.executionMode
          ? "true"
          : "false",
        "x-codexforge-provider": response.meta.provider,
        "x-codexforge-provider-selected": selectionInfo.selectedProvider,
        "x-codexforge-provider-resolved": selectionInfo.resolvedProvider,
        "x-codexforge-provider-fallback": selectionInfo.usedFallback
          ? "true"
          : "false",
        "x-codexforge-duration-ms":
          typeof response.meta.durationMs === "number"
            ? String(response.meta.durationMs)
            : "0",
        "x-codexforge-graph-used":
          graphDiagnostics.hasGraph && graphDiagnostics.nodeCount > 0
            ? "true"
            : "false",
        "x-codexforge-graph-nodes": String(graphDiagnostics.nodeCount),
        "x-codexforge-graph-edges": String(graphDiagnostics.edgeCount),
        "x-codexforge-graph-focus-count": String(graphDiagnostics.focusNodeCount),
        "x-codexforge-graph-has-task": graphDiagnostics.hasTaskNode ? "true" : "false",
        "x-codexforge-graph-has-plan": graphDiagnostics.hasPlanNode ? "true" : "false",
        "x-codexforge-graph-has-run": graphDiagnostics.hasRunNode ? "true" : "false",
        "x-codexforge-grounded-primary-file":
          groundedDiagnostics.primaryFile ?? "none",
        "x-codexforge-grounded-supporting-files": String(
          groundedDiagnostics.supportingFiles.length
        ),
        "x-codexforge-tools-executable-count": String(executableToolNames.length),
        "x-codexforge-tools-execute-route": "/api/codexforge/tools/execute",
      }),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message
        : "Failed to process request.";

    console.error("[codexforge/chat] route crash", error);

    return badRequest(message, 500);
  }
}
import { runCodexForgeEngine } from "@/lib/codexforge/chat/engine";
import type { CodexForgeEngineDependencies } from "@/lib/codexforge/chat/contracts";
import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import {
  summarizeCodexForgeBrainGraph,
  type CodexForgeBrain,
  type CodexForgeBrainCapability,
  type CodexForgeBrainGraphContext,
  type CodexForgeBrainHealth,
  type CodexForgeBrainProviderInfo,
  type CodexForgeBrainRequest,
  type CodexForgeBrainResponse,
  type CodexForgeBrainRunOutcome,
} from "@/lib/codexforge/brain/types";
import type {
  CodexForgeChatContext,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

const LOCAL_ENGINE_PROVIDER = "local-engine" as const;
const LOCAL_ENGINE_MODEL = "codexforge-local-structured-v4";

const LOCAL_ENGINE_CAPABILITIES: CodexForgeBrainCapability[] = [
  "chat",
  "structured",
  "planning",
  "execution",
  "diffs",
  "snapshot-awareness",
  "graph-memory",
];

/* ================= LIMITS ================= */

const LIMITS = {
  maxMessages: 80,
  maxText: 16000,
  maxSystemGuide: 12000,
  maxMemoryItems: 40,
  maxMemoryItemText: 800,
  maxPlanSteps: 80,
  maxPlanItemText: 500,
  maxTags: 80,
  maxTagText: 80,
  maxWarnings: 20,
  maxGraphSummaryText: 5000,
  maxGraphFocusNodeIds: 24,
  maxGraphContextNodes: 24,
  maxGraphConnectedDepth: 2,
  maxGraphNodeText: 240,
  maxGraphBriefLines: 24,
  maxGraphKindEntries: 8,
  maxCurrentStateLines: 18,
  maxExecutableToolNames: 24,
} as const;

/* ================= VALIDATION SETS ================= */

const VALID_DOMAINS: readonly CodexForgePlanDomain[] = [
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

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function normalizeString(value: unknown, max: number): string | undefined {
  if (!isNonEmptyString(value)) return undefined;
  return clampText(value.trim(), max);
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeStringArray(
  value: unknown,
  maxItems: number,
  maxText: number
): string[] {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => clampText(item, maxText));

  return uniqueStrings(normalized).slice(0, maxItems);
}

function normalizeDomain(value: unknown): CodexForgePlanDomain | undefined {
  return typeof value === "string" &&
    VALID_DOMAINS.includes(value as CodexForgePlanDomain)
    ? (value as CodexForgePlanDomain)
    : undefined;
}

function normalizeIntent(value: unknown): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : "chat";
}

function normalizeWarnings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return uniqueStrings(
    value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => clampText(item, 240))
  ).slice(0, LIMITS.maxWarnings);
}

function normalizeNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getDataRecord(node: CodexForgeBrainNode): Record<string, unknown> | null {
  return isRecord(node.data) ? (node.data as Record<string, unknown>) : null;
}

function joinNonEmpty(
  lines: Array<string | undefined | null>,
  separator = "\n"
): string {
  return lines
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    )
    .join(separator);
}

function getExecutableToolNames(
  dependencies?: CodexForgeEngineDependencies
): string[] {
  return (
    dependencies?.toolExecution
      ?.getExecutableToolNames()
      .slice(0, LIMITS.maxExecutableToolNames) ?? []
  );
}

function buildToolExecutionAppendix(
  dependencies?: CodexForgeEngineDependencies
): string | undefined {
  const executableToolNames = getExecutableToolNames(dependencies);
  if (executableToolNames.length === 0) {
    return undefined;
  }

  const lines: string[] = [];
  lines.push("CodexForge executable tool context:");
  lines.push(`- Executable tools available: ${executableToolNames.length}`);
  lines.push(`- Tool names: ${executableToolNames.join(", ")}`);
  lines.push(
    "- Prefer read/search/inspect style tools first unless the task clearly requires mutation or execution."
  );

  return clampText(lines.join("\n"), LIMITS.maxSystemGuide);
}

/* ================= GRAPH HELPERS ================= */

function getNodeLabel(node: CodexForgeBrainNode): string {
  const data = getDataRecord(node);
  const rawLabel = data ? data["label"] : undefined;
  return normalizeString(rawLabel, LIMITS.maxGraphNodeText) ?? node.kind;
}

function getNodeDetail(node: CodexForgeBrainNode): string | undefined {
  const data = getDataRecord(node);
  if (!data) return undefined;

  const candidateKeys = [
    "summary",
    "goal",
    "text",
    "content",
    "description",
    "repoPath",
    "filePath",
    "resultSummary",
    "whyItMatters",
    "value",
    "name",
  ] as const;

  for (const key of candidateKeys) {
    const value = normalizeString(data[key], LIMITS.maxGraphNodeText);
    if (value) return value;
  }

  return undefined;
}

function getNodePriority(node: CodexForgeBrainNode): number {
  let score = 0;

  switch (node.kind) {
    case "task":
      score += 120;
      break;
    case "plan":
      score += 110;
      break;
    case "step":
      score += 100;
      break;
    case "run":
      score += 105;
      break;
    case "memory":
      score += 90;
      break;
    case "diff":
      score += 80;
      break;
    case "snapshot":
      score += 70;
      break;
    case "repo":
      score += 65;
      break;
    case "project":
      score += 60;
      break;
    case "workspace":
      score += 55;
      break;
    case "conversation":
      score += 35;
      break;
    case "message":
      score += 20;
      break;
    case "tag":
      score += 10;
      break;
    default:
      score += 15;
      break;
  }

  if (node.meta?.pinned === true) {
    score += 120;
  }

  switch (node.meta?.importance) {
    case "critical":
      score += 100;
      break;
    case "high":
      score += 70;
      break;
    case "medium":
      score += 40;
      break;
    case "low":
      score += 10;
      break;
  }

  switch (node.meta?.status) {
    case "active":
      score += 70;
      break;
    case "error":
      score += 85;
      break;
    case "blocked":
      score += 60;
      break;
    case "done":
      score += 20;
      break;
    case "idle":
      score += 5;
      break;
    case "archived":
      score -= 60;
      break;
  }

  if (typeof node.meta?.updatedAt === "number") {
    score += Math.floor(node.meta.updatedAt / 10_000_000);
  }

  return score;
}

function formatGraphNodeLine(node: CodexForgeBrainNode): string {
  const label = getNodeLabel(node);
  const detail = getNodeDetail(node);
  return detail ? `- [${node.kind}] ${label}: ${detail}` : `- [${node.kind}] ${label}`;
}

function collectFocusedGraphNodes(
  graphContext?: CodexForgeBrainGraphContext
): CodexForgeBrainNode[] {
  const graph = graphContext?.graph ?? graphContext?.snapshot?.graph ?? null;
  if (!graph) return [];

  const requestedDepth = normalizeNumber(graphContext?.includeConnectedDepth) ?? 0;
  const maxDepth = Math.min(
    Math.max(requestedDepth, 0),
    LIMITS.maxGraphConnectedDepth
  );

  const requestedFocusIds = Array.isArray(graphContext?.focusNodeIds)
    ? uniqueStrings(
        graphContext.focusNodeIds.filter(
          (item): item is string => typeof item === "string"
        )
      ).slice(0, LIMITS.maxGraphFocusNodeIds)
    : [];

  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));
  const adjacency = new Map<string, string[]>();

  for (const edge of graph.edges) {
    const fromNeighbors = adjacency.get(edge.from) ?? [];
    fromNeighbors.push(edge.to);
    adjacency.set(edge.from, fromNeighbors);

    const toNeighbors = adjacency.get(edge.to) ?? [];
    toNeighbors.push(edge.from);
    adjacency.set(edge.to, toNeighbors);
  }

  const ordered: CodexForgeBrainNode[] = [];
  const seen = new Set<string>();
  const queue: Array<{ id: string; depth: number; priority: number }> = [];

  for (const id of requestedFocusIds) {
    const node = nodeMap.get(id);
    if (!node) continue;
    queue.push({ id, depth: 0, priority: getNodePriority(node) + 500 });
  }

  if (queue.length === 0) {
    return [...graph.nodes]
      .sort((a, b) => getNodePriority(b) - getNodePriority(a))
      .slice(0, LIMITS.maxGraphContextNodes);
  }

  while (queue.length > 0 && ordered.length < LIMITS.maxGraphContextNodes) {
    queue.sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.priority - a.priority;
    });

    const current = queue.shift();
    if (!current) break;
    if (seen.has(current.id)) continue;

    const node = nodeMap.get(current.id);
    if (!node) continue;

    seen.add(current.id);
    ordered.push(node);

    if (current.depth >= maxDepth) continue;

    const neighbors = adjacency.get(current.id) ?? [];
    for (const neighborId of neighbors) {
      if (seen.has(neighborId)) continue;
      const neighborNode = nodeMap.get(neighborId);
      if (!neighborNode) continue;

      queue.push({
        id: neighborId,
        depth: current.depth + 1,
        priority: getNodePriority(neighborNode),
      });
    }
  }

  if (ordered.length < LIMITS.maxGraphContextNodes) {
    const extras = [...graph.nodes]
      .filter((node) => !seen.has(node.id))
      .sort((a, b) => getNodePriority(b) - getNodePriority(a))
      .slice(0, LIMITS.maxGraphContextNodes - ordered.length);

    ordered.push(...extras);
  }

  return ordered;
}

function buildGraphSystemGuideAppendix(
  graphContext?: CodexForgeBrainGraphContext
): string | undefined {
  const summary =
    graphContext?.summary ??
    summarizeCodexForgeBrainGraph(graphContext?.graph ?? graphContext?.snapshot?.graph);

  const graph = graphContext?.graph ?? graphContext?.snapshot?.graph ?? null;
  const focusedNodes = collectFocusedGraphNodes(graphContext);

  if (!summary && focusedNodes.length === 0) {
    return undefined;
  }

  const lines: string[] = [];
  lines.push("CodexForge graph memory context:");
  lines.push(`- Nodes: ${summary?.nodeCount ?? graph?.nodes.length ?? 0}`);
  lines.push(`- Edges: ${summary?.edgeCount ?? graph?.edges.length ?? 0}`);

  if (summary?.updatedAt) {
    lines.push(`- Graph updated at: ${new Date(summary.updatedAt).toISOString()}`);
  }

  if (graphContext?.focusNodeIds?.length) {
    lines.push(
      `- Focus nodes requested: ${graphContext.focusNodeIds
        .slice(0, LIMITS.maxGraphFocusNodeIds)
        .join(", ")}`
    );
  }

  if (summary?.kinds) {
    const kindSummary = Object.entries(summary.kinds)
      .filter((entry): entry is [string, number] => typeof entry[1] === "number")
      .sort((a, b) => b[1] - a[1])
      .slice(0, LIMITS.maxGraphKindEntries)
      .map(([kind, count]) => `${kind}:${count}`)
      .join(", ");

    if (kindSummary) {
      lines.push(`- Node kinds: ${kindSummary}`);
    }
  }

  if (focusedNodes.length > 0) {
    lines.push("- Relevant graph nodes:");
    for (const node of focusedNodes.slice(0, LIMITS.maxGraphBriefLines)) {
      lines.push(formatGraphNodeLine(node));
    }
  }

  return clampText(lines.join("\n"), LIMITS.maxGraphSummaryText);
}

function buildCurrentWorkStateAppendix(
  context: CodexForgeChatContext,
  dependencies?: CodexForgeEngineDependencies
): string | undefined {
  const lines: string[] = [];
  lines.push("CodexForge current work state:");

  if (context.projectName) {
    lines.push(`- Project: ${context.projectName}`);
  }

  if (context.workspaceRoot) {
    lines.push(`- Workspace root: ${context.workspaceRoot}`);
  }

  if (context.repoPath) {
    lines.push(`- Repo path: ${context.repoPath}`);
  }

  if (context.activePlan?.goal) {
    lines.push(`- Active goal: ${context.activePlan.goal}`);
  }

  if (context.activePlan?.domain) {
    lines.push(`- Active domain: ${context.activePlan.domain}`);
  }

  if (context.activePlan?.nextAction) {
    lines.push(`- Next action: ${context.activePlan.nextAction}`);
  }

  if (context.activePlan?.steps?.length) {
    lines.push(`- Plan steps: ${context.activePlan.steps.length}`);
  }

  if (context.activePlan?.tags?.length) {
    lines.push(`- Plan tags: ${context.activePlan.tags.slice(0, 8).join(", ")}`);
  }

  if (context.execution?.running === true) {
    lines.push("- Execution is currently running.");
  }

  if (context.execution?.enginePhase) {
    lines.push(`- Engine phase: ${context.execution.enginePhase}`);
  }

  if (typeof context.execution?.diffCount === "number") {
    lines.push(`- Diff count: ${context.execution.diffCount}`);
  }

  if (typeof context.execution?.snapshotFileCount === "number") {
    lines.push(`- Snapshot file count: ${context.execution.snapshotFileCount}`);
  }

  if (context.execution?.lastRunLabel) {
    lines.push(`- Last run label: ${context.execution.lastRunLabel}`);
  }

  if (context.executionRequest?.mode === "execute-task-step") {
    lines.push("- Execution request mode: execute-task-step");
    if (context.executionRequest.taskGoal) {
      lines.push(`- Execution task goal: ${context.executionRequest.taskGoal}`);
    }
    if (context.executionRequest.stepText) {
      lines.push(`- Execution step text: ${context.executionRequest.stepText}`);
    }
  }

  if (context.memory?.length) {
    const pinned = context.memory.filter((item) => item.pinned === true);
    lines.push(`- Injected memory items: ${context.memory.length}`);
    if (pinned.length > 0) {
      lines.push(
        `- Pinned memory: ${pinned
          .slice(0, 4)
          .map((item) => item.content)
          .join(" | ")}`
      );
    }
  }

  const executableToolNames = getExecutableToolNames(dependencies);
  if (executableToolNames.length > 0) {
    lines.push(`- Executable tools available: ${executableToolNames.length}`);
    lines.push(`- Tool shortlist: ${executableToolNames.slice(0, 8).join(", ")}`);
  }

  return lines.length > 1
    ? clampText(
        lines.slice(0, LIMITS.maxCurrentStateLines).join("\n"),
        LIMITS.maxSystemGuide
      )
    : undefined;
}

/* ================= SANITIZERS ================= */

function sanitizeMessages(
  messages: CodexForgeBrainRequest["messages"]
): CodexForgeMessage[] {
  return messages
    .slice(-LIMITS.maxMessages)
    .filter(
      (message): message is CodexForgeBrainRequest["messages"][number] =>
        !!message &&
        typeof message === "object" &&
        (message.role === "system" ||
          message.role === "user" ||
          message.role === "assistant") &&
        isNonEmptyString(message.text)
    )
    .map((message, index) => ({
      id:
        normalizeString(message.id, 120) ??
        `brain-msg-${index + 1}-${Date.now().toString(16)}`,
      role: message.role,
      text: clampText(message.text.trim(), LIMITS.maxText),
      ts:
        typeof message.ts === "number" && Number.isFinite(message.ts)
          ? message.ts
          : Date.now(),
      structured: null,
      source: "api" as const,
    }));
}

function sanitizeContext(
  context: CodexForgeChatContext | undefined,
  graphContext?: CodexForgeBrainGraphContext,
  dependencies?: CodexForgeEngineDependencies
): CodexForgeChatContext {
  if (!context || !isRecord(context)) {
    const graphGuide = buildGraphSystemGuideAppendix(graphContext);
    const currentStateGuide = buildCurrentWorkStateAppendix({}, dependencies);
    const toolGuide = buildToolExecutionAppendix(dependencies);
    const systemGuide = joinNonEmpty(
      [toolGuide, currentStateGuide, graphGuide],
      "\n\n"
    );

    return systemGuide ? { systemGuide } : {};
  }

  const memory = Array.isArray(context.memory)
    ? context.memory
        .filter(
          (
            item
          ): item is NonNullable<CodexForgeChatContext["memory"]>[number] =>
            !!item &&
            typeof item === "object" &&
            isNonEmptyString(item.id) &&
            isNonEmptyString(item.type) &&
            isNonEmptyString(item.content)
        )
        .map((item) => ({
          id: clampText(item.id.trim(), 120),
          type: item.type,
          content: clampText(item.content.trim(), LIMITS.maxMemoryItemText),
          pinned: item.pinned === true,
          importance:
            typeof item.importance === "number" &&
            Number.isFinite(item.importance)
              ? Math.min(Math.max(item.importance, 0), 1)
              : undefined,
        }))
        .sort((a, b) => {
          const aPinned = a.pinned === true ? 1 : 0;
          const bPinned = b.pinned === true ? 1 : 0;
          if (aPinned !== bPinned) return bPinned - aPinned;
          return (b.importance ?? 0) - (a.importance ?? 0);
        })
        .slice(0, LIMITS.maxMemoryItems)
    : undefined;

  const normalizedActivePlanSteps = normalizeStringArray(
    context.activePlan?.steps,
    LIMITS.maxPlanSteps,
    LIMITS.maxPlanItemText
  );

  const activePlan =
    context.activePlan &&
    isNonEmptyString(context.activePlan.goal) &&
    normalizedActivePlanSteps.length > 0
      ? {
          goal: clampText(context.activePlan.goal.trim(), LIMITS.maxText),
          steps: normalizedActivePlanSteps,
          nextAction: normalizeString(
            context.activePlan.nextAction,
            LIMITS.maxPlanItemText
          ),
          status: context.activePlan.status,
          intent: normalizeString(context.activePlan.intent, 120),
          domain: normalizeDomain(context.activePlan.domain),
          tags: normalizeStringArray(
            context.activePlan.tags,
            LIMITS.maxTags,
            LIMITS.maxTagText
          ),
          risks: normalizeStringArray(
            context.activePlan.risks,
            LIMITS.maxPlanSteps,
            LIMITS.maxPlanItemText
          ),
          files: normalizeStringArray(
            context.activePlan.files,
            LIMITS.maxPlanSteps,
            LIMITS.maxPlanItemText
          ),
          commands: normalizeStringArray(
            context.activePlan.commands,
            LIMITS.maxPlanSteps,
            LIMITS.maxPlanItemText
          ),
          notes: normalizeStringArray(
            context.activePlan.notes,
            LIMITS.maxPlanSteps,
            LIMITS.maxPlanItemText
          ),
        }
      : null;

  const capabilityDomains = normalizeStringArray(
    context.codexforgeCapabilities?.domains,
    VALID_DOMAINS.length,
    80
  ).filter(
    (domain): domain is CodexForgePlanDomain =>
      VALID_DOMAINS.includes(domain as CodexForgePlanDomain)
  );

  const baseSystemGuide = normalizeString(
    context.systemGuide,
    LIMITS.maxSystemGuide
  );

  const graphAppendix = buildGraphSystemGuideAppendix(graphContext);
  const currentStateAppendix = buildCurrentWorkStateAppendix(
    {
      ...context,
      activePlan,
      memory,
    },
    dependencies
  );
  const toolAppendix = buildToolExecutionAppendix(dependencies);

  const systemGuide = joinNonEmpty(
    [baseSystemGuide, toolAppendix, currentStateAppendix, graphAppendix],
    "\n\n"
  );

  return {
    projectName: normalizeString(context.projectName, 160),
    workspaceRoot: normalizeString(context.workspaceRoot, 500),
    repoPath: normalizeString(context.repoPath, 500),
    mode: normalizeString(context.mode, 120),
    ...(systemGuide ? { systemGuide: clampText(systemGuide, LIMITS.maxSystemGuide) } : {}),
    activePlan,
    memory,
    execution: context.execution
      ? {
          running: context.execution.running === true,
          stepIndex: normalizeNumber(context.execution.stepIndex),
          lastRunLabel: normalizeString(context.execution.lastRunLabel, 300),
          lastCompletedAt: normalizeNumber(context.execution.lastCompletedAt),
          enginePhase: context.execution.enginePhase,
          diffCount: normalizeNumber(context.execution.diffCount),
          snapshotFileCount: normalizeNumber(
            context.execution.snapshotFileCount
          ),
        }
      : undefined,
    executionRequest: context.executionRequest
      ? {
          taskId: normalizeString(context.executionRequest.taskId, 120),
          taskGoal: normalizeString(
            context.executionRequest.taskGoal,
            LIMITS.maxText
          ),
          stepIndex: normalizeNumber(context.executionRequest.stepIndex),
          stepText: normalizeString(
            context.executionRequest.stepText,
            LIMITS.maxPlanItemText
          ),
          mode:
            context.executionRequest.mode === "execute-task-step"
              ? "execute-task-step"
              : undefined,
        }
      : undefined,
    codexforgeCapabilities:
      capabilityDomains.length > 0 ? { domains: capabilityDomains } : undefined,
  };
}

function getResolvedMode(context: CodexForgeChatContext): string {
  if (isNonEmptyString(context.mode)) return context.mode.trim();
  if (context.executionRequest?.mode === "execute-task-step") return "execution";
  if (context.execution?.enginePhase && context.execution.enginePhase !== "idle") {
    return "execution";
  }
  if (context.activePlan) return "planning";
  return "chat";
}

function getResolvedDomain(
  structured: CodexForgeStructuredReply | null | undefined,
  context: CodexForgeChatContext
): CodexForgePlanDomain {
  return (
    normalizeDomain(structured?.domain) ??
    normalizeDomain(structured?.plan?.domain) ??
    normalizeDomain(context.activePlan?.domain) ??
    "general"
  );
}

function buildHealth(args: {
  ok: boolean;
  warnings: string[];
  hasStructured: boolean;
  messageCount: number;
  graphUsed: boolean;
}): CodexForgeBrainHealth {
  if (!args.ok) return "degraded";
  if (args.messageCount === 0) return "offline";
  if (args.warnings.length > 0) return "degraded";
  if (!args.hasStructured) return "degraded";
  return args.graphUsed ? "ready" : "degraded";
}

function buildInternalWarnings(args: {
  messages: CodexForgeMessage[];
  context: CodexForgeChatContext;
  structured: CodexForgeStructuredReply | null;
  externalWarnings: string[];
  graph?: CodexForgeBrainGraphContext;
  dependencies?: CodexForgeEngineDependencies;
}): string[] {
  const warnings = [...args.externalWarnings];

  if (args.messages.length === 0) {
    warnings.push("No usable messages after sanitization.");
  }

  if (!args.context.systemGuide) {
    warnings.push("Missing system guide.");
  }

  if (!args.context.repoPath) {
    warnings.push("Missing repo path.");
  }

  if ((args.context.memory?.length ?? 0) === 0) {
    warnings.push("No memory injected.");
  }

  if (!args.structured) {
    warnings.push("Structured reply missing.");
  }

  if (
    args.context.activePlan &&
    !args.structured?.plan &&
    !args.structured?.nextSteps
  ) {
    warnings.push(
      "Active plan context present but reply did not reinforce planning structure."
    );
  }

  if (
    args.context.executionRequest?.mode === "execute-task-step" &&
    !args.structured?.execution
  ) {
    warnings.push(
      "Execution request present but structured execution payload missing."
    );
  }

  const executableToolNames = getExecutableToolNames(args.dependencies);
  if (executableToolNames.length === 0) {
    warnings.push("No executable server tools attached to local engine brain.");
  }

  if (args.graph) {
    const summary =
      args.graph.summary ??
      summarizeCodexForgeBrainGraph(args.graph.graph ?? args.graph.snapshot?.graph);

    if (!summary || summary.nodeCount === 0) {
      warnings.push("Graph memory available but empty.");
    }

    if ((args.graph.focusNodeIds?.length ?? 0) === 0) {
      warnings.push("Graph context provided without focus nodes.");
    }
  }

  return uniqueStrings(warnings).slice(0, LIMITS.maxWarnings);
}

function normalizeStructuredReply(
  value: unknown
): CodexForgeStructuredReply | null {
  if (!isRecord(value)) return null;
  return value as CodexForgeStructuredReply;
}

function normalizeEngineResponse(
  value: unknown
): {
  text: string;
  structured: CodexForgeStructuredReply | null;
  intent: string;
  warnings: string[];
} {
  if (!isRecord(value)) {
    throw new Error("Engine returned an invalid response object.");
  }

  const text = normalizeString(value.text, LIMITS.maxText);
  if (!text) {
    throw new Error("Engine returned empty text.");
  }

  const structured = normalizeStructuredReply(value.structured ?? null);
  const intent = normalizeIntent(value.intent);
  const warnings = normalizeWarnings((value as { warnings?: unknown }).warnings);

  return {
    text,
    structured,
    intent,
    warnings,
  };
}

function buildResponse(args: {
  text: string;
  structured: CodexForgeStructuredReply | null;
  intent: string;
  provider: typeof LOCAL_ENGINE_PROVIDER;
  model: typeof LOCAL_ENGINE_MODEL;
  mode: string;
  durationMs: number;
  warnings: string[];
  domain: CodexForgePlanDomain;
  graph?: CodexForgeBrainGraphContext;
  dependencies?: CodexForgeEngineDependencies;
}): CodexForgeBrainResponse {
  const graphSummary =
    args.graph?.summary ??
    summarizeCodexForgeBrainGraph(args.graph?.graph ?? args.graph?.snapshot?.graph);

  const focusNodeIds = Array.isArray(args.graph?.focusNodeIds)
    ? uniqueStrings(
        args.graph.focusNodeIds.filter(
          (item): item is string => typeof item === "string"
        )
      ).slice(0, LIMITS.maxGraphFocusNodeIds)
    : undefined;

  return {
    text: args.text,
    structured: args.structured,
    intent: args.intent,
    meta: {
      provider: args.provider,
      model: args.model,
      mode: args.mode,
      usedFallback: false,
      durationMs: args.durationMs,
      warnings: args.warnings,
      capabilities: [...LOCAL_ENGINE_CAPABILITIES],
      domain: args.domain,
      graphUsed: !!graphSummary,
      graphNodeCount: graphSummary?.nodeCount,
      graphEdgeCount: graphSummary?.edgeCount,
      graphFocusNodeIds: focusNodeIds,
      raw: {
        finishReason: "completed",
      },
    },
  };
}

/* ================= BRAIN ================= */

export class LocalEngineBrain implements CodexForgeBrain {
  readonly provider = LOCAL_ENGINE_PROVIDER;
  readonly model = LOCAL_ENGINE_MODEL;
  readonly capabilities = [...LOCAL_ENGINE_CAPABILITIES];

  private readonly dependencies?: CodexForgeEngineDependencies;
  private lastHealth: CodexForgeBrainHealth = "unknown";

  constructor(dependencies?: CodexForgeEngineDependencies) {
    this.dependencies = dependencies;
  }

  getInfo(): CodexForgeBrainProviderInfo {
    return {
      provider: this.provider,
      label: "Local Engine",
      model: this.model,
      health: this.lastHealth === "unknown" ? "ready" : this.lastHealth,
      available: true,
      capabilities: [...this.capabilities],
    };
  }

  async run(request: CodexForgeBrainRequest): Promise<CodexForgeBrainRunOutcome> {
    const startedAt = Date.now();

    try {
      const messages = sanitizeMessages(request.messages);
      const context = sanitizeContext(
        request.context,
        request.graph,
        this.dependencies
      );

      if (messages.length === 0) {
        this.lastHealth = "degraded";

        return {
          ok: false,
          error: "No valid messages were provided to the local engine.",
          provider: this.provider,
          retryable: false,
          health: this.lastHealth,
        };
      }

      const engineResult = normalizeEngineResponse(
        await runCodexForgeEngine(messages, context, this.dependencies)
      );

      const durationMs = Date.now() - startedAt;
      const domain = getResolvedDomain(engineResult.structured, context);
      const warnings = buildInternalWarnings({
        messages,
        context,
        structured: engineResult.structured,
        externalWarnings: engineResult.warnings,
        graph: request.graph,
        dependencies: this.dependencies,
      });

      const graphSummary =
        request.graph?.summary ??
        summarizeCodexForgeBrainGraph(
          request.graph?.graph ?? request.graph?.snapshot?.graph
        );

      this.lastHealth = buildHealth({
        ok: true,
        warnings,
        hasStructured: !!engineResult.structured,
        messageCount: messages.length,
        graphUsed: !!graphSummary,
      });

      const response = buildResponse({
        text: engineResult.text,
        structured: engineResult.structured,
        intent: engineResult.intent,
        provider: this.provider,
        model: this.model,
        mode: getResolvedMode(context),
        durationMs,
        warnings,
        domain,
        graph: request.graph,
        dependencies: this.dependencies,
      });

      return {
        ok: true,
        response,
      };
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "Local engine failed.";

      this.lastHealth = "degraded";

      return {
        ok: false,
        error: message,
        provider: this.provider,
        retryable: false,
        health: this.lastHealth,
      };
    }
  }
}

export function createLocalEngineBrain(
  dependencies?: CodexForgeEngineDependencies
): LocalEngineBrain {
  return new LocalEngineBrain(dependencies);
}
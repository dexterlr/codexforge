import { NextResponse } from "next/server";
import {
  createCodexForgeBrain,
  getCodexForgeBrainSelectionInfo,
} from "@/lib/codexforge/brain";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { toCodexForgeChatMeta } from "@/lib/codexforge/brain/types";
import { getCodexForgeServerEngineDependencies } from "@/lib/codexforge/chat/dependencies.server";
import type {
  CodexForgeChatContext,
  CodexForgeChatErrorResponse,
  CodexForgeChatMode,
  CodexForgeChatResponse,
  CodexForgeChatSuccessResponse,
  CodexForgeDiff,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgePlanStatus,
} from "@/lib/codexforge/types";

/* ================= CONFIG ================= */

const MODEL_NAME = "codexforge-brain-router-v6";

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
  maxGroundedFiles: 8,
  maxGroundedSignals: 10,
  maxDoctrineLines: 18,
  maxCapabilityBriefingLines: 12,
  maxDebugHeaderText: 500,
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

const VALID_CHAT_MODES: readonly CodexForgeChatMode[] = [
  "local",
  "local-fallback",
  "local-execution",
  "local-execution-fallback",
  "remote",
] as const;

const VALID_MEMORY_TYPES = ["fact", "decision", "task", "note"] as const;

const CODEXFORGE_DOCTRINE_LINES: readonly string[] = [
  "CodexForge is not a generic chatbot. It is a local-first AI developer workspace, research copilot, creative production operator, and approval-safe automation brain.",
  "Prefer grounded inspection, concrete files, concrete tools, concrete plans, and visible next actions over vague advice.",
  "When the user references a repo path, file, function, error, or edit point, inspect first with safe repo tools before giving conclusions.",
  "For read-only work, prefer safe tools: read-file, list-files, search-project, snapshot-project, and structured analysis.",
  "For mutation work, require approval checkpoints before write-file, apply-diff, run-command, installs, destructive commands, deployment, render jobs, or external automation.",
  "For web/product work, produce production-grade phases: scope, IA, design system, pages, data, APIs, testing, deployment, analytics, and iteration.",
  "For game-server work, produce stack, plugins/mods, world/theme design, content pipeline, admin tooling, deployment, backups, and rollout phases.",
  "For movie/video work, produce script, beats, shots, storyboards, assets, voice, music, edit, render, review loops, storage, and automation stages.",
  "For ComfyUI work, produce prompt templates, reusable node groups, asset tracking, queues, approvals, output naming, and repeatable workflows.",
  "For Unreal work, produce project setup, assets, blueprints/C++, cinematic tooling, packaging, testing, and operator-style task execution.",
  "For Blender/DaVinci/Photoshop/canvas-style work, treat them as creative-production tools requiring asset plans, review checkpoints, and explicit user approval before file or render mutation.",
  "For camera, voice, desktop, or browser control, require explicit opt-in, visible state, local-first behavior where possible, and no silent background surveillance.",
  "Always separate: what is known, what was inspected, the best next action, risks, and what requires approval.",
  "For recognized CodexForge domains, prefer the local structured engine so Tools, Domain, Steps, and repo-aware sections stay populated.",
  "Thin fallback answers are acceptable only when the request is truly generic or when the local engine/provider path fails visibly.",
] as const;

const CAPABILITY_BRIEFINGS: Record<CodexForgePlanDomain, readonly string[]> = {
  general: [
    "General mode: clarify goal, identify constraints, produce concrete next action, and avoid pretending tool work happened unless tool results are present.",
  ],
  web: [
    "Web mode: plan and build production sites with routes, components, design system, data flow, API boundaries, SEO, accessibility, testing, deployment, and iteration.",
    "For website and product-feature requests, return deliverables, page map or route map, component map, implementation phases, risk list, and first file/action.",
    "For CodexForge app work, keep chat route, client hook, structured reply contract, local tools, and UI metadata aligned.",
  ],
  research: [
    "Research mode: identify unknowns, evidence sources, evaluation criteria, assumptions, contradictions, and output format.",
    "Prefer traceable evidence and structured synthesis over generic brainstorming.",
  ],
  debug: [
    "Debug mode: inspect concrete files/errors first, identify likely root cause, isolate edit point, propose minimal patch, and define validation command.",
    "For explicit file-read prompts, the visible answer should start with the grounded file and best edit point.",
  ],
  "game-server": [
    "Game-server mode: cover server stack, plugins/mods, world design, permissions, economy, quests/events, deployment, backups, admin tooling, and rollout.",
    "For themed Minecraft servers, include content pipeline, asset list, build phases, testing, and launch operations.",
  ],
  movie: [
    "Movie mode: convert ideas into scripts, scenes, shots, assets, voice, music, edit plan, review loops, render stages, and storage structure.",
  ],
  video: [
    "Video mode: plan generation, capture, edit, render, review, publish, thumbnails, metadata, and iteration.",
    "For DaVinci/Blender/Comfy/Unreal-adjacent work, produce tool-specific pipeline stages and approval checkpoints.",
  ],
  comfyui: [
    "ComfyUI mode: define reusable workflows, node groups, prompts, seeds, model/lora assumptions, queues, asset tracking, review gates, and output naming.",
  ],
  unreal: [
    "Unreal mode: define project setup, content folders, blueprints/C++, level/cinematic tooling, assets, packaging, profiling, and operator tasks.",
  ],
  automation: [
    "Automation mode: classify safe read-only actions versus approval-required mutations, then produce explicit tool sequence and rollback/checkpoint plan.",
    "For desktop/browser/camera/voice style automation, require explicit consent and visible state.",
    "For approval-driven diff preview work, keep plan -> generate diff -> preview -> approve -> apply -> test -> checkpoint as the canonical flow.",
  ],
} as const;

/* ================= TYPES ================= */

type CodexForgeMemoryType = (typeof VALID_MEMORY_TYPES)[number];

type BrainRouteMode =
  | "chat"
  | "plan"
  | "debug"
  | "research"
  | "next_step"
  | "execution"
  | "planning";

const COMMAND_MAP: Record<string, BrainRouteMode> = {
  "/plan": "plan",
  "/debug": "debug",
  "/research": "research",
  "/next": "next_step",
} as const;

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

type CapabilityRouting = {
  domain: CodexForgePlanDomain;
  tags: string[];
  briefing: string[];
  matched: boolean;
  reasons: string[];
};

type FileIntentDiagnostics = {
  explicitFileRequest: boolean;
  requestedPaths: string[];
  requestedVerbs: string[];
};

type LocalEngineRoutingDecision = {
  forceLocalEngine: boolean;
  reason: string;
};

/* ================= BASICS ================= */

const uid = (): string =>
  `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 1))}…`;
}

function asClampedString(value: unknown, max: number): string | undefined {
  const text = asTrimmedString(value);
  return text ? clampText(text, max) : undefined;
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(trimmed);
  }

  return output;
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

function boolHeader(value: boolean): "true" | "false" {
  return value ? "true" : "false";
}

/* ================= ENUM NORMALIZERS ================= */

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

function asChatMode(value: unknown): CodexForgeChatMode | undefined {
  return typeof value === "string" &&
    VALID_CHAT_MODES.includes(value as CodexForgeChatMode)
    ? (value as CodexForgeChatMode)
    : undefined;
}

/* ================= ENV / PATH HELPERS ================= */

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

  const running = raw.running === true;
  const stepIndex = asFiniteNumber(raw.stepIndex);
  const lastRunLabel = asClampedString(raw.lastRunLabel, 300);
  const lastCompletedAt = asFiniteNumber(raw.lastCompletedAt);
  const enginePhase = asExecutionPhase(raw.enginePhase);
  const diffCount = asFiniteNumber(raw.diffCount);
  const snapshotFileCount = asFiniteNumber(raw.snapshotFileCount);
  const diffs = Array.isArray(raw.diffs) ? raw.diffs : [];

  const normalizedDiffs: CodexForgeDiff[] = diffs
    .filter((diff): diff is Record<string, unknown> => isRecord(diff))
    .map((diff) => {
      const filePath = asClampedString(diff.filePath, LIMITS.maxText);
      const patch = asClampedString(diff.patch, LIMITS.maxText);
      const id = asClampedString(diff.id, 120);

      if (!filePath || !patch) {
        return null;
      }

      return {
        ...(id ? { id } : {}),
        filePath,
        patch,
      };
    })
    .filter((diff): diff is CodexForgeDiff => diff !== null)
    .slice(0, LIMITS.maxPlanListItems);

  const hasContent =
    running === true ||
    stepIndex !== undefined ||
    lastRunLabel !== undefined ||
    lastCompletedAt !== undefined ||
    enginePhase !== undefined ||
    diffCount !== undefined ||
    snapshotFileCount !== undefined ||
    normalizedDiffs.length > 0;

  if (!hasContent) {
    return undefined;
  }

  return {
    running,
    ...(stepIndex !== undefined ? { stepIndex } : {}),
    ...(lastRunLabel ? { lastRunLabel } : {}),
    ...(lastCompletedAt !== undefined ? { lastCompletedAt } : {}),
    ...(enginePhase ? { enginePhase } : {}),
    ...(diffCount !== undefined ? { diffCount } : {}),
    ...(snapshotFileCount !== undefined ? { snapshotFileCount } : {}),
    ...(normalizedDiffs.length > 0 ? { diffs: normalizedDiffs } : {}),
  };
}

function normalizeExecutionRequest(
  raw: unknown
): CodexForgeChatContext["executionRequest"] {
  if (!isRecord(raw)) return undefined;

  const mode = asTrimmedString(raw.mode);
  if (mode !== "execute-task-step") return undefined;

  const taskId = asClampedString(raw.taskId, 120);
  const taskGoal = asClampedString(raw.taskGoal, LIMITS.maxText);
  const stepIndex = asFiniteNumber(raw.stepIndex);
  const stepText = asClampedString(raw.stepText, LIMITS.maxPlanListItemText);

  if (!taskId || !taskGoal || stepIndex === undefined || !stepText) {
    return undefined;
  }

  return {
    taskId,
    taskGoal,
    stepIndex,
    stepText,
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

  const structuredReplies = raw.structuredReplies === true ? true : undefined;
  const memory = raw.memory === true ? true : undefined;
  const repoAwarePlanning = raw.repoAwarePlanning === true ? true : undefined;
  const localExecution = raw.localExecution === true ? true : undefined;
  const diffPreviews = raw.diffPreviews === true ? true : undefined;
  const snapshots = raw.snapshots === true ? true : undefined;
  const approvals = raw.approvals === true ? true : undefined;
  const brainGraph = raw.brainGraph === true ? true : undefined;

  const hasAny =
    domains.length > 0 ||
    structuredReplies === true ||
    memory === true ||
    repoAwarePlanning === true ||
    localExecution === true ||
    diffPreviews === true ||
    snapshots === true ||
    approvals === true ||
    brainGraph === true;

  if (!hasAny) {
    return undefined;
  }

  return {
    ...(domains.length > 0
      ? { domains: uniqueStrings(domains) as CodexForgePlanDomain[] }
      : {}),
    ...(structuredReplies ? { structuredReplies } : {}),
    ...(memory ? { memory } : {}),
    ...(repoAwarePlanning ? { repoAwarePlanning } : {}),
    ...(localExecution ? { localExecution } : {}),
    ...(diffPreviews ? { diffPreviews } : {}),
    ...(snapshots ? { snapshots } : {}),
    ...(approvals ? { approvals } : {}),
    ...(brainGraph ? { brainGraph } : {}),
  };
}

function normalizeContext(raw: unknown): CodexForgeChatContext {
  if (!isRecord(raw)) return {};

  const systemGuide = asTrimmedString(raw.systemGuide);
  const activePlan = normalizeActivePlan(raw.activePlan);
  const memory = normalizeMemory(raw.memory);
  const execution = normalizeExecution(raw.execution);
  const executionRequest = normalizeExecutionRequest(raw.executionRequest);
  const codexforgeCapabilities = normalizeCapabilities(raw.codexforgeCapabilities);
  const projectName = asClampedString(raw.projectName, 160);
  const workspaceRoot = asClampedString(raw.workspaceRoot, 500);
  const repoPath = asClampedString(raw.repoPath, 500);
  const mode = asChatMode(raw.mode);

  return {
    ...(projectName ? { projectName } : {}),
    ...(workspaceRoot ? { workspaceRoot } : {}),
    ...(repoPath ? { repoPath } : {}),
    ...(mode ? { mode } : {}),
    ...(systemGuide
      ? { systemGuide: clampText(systemGuide, LIMITS.maxSystemGuide) }
      : {}),
    ...(activePlan ? { activePlan } : {}),
    ...(memory ? { memory } : {}),
    ...(execution ? { execution } : {}),
    ...(executionRequest ? { executionRequest } : {}),
    ...(codexforgeCapabilities ? { codexforgeCapabilities } : {}),
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

  const focusNodeIds = asStringArray(
    raw.focusNodeIds,
    LIMITS.maxGraphFocusNodeIds,
    120
  ).filter((id) => nodeIds.has(id));

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
    .map((graphPath) => normalizeWindowsPath(graphPath))
    .filter((graphPath): graphPath is string => !!graphPath);

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

/* ================= GROUNDED PATH HELPERS ================= */

function looksLikePath(value: string): boolean {
  const normalized = normalizePathForCompare(value) ?? value.toLowerCase();

  return (
    normalized.includes("/") ||
    normalized.includes("\\") ||
    normalized.includes(".") ||
    normalized.startsWith("src") ||
    normalized.startsWith("app") ||
    normalized.startsWith("lib") ||
    normalized.startsWith("components") ||
    normalized.startsWith("pages") ||
    normalized.startsWith("api") ||
    normalized.startsWith("docs") ||
    normalized.startsWith("public")
  );
}

function extractPathLikeSegments(text: string): string[] {
  const quoted = text.match(/`([^`]+)`|"([^"]+)"|'([^']+)'/g) ?? [];
  const quotedValues = quoted
    .map((match) => match.replace(/^["'`]|["'`]$/g, "").trim())
    .filter(Boolean);

  const tokenMatches =
    text.match(
      /(?:[A-Za-z]:)?(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/g
    ) ?? [];

  return uniqueStrings([...quotedValues, ...tokenMatches].filter(looksLikePath));
}

function inferFileRoleFromPath(filePath: string): string {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();
  const fileName = getPathFileName(normalized);

  if (normalized.includes("/api/") || fileName === "route.ts" || fileName === "route.tsx") {
    return "API route";
  }

  if (
    normalized.includes("/hooks/") ||
    fileName.startsWith("use-") ||
    fileName.startsWith("use")
  ) {
    return "state hook";
  }

  if (
    normalized.includes("/components/") ||
    normalized.endsWith(".tsx") ||
    fileName.includes("page")
  ) {
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

  if (normalized.includes("/docs/") || normalized.endsWith(".md")) {
    return "documentation";
  }

  return "implementation file";
}

function inferFileEditSuggestion(filePath: string): string {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();

  if (normalized.includes("engine")) {
    return "Likely edit point: engine logic flow, tool orchestration, grounding, or decision branches.";
  }

  if (normalized.includes("route")) {
    return "Likely edit point: request/response contract, context enrichment, routing, or server handler flow.";
  }

  if (normalized.includes("render")) {
    return "Likely edit point: structured output rendering path or visible response priority.";
  }

  if (normalized.includes("analysis")) {
    return "Likely edit point: inference, scoring, domain classification, or planning logic.";
  }

  if (normalized.includes("hook") || normalized.includes("/use-")) {
    return "Likely edit point: client state handling, request wiring, or hook behavior.";
  }

  if (normalized.includes("types") || normalized.includes("contract")) {
    return "Likely edit point: shared contract surface; update callers carefully.";
  }

  if (normalized.includes("component") || normalized.endsWith(".tsx")) {
    return "Likely edit point: UI behavior, props/state handling, or visibility of tool/status metadata.";
  }

  return "Likely edit point: relevant implementation logic in this file.";
}

function isLikelyRepoRootPath(filePath: string): boolean {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();
  const fileName = getPathFileName(normalized);

  return (
    normalized.endsWith("/frontend") ||
    normalized.endsWith("/health-tracker") ||
    normalized.endsWith("/openclaw-workspace") ||
    normalized.endsWith("/repos") ||
    normalized.endsWith("/workspace") ||
    (!fileName.includes(".") &&
      !normalized.startsWith("src/") &&
      !normalized.startsWith("app/") &&
      !normalized.startsWith("lib/") &&
      !normalized.startsWith("docs/") &&
      !normalized.startsWith("public/"))
  );
}

function isProbableSourceFile(filePath: string): boolean {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();
  const fileName = getPathFileName(normalized);

  return (
    fileName.includes(".") &&
    !normalized.includes("/.next/") &&
    !normalized.includes("/node_modules/") &&
    !normalized.includes("/dist/") &&
    !normalized.includes("/build/") &&
    !normalized.includes("/coverage/")
  );
}

function extractFileIntentDiagnostics(text: string): FileIntentDiagnostics {
  const normalized = text.toLowerCase();
  const requestedPaths = extractPathLikeSegments(text);

  const requestedVerbs = uniqueStrings([
    /\bread\b/.test(normalized) ? "read" : "",
    /\binspect\b/.test(normalized) ? "inspect" : "",
    /\bopen\b/.test(normalized) ? "open" : "",
    /\bcheck\b/.test(normalized) ? "check" : "",
    /\breview\b/.test(normalized) ? "review" : "",
    /\banaly[sz]e\b/.test(normalized) ? "analyze" : "",
    /\bdebug\b/.test(normalized) ? "debug" : "",
    /\bfix\b/.test(normalized) ? "fix" : "",
    /\bedit point\b/.test(normalized) ? "edit-point" : "",
  ]);

  const explicitFileRequest =
    requestedPaths.length > 0 &&
    requestedVerbs.some((verb) =>
      [
        "read",
        "inspect",
        "open",
        "check",
        "review",
        "analyze",
        "debug",
        "fix",
        "edit-point",
      ].includes(verb)
    );

  return {
    explicitFileRequest,
    requestedPaths,
    requestedVerbs,
  };
}

function scoreGroundedFileCandidate(
  filePath: string,
  requestedPaths: string[]
): number {
  const normalized = normalizePathForCompare(filePath) ?? filePath.toLowerCase();
  const fileName = getPathFileName(normalized);

  let score = 0;

  if (isProbableSourceFile(filePath)) score += 60;
  if (normalized.startsWith("src/")) score += 30;
  if (normalized.includes("/src/")) score += 25;
  if (normalized.startsWith("app/") || normalized.includes("/app/")) score += 18;
  if (normalized.startsWith("lib/") || normalized.includes("/lib/")) score += 18;
  if (normalized.includes("/chat/")) score += 16;
  if (normalized.includes("engine")) score += 14;
  if (normalized.includes("route")) score += 10;
  if (normalized.includes("tool")) score += 8;
  if (normalized.endsWith(".ts") || normalized.endsWith(".tsx")) score += 8;
  if (normalized.endsWith(".md")) score += 4;
  if (fileName === "package.json") score += 6;

  if (normalized.includes("/.next/")) score -= 120;
  if (normalized.includes("/node_modules/")) score -= 120;
  if (isLikelyRepoRootPath(filePath)) score -= 90;

  for (const requested of requestedPaths) {
    const normalizedRequested = normalizePathForCompare(requested);
    if (!normalizedRequested) continue;

    const requestedFileName = getPathFileName(normalizedRequested);

    if (normalized === normalizedRequested) score += 140;
    if (normalized.endsWith(`/${normalizedRequested}`)) score += 125;
    if (normalizedRequested.endsWith(`/${normalized}`)) score += 70;

    if (fileName === requestedFileName && requestedFileName.includes(".")) {
      score += 45;
    }

    if (normalized.includes(normalizedRequested)) score += 20;
  }

  return score;
}

/* ================= CAPABILITY ROUTING ================= */

function detectCapabilityRouting(
  text: string,
  context: CodexForgeChatContext
): CapabilityRouting {
  const normalized = text.toLowerCase();
  const tags: string[] = [];
  const reasons: string[] = [];

  let domain: CodexForgePlanDomain =
    context.activePlan?.domain ??
    context.codexforgeCapabilities?.domains?.[0] ??
    "general";

  function match(nextDomain: CodexForgePlanDomain, tag: string, reason: string): void {
    domain = nextDomain;
    tags.push(tag);
    reasons.push(reason);
  }

  if (
    /\b(website|web app|landing page|production site|saas|dashboard|frontend|next\.?js|react|tailwind|portfolio|ecommerce|shop)\b/.test(
      normalized
    )
  ) {
    match("web", "web-production", "Web/product keywords detected.");
  }

  if (
    /\b(codexforge|workspace|chat route|api route|route handler|response builder|structured reply|structured output|client hook|ui metadata|feature|product feature|app feature|diff preview|diff previews|approval-driven|approval flow|approval safe|plan a feature|build a feature)\b/.test(
      normalized
    )
  ) {
    match("web", "codexforge-product", "CodexForge product/application work detected.");
  }

  if (
    /\b(debug|bug|error|stack trace|fix|broken|failing|typescript|build error|lint|test failure|edit point)\b/.test(
      normalized
    )
  ) {
    match("debug", "debugging", "Debugging or edit-point language detected.");
  }

  if (
    /\b(research|compare|investigate|evidence|unknowns|market|competitor|sources|study)\b/.test(
      normalized
    )
  ) {
    match("research", "research", "Research keywords detected.");
  }

  if (
    /\b(minecraft|server|plugin|modpack|spigot|paper|purpur|forge|fabric|world|spawn|quest|easter|christmas)\b/.test(
      normalized
    )
  ) {
    match("game-server", "game-server", "Game-server keywords detected.");
  }

  if (
    /\b(movie|film|script|screenplay|storyboard|shot list|cinematic|scene|voiceover|soundtrack)\b/.test(
      normalized
    )
  ) {
    match("movie", "movie-pipeline", "Movie pipeline keywords detected.");
  }

  if (
    /\b(video|youtube|tiktok|reel|shorts|davinci|da vinci|davinci resolve|da vinci resolve|thumbnail|timeline|b-roll|voice over|voiceover|video edit|video editing|render video|render a video|rendering a video)\b/.test(
      normalized
    )
  ) {
    match("video", "video-production", "Video production keywords detected.");
  }

  if (
    /\b(comfyui|comfy|workflow|nodes?|lora|checkpoint|sdxl|flux|seed|sampler)\b/.test(
      normalized
    )
  ) {
    match("comfyui", "comfyui", "ComfyUI workflow keywords detected.");
  }

  if (
    /\b(unreal|ue5|blueprint|nanite|lumen|metahuman|level sequence|cinematic)\b/.test(
      normalized
    )
  ) {
    match("unreal", "unreal", "Unreal production keywords detected.");
  }

  if (
    /\b(automation|agent|jarvis|desktop|browser|camera|webcam|voice|photoshop|blender|canvas|operator|multi-agent|multi agent|apply-diff|generate-diff|write-file|run-command|snapshot|checkpoint)\b/.test(
      normalized
    )
  ) {
    match("automation", "automation", "Automation/operator keywords detected.");
  }

  if (
    /\b(local models?|provider routing|providers?|caching|graph memory|brain architecture|offline-first|offline first|safe execution|local-first|local first)\b/.test(
      normalized
    )
  ) {
    match("automation", "brain-architecture", "Brain architecture/local runtime keywords detected.");
  }

  const briefing = uniqueStrings([
    ...(CAPABILITY_BRIEFINGS[domain] ?? CAPABILITY_BRIEFINGS.general),
  ]).slice(0, LIMITS.maxCapabilityBriefingLines);

  return {
    domain,
    tags: uniqueStrings(tags).slice(0, LIMITS.maxPlanListItems),
    briefing,
    matched: tags.length > 0,
    reasons: uniqueStrings(reasons).slice(0, LIMITS.maxPlanListItems),
  };
}

function buildCapabilityBriefingLines(routing: CapabilityRouting): string[] {
  const lines: string[] = [];

  lines.push(`Capability domain: ${routing.domain}.`);

  if (routing.tags.length > 0) {
    lines.push(`Capability tags: ${routing.tags.join(", ")}.`);
  }

  for (const reason of routing.reasons) {
    lines.push(`Capability match: ${reason}`);
  }

  for (const item of routing.briefing) {
    lines.push(`Capability rule: ${item}`);
  }

  return lines.slice(0, LIMITS.maxCapabilityBriefingLines);
}

function buildDoctrineLines(): string[] {
  return CODEXFORGE_DOCTRINE_LINES.slice(0, LIMITS.maxDoctrineLines).map(
    (line) => `CodexForge doctrine: ${line}`
  );
}

/* ================= GROUNDED DIAGNOSTICS ================= */

function buildGroundedDiagnostics(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext,
  graphDiagnostics: GraphDiagnostics
): GroundedDiagnostics {
  const recentUserText = messages
    .filter((message) => message.role === "user")
    .slice(-4)
    .map((message) => message.text)
    .join("\n");

  const fileIntent = extractFileIntentDiagnostics(recentUserText);
  const pathCandidates = fileIntent.requestedPaths;

  const repoCandidates = uniqueStrings([
    ...(context.activePlan?.files ?? []),
    ...pathCandidates,
    ...graphDiagnostics.repoPaths,
    ...(context.repoPath ? [context.repoPath] : []),
    ...(context.workspaceRoot ? [context.workspaceRoot] : []),
  ]);

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

  const rankedFiles = uniqueStrings([
    ...pathCandidates,
    ...matchingRepoFiles,
    ...repoCandidates,
  ])
    .sort(
      (a, b) =>
        scoreGroundedFileCandidate(b, pathCandidates) -
        scoreGroundedFileCandidate(a, pathCandidates)
    )
    .slice(0, LIMITS.maxGroundedFiles);

  const primaryFile = rankedFiles[0];
  const supportingFiles = rankedFiles
    .filter((filePath) => filePath !== primaryFile)
    .slice(0, LIMITS.maxGroundedFiles - 1);

  const fileSignals = primaryFile
    ? uniqueStrings([
        `Primary grounded file: ${primaryFile}`,
        `Primary role: ${inferFileRoleFromPath(primaryFile)}`,
        inferFileEditSuggestion(primaryFile),
        fileIntent.explicitFileRequest
          ? "Intent: explicit file inspection request; use safe repo tools before answering."
          : "",
        isLikelyRepoRootPath(primaryFile)
          ? "Warning signal: primary path appears to be a repo root, not a source file."
          : "",
        ...supportingFiles.slice(0, 3).map(
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

  if (primaryFile && isLikelyRepoRootPath(primaryFile)) {
    warnings.push("Primary grounded path appears to be a repo root rather than a source file.");
  }

  if (
    primaryFile &&
    normalizedRepoCandidates.length > 0 &&
    !normalizedRepoCandidates.includes(normalizePathForCompare(primaryFile) ?? "") &&
    pathCandidates.length === 0
  ) {
    warnings.push(
      "Primary grounded file came from indirect context rather than an explicit request."
    );
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
  groundedDiagnostics: GroundedDiagnostics,
  fileIntent: FileIntentDiagnostics
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

  if (fileIntent.explicitFileRequest && !groundedDiagnostics.primaryFile) {
    warnings.push("Explicit file request was detected but no primary grounded file was selected.");
  }

  warnings.push(...graphDiagnostics.warnings);
  warnings.push(...groundedDiagnostics.warnings);

  return uniqueStrings(warnings);
}

/* ================= BRAIN CONFIG ================= */

function buildBrainOptions(args?: { forceLocalEngine?: boolean }) {
  const envOllamaEnabled = parseBooleanEnv(
    process.env.CODEXFORGE_BRAIN_OLLAMA_ENABLED
  );

  const forceLocalEngine = args?.forceLocalEngine === true;
  const enableOllama = forceLocalEngine ? false : envOllamaEnabled;
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

function createRouteBrain(args?: { forceLocalEngine?: boolean }) {
  const options = buildBrainOptions(args);
  const selectionInfo = getCodexForgeBrainSelectionInfo(options);
  const serverDependencies = getCodexForgeServerEngineDependencies();
  const executableToolNames =
    serverDependencies.toolExecution.getExecutableToolNames();

  return {
    brain: createCodexForgeBrain(options, serverDependencies),
    selectionInfo,
    executableToolNames,
  };
}

/* ================= MODE ================= */

function resolveRouteMode(args: {
  commandIntent: BrainRouteMode | null;
  context: CodexForgeChatContext;
  graphDiagnostics: GraphDiagnostics;
  fileIntent: FileIntentDiagnostics;
  capabilityRouting: CapabilityRouting;
}): BrainRouteMode {
  if (args.commandIntent) {
    return args.commandIntent;
  }

  if (args.fileIntent.explicitFileRequest) {
    return "execution";
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
    args.capabilityRouting.domain === "debug" &&
    args.fileIntent.requestedPaths.length > 0
  ) {
    return "execution";
  }

  if (
    args.context.activePlan ||
    args.graphDiagnostics.hasTaskNode ||
    args.graphDiagnostics.hasPlanNode
  ) {
    return "planning";
  }

  if (args.capabilityRouting.matched && args.capabilityRouting.domain !== "general") {
    return "planning";
  }

  return "chat";
}

function mapRouteModeToChatMode(
  routeMode: BrainRouteMode,
  existingMode?: CodexForgeChatMode
): CodexForgeChatMode {
  if (existingMode) {
    return existingMode;
  }

  if (routeMode === "execution") {
    return "local-execution";
  }

  return "local";
}

function buildImplicitActivePlan(args: {
  latestUserText: string;
  context: CodexForgeChatContext;
  groundedDiagnostics: GroundedDiagnostics;
  fileIntent: FileIntentDiagnostics;
  capabilityRouting: CapabilityRouting;
  resolvedMode: BrainRouteMode;
}): CodexForgeChatContext["activePlan"] {
  if (args.context.activePlan) {
    return args.context.activePlan;
  }

  const primaryFile = args.groundedDiagnostics.primaryFile;

  if (args.fileIntent.explicitFileRequest && primaryFile) {
    return {
      goal: `Inspect ${primaryFile}`,
      steps: [
        `Read ${primaryFile} with safe repo tooling.`,
        "Identify the strongest concrete edit point.",
        "Return the edit point as the visible answer before generic planning.",
      ],
      files: uniqueStrings([
        primaryFile,
        ...args.groundedDiagnostics.supportingFiles.filter(
          (filePath) => !isLikelyRepoRootPath(filePath)
        ),
      ]),
      notes: uniqueStrings(args.groundedDiagnostics.fileSignals),
      tags: uniqueStrings(["grounded-inspection", ...args.capabilityRouting.tags]),
      status: "active",
      intent: "grounded-file-inspection",
      domain: "debug",
    };
  }

  if (
    args.resolvedMode === "planning" &&
    args.capabilityRouting.matched &&
    args.capabilityRouting.domain !== "general"
  ) {
    const goal = clampText(args.latestUserText, LIMITS.maxText);

    return {
      goal,
      steps: [
        "Clarify the concrete deliverable and success criteria.",
        "Map files, contracts, tools, approvals, and state boundaries.",
        "Return a phased implementation plan with the first concrete edit point.",
      ],
      notes: uniqueStrings([
        ...args.capabilityRouting.briefing,
        ...args.capabilityRouting.reasons,
      ]),
      tags: uniqueStrings(["codexforge", "structured-plan", ...args.capabilityRouting.tags]),
      status: "draft",
      intent: "capability-plan",
      domain: args.capabilityRouting.domain,
    };
  }

  return null;
}

function buildEnrichedContext(
  latestUserText: string,
  context: CodexForgeChatContext,
  graphDiagnostics: GraphDiagnostics,
  groundedDiagnostics: GroundedDiagnostics,
  resolvedMode: BrainRouteMode,
  fileIntent: FileIntentDiagnostics,
  capabilityRouting: CapabilityRouting
): CodexForgeChatContext {
  const briefingLines = buildGraphBriefingLines(graphDiagnostics);
  const doctrineLines = buildDoctrineLines();
  const capabilityLines = buildCapabilityBriefingLines(capabilityRouting);

  const inferredRepoPath =
    context.repoPath ??
    graphDiagnostics.repoPaths[0] ??
    context.workspaceRoot;

  const groundedLines =
    groundedDiagnostics.fileSignals.length > 0
      ? [
          "Grounded repo hints:",
          ...groundedDiagnostics.fileSignals.map((line) => `- ${line}`),
        ]
      : [];

  const safetyLines = [
    "Safety contract: read-only inspection is allowed through safe tools.",
    "Safety contract: file writes, diff application, shell commands, installs, deployments, desktop automation, camera/voice actions, and render jobs require explicit user approval.",
    fileIntent.explicitFileRequest
      ? "Execution instruction: this is an explicit file inspection request; use read-file/search-project/list-files before answering and do not merely suggest shell commands."
      : undefined,
    capabilityRouting.matched
      ? "Routing instruction: this is recognized CodexForge work; use structured local-engine behavior with tools/domain/steps populated instead of thin generic provider output."
      : undefined,
    groundedDiagnostics.primaryFile
      ? `Visible-answer instruction: lead with the grounded file ${groundedDiagnostics.primaryFile} and the strongest concrete edit point when answering inspection/debug prompts.`
      : undefined,
  ].filter((value): value is string => typeof value === "string" && value.length > 0);

  const implicitActivePlan = buildImplicitActivePlan({
    latestUserText,
    context,
    groundedDiagnostics,
    fileIntent,
    capabilityRouting,
    resolvedMode,
  });

  const mergedFiles = uniqueStrings([
    ...(groundedDiagnostics.primaryFile ? [groundedDiagnostics.primaryFile] : []),
    ...groundedDiagnostics.supportingFiles.filter(
      (filePath) => !isLikelyRepoRootPath(filePath)
    ),
    ...(implicitActivePlan?.files ?? []),
    ...(context.activePlan?.files ?? []),
  ]);

  const mergedNotes = uniqueStrings([
    ...(context.activePlan?.notes ?? []),
    ...(implicitActivePlan?.notes ?? []),
    ...groundedDiagnostics.fileSignals,
    ...capabilityRouting.briefing,
    ...capabilityRouting.reasons,
  ]);

  const mergedTags = uniqueStrings([
    ...(context.activePlan?.tags ?? []),
    ...(implicitActivePlan?.tags ?? []),
    ...capabilityRouting.tags,
  ]);

  const systemGuideParts = [
    context.systemGuide,
    "",
    ...doctrineLines,
    "",
    ...capabilityLines,
    briefingLines.length > 0 ? "" : undefined,
    ...briefingLines,
    groundedLines.length > 0 ? "" : undefined,
    ...groundedLines,
    "",
    ...safetyLines,
  ].filter(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0
  );

  const activePlan = implicitActivePlan
    ? {
        ...implicitActivePlan,
        ...(mergedFiles.length > 0 ? { files: mergedFiles } : {}),
        ...(mergedNotes.length > 0 ? { notes: mergedNotes } : {}),
        ...(mergedTags.length > 0 ? { tags: mergedTags } : {}),
      }
    : null;

  return {
    ...context,
    ...(inferredRepoPath ? { repoPath: inferredRepoPath } : {}),
    mode: mapRouteModeToChatMode(resolvedMode, context.mode),
    systemGuide:
      systemGuideParts.length > 0
        ? clampText(systemGuideParts.join("\n"), LIMITS.maxSystemGuide)
        : context.systemGuide,
    activePlan: context.activePlan
      ? {
          ...context.activePlan,
          ...(mergedFiles.length > 0 ? { files: mergedFiles } : {}),
          ...(mergedNotes.length > 0 ? { notes: mergedNotes } : {}),
          ...(mergedTags.length > 0 ? { tags: mergedTags } : {}),
          ...(capabilityRouting.domain ? { domain: capabilityRouting.domain } : {}),
        }
      : activePlan,
    codexforgeCapabilities: {
      ...(context.codexforgeCapabilities ?? {}),
      structuredReplies: true,
      memory: true,
      repoAwarePlanning: true,
      localExecution: true,
      diffPreviews: true,
      snapshots: true,
      approvals: true,
      brainGraph: true,
      domains: uniqueStrings([
        ...(context.codexforgeCapabilities?.domains ?? []),
        capabilityRouting.domain,
      ]).filter(
        (domain): domain is CodexForgePlanDomain =>
          VALID_PLAN_DOMAINS.includes(domain as CodexForgePlanDomain)
      ),
    },
  };
}

/* ================= PROVIDER ROUTING ================= */

function shouldForceLocalEngine(args: {
  resolvedMode: BrainRouteMode;
  fileIntent: FileIntentDiagnostics;
  capabilityRouting: CapabilityRouting;
  enrichedContext: CodexForgeChatContext;
}): LocalEngineRoutingDecision {
  if (args.resolvedMode === "execution") {
    return {
      forceLocalEngine: true,
      reason: "execution-route-mode",
    };
  }

  if (args.fileIntent.explicitFileRequest) {
    return {
      forceLocalEngine: true,
      reason: "explicit-file-inspection",
    };
  }

  if (args.enrichedContext.executionRequest?.mode === "execute-task-step") {
    return {
      forceLocalEngine: true,
      reason: "execute-task-step",
    };
  }

  if (args.resolvedMode === "planning") {
    return {
      forceLocalEngine: true,
      reason: "structured-planning-mode",
    };
  }

  if (args.capabilityRouting.matched) {
    return {
      forceLocalEngine: true,
      reason: "recognized-codexforge-capability",
    };
  }

  if (args.capabilityRouting.domain !== "general") {
    return {
      forceLocalEngine: true,
      reason: "non-general-domain",
    };
  }

  return {
    forceLocalEngine: false,
    reason: "generic-chat-provider-allowed",
  };
}

function preferNonGeneralDomain(
  ...domains: Array<CodexForgePlanDomain | undefined>
): CodexForgePlanDomain {
  for (const domain of domains) {
    if (domain && domain !== "general") return domain;
  }

  return domains.find((domain): domain is CodexForgePlanDomain => !!domain) ?? "general";
}

function resolveResponseDomain(args: {
  fileIntent: FileIntentDiagnostics;
  responseDomain?: CodexForgePlanDomain;
  structuredDomain?: CodexForgePlanDomain;
  structuredPlanDomain?: CodexForgePlanDomain;
  activePlanDomain?: CodexForgePlanDomain;
  capabilityDomain: CodexForgePlanDomain;
}): CodexForgePlanDomain {
  if (args.fileIntent.explicitFileRequest) return "debug";

  return preferNonGeneralDomain(
    args.responseDomain,
    args.structuredDomain,
    args.structuredPlanDomain,
    args.activePlanDomain,
    args.capabilityDomain,
    "general"
  );
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
    const fileIntent = extractFileIntentDiagnostics(lastUser.text);
    const capabilityRouting = detectCapabilityRouting(lastUser.text, context);

    const groundedDiagnostics = buildGroundedDiagnostics(
      messages,
      context,
      graphDiagnostics
    );

    const resolvedMode = resolveRouteMode({
      commandIntent,
      context,
      graphDiagnostics,
      fileIntent,
      capabilityRouting,
    });

    const enrichedContext = buildEnrichedContext(
      lastUser.text,
      context,
      graphDiagnostics,
      groundedDiagnostics,
      resolvedMode,
      fileIntent,
      capabilityRouting
    );

    const warnings = buildWarnings(
      messages,
      enrichedContext,
      graphDiagnostics,
      groundedDiagnostics,
      fileIntent
    );

    const localEngineDecision = shouldForceLocalEngine({
      resolvedMode,
      fileIntent,
      capabilityRouting,
      enrichedContext,
    });

    const forceLocalEngine = localEngineDecision.forceLocalEngine;

    const { brain, selectionInfo, executableToolNames } = createRouteBrain({
      forceLocalEngine,
    });

    console.log("[codexforge/chat] request", {
      messageCount: messages.length,
      commandIntent,
      resolvedMode,
      forceLocalEngine,
      forceLocalReason: localEngineDecision.reason,
      preferredProvider: selectionInfo.selectedProvider,
      resolvedProvider: selectionInfo.resolvedProvider,
      usedFallback: selectionInfo.usedFallback,
      hasRepoPath: !!enrichedContext.repoPath,
      repoPath: enrichedContext.repoPath ?? null,
      hasSystemGuide: !!enrichedContext.systemGuide,
      systemGuideLength: enrichedContext.systemGuide?.length ?? 0,
      activePlanSteps: enrichedContext.activePlan?.steps.length ?? 0,
      activePlanFiles: enrichedContext.activePlan?.files?.length ?? 0,
      activePlanNotes: enrichedContext.activePlan?.notes?.length ?? 0,
      activePlanDomain: enrichedContext.activePlan?.domain ?? null,
      activePlanIntent: enrichedContext.activePlan?.intent ?? null,
      memoryCount: enrichedContext.memory?.length ?? 0,
      graphNodeCount: graphDiagnostics.nodeCount,
      graphEdgeCount: graphDiagnostics.edgeCount,
      graphFocusNodeCount: graphDiagnostics.focusNodeCount,
      graphFocusKinds: graphDiagnostics.focusKinds,
      graphWarnings: graphDiagnostics.warnings,
      fileExplicitRequest: fileIntent.explicitFileRequest,
      fileRequestedPaths: fileIntent.requestedPaths,
      fileRequestedVerbs: fileIntent.requestedVerbs,
      capabilityDomain: capabilityRouting.domain,
      capabilityTags: capabilityRouting.tags,
      capabilityMatched: capabilityRouting.matched,
      capabilityReasons: capabilityRouting.reasons,
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
        forceLocalEngine,
        forceLocalReason: localEngineDecision.reason,
        fileExplicitRequest: fileIntent.explicitFileRequest,
        fileRequestedPaths: fileIntent.requestedPaths,
        capabilityDomain: capabilityRouting.domain,
        groundedPrimaryFile: groundedDiagnostics.primaryFile ?? null,
        groundedSupportingFileCount: groundedDiagnostics.supportingFiles.length,
        executableToolCount: executableToolNames.length,
      });

      return badRequest(`[${outcome.provider}] ${outcome.error}`, 500);
    }

    const response = outcome.response;

    const resolvedChatMode =
      resolvedMode === "execution" || fileIntent.explicitFileRequest
        ? "local-execution"
        : asChatMode(response.meta.mode) ??
          enrichedContext.mode ??
          mapRouteModeToChatMode(resolvedMode);

    const resolvedDomain = resolveResponseDomain({
      fileIntent,
      responseDomain: response.meta.domain,
      structuredDomain: response.structured?.domain,
      structuredPlanDomain: response.structured?.plan?.domain,
      activePlanDomain: enrichedContext.activePlan?.domain,
      capabilityDomain: capabilityRouting.domain,
    });

    const resolvedIntent =
      commandIntent ??
      (fileIntent.explicitFileRequest ? "grounded-file-inspection" : undefined) ??
      response.intent;

    const meta = toCodexForgeChatMeta(response, {
      projectName: enrichedContext.projectName || "CodexForge",
      generatedPlan:
        !!response.structured?.plan ||
        !!enrichedContext.activePlan ||
        resolvedMode === "planning",
      executionMode:
        enrichedContext.executionRequest?.mode === "execute-task-step" ||
        resolvedMode === "execution" ||
        fileIntent.explicitFileRequest,
      domain: resolvedDomain,
      mode: resolvedChatMode,
      intent: resolvedIntent,
      usedFallback: response.meta.usedFallback || selectionInfo.usedFallback,
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
      resolvedChatMode,
      resolvedMode,
      forceLocalEngine,
      forceLocalReason: localEngineDecision.reason,
      intent: response.intent,
      resolvedIntent,
      domain: meta.domain,
      resolvedDomain,
      warningCount: mergedWarnings.length,
      durationMs: response.meta.durationMs ?? 0,
      graphUsed: graphDiagnostics.hasGraph && graphDiagnostics.nodeCount > 0,
      graphBriefingCount: graphDiagnostics.graphBriefing.length,
      fileExplicitRequest: fileIntent.explicitFileRequest,
      fileRequestedPathCount: fileIntent.requestedPaths.length,
      capabilityDomain: capabilityRouting.domain,
      capabilityTags: capabilityRouting.tags,
      capabilityMatched: capabilityRouting.matched,
      groundedPrimaryFile: groundedDiagnostics.primaryFile ?? null,
      groundedSupportingFileCount: groundedDiagnostics.supportingFiles.length,
      groundedSignalCount: groundedDiagnostics.fileSignals.length,
      executableToolCount: executableToolNames.length,
      generatedPlan: !!response.structured?.plan || !!enrichedContext.activePlan,
      hasStructured: !!response.structured,
      replyLength: response.text.length,
    });

    return NextResponse.json<CodexForgeChatResponse>(successResponse, {
      headers: buildJsonHeaders({
        "x-codexforge-model": successResponse.meta?.model ?? MODEL_NAME,
        "x-codexforge-intent": successResponse.meta?.intent ?? "unknown",
        "x-codexforge-command": commandIntent ?? "none",
        "x-codexforge-mode": resolvedMode,
        "x-codexforge-force-local-engine": boolHeader(forceLocalEngine),
        "x-codexforge-force-local-reason": clampText(
          localEngineDecision.reason,
          LIMITS.maxDebugHeaderText
        ),
        "x-codexforge-chat-mode": resolvedChatMode,
        "x-codexforge-warning-count": String(mergedWarnings.length),
        "x-codexforge-domain": successResponse.meta?.domain ?? "general",
        "x-codexforge-capability-domain": capabilityRouting.domain,
        "x-codexforge-capability-matched": boolHeader(capabilityRouting.matched),
        "x-codexforge-capability-tags": capabilityRouting.tags.join(","),
        "x-codexforge-generated-plan": boolHeader(
          successResponse.meta?.generatedPlan === true
        ),
        "x-codexforge-execution-mode": boolHeader(
          successResponse.meta?.executionMode === true
        ),
        "x-codexforge-provider": response.meta.provider,
        "x-codexforge-provider-selected": selectionInfo.selectedProvider,
        "x-codexforge-provider-resolved": selectionInfo.resolvedProvider,
        "x-codexforge-provider-fallback": boolHeader(selectionInfo.usedFallback),
        "x-codexforge-duration-ms":
          typeof response.meta.durationMs === "number"
            ? String(response.meta.durationMs)
            : "0",
        "x-codexforge-repo-path": enrichedContext.repoPath ?? "none",
        "x-codexforge-has-repo-path": boolHeader(!!enrichedContext.repoPath),
        "x-codexforge-graph-used": boolHeader(
          graphDiagnostics.hasGraph && graphDiagnostics.nodeCount > 0
        ),
        "x-codexforge-graph-nodes": String(graphDiagnostics.nodeCount),
        "x-codexforge-graph-edges": String(graphDiagnostics.edgeCount),
        "x-codexforge-graph-focus-count": String(graphDiagnostics.focusNodeCount),
        "x-codexforge-graph-has-task": boolHeader(graphDiagnostics.hasTaskNode),
        "x-codexforge-graph-has-plan": boolHeader(graphDiagnostics.hasPlanNode),
        "x-codexforge-graph-has-run": boolHeader(graphDiagnostics.hasRunNode),
        "x-codexforge-file-explicit-request": boolHeader(fileIntent.explicitFileRequest),
        "x-codexforge-file-requested-paths": String(fileIntent.requestedPaths.length),
        "x-codexforge-file-requested-verbs": fileIntent.requestedVerbs.join(","),
        "x-codexforge-grounded-primary-file":
          groundedDiagnostics.primaryFile ?? "none",
        "x-codexforge-grounded-supporting-files": String(
          groundedDiagnostics.supportingFiles.length
        ),
        "x-codexforge-grounded-signal-count": String(
          groundedDiagnostics.fileSignals.length
        ),
        "x-codexforge-tools-executable-count": String(executableToolNames.length),
        "x-codexforge-tools-executable-names": executableToolNames.join(","),
        "x-codexforge-tools-execute-route": "/api/codexforge/tools/execute",
        "x-codexforge-approval-required-for":
          "write-file,apply-diff,run-command,install,deploy,desktop,camera,voice,render",
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

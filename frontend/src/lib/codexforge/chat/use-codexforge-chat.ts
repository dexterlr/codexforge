"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildClientFallbackFromEngine } from "@/lib/codexforge/chat/client-fallback";
import {
  asMessages,
  normalizeStructuredReply,
} from "@/lib/codexforge/chat/client-normalize";
import {
  buildRequestBrainGraphContextPayload,
  persistCodexForgeBrainGraph,
} from "@/lib/codexforge/brain/sync";
import type {
  CodexForgeChatContext,
  CodexForgeChatErrorResponse,
  CodexForgeChatSuccessResponse,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

/* ================= TYPES ================= */

type Msg = CodexForgeMessage;
type BackendReply = CodexForgeChatSuccessResponse;
type BackendError = CodexForgeChatErrorResponse;
type BackendMode = "api" | "local-fallback";
type TaskStepStatus = "pending" | "running" | "done" | "error";

type RequestAssistantResult = {
  message: Msg;
  mode: BackendMode;
  okStatus: StatusText;
  executedStatus: StatusText;
};

export type CodexForgeTaskDomain = CodexForgePlanDomain;

export type CodexForgeTaskStep = {
  id: string;
  text: string;
  status: TaskStepStatus;
  result?: string;
  lastRunAt?: number;
};

export type CodexForgeActiveTask = {
  id: string;
  goal: string;
  steps: CodexForgeTaskStep[];
  currentStep: number;
  sourceMessageId: string;
  createdAt: number;
  updatedAt: number;
  domain: CodexForgeTaskDomain;
  tags: string[];
};

export type CodexForgeMemoryType = "fact" | "decision" | "task" | "note";

export type CodexForgeMemoryItem = {
  id: string;
  type: CodexForgeMemoryType;
  content: string;
  importance: number;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
  sourceMessageId?: string;
};

export type CodexForgeEngineSnapshot = {
  fileCount: number;
  sampledPaths: string[];
};

export type CodexForgeEnginePlan = {
  steps: Array<{
    id: string;
    description: string;
  }>;
};

export type CodexForgeEngineDiff = {
  filePath: string;
  patch: string;
};

export type CodexForgeEngineState = {
  phase: CodexForgeExecutionPhase;
  goal: {
    goal: string;
    repoPath: string;
  } | null;
  plan: CodexForgeEnginePlan | null;
  diffs: CodexForgeEngineDiff[];
  logs: string[];
  snapshot?: CodexForgeEngineSnapshot;
  testOutput?: string;
  error?: string;
};

export type CodexForgeExecutionState = {
  running: boolean;
  stepIndex: number | null;
  taskId: string | null;
  startedAt: number | null;
  lastCompletedAt: number | null;
  lastResultMessageId: string | null;
  lastRunLabel: string;
  engineState: CodexForgeEngineState | null;
};

type ExecutionRequest = {
  taskId: string;
  taskGoal: string;
  stepIndex: number;
  stepText: string;
  mode: "execute-task-step";
};

type SendOptions = {
  text?: string;
  executionRequest?: ExecutionRequest;
};

type EngineRouteAction =
  | "start"
  | "approvePlan"
  | "rejectPlan"
  | "approveDiffs"
  | "rejectDiffs"
  | "reset";

type UseCodexForgeChatArgs = {
  systemGuide: string;
  defaultContext: CodexForgeChatContext;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
};

/* ================= PRODUCT ================= */

const PRODUCT_NAME = "CodexForge";

const PRODUCT_DIRECTION_LINES = [
  `${PRODUCT_NAME} is the only product identity in this workspace.`,
  "This workspace is the main CodexForge environment for planning, execution, research, memory, and repo-aware work.",
  "Prefer grounded implementation context, structured replies, safe execution checkpoints, and local-first continuity.",
] as const;

/* ================= STATUS ================= */

const STATUS = {
  READY: "Ready",
  THINKING: "Thinking",
  API: "Ready â€¢ API connected",
  FALLBACK: "Ready â€¢ local fallback",
  ENGINE: "Ready â€¢ local engine fallback",
  EXECUTING: "Executing task step",
  EXECUTED_API: "Ready â€¢ step executed via API",
  EXECUTED_FALLBACK: "Ready â€¢ step executed locally",
  APPROVED_PLAN: "Ready â€¢ plan approved",
  REJECTED_PLAN: "Ready â€¢ plan rejected",
  APPROVED_DIFFS: "Ready â€¢ diffs approved",
  REJECTED_DIFFS: "Ready â€¢ diffs rejected",
  RESET_ENGINE: "Ready â€¢ engine reset",
} as const;

type StatusText = (typeof STATUS)[keyof typeof STATUS];

/* ================= STORAGE ================= */

const STORAGE = {
  messages: "codexforge_ai_chat_v12",
  draft: "codexforge_ai_draft_v11",
  task: "codexforge_ai_active_task_v13",
  memory: "codexforge_ai_memory_v8",
  execution: "codexforge_ai_execution_v9",
} as const;

/* ================= LIMITS ================= */

const MAX_MEMORY_ITEMS = 200;
const MAX_MEMORY_INJECTION_ITEMS = 8;
const MAX_MESSAGES = 300;
const MAX_REQUEST_MESSAGES = 80;
const MAX_ENGINE_LOG_LINES = 5;
const MAX_ENGINE_SAMPLE_PATHS = 6;
const MAX_ENGINE_DIFF_PREVIEW = 3;
const CHAT_REQUEST_TIMEOUT_MS = 90_000;

/* ================= DOMAIN ================= */

const ALL_TASK_DOMAINS: CodexForgeTaskDomain[] = [
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
];

/* ================= EXECUTION PHASE ================= */

const VALID_ENGINE_PHASES: readonly CodexForgeExecutionPhase[] = [
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

/* ================= UTILS ================= */

const uid = () =>
  `${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;

const now = () => Date.now();

function clamp(index: number, length: number): number {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    if (value == null) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

function normalizeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeImportance(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0.5;
  return Math.min(Math.max(value, 0), 1);
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean))
  );
}

function toLowerJoined(values: Array<string | null | undefined>): string {
  return values
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    )
    .join(" ")
    .toLowerCase();
}

function normalizeDomain(value: unknown): CodexForgeTaskDomain | null {
  return typeof value === "string" &&
    ALL_TASK_DOMAINS.includes(value as CodexForgeTaskDomain)
    ? (value as CodexForgeTaskDomain)
    : null;
}

function normalizeEnginePhase(value: unknown): CodexForgeExecutionPhase {
  return typeof value === "string" &&
    VALID_ENGINE_PHASES.includes(value as CodexForgeExecutionPhase)
    ? (value as CodexForgeExecutionPhase)
    : "idle";
}

function getLastAssistant(messages: Msg[]): Msg | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "assistant") {
      return messages[index];
    }
  }

  return null;
}

function buildRequestMessages(messages: Msg[]) {
  return messages.slice(-MAX_REQUEST_MESSAGES).map((message) => ({
    id: message.id,
    role: message.role === "system" ? "user" : message.role,
    text: message.text,
    ts: message.ts,
  }));
}

function getEnginePhaseLabel(engineState: CodexForgeEngineState | null) {
  return engineState?.phase ?? "idle";
}

function summarizeEngineState(engineState: CodexForgeEngineState | null): string {
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

  return parts.join(" â€¢ ");
}

function summarizeDiffTargets(diffs: CodexForgeEngineDiff[]): string[] {
  if (diffs.length === 0) return [];
  return diffs
    .slice(0, MAX_ENGINE_DIFF_PREVIEW)
    .map((diff) => diff.filePath)
    .filter(Boolean);
}

function createTimeoutController(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId),
  };
}

function buildFallbackSuffix(
  fallbackSuffix?: string,
  reason?: string
): string | null {
  const parts = [fallbackSuffix, reason].filter(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0
  );

  return parts.length > 0 ? parts.join("\n\n") : null;
}

function resolveExecutionRepoPath(defaultContext: CodexForgeChatContext): string {
  const repoPath =
    typeof defaultContext.repoPath === "string"
      ? defaultContext.repoPath.trim()
      : "";

  return repoPath;
}

/* ================= DOMAIN DETECTION ================= */

function detectTaskDomainFromText(text: string): CodexForgeTaskDomain {
  const query = text.toLowerCase();

  if (
    query.includes("minecraft") ||
    query.includes("server") ||
    query.includes("plugin") ||
    query.includes("modpack") ||
    query.includes("paper") ||
    query.includes("fabric") ||
    query.includes("spigot") ||
    query.includes("bukkit")
  ) {
    return "game-server";
  }

  if (
    query.includes("movie") ||
    query.includes("film") ||
    query.includes("cinematic") ||
    query.includes("screenplay") ||
    query.includes("storyboard")
  ) {
    return "movie";
  }

  if (
    query.includes("video") ||
    query.includes("shot list") ||
    query.includes("voiceover") ||
    query.includes("render pipeline") ||
    query.includes("text to video") ||
    query.includes("trailer")
  ) {
    return "video";
  }

  if (
    query.includes("comfy") ||
    query.includes("comfyui") ||
    query.includes("nodes") ||
    query.includes("workflow graph") ||
    query.includes("ksampler")
  ) {
    return "comfyui";
  }

  if (
    query.includes("unreal") ||
    query.includes("blueprint") ||
    query.includes("ue5") ||
    query.includes("sequencer") ||
    query.includes("uasset")
  ) {
    return "unreal";
  }

  if (
    query.includes("website") ||
    query.includes("landing page") ||
    query.includes("frontend") ||
    query.includes("react") ||
    query.includes("next.js") ||
    query.includes("nextjs") ||
    query.includes("dashboard") ||
    query.includes("web app")
  ) {
    return "web";
  }

  if (
    query.includes("research") ||
    query.includes("investigate") ||
    query.includes("compare") ||
    query.includes("evaluate") ||
    query.includes("benchmark")
  ) {
    return "research";
  }

  if (
    query.includes("bug") ||
    query.includes("error") ||
    query.includes("fix") ||
    query.includes("broken") ||
    query.includes("crash") ||
    query.includes("failing")
  ) {
    return "debug";
  }

  if (
    query.includes("automation") ||
    query.includes("pipeline") ||
    query.includes("workflow") ||
    query.includes("orchestrate") ||
    query.includes("agent")
  ) {
    return "automation";
  }

  return "general";
}

function extractTaskTags(goal: string, domain: CodexForgeTaskDomain): string[] {
  const tags = new Set<string>();
  const text = goal.toLowerCase();

  tags.add(domain);

  if (text.includes("minecraft")) tags.add("minecraft");
  if (text.includes("christmas")) tags.add("christmas");
  if (text.includes("movie")) tags.add("movie");
  if (text.includes("video")) tags.add("video");
  if (text.includes("script")) tags.add("script");
  if (text.includes("website")) tags.add("website");
  if (text.includes("server")) tags.add("server");
  if (text.includes("unreal")) tags.add("unreal");
  if (text.includes("comfy")) tags.add("comfyui");
  if (text.includes("research")) tags.add("research");
  if (text.includes("automation")) tags.add("automation");
  if (text.includes("pipeline")) tags.add("pipeline");
  if (text.includes("meeting")) tags.add("meeting");
  if (text.includes("zoom")) tags.add("zoom");
  if (text.includes("notes")) tags.add("notes");
  if (text.includes("offline")) tags.add("offline");
  if (text.includes("local")) tags.add("local-first");

  return Array.from(tags);
}

/* ================= NORMALIZERS ================= */

function normalizeEngineState(raw: unknown): CodexForgeEngineState | null {
  if (!isRecord(raw)) return null;

  const goal = isRecord(raw.goal)
    ? {
        goal: typeof raw.goal.goal === "string" ? raw.goal.goal : "",
        repoPath: typeof raw.goal.repoPath === "string" ? raw.goal.repoPath : "",
      }
    : null;

  const plan = isRecord(raw.plan)
    ? {
        steps: Array.isArray(raw.plan.steps)
          ? raw.plan.steps
              .filter(isRecord)
              .map((step) => ({
                id: typeof step.id === "string" ? step.id : uid(),
                description:
                  typeof step.description === "string" ? step.description : "",
              }))
              .filter((step) => step.description.length > 0)
          : [],
      }
    : null;

  const diffs = Array.isArray(raw.diffs)
    ? raw.diffs
        .filter(isRecord)
        .map((diff) => ({
          filePath: typeof diff.filePath === "string" ? diff.filePath : "",
          patch: typeof diff.patch === "string" ? diff.patch : "",
        }))
        .filter((diff) => diff.filePath.length > 0)
    : [];

  const snapshot = isRecord(raw.snapshot)
    ? {
        fileCount:
          typeof raw.snapshot.fileCount === "number" &&
          Number.isFinite(raw.snapshot.fileCount)
            ? raw.snapshot.fileCount
            : 0,
        sampledPaths: normalizeStringArray(raw.snapshot.sampledPaths),
      }
    : undefined;

  return {
    phase: normalizeEnginePhase(raw.phase),
    goal:
      goal && (goal.goal.length > 0 || goal.repoPath.length > 0) ? goal : null,
    plan,
    diffs,
    logs: normalizeStringArray(raw.logs),
    snapshot,
    testOutput: typeof raw.testOutput === "string" ? raw.testOutput : undefined,
    error: typeof raw.error === "string" ? raw.error : undefined,
  };
}

function normalizeExecutionState(
  raw: unknown
): CodexForgeExecutionState | null {
  if (!isRecord(raw)) return null;

  return {
    running: raw.running === true,
    stepIndex:
      typeof raw.stepIndex === "number" && Number.isFinite(raw.stepIndex)
        ? raw.stepIndex
        : null,
    taskId:
      typeof raw.taskId === "string" && raw.taskId.trim()
        ? raw.taskId.trim()
        : null,
    startedAt:
      typeof raw.startedAt === "number" && Number.isFinite(raw.startedAt)
        ? raw.startedAt
        : null,
    lastCompletedAt:
      typeof raw.lastCompletedAt === "number" &&
      Number.isFinite(raw.lastCompletedAt)
        ? raw.lastCompletedAt
        : null,
    lastResultMessageId:
      typeof raw.lastResultMessageId === "string" &&
      raw.lastResultMessageId.trim()
        ? raw.lastResultMessageId.trim()
        : null,
    lastRunLabel: typeof raw.lastRunLabel === "string" ? raw.lastRunLabel : "",
    engineState: normalizeEngineState(raw.engineState),
  };
}

function normalizeTaskStep(raw: unknown): CodexForgeTaskStep | null {
  if (typeof raw === "string") {
    const text = normalizeText(raw);
    if (!text) return null;

    return {
      id: uid(),
      text,
      status: "pending",
    };
  }

  if (!isRecord(raw)) return null;

  const text = normalizeText(raw.text);
  if (!text) return null;

  const status = raw.status;
  const normalizedStatus: TaskStepStatus =
    status === "running" ||
    status === "done" ||
    status === "error" ||
    status === "pending"
      ? status
      : "pending";

  return {
    id: typeof raw.id === "string" && raw.id.trim() ? raw.id : uid(),
    text,
    status: normalizedStatus,
    result: typeof raw.result === "string" ? raw.result : undefined,
    lastRunAt:
      typeof raw.lastRunAt === "number" && Number.isFinite(raw.lastRunAt)
        ? raw.lastRunAt
        : undefined,
  };
}

function normalizeTask(raw: unknown): CodexForgeActiveTask | null {
  if (!isRecord(raw)) return null;

  const goal = normalizeText(raw.goal);
  if (!goal) return null;

  const steps = Array.isArray(raw.steps)
    ? raw.steps
        .map(normalizeTaskStep)
        .filter((step): step is CodexForgeTaskStep => step !== null)
    : [];

  if (steps.length === 0) return null;

  const currentStep =
    typeof raw.currentStep === "number" && Number.isFinite(raw.currentStep)
      ? clamp(raw.currentStep, steps.length)
      : 0;

  const domain = normalizeDomain(raw.domain) ?? "general";
  const tags =
    Array.isArray(raw.tags) && raw.tags.length > 0
      ? dedupeStrings(
          raw.tags.filter((item): item is string => typeof item === "string")
        )
      : extractTaskTags(goal, domain);

  return {
    id: typeof raw.id === "string" && raw.id.trim() ? raw.id : uid(),
    goal,
    steps,
    currentStep,
    sourceMessageId:
      typeof raw.sourceMessageId === "string" ? raw.sourceMessageId : "",
    createdAt:
      typeof raw.createdAt === "number" && Number.isFinite(raw.createdAt)
        ? raw.createdAt
        : now(),
    updatedAt:
      typeof raw.updatedAt === "number" && Number.isFinite(raw.updatedAt)
        ? raw.updatedAt
        : now(),
    domain,
    tags,
  };
}

function createIdleExecutionState(): CodexForgeExecutionState {
  return {
    running: false,
    stepIndex: null,
    taskId: null,
    startedAt: null,
    lastCompletedAt: null,
    lastResultMessageId: null,
    lastRunLabel: "",
    engineState: null,
  };
}

/* ================= MEMORY ================= */

function normalizeMemoryItem(raw: unknown): CodexForgeMemoryItem | null {
  if (!isRecord(raw)) return null;

  const id = normalizeText(raw.id);
  const type = raw.type;
  const content = normalizeText(raw.content);

  if (
    !id ||
    !content ||
    (type !== "fact" &&
      type !== "decision" &&
      type !== "task" &&
      type !== "note")
  ) {
    return null;
  }

  return {
    id,
    type,
    content,
    importance: normalizeImportance(raw.importance),
    createdAt:
      typeof raw.createdAt === "number" && Number.isFinite(raw.createdAt)
        ? raw.createdAt
        : now(),
    updatedAt:
      typeof raw.updatedAt === "number" && Number.isFinite(raw.updatedAt)
        ? raw.updatedAt
        : now(),
    pinned: raw.pinned === true,
    sourceMessageId:
      typeof raw.sourceMessageId === "string" && raw.sourceMessageId.trim()
        ? raw.sourceMessageId.trim()
        : undefined,
  };
}

function normalizeMemory(items: unknown): CodexForgeMemoryItem[] {
  if (!Array.isArray(items)) return [];

  const normalized = items
    .map(normalizeMemoryItem)
    .filter((item): item is CodexForgeMemoryItem => item !== null);

  const seen = new Set<string>();
  const deduped: CodexForgeMemoryItem[] = [];

  for (const item of normalized) {
    const key = `${item.type}:${item.content.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (a.importance !== b.importance) return b.importance - a.importance;
      return b.updatedAt - a.updatedAt;
    })
    .slice(0, MAX_MEMORY_ITEMS);
}

function mergeMemory(
  current: CodexForgeMemoryItem[],
  incoming: CodexForgeMemoryItem[]
): CodexForgeMemoryItem[] {
  if (incoming.length === 0) return current;

  const merged = [...current];

  for (const next of incoming) {
    const existingIndex = merged.findIndex(
      (item) =>
        item.type === next.type &&
        item.content.toLowerCase() === next.content.toLowerCase()
    );

    if (existingIndex === -1) {
      merged.push(next);
      continue;
    }

    const existing = merged[existingIndex];
    merged[existingIndex] = {
      ...existing,
      importance: Math.max(existing.importance, next.importance),
      updatedAt: now(),
      pinned: existing.pinned,
      sourceMessageId: existing.sourceMessageId ?? next.sourceMessageId,
    };
  }

  return normalizeMemory(merged);
}

function extractMemory(
  structured: CodexForgeStructuredReply | null,
  sourceMessageId: string
): CodexForgeMemoryItem[] {
  if (!structured) return [];

  const items: CodexForgeMemoryItem[] = [];

  const canonicalGoal = normalizeText(structured.plan?.goal ?? structured.goal);
  if (canonicalGoal) {
    items.push({
      id: uid(),
      type: "task",
      content: canonicalGoal,
      importance: 0.95,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  for (const contextItem of structured.context ?? []) {
    const content = normalizeText(contextItem);
    if (!content) continue;

    items.push({
      id: uid(),
      type: "fact",
      content,
      importance: 0.65,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  for (const risk of structured.risks ?? structured.plan?.risks ?? []) {
    const content = normalizeText(risk);
    if (!content) continue;

    items.push({
      id: uid(),
      type: "decision",
      content,
      importance: 0.75,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  const nextAction = normalizeText(structured.plan?.nextAction);
  if (nextAction) {
    items.push({
      id: uid(),
      type: "note",
      content: `Next action: ${nextAction}`,
      importance: 0.72,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  const executionSummary = normalizeText(structured.execution?.resultSummary);
  if (executionSummary) {
    items.push({
      id: uid(),
      type: "note",
      content: `Execution result: ${executionSummary}`,
      importance: 0.7,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  const executionPhase = normalizeText(structured.execution?.phase);
  if (executionPhase) {
    items.push({
      id: uid(),
      type: "note",
      content: `Execution phase: ${executionPhase}`,
      importance: 0.66,
      createdAt: now(),
      updatedAt: now(),
      pinned: false,
      sourceMessageId,
    });
  }

  return normalizeMemory(items);
}

function selectRelevantMemory(memory: CodexForgeMemoryItem[]) {
  return [...memory]
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (a.importance !== b.importance) return b.importance - a.importance;
      return b.updatedAt - a.updatedAt;
    })
    .slice(0, MAX_MEMORY_INJECTION_ITEMS);
}

/* ================= TASK ================= */

function buildTaskStepsFromStrings(values: string[]) {
  return dedupeStrings(values).map((text) => ({
    id: uid(),
    text,
    status: "pending" as const,
  }));
}

function detectTaskDomainFromStructured(
  structured: CodexForgeStructuredReply | null | undefined
): CodexForgeTaskDomain {
  const directDomain = normalizeDomain(
    structured?.plan?.domain ?? structured?.domain
  );

  if (directDomain) {
    return directDomain;
  }

  const combined = toLowerJoined([
    structured?.title,
    structured?.summary,
    structured?.goal,
    structured?.plan?.goal,
    ...(structured?.files ?? []),
    ...(structured?.commands ?? []),
    ...(structured?.nextSteps ?? []),
    ...(structured?.context ?? []),
    ...(structured?.tags ?? []),
    ...(structured?.plan?.tags ?? []),
    ...(structured?.sections?.flatMap((section) => section.items ?? []) ?? []),
  ]);

  return detectTaskDomainFromText(combined);
}

function buildTaskFromStructured(
  structured: CodexForgeStructuredReply | null | undefined,
  sourceMessageId: string
): CodexForgeActiveTask | null {
  if (!structured) return null;

  const planGoal = normalizeText(structured.plan?.goal);
  const planSteps = buildTaskStepsFromStrings(structured.plan?.steps ?? []);

  if (planGoal && planSteps.length > 0) {
    const domain = detectTaskDomainFromStructured(structured);
    const tags = dedupeStrings([
      ...extractTaskTags(planGoal, domain),
      ...(structured.plan?.tags ?? []),
      ...(structured.tags ?? []),
    ]);

    return {
      id: uid(),
      goal: planGoal,
      steps: planSteps,
      currentStep: 0,
      sourceMessageId,
      createdAt: now(),
      updatedAt: now(),
      domain,
      tags,
    };
  }

  const goal = normalizeText(structured.goal);
  const steps = buildTaskStepsFromStrings(structured.nextSteps ?? []);

  if (!goal || steps.length === 0) return null;

  const domain = detectTaskDomainFromStructured(structured);
  const tags = dedupeStrings([
    ...extractTaskTags(goal, domain),
    ...(structured.tags ?? []),
  ]);

  return {
    id: uid(),
    goal,
    steps,
    currentStep: 0,
    sourceMessageId,
    createdAt: now(),
    updatedAt: now(),
    domain,
    tags,
  };
}

function mergeTaskSteps(
  current: CodexForgeTaskStep[],
  incoming: CodexForgeTaskStep[]
): CodexForgeTaskStep[] {
  const merged = [...current];

  for (const next of incoming) {
    const existingIndex = merged.findIndex(
      (item) => item.text.toLowerCase() === next.text.toLowerCase()
    );

    if (existingIndex === -1) {
      merged.push(next);
      continue;
    }

    const existing = merged[existingIndex];
    merged[existingIndex] = {
      ...existing,
      text: existing.text || next.text,
    };
  }

  return merged;
}

function mergeTask(
  current: CodexForgeActiveTask | null,
  next: CodexForgeActiveTask | null
): CodexForgeActiveTask | null {
  if (!next) return current;
  if (!current || current.goal !== next.goal) return next;

  const mergedSteps = mergeTaskSteps(current.steps, next.steps);
  const mergedTags = dedupeStrings([...(current.tags ?? []), ...(next.tags ?? [])]);

  return {
    ...current,
    steps: mergedSteps,
    currentStep: clamp(current.currentStep, mergedSteps.length),
    updatedAt: now(),
    domain: current.domain ?? next.domain,
    tags: mergedTags,
  };
}

function updateTaskStepState(
  task: CodexForgeActiveTask,
  stepIndex: number,
  status: TaskStepStatus,
  result?: string
): CodexForgeActiveTask {
  const steps = task.steps.map((step, index) =>
    index === stepIndex
      ? {
          ...step,
          status,
          result,
          lastRunAt: now(),
        }
      : step
  );

  return {
    ...task,
    steps,
    updatedAt: now(),
  };
}

function moveTaskToNextPendingStep(task: CodexForgeActiveTask): CodexForgeActiveTask {
  const nextPendingIndex = task.steps.findIndex((step) => step.status !== "done");

  return {
    ...task,
    currentStep:
      nextPendingIndex === -1
        ? clamp(task.steps.length - 1, task.steps.length)
        : nextPendingIndex,
    updatedAt: now(),
  };
}

function updateAllPendingStepsToState(
  task: CodexForgeActiveTask,
  status: TaskStepStatus,
  result: string
): CodexForgeActiveTask {
  return {
    ...task,
    steps: task.steps.map((step) =>
      step.status === "done"
        ? step
        : {
            ...step,
            status,
            result,
            lastRunAt: now(),
          }
    ),
    updatedAt: now(),
  };
}

/* ================= MESSAGE BUILDERS ================= */

function buildUserMessage(text: string): Msg {
  return {
    id: uid(),
    role: "user",
    text,
    ts: now(),
    structured: null,
    source: "api",
  };
}

function buildAssistantMessage(
  id: string,
  text: string,
  ts: number,
  structured: CodexForgeStructuredReply | null,
  source: BackendMode
): Msg {
  return {
    id,
    role: "assistant",
    text,
    ts,
    structured,
    source,
  };
}

function buildSystemMessage(): Msg {
  return {
    id: uid(),
    role: "system",
    text: [`${PRODUCT_NAME} workspace note`, "", ...PRODUCT_DIRECTION_LINES].join(
      "\n"
    ),
    ts: now(),
    source: "system",
    structured: {
      title: "Workspace note",
      summary: "Project direction reminder saved locally.",
      context: [...PRODUCT_DIRECTION_LINES],
      domain: "general",
      tags: ["codexforge", "workspace", "product-direction"],
    },
  };
}

function buildExecutionPrompt(task: CodexForgeActiveTask, stepIndex: number): string {
  const totalSteps = task.steps.length;
  const stepNumber = stepIndex + 1;
  const currentStep = task.steps[stepIndex]?.text ?? "";

  return [
    `Execute task step ${stepNumber} of ${totalSteps}.`,
    "",
    `Task goal: ${task.goal}`,
    `Task domain: ${task.domain}`,
    `Current step: ${currentStep}`,
    task.tags.length > 0 ? `Task tags: ${task.tags.join(", ")}` : "",
    "",
    `Respond as ${PRODUCT_NAME} with a structured execution update.`,
    "Do not ask broad follow-up questions.",
    "Assume local-first execution and provide the smallest correct next action.",
    "Return concrete outcomes, risks, and the next step after this execution.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildEngineStructuredReply(
  engineState: CodexForgeEngineState | null,
  task?: CodexForgeActiveTask | null,
  stepText?: string
): CodexForgeStructuredReply | null {
  if (!engineState) return null;

  const logs = engineState.logs.slice(0, MAX_ENGINE_LOG_LINES);
  const sampledPaths = (engineState.snapshot?.sampledPaths ?? []).slice(
    0,
    MAX_ENGINE_SAMPLE_PATHS
  );
  const diffs = engineState.diffs.slice(0, MAX_ENGINE_DIFF_PREVIEW);

  return {
    mode: "local-execution",
    title: `${PRODUCT_NAME} execution engine update`,
    summary: summarizeEngineState(engineState),
    goal: task?.goal ?? engineState.goal?.goal ?? undefined,
    context: dedupeStrings([
      task?.domain ? `Domain: ${task.domain}` : "",
      task?.tags?.length ? `Tags: ${task.tags.join(", ")}` : "",
      stepText ? `Step: ${stepText}` : "",
    ]),
    status: dedupeStrings([
      `Engine phase: ${engineState.phase}`,
      engineState.testOutput ?? "",
      engineState.error ?? "",
    ]),
    execution: {
      ...(stepText ? { stepText } : {}),
      resultSummary: summarizeEngineState(engineState),
      phase: engineState.phase,
      diffCount: engineState.diffs.length,
      snapshotFileCount: engineState.snapshot?.fileCount ?? 0,
      logs,
    },
    snapshot: engineState.snapshot
      ? {
          fileCount: engineState.snapshot.fileCount,
          sampledPaths,
        }
      : undefined,
    diffs:
      diffs.length > 0
        ? diffs.map((diff) => ({
            filePath: diff.filePath,
            patch: diff.patch,
          }))
        : undefined,
    domain: task?.domain ?? "general",
    tags: task?.tags ?? [],
  };
}

function buildEngineUpdateMessage(
  title: string,
  engineState: CodexForgeEngineState | null,
  task?: CodexForgeActiveTask | null,
  stepText?: string
): Msg {
  const logs = engineState?.logs.slice(0, MAX_ENGINE_LOG_LINES).join("\n") ?? "";
  const sampledPaths = engineState?.snapshot?.sampledPaths ?? [];
  const sampledPreview = sampledPaths
    .slice(0, MAX_ENGINE_SAMPLE_PATHS)
    .join("\n");
  const diffTargets = summarizeDiffTargets(engineState?.diffs ?? []);

  const text = [
    title,
    "",
    summarizeEngineState(engineState),
    "",
    diffTargets.length > 0 ? "Diff targets:" : "",
    diffTargets.length > 0 ? diffTargets.join("\n") : "",
    logs ? "" : "",
    logs ? "Recent engine log:" : "",
    logs || "",
    sampledPreview ? "" : "",
    sampledPreview ? "Snapshot sample:" : "",
    sampledPreview || "",
  ]
    .filter(Boolean)
    .join("\n");

  return buildAssistantMessage(
    uid(),
    text,
    now(),
    buildEngineStructuredReply(engineState, task, stepText),
    "api"
  );
}

function buildExecutionResultSummary(
  task: CodexForgeActiveTask,
  stepText: string,
  engineState: CodexForgeEngineState | null
): string {
  return [
    `Task: ${task.goal}`,
    `Domain: ${task.domain}`,
    `Step: ${stepText}`,
    summarizeEngineState(engineState),
  ].join("\n");
}

/* ================= ENGINE ROUTE ================= */

async function runEngineAction(
  action: EngineRouteAction,
  payload: {
    nowLabel: string;
    goal?: {
      goal: string;
      repoPath: string;
    };
  }
): Promise<CodexForgeEngineState | null> {
  const response = await fetch("/api/codexforge/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      ...payload,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "Engine action failed");
  }

  return normalizeEngineState(data.state);
}

/* ================= HOOK ================= */

export function useCodexForgeChat({
  systemGuide,
  defaultContext,
  inputRef,
}: UseCodexForgeChatArgs) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [memory, setMemory] = useState<CodexForgeMemoryItem[]>([]);
  const [activeTask, setActiveTask] = useState<CodexForgeActiveTask | null>(null);
  const [copiedId, setCopiedId] = useState("");
  const [statusText, setStatusText] = useState<StatusText>(STATUS.READY);
  const [backendMode, setBackendMode] = useState<BackendMode>("api");
  const [executionState, setExecutionState] =
    useState<CodexForgeExecutionState>(createIdleExecutionState());

  const loadedRef = useRef(false);
  const brainSyncTimerRef = useRef<number | null>(null);

  const focusInput = useCallback(() => {
    setTimeout(() => inputRef?.current?.focus(), 0);
  }, [inputRef]);

  /* ================= INIT ================= */

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const storedMessages = safeRead<Msg[]>(STORAGE.messages);
    const storedDraft = safeRead<string>(STORAGE.draft);
    const storedTask = safeRead<unknown>(STORAGE.task);
    const storedMemory = safeRead<CodexForgeMemoryItem[]>(STORAGE.memory);
    const storedExecution = safeRead<CodexForgeExecutionState>(STORAGE.execution);

    if (storedMessages) {
      setMessages(asMessages(storedMessages).slice(-MAX_MESSAGES));
    }

    if (typeof storedDraft === "string") {
      setInput(storedDraft);
    }

    if (storedTask) {
      const normalizedTask = normalizeTask(storedTask);
      if (normalizedTask) {
        setActiveTask(normalizedTask);
      }
    }

    if (storedMemory) {
      setMemory(normalizeMemory(storedMemory));
    }

    if (storedExecution) {
      setExecutionState(
        normalizeExecutionState(storedExecution) ?? createIdleExecutionState()
      );
    }
  }, []);

  /* ================= PERSIST ================= */

  useEffect(() => {
    safeWrite(STORAGE.messages, messages.slice(-MAX_MESSAGES));
  }, [messages]);

  useEffect(() => {
    safeWrite(STORAGE.draft, input);
  }, [input]);

  useEffect(() => {
    safeWrite(STORAGE.task, activeTask);
  }, [activeTask]);

  useEffect(() => {
    safeWrite(STORAGE.memory, memory);
  }, [memory]);

  useEffect(() => {
    safeWrite(STORAGE.execution, executionState);
  }, [executionState]);

  useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => setCopiedId(""), 1200);
    return () => clearTimeout(timer);
  }, [copiedId]);

  useEffect(() => {
    if (!loadedRef.current) return;

    if (brainSyncTimerRef.current !== null) {
      window.clearTimeout(brainSyncTimerRef.current);
    }

    brainSyncTimerRef.current = window.setTimeout(() => {
      try {
        persistCodexForgeBrainGraph({
          context: {
            ...defaultContext,
            systemGuide,
          },
          messages,
          activeTask,
          memory,
          executionState,
          productName: PRODUCT_NAME,
        });
      } catch {
        // non-blocking by design
      }
    }, 120);

    return () => {
      if (brainSyncTimerRef.current !== null) {
        window.clearTimeout(brainSyncTimerRef.current);
        brainSyncTimerRef.current = null;
      }
    };
  }, [defaultContext, systemGuide, messages, activeTask, memory, executionState]);

  /* ================= DERIVED ================= */

  const conversationState = useMemo(() => {
    if (messages.length === 0) return "No messages yet";
    return `${messages.length} saved message${messages.length === 1 ? "" : "s"}`;
  }, [messages]);

  const lastAssistant = useMemo(() => getLastAssistant(messages), [messages]);

  const isExecuting = executionState.running;
  const engineState = executionState.engineState;
  const enginePhase = getEnginePhaseLabel(engineState);

  const canApprovePlan = enginePhase === "awaiting_plan_approval";
  const canRejectPlan = enginePhase === "awaiting_plan_approval";
  const canApproveDiffs = enginePhase === "awaiting_diff_approval";
  const canRejectDiffs = enginePhase === "awaiting_diff_approval";
  const canResetEngine =
    enginePhase !== "idle" || !!engineState || !!executionState.lastRunLabel;

  const contextWithMemory = useMemo(() => {
    const relevantMemory = selectRelevantMemory(memory);

    return {
      ...defaultContext,
      memory: relevantMemory.map((item) => ({
        id: item.id,
        type: item.type,
        content: item.content,
        pinned: item.pinned,
        importance: item.importance,
      })),
      activePlan: activeTask
        ? {
            goal: activeTask.goal,
            steps: activeTask.steps.map((step) => step.text),
            nextAction:
              activeTask.steps[activeTask.currentStep]?.text ?? undefined,
            status: "active" as const,
            domain: activeTask.domain,
            tags: activeTask.tags,
          }
        : null,
      execution: {
        running: executionState.running,
        stepIndex: executionState.stepIndex,
        lastRunLabel: executionState.lastRunLabel,
        lastCompletedAt: executionState.lastCompletedAt,
        enginePhase: executionState.engineState?.phase ?? "idle",
        diffCount: executionState.engineState?.diffs.length ?? 0,
        snapshotFileCount:
          executionState.engineState?.snapshot?.fileCount ?? 0,
      },
      codexforgeCapabilities: {
        domains: ALL_TASK_DOMAINS.filter((domain) => domain !== "general"),
      },
    } satisfies CodexForgeChatContext;
  }, [memory, activeTask, defaultContext, executionState]);

  /* ================= MESSAGE + ARTIFACT HELPERS ================= */

  const appendMessage = useCallback((message: Msg) => {
    setMessages((prev) => [...prev, message].slice(-MAX_MESSAGES));
  }, []);

  const absorbStructuredArtifacts = useCallback((message: Msg) => {
    const nextTask = buildTaskFromStructured(message.structured, message.id);
    const extractedMemory = extractMemory(message.structured ?? null, message.id);

    setActiveTask((prev) => mergeTask(prev, nextTask));
    setMemory((prev) => mergeMemory(prev, extractedMemory));
  }, []);

  const appendAssistantArtifacts = useCallback(
    (message: Msg) => {
      appendMessage(message);
      absorbStructuredArtifacts(message);
    },
    [appendMessage, absorbStructuredArtifacts]
  );

  const handleAssistantMessage = useCallback(
    (message: Msg, mode: BackendMode, status: StatusText) => {
      appendAssistantArtifacts(message);
      setBackendMode(mode);
      setStatusText(status);
    },
    [appendAssistantArtifacts]
  );

  /* ================= EXECUTION STATE HELPERS ================= */

  const startExecution = useCallback(
    (
      taskId: string,
      stepIndex: number,
      stepText: string,
      previous: CodexForgeExecutionState
    ) => {
      setExecutionState({
        running: true,
        stepIndex,
        taskId,
        startedAt: now(),
        lastCompletedAt: previous.lastCompletedAt,
        lastResultMessageId: previous.lastResultMessageId,
        lastRunLabel: `Step ${stepIndex + 1}: ${stepText}`,
        engineState: previous.engineState,
      });
    },
    []
  );

  const completeExecution = useCallback(
    (messageId: string, engineStateOverride?: CodexForgeEngineState | null) => {
      setExecutionState((current) => ({
        ...current,
        running: false,
        stepIndex: null,
        taskId: null,
        lastCompletedAt: now(),
        lastResultMessageId: messageId,
        engineState:
          engineStateOverride === undefined
            ? current.engineState
            : engineStateOverride,
      }));
    },
    []
  );

  const setEngineState = useCallback(
    (nextEngineState: CodexForgeEngineState | null) => {
      setExecutionState((current) => ({
        ...current,
        engineState: nextEngineState,
      }));
    },
    []
  );

  const resetExecution = useCallback(() => {
    setExecutionState(createIdleExecutionState());
  }, []);

  function shouldLatestMessageOverrideActiveTask(text: string): boolean {
  const normalized = text.toLowerCase();

  const explicitFixRequest =
    normalized.startsWith("fix ") ||
    normalized.includes("current failure:") ||
    normalized.includes("required behavior:") ||
    normalized.includes("required edit:") ||
    normalized.includes("primary target:") ||
    normalized.includes("implementation target:") ||
    normalized.includes("expected output:");

  const activeTaskOverrideRequest =
    normalized.includes("stale active task") ||
    normalized.includes("active task contamination") ||
    normalized.includes("latest-message authority") ||
    normalized.includes("latest message authority") ||
    normalized.includes("latest explicit user request") ||
    normalized.includes("replace or bypass stale task") ||
    normalized.includes("latestmessageoverridesactivetask") ||
    normalized.includes("activetasksuppressedforrequest");

  return explicitFixRequest && activeTaskOverrideRequest;
}

function buildLatestMessageOverrideActivePlan(): NonNullable<CodexForgeChatContext["activePlan"]> {
  return {
    goal:
      "Fix CodexForge stale Active Task contamination so the latest explicit user request can replace or bypass stale task, memory, graph, and previous planning context for this request.",
    steps: [
      "Detect latest-message override intent before constructing the chat request context.",
      "Suppress stale activeTask, stale task tags, stale activePlan, memory carryover, and graph-derived goals for that request only.",
      "Send explicit metadata so route.ts and engine.ts treat the latest message as authoritative.",
    ],
    nextAction:
      "Detect latest-message override intent before constructing the chat request context.",
    files: [
      "src/lib/codexforge/chat/use-codexforge-chat.ts",
      "src/app/api/codexforge/chat/route.ts",
      "src/lib/codexforge/types.ts",
    ],
    risks: [
      "Do not permanently delete the active task or memory during request-scoped suppression.",
      "Do not suppress useful task context for normal follow-up messages.",
      "Do not let adjacent tasks such as diff approvals, repo grounding, or architecture plans replace the latest request.",
      "Keep execution and approval flows intact.",
    ],
    tags: [
      "codexforge-product",
      "active-task",
      "context-isolation",
      "latest-message-authority",
      "task-routing",
      "debug",
    ],
    status: "active",
    intent: "capability-plan",
    domain: "debug",
  };
}

function buildLatestMessageOverrideContext(
  context: CodexForgeChatContext
): CodexForgeChatContext {
  return {
    ...context,
    memory: [],
    activePlan: buildLatestMessageOverrideActivePlan(),
    execution: {
      ...context.execution,
      running: false,
      stepIndex: null,
      lastRunLabel: "",
      enginePhase: "idle",
      diffCount: 0,
      snapshotFileCount: 0,
    },
    latestMessageOverridesActiveTask: true,
    activeTaskSuppressedForRequest: true,
    activePlanGoalSource: "latest-user-message",
  } as CodexForgeChatContext;
}

/* ================= REQUEST ASSISTANT ================= */

  const requestAssistant = useCallback(
    async (
      nextMessages: Msg[],
      context: CodexForgeChatContext,
      graphContext?: ReturnType<typeof buildRequestBrainGraphContextPayload>,
      fallbackSuffix?: string
    ): Promise<RequestAssistantResult> => {
      const timeout = createTimeoutController(CHAT_REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch("/api/codexforge/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: buildRequestMessages(nextMessages),
            context,
            ...(graphContext ? { graph: graphContext } : {}),
          }),
          signal: timeout.signal,
        });

        const data = (await response.json().catch(() => null)) as
          | BackendReply
          | BackendError
          | null;

        if (!response.ok || !data || data.ok !== true) {
          throw new Error(
            data && "error" in data && typeof data.error === "string"
              ? data.error
              : "Chat request failed."
          );
        }

        const structured = normalizeStructuredReply(data.reply.structured);
        const mode: BackendMode = data.meta?.usedFallback
          ? "local-fallback"
          : "api";

        return {
          message: buildAssistantMessage(
            data.reply.id,
            data.reply.text,
            data.reply.ts,
            structured,
            mode
          ),
          mode,
          okStatus: data.meta?.usedFallback ? STATUS.FALLBACK : STATUS.API,
          executedStatus: data.meta?.usedFallback
            ? STATUS.EXECUTED_FALLBACK
            : STATUS.EXECUTED_API,
        };
      } catch (error) {
        const fallback = await buildClientFallbackFromEngine(nextMessages, context);
        const fallbackReason =
          error instanceof Error && error.name === "AbortError"
            ? "Backend request timed out. Used local fallback."
            : "Backend request failed. Used local fallback.";

        const suffix = buildFallbackSuffix(fallbackSuffix, fallbackReason);

        return {
          message: buildAssistantMessage(
            uid(),
            suffix ? `${fallback.text}\n\n${suffix}` : fallback.text,
            now(),
            fallback.structured ?? null,
            "local-fallback"
          ),
          mode: "local-fallback",
          okStatus: STATUS.ENGINE,
          executedStatus: STATUS.EXECUTED_FALLBACK,
        };
      } finally {
        timeout.cleanup();
      }
    },
    []
  );

  /* ================= ENGINE UI ACTION ================= */

  const runEngineUiAction = useCallback(
    async (
      action: Exclude<EngineRouteAction, "start">,
      successStatus: StatusText,
      updateTask?: (task: CodexForgeActiveTask) => CodexForgeActiveTask
    ) => {
      if (busy || isExecuting) return;

      setBusy(true);

      try {
        const engineResult = await runEngineAction(action, {
          nowLabel: new Date().toLocaleTimeString(),
        });

        setEngineState(engineResult);
        setBackendMode("api");
        setStatusText(successStatus);

        const engineMessage = buildEngineUpdateMessage(
          `${PRODUCT_NAME} engine ${action} update`,
          engineResult,
          activeTask
        );

        appendAssistantArtifacts(engineMessage);

        if (updateTask) {
          setActiveTask((current) => {
            if (!current) return current;
            return updateTask(current);
          });
        }

        completeExecution(engineMessage.id, engineResult);
      } catch {
        setStatusText(STATUS.ENGINE);
      } finally {
        setBusy(false);
        focusInput();
      }
    },
    [
      activeTask,
      appendAssistantArtifacts,
      busy,
      completeExecution,
      focusInput,
      isExecuting,
      setEngineState,
    ]
  );

  /* ================= SEND ================= */

  const send = useCallback(
    async (custom?: string | SendOptions) => {
      const options: SendOptions =
        typeof custom === "string"
          ? { text: custom }
          : custom ?? { text: input };

      const text = (options.text ?? input).trim();
      if (!text || busy || isExecuting) return;

      const userMessage = buildUserMessage(text);
      const nextMessages = [...messages, userMessage].slice(-MAX_MESSAGES);

      setMessages(nextMessages);
      setInput("");
      setBusy(true);
      setStatusText(
        options.executionRequest ? STATUS.EXECUTING : STATUS.THINKING
      );

      if (options.executionRequest) {
        startExecution(
          options.executionRequest.taskId,
          options.executionRequest.stepIndex,
          options.executionRequest.stepText,
          executionState
        );
      }

      try {
        const latestMessageOverridesActiveTask =
          shouldLatestMessageOverrideActiveTask(text);

        const baseRequestContext = options.executionRequest
          ? {
              ...contextWithMemory,
              executionRequest: options.executionRequest,
            }
          : contextWithMemory;

        const requestContext = latestMessageOverridesActiveTask
          ? buildLatestMessageOverrideContext(baseRequestContext)
          : baseRequestContext;

        const graphContext = latestMessageOverridesActiveTask
          ? undefined
          : buildRequestBrainGraphContextPayload({
              context: {
                ...requestContext,
                systemGuide,
              },
              messages: nextMessages,
              activeTask,
              memory,
              executionState,
              productName: PRODUCT_NAME,
            });

        const result = await requestAssistant(
          nextMessages,
          requestContext,
          graphContext,
          options.executionRequest
            ? `Executed step:\n${options.executionRequest.stepText}`
            : undefined
        );

        handleAssistantMessage(
          result.message,
          result.mode,
          options.executionRequest ? result.executedStatus : result.okStatus
        );

        if (options.executionRequest) {
          const executionRequest = options.executionRequest;

          setActiveTask((current) => {
            if (!current || current.id !== executionRequest.taskId) {
              return current;
            }

            const updated = updateTaskStepState(
              current,
              executionRequest.stepIndex,
              "done",
              "Executed through chat execution path."
            );

            return moveTaskToNextPendingStep(updated);
          });

          completeExecution(result.message.id);
        }
      } finally {
        setBusy(false);
        focusInput();
      }
    },
    [
      activeTask,
      busy,
      contextWithMemory,
      executionState,
      focusInput,
      handleAssistantMessage,
      input,
      isExecuting,
      memory,
      messages,
      requestAssistant,
      startExecution,
      completeExecution,
      systemGuide,
    ]
  );

  /* ================= RUN TASK STEP ================= */

  const runTaskStep = useCallback(
    async (stepIndex?: number) => {
      if (!activeTask || busy || isExecuting) return;

      const targetIndex =
        typeof stepIndex === "number"
          ? clamp(stepIndex, activeTask.steps.length)
          : activeTask.currentStep;

      const step = activeTask.steps[targetIndex];
      const stepText = step?.text ?? "";
      if (!stepText) return;

      const executionPrompt = buildExecutionPrompt(activeTask, targetIndex);

      setBusy(true);
      setStatusText(STATUS.EXECUTING);
      startExecution(activeTask.id, targetIndex, stepText, executionState);

      setActiveTask((current) => {
        if (!current || current.id !== activeTask.id) return current;
        return updateTaskStepState(current, targetIndex, "running");
      });

      try {
        const nowLabel = new Date().toLocaleTimeString();

        const nextEngineState = await runEngineAction("start", {
          nowLabel,
          goal: {
            goal: activeTask.goal,
            repoPath: resolveExecutionRepoPath(defaultContext),
          },
        });

        if (!nextEngineState) {
          throw new Error("Engine returned no state.");
        }

        setEngineState(nextEngineState);

        const logPreview = nextEngineState.logs
          .slice(0, MAX_ENGINE_LOG_LINES)
          .join("\n");
        const sampledPaths = nextEngineState.snapshot?.sampledPaths ?? [];
        const sampledPreview = sampledPaths
          .slice(0, MAX_ENGINE_SAMPLE_PATHS)
          .join("\n");
        const diffTargets = summarizeDiffTargets(nextEngineState.diffs);
        const engineSummary = summarizeEngineState(nextEngineState);

        const messageText = [
          `${PRODUCT_NAME} execution engine update`,
          "",
          engineSummary,
          "",
          `Domain: ${activeTask.domain}`,
          activeTask.tags.length > 0 ? `Tags: ${activeTask.tags.join(", ")}` : "",
          diffTargets.length > 0 ? `Files touched: ${diffTargets.join(", ")}` : "",
          "",
          logPreview ? "Recent engine log:" : "",
          logPreview || "",
          sampledPreview ? "" : "",
          sampledPreview ? "Snapshot sample:" : "",
          sampledPreview || "",
          "",
          "Execution request:",
          executionPrompt,
        ]
          .filter(Boolean)
          .join("\n");

        const assistantMessage = buildAssistantMessage(
          uid(),
          messageText,
          now(),
          buildEngineStructuredReply(nextEngineState, activeTask, stepText),
          "api"
        );

        appendAssistantArtifacts(assistantMessage);
        setBackendMode("api");
        setStatusText(STATUS.EXECUTED_API);

        setActiveTask((current) => {
          if (!current || current.id !== activeTask.id) return current;

          const phase = nextEngineState.phase;

          if (phase === "awaiting_plan_approval") {
            return updateTaskStepState(
              current,
              targetIndex,
              "running",
              "Plan ready. Waiting for approval."
            );
          }

          if (phase === "awaiting_diff_approval") {
            return updateTaskStepState(
              current,
              targetIndex,
              "running",
              "Diffs ready. Waiting for approval."
            );
          }

          if (phase === "done") {
            const updated = updateTaskStepState(
              current,
              targetIndex,
              "done",
              buildExecutionResultSummary(activeTask, stepText, nextEngineState)
            );

            return moveTaskToNextPendingStep(updated);
          }

          if (phase === "error") {
            return updateTaskStepState(
              current,
              targetIndex,
              "error",
              nextEngineState.error || "Engine failed."
            );
          }

          return updateTaskStepState(
            current,
            targetIndex,
            "running",
            summarizeEngineState(nextEngineState)
          );
        });

        completeExecution(assistantMessage.id, nextEngineState);
      } catch {
        const executionContext: CodexForgeChatContext = {
          ...contextWithMemory,
          executionRequest: {
            taskId: activeTask.id,
            taskGoal: activeTask.goal,
            stepIndex: targetIndex,
            stepText,
            mode: "execute-task-step",
          },
        };

        const fallbackMessages = [
          ...messages,
          buildUserMessage(executionPrompt),
        ].slice(-MAX_MESSAGES);

        const fallback = await buildClientFallbackFromEngine(
          fallbackMessages,
          executionContext
        );

        const fallbackMessage = buildAssistantMessage(
          uid(),
          `${fallback.text}\n\nExecuted step:\n${stepText}\n\nEngine request failed. Used local fallback.`,
          now(),
          fallback.structured ?? null,
          "local-fallback"
        );

        handleAssistantMessage(
          fallbackMessage,
          "local-fallback",
          STATUS.EXECUTED_FALLBACK
        );

        setActiveTask((current) => {
          if (!current || current.id !== activeTask.id) return current;

          const updated = updateTaskStepState(
            current,
            targetIndex,
            "done",
            "Executed through local fallback."
          );

          return moveTaskToNextPendingStep(updated);
        });

        completeExecution(fallbackMessage.id, executionState.engineState);
      } finally {
        setBusy(false);
        focusInput();
      }
    },
    [
      activeTask,
      appendAssistantArtifacts,
      busy,
      completeExecution,
      contextWithMemory,
      defaultContext,
      executionState,
      focusInput,
      handleAssistantMessage,
      isExecuting,
      messages,
      setEngineState,
      startExecution,
    ]
  );

  const runCurrentTaskStep = useCallback(async () => {
    await runTaskStep();
  }, [runTaskStep]);

  /* ================= ENGINE STATE REFRESH ================= */

  const refreshEngineState = useCallback(async () => {
    try {
      const response = await fetch("/api/codexforge/run", {
        method: "GET",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        throw new Error();
      }

      const normalized = normalizeEngineState(data.state);
      setEngineState(normalized);
    } catch {
      // ignore refresh errors
    }
  }, [setEngineState]);

  /* ================= ENGINE APPROVAL ACTIONS ================= */

  const approvePlan = useCallback(async () => {
    await runEngineUiAction("approvePlan", STATUS.APPROVED_PLAN, (task) =>
      updateAllPendingStepsToState(
        task,
        "running",
        "Plan approved. Generating diffs."
      )
    );
  }, [runEngineUiAction]);

  const rejectPlan = useCallback(async () => {
    await runEngineUiAction("rejectPlan", STATUS.REJECTED_PLAN, (task) =>
      updateAllPendingStepsToState(
        task,
        "pending",
        "Plan rejected. Awaiting restart."
      )
    );
  }, [runEngineUiAction]);

  const approveDiffs = useCallback(async () => {
    await runEngineUiAction("approveDiffs", STATUS.APPROVED_DIFFS, (task) => {
      const updated = updateAllPendingStepsToState(
        task,
        "done",
        "Diffs approved. Preview flow completed."
      );
      return moveTaskToNextPendingStep(updated);
    });
  }, [runEngineUiAction]);

  const rejectDiffs = useCallback(async () => {
    await runEngineUiAction("rejectDiffs", STATUS.REJECTED_DIFFS, (task) =>
      updateAllPendingStepsToState(
        task,
        "running",
        "Diffs rejected. Returned to plan approval."
      )
    );
  }, [runEngineUiAction]);

  const resetEngine = useCallback(async () => {
    await runEngineUiAction("reset", STATUS.RESET_ENGINE, (task) =>
      updateAllPendingStepsToState(task, "pending", "Engine reset.")
    );
  }, [runEngineUiAction]);

  /* ================= CHAT ACTIONS ================= */

  const clearChat = useCallback(() => {
    if (
      !confirm(
        `Clear ${PRODUCT_NAME} chat history, task state, memory, and execution state?`
      )
    ) {
      return;
    }

    setMessages([]);
    setInput("");
    setActiveTask(null);
    setMemory([]);
    setCopiedId("");
    setStatusText(STATUS.READY);
    setBackendMode("api");
    resetExecution();

    safeWrite(STORAGE.messages, null);
    safeWrite(STORAGE.draft, null);
    safeWrite(STORAGE.task, null);
    safeWrite(STORAGE.memory, null);
    safeWrite(STORAGE.execution, null);

    focusInput();
  }, [focusInput, resetExecution]);

  const copyMessage = useCallback(async (message: Msg) => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedId(message.id);
    } catch {
      // ignore clipboard errors
    }
  }, []);

  const useMessageAsDraft = useCallback(
    (message: Msg) => {
      setInput(message.text);
      focusInput();
    },
    [focusInput]
  );

  const addSystemMessage = useCallback(() => {
    const message = buildSystemMessage();
    appendAssistantArtifacts(message);
  }, [appendAssistantArtifacts]);

  /* ================= TASK ACTIONS ================= */

  const goToNextTaskStep = useCallback(() => {
    setActiveTask((current) =>
      current
        ? {
            ...current,
            currentStep: clamp(current.currentStep + 1, current.steps.length),
            updatedAt: now(),
          }
        : null
    );
  }, []);

  const goToPreviousTaskStep = useCallback(() => {
    setActiveTask((current) =>
      current
        ? {
            ...current,
            currentStep: clamp(current.currentStep - 1, current.steps.length),
            updatedAt: now(),
          }
        : null
    );
  }, []);

  const clearActiveTask = useCallback(() => {
    setActiveTask(null);
    setExecutionState((current) => ({
      ...current,
      running: false,
      taskId: null,
      stepIndex: null,
      startedAt: null,
    }));
  }, []);

  /* ================= MEMORY ACTIONS ================= */

  const pinMemory = useCallback((memoryId: string) => {
    setMemory((current) =>
      current.map((item) =>
        item.id === memoryId
          ? {
              ...item,
              pinned: true,
              updatedAt: now(),
              importance: Math.max(item.importance, 0.95),
            }
          : item
      )
    );
  }, []);

  const unpinMemory = useCallback((memoryId: string) => {
    setMemory((current) =>
      current.map((item) =>
        item.id === memoryId
          ? { ...item, pinned: false, updatedAt: now() }
          : item
      )
    );
  }, []);

  const deleteMemory = useCallback((memoryId: string) => {
    setMemory((current) => current.filter((item) => item.id !== memoryId));
  }, []);

  const clearMemory = useCallback(() => {
    if (!confirm("Clear all stored workspace memory?")) return;
    setMemory([]);
    safeWrite(STORAGE.memory, null);
  }, []);

  /* ================= ENGINE EFFECT ================= */

  useEffect(() => {
    void refreshEngineState();
  }, [refreshEngineState]);

  /* ================= RETURN ================= */

  return {
    input,
    setInput,
    busy,
    messages,
    copiedId,
    statusText,
    backendMode,
    conversationState,
    lastAssistant,
    activeTask,
    memory,
    executionState,
    engineState,
    enginePhase,
    isExecuting,
    canApprovePlan,
    canRejectPlan,
    canApproveDiffs,
    canRejectDiffs,
    canResetEngine,
    send,
    runTaskStep,
    runCurrentTaskStep,
    approvePlan,
    rejectPlan,
    approveDiffs,
    rejectDiffs,
    resetEngine,
    refreshEngineState,
    clearChat,
    copyMessage,
    useMessageAsDraft,
    addSystemMessage,
    goToNextTaskStep,
    goToPreviousTaskStep,
    clearActiveTask,
    pinMemory,
    unpinMemory,
    deleteMemory,
    clearMemory,
    setMessages,
    setActiveTask,
    setMemory,
  };
}


import React from "react";
import { StructuredReplyBlock } from "@/lib/codexforge/chat/components/structured-reply-block";
import type { CodexForgeToolExecutionEvent } from "@/lib/codexforge/chat/tool-execution-events";
import type {
  CodexForgeDiff,
  CodexForgeDiffMetaSummary,
  CodexForgeExecutionMeta,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlan,
  CodexForgePlanDomain,
  CodexForgeSnapshotMetaSummary,
  CodexForgeStructuredReply,
  CodexForgeStructuredSummaryMeta,
} from "@/lib/codexforge/types";

/* ================= CONSTANTS ================= */

const VALID_DOMAINS = [
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
  "trading",
  "blender",
  "design",
  "marketing",
  "decks",
] as const satisfies readonly CodexForgePlanDomain[];

const VALID_PLAN_STATUSES = [
  "draft",
  "active",
  "completed",
  "executed",
  "blocked",
  "needs-approval",
] as const;

const VALID_EXECUTION_PHASES = [
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
] as const satisfies readonly CodexForgeExecutionPhase[];

const DOMAIN_LABELS: Record<CodexForgePlanDomain, string> = {
  general: "General",
  web: "Web",
  research: "Research",
  debug: "Debug",
  "game-server": "Game Server",
  movie: "Movie",
  video: "Video",
  comfyui: "ComfyUI",
  unreal: "Unreal",
  automation: "Automation",
  trading: "Trading",
  blender: "Blender",
  design: "Design",
  marketing: "Marketing",
  decks: "Decks",
};

const PLAN_STATUS_LABELS: Record<
  NonNullable<CodexForgePlan["status"]>,
  string
> = {
  draft: "Draft",
  active: "Active",
  completed: "Completed",
  executed: "Executed",
  blocked: "Blocked",
  "needs-approval": "Needs approval",
};

const EXECUTION_PHASE_LABELS: Record<CodexForgeExecutionPhase, string> = {
  idle: "Idle",
  planning: "Planning",
  awaiting_plan_approval: "Awaiting plan approval",
  diffing: "Diffing",
  awaiting_diff_approval: "Awaiting diff approval",
  applying: "Applying",
  testing: "Testing",
  done: "Done",
  error: "Error",
  fallback: "Fallback",
};

/* ================= SOURCE ================= */

export function getSourceLabel(message: CodexForgeMessage): string {
  if (message.source === "local-fallback") return "Local fallback";
  if (message.source === "system") return "System";
  return "API";
}

/* ================= GENERIC HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    )
  );
}

function normalizeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

function pickFirstString(...values: unknown[]): string | null {
  for (const value of values) {
    const normalized = normalizeString(value);
    if (normalized) return normalized;
  }
  return null;
}

/* ================= TYPE NORMALIZERS ================= */

function normalizeDomain(value: unknown): CodexForgePlanDomain | undefined {
  const domain = normalizeString(value);
  if (!domain) return undefined;

  return VALID_DOMAINS.includes(domain as CodexForgePlanDomain)
    ? (domain as CodexForgePlanDomain)
    : undefined;
}

function normalizePlanStatus(
  value: unknown
): CodexForgePlan["status"] | undefined {
  const status = normalizeString(value);
  if (!status) return undefined;

  return VALID_PLAN_STATUSES.includes(
    status as NonNullable<CodexForgePlan["status"]>
  )
    ? (status as NonNullable<CodexForgePlan["status"]>)
    : undefined;
}

function normalizeExecutionPhase(
  value: unknown
): CodexForgeExecutionPhase | undefined {
  const phase = normalizeString(value);
  if (!phase) return undefined;

  return VALID_EXECUTION_PHASES.includes(phase as CodexForgeExecutionPhase)
    ? (phase as CodexForgeExecutionPhase)
    : undefined;
}

function normalizeDiffs(value: unknown): CodexForgeDiff[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): CodexForgeDiff | null => {
      const record = asRecord(item);
      if (!record) return null;

      const filePath = normalizeString(record.filePath);
      const patch = normalizeString(record.patch);

      if (!filePath || !patch) return null;

      return {
        filePath,
        patch,
      };
    })
    .filter((item): item is CodexForgeDiff => item !== null);
}

/* ================= LABEL HELPERS ================= */

export function getDomainLabel(domain?: CodexForgePlanDomain | null): string | null {
  if (!domain) return null;
  return DOMAIN_LABELS[domain] ?? "General";
}

export function getPlanStatusLabel(
  status?: CodexForgePlan["status"] | null
): string | null {
  if (!status) return null;
  return PLAN_STATUS_LABELS[status] ?? status;
}

export function getExecutionPhaseLabel(
  phase?: CodexForgeExecutionPhase | null
): string | null {
  if (!phase) return null;
  return EXECUTION_PHASE_LABELS[phase] ?? phase;
}

/* ================= PLAN HELPERS ================= */

function getPlanRecord(
  structured?: CodexForgeStructuredReply | null
): Record<string, unknown> | null {
  return asRecord(structured?.plan);
}

function getExecutionRecord(
  structured?: CodexForgeStructuredReply | null
): Record<string, unknown> | null {
  return asRecord(structured?.execution);
}

function getSnapshotRecord(
  structured?: CodexForgeStructuredReply | null
): Record<string, unknown> | null {
  return asRecord(structured?.snapshot);
}

export function getStructuredPlan(
  structured?: CodexForgeStructuredReply | null
): CodexForgePlan | null {
  if (!structured) return null;

  const planRecord = getPlanRecord(structured);

  if (planRecord) {
    const goal = normalizeString(planRecord.goal);
    const steps = normalizeStringArray(planRecord.steps);
    const risks = normalizeStringArray(planRecord.risks);
    const files = normalizeStringArray(planRecord.files);
    const commands = normalizeStringArray(planRecord.commands);
    const notes = normalizeStringArray(planRecord.notes);
    const tags = normalizeStringArray(planRecord.tags);

    const nextAction =
      pickFirstString(planRecord.nextAction, steps[0]) ?? undefined;

    const status = normalizePlanStatus(planRecord.status) ?? "active";
    const intent = normalizeString(planRecord.intent) ?? undefined;

    const domain =
      normalizeDomain(planRecord.domain) ??
      normalizeDomain(structured.domain) ??
      undefined;

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
      ...(intent ? { intent } : {}),
      ...(domain ? { domain } : {}),
      status,
    };
  }

  const legacyGoal = normalizeString(structured.goal);
  const legacySteps = normalizeStringArray(structured.nextSteps);
  const legacyRisks = normalizeStringArray(structured.risks);
  const legacyFiles = normalizeStringArray(structured.files);
  const legacyCommands = normalizeStringArray(structured.commands);
  const legacyTags = normalizeStringArray(structured.tags);
  const legacyNotes = normalizeStringArray(structured.context);

  if (!legacyGoal || legacySteps.length === 0) {
    return null;
  }

  const legacyDomain = normalizeDomain(structured.domain) ?? undefined;

  return {
    goal: legacyGoal,
    steps: legacySteps,
    ...(legacyRisks.length > 0 ? { risks: legacyRisks } : {}),
    ...(legacyFiles.length > 0 ? { files: legacyFiles } : {}),
    ...(legacyCommands.length > 0 ? { commands: legacyCommands } : {}),
    ...(legacyTags.length > 0 ? { tags: legacyTags } : {}),
    ...(legacyNotes.length > 0 ? { notes: legacyNotes } : {}),
    nextAction: legacySteps[0],
    ...(legacyDomain ? { domain: legacyDomain } : {}),
    status: "active",
  };
}

export function getNextAction(plan: CodexForgePlan | null): string | null {
  if (!plan) return null;
  return normalizeString(plan.nextAction) ?? plan.steps[0] ?? null;
}

export function getPlanProgress(plan: CodexForgePlan | null, index: number): number {
  if (!plan || plan.steps.length === 0) return 0;
  return Math.min(((index + 1) / plan.steps.length) * 100, 100);
}

export function hasPlanContent(plan: CodexForgePlan | null): boolean {
  if (!plan) return false;

  return (
    !!normalizeString(plan.goal) ||
    plan.steps.length > 0 ||
    (plan.files?.length ?? 0) > 0 ||
    (plan.commands?.length ?? 0) > 0 ||
    (plan.risks?.length ?? 0) > 0 ||
    (plan.notes?.length ?? 0) > 0
  );
}

/* ================= MODE / STATUS ================= */

export function getStructuredModeLabel(
  structured?: CodexForgeStructuredReply | null
): string | null {
  const mode = normalizeString(structured?.mode);
  if (!mode) return null;

  if (mode === "local-execution") return "Execution";
  if (mode === "local-execution-fallback") return "Execution fallback";
  if (mode === "local-fallback") return "Fallback";
  if (mode === "local") return "Local";

  return mode;
}

export function getStructuredStatusLabel(
  structured?: CodexForgeStructuredReply | null
): string | null {
  const plan = getStructuredPlan(structured);
  return getPlanStatusLabel(plan?.status);
}

export function isStructuredExecutionReply(
  structured?: CodexForgeStructuredReply | null
): boolean {
  return (
    structured?.mode === "local-execution" ||
    structured?.mode === "local-execution-fallback"
  );
}

export function isStructuredFallbackReply(
  structured?: CodexForgeStructuredReply | null
): boolean {
  return (
    structured?.mode === "local-fallback" ||
    structured?.mode === "local-execution-fallback"
  );
}

/* ================= EXECUTION ================= */

export function getExecutionMeta(
  structured?: CodexForgeStructuredReply | null
): CodexForgeExecutionMeta {
  const execution = getExecutionRecord(structured);

  const stepText = pickFirstString(
    execution?.stepText,
    execution?.step,
    execution?.currentStep
  );

  const resultSummary = pickFirstString(
    execution?.resultSummary,
    execution?.summary,
    structured?.summary
  );

  const phase = normalizeExecutionPhase(execution?.phase) ?? null;
  const phaseLabel = getExecutionPhaseLabel(phase);

  const stepIndex = normalizeNumber(execution?.stepIndex);
  const diffCount = normalizeNumber(execution?.diffCount);
  const snapshotFileCount = normalizeNumber(execution?.snapshotFileCount);
  const logs = normalizeStringArray(execution?.logs);

  return {
    hasExecution: !!execution,
    stepIndex,
    stepNumber: stepIndex !== null ? stepIndex + 1 : null,
    stepText,
    resultSummary,
    phase,
    phaseLabel,
    diffCount,
    snapshotFileCount,
    logs,
    logCount: logs.length,
    hasCounts:
      diffCount !== null || snapshotFileCount !== null || logs.length > 0,
  };
}

export function getSnapshotMeta(
  structured?: CodexForgeStructuredReply | null
): CodexForgeSnapshotMetaSummary {
  const snapshot = getSnapshotRecord(structured);

  const fileCount = normalizeNumber(snapshot?.fileCount);
  const sampledPaths = normalizeStringArray(snapshot?.sampledPaths);

  return {
    hasSnapshot:
      !!snapshot || fileCount !== null || sampledPaths.length > 0,
    fileCount,
    sampledPaths,
    sampledPathCount: sampledPaths.length,
  };
}

export function getDiffMeta(
  structured?: CodexForgeStructuredReply | null
): CodexForgeDiffMetaSummary & { diffs: CodexForgeDiff[] } {
  const validDiffs = normalizeDiffs(structured?.diffs);

  return {
    hasDiffs: validDiffs.length > 0,
    count: validDiffs.length,
    filePaths: validDiffs.map((diff) => diff.filePath),
    diffs: validDiffs,
  };
}

/* ================= SUMMARY ================= */

export function getStructuredSummaryMeta(
  structured?: CodexForgeStructuredReply | null
): CodexForgeStructuredSummaryMeta {
  const plan = getStructuredPlan(structured);
  const tools = Array.isArray(structured?.tools) ? structured.tools : [];
  const sections = Array.isArray(structured?.sections) ? structured.sections : [];
  const nextSteps = normalizeStringArray(structured?.nextSteps);
  const context = normalizeStringArray(structured?.context);
  const statusItems = normalizeStringArray(structured?.status);
  const tags = normalizeStringArray(structured?.tags);

  const domain =
    plan?.domain ?? normalizeDomain(structured?.domain) ?? null;

  const executionMeta = getExecutionMeta(structured);
  const snapshotMeta = getSnapshotMeta(structured);
  const diffMeta = getDiffMeta(structured);

  const hasStructuredContent =
    !!plan ||
    context.length > 0 ||
    nextSteps.length > 0 ||
    tools.length > 0 ||
    sections.length > 0 ||
    statusItems.length > 0 ||
    tags.length > 0 ||
    !!normalizeString(structured?.title) ||
    !!normalizeString(structured?.summary) ||
    !!normalizeString(structured?.goal) ||
    !!domain ||
    executionMeta.hasExecution ||
    snapshotMeta.hasSnapshot ||
    diffMeta.hasDiffs;

  return {
    modeLabel: getStructuredModeLabel(structured),
    statusLabel: getStructuredStatusLabel(structured),
    domainLabel: getDomainLabel(domain),
    hasPlan: !!plan,
    isExecution: isStructuredExecutionReply(structured),
    isFallback: isStructuredFallbackReply(structured),
    hasExecutionMeta: executionMeta.hasExecution,
    hasSnapshotMeta: snapshotMeta.hasSnapshot,
    hasDiffMeta: diffMeta.hasDiffs,
    stepCount: plan?.steps.length ?? nextSteps.length,
    toolCount: tools.length,
    sectionCount: sections.length,
    contextCount: context.length,
    statusCount: statusItems.length,
    tagCount: tags.length,
    diffCount: diffMeta.count,
    snapshotFileCount: snapshotMeta.fileCount,
    logCount: executionMeta.logCount,
    hasStructuredContent,
  };
}

export function shouldPreferStructuredOverPlainText(
  structured?: CodexForgeStructuredReply | null,
  text?: string | null
): boolean {
  const trimmed = normalizeString(text);
  if (!trimmed) return true;

  const meta = getStructuredSummaryMeta(structured);
  if (!meta.hasStructuredContent) return false;

  if (
    meta.hasPlan ||
    meta.toolCount > 0 ||
    meta.sectionCount > 0 ||
    meta.hasDiffMeta
  ) {
    return trimmed.length > 140;
  }

  if (
    meta.hasExecutionMeta ||
    meta.hasSnapshotMeta ||
    meta.domainLabel ||
    meta.tagCount > 0
  ) {
    return trimmed.length > 180;
  }

  return trimmed.length > 220;
}

/* ================= RENDER ================= */

export function renderStructuredReply(
  structured?: CodexForgeStructuredReply | null,
  onToolExecutionResult?: (event: CodexForgeToolExecutionEvent) => void
) {
  if (!structured) return null;

  return (
    <StructuredReplyBlock
      structured={structured}
      onToolExecutionResult={onToolExecutionResult}
    />
  );
}

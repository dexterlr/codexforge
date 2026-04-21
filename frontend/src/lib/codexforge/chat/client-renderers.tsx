import React from "react";
import { StructuredReplyBlock } from "@/lib/codexforge/chat/components/structured-reply-block";
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

/* ================= SOURCE ================= */

export function getSourceLabel(message: CodexForgeMessage): string {
  if (message.source === "local-fallback") return "Local fallback";
  if (message.source === "system") return "System";
  return "API";
}

/* ================= NORMALIZERS ================= */

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeDomain(value: unknown): CodexForgePlanDomain | undefined {
  const domain = normalizeString(value);
  if (!domain) return undefined;

  if (
    domain === "general" ||
    domain === "web" ||
    domain === "research" ||
    domain === "debug" ||
    domain === "game-server" ||
    domain === "movie" ||
    domain === "video" ||
    domain === "comfyui" ||
    domain === "unreal" ||
    domain === "automation"
  ) {
    return domain;
  }

  return undefined;
}

function normalizePlanStatus(
  value: unknown
): CodexForgePlan["status"] | undefined {
  const status = normalizeString(value);
  if (!status) return undefined;

  if (
    status === "draft" ||
    status === "active" ||
    status === "completed" ||
    status === "executed" ||
    status === "blocked" ||
    status === "needs-approval"
  ) {
    return status;
  }

  return undefined;
}

function normalizeExecutionPhase(
  value: unknown
): CodexForgeExecutionPhase | undefined {
  const phase = normalizeString(value);
  if (!phase) return undefined;

  if (
    phase === "idle" ||
    phase === "planning" ||
    phase === "awaiting_plan_approval" ||
    phase === "diffing" ||
    phase === "awaiting_diff_approval" ||
    phase === "applying" ||
    phase === "testing" ||
    phase === "done" ||
    phase === "error" ||
    phase === "fallback"
  ) {
    return phase;
  }

  return undefined;
}

function normalizeDiffs(value: unknown): CodexForgeDiff[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): CodexForgeDiff | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const filePath = normalizeString(record.filePath);
      const patch = normalizeString(record.patch);

      if (!filePath || !patch) {
        return null;
      }

      return {
        filePath,
        patch,
      };
    })
    .filter((item): item is CodexForgeDiff => item !== null);
}

/* ================= LABEL HELPERS ================= */

export function getDomainLabel(domain?: CodexForgePlanDomain | null) {
  if (!domain) return null;

  switch (domain) {
    case "game-server":
      return "Game Server";
    case "movie":
      return "Movie";
    case "video":
      return "Video";
    case "comfyui":
      return "ComfyUI";
    case "unreal":
      return "Unreal";
    case "web":
      return "Web";
    case "research":
      return "Research";
    case "debug":
      return "Debug";
    case "automation":
      return "Automation";
    default:
      return "General";
  }
}

export function getPlanStatusLabel(status?: CodexForgePlan["status"] | null) {
  if (!status) return null;

  switch (status) {
    case "draft":
      return "Draft";
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    case "executed":
      return "Executed";
    case "blocked":
      return "Blocked";
    case "needs-approval":
      return "Needs approval";
    default:
      return status;
  }
}

export function getExecutionPhaseLabel(
  phase?: CodexForgeExecutionPhase | null
) {
  if (!phase) return null;

  switch (phase) {
    case "idle":
      return "Idle";
    case "planning":
      return "Planning";
    case "awaiting_plan_approval":
      return "Awaiting plan approval";
    case "diffing":
      return "Diffing";
    case "awaiting_diff_approval":
      return "Awaiting diff approval";
    case "applying":
      return "Applying";
    case "testing":
      return "Testing";
    case "done":
      return "Done";
    case "error":
      return "Error";
    case "fallback":
      return "Fallback";
    default:
      return phase;
  }
}

/* ================= PLAN HELPERS ================= */

export function getStructuredPlan(
  structured?: CodexForgeStructuredReply | null
): CodexForgePlan | null {
  if (!structured) return null;

  if (structured.plan) {
    const goal = normalizeString(structured.plan.goal);
    const steps = normalizeStringArray(structured.plan.steps);
    const risks = normalizeStringArray(structured.plan.risks);
    const files = normalizeStringArray(structured.plan.files);
    const commands = normalizeStringArray(structured.plan.commands);
    const notes = normalizeStringArray(structured.plan.notes);
    const tags = normalizeStringArray(structured.plan.tags);
    const nextAction =
      normalizeString(structured.plan.nextAction) ?? steps[0] ?? undefined;
    const status = normalizePlanStatus(structured.plan.status) ?? "active";
    const intent = normalizeString(structured.plan.intent) ?? undefined;
    const domain =
      normalizeDomain(structured.plan.domain) ??
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

  if (legacyGoal && legacySteps.length > 0) {
    const domain = normalizeDomain(structured.domain) ?? undefined;
    const tags = normalizeStringArray(structured.tags);

    return {
      goal: legacyGoal,
      steps: legacySteps,
      risks: normalizeStringArray(structured.risks),
      files: normalizeStringArray(structured.files),
      commands: normalizeStringArray(structured.commands),
      nextAction: legacySteps[0],
      ...(domain ? { domain } : {}),
      ...(tags.length > 0 ? { tags } : {}),
      status: "active",
    };
  }

  return null;
}

export function getNextAction(plan: CodexForgePlan | null) {
  if (!plan) return null;
  return normalizeString(plan.nextAction) ?? plan.steps[0] ?? null;
}

export function getPlanProgress(plan: CodexForgePlan | null, index: number) {
  if (!plan || plan.steps.length === 0) return 0;
  return Math.min(((index + 1) / plan.steps.length) * 100, 100);
}

export function hasPlanContent(plan: CodexForgePlan | null) {
  if (!plan) return false;

  return (
    !!normalizeString(plan.goal) ||
    plan.steps.length > 0 ||
    (plan.files?.length ?? 0) > 0 ||
    (plan.commands?.length ?? 0) > 0 ||
    (plan.risks?.length ?? 0) > 0
  );
}

/* ================= MODE / STATUS ================= */

export function getStructuredModeLabel(
  structured?: CodexForgeStructuredReply | null
) {
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
) {
  const plan = getStructuredPlan(structured);
  return getPlanStatusLabel(plan?.status);
}

export function isStructuredExecutionReply(
  structured?: CodexForgeStructuredReply | null
) {
  return (
    structured?.mode === "local-execution" ||
    structured?.mode === "local-execution-fallback"
  );
}

export function isStructuredFallbackReply(
  structured?: CodexForgeStructuredReply | null
) {
  return (
    structured?.mode === "local-fallback" ||
    structured?.mode === "local-execution-fallback"
  );
}

/* ================= EXECUTION ================= */

export function getExecutionMeta(
  structured?: CodexForgeStructuredReply | null
): CodexForgeExecutionMeta {
  const execution = structured?.execution;
  const stepText = normalizeString(execution?.stepText);
  const resultSummary = normalizeString(execution?.resultSummary);
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
  const snapshot = structured?.snapshot;
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
  const domain = plan?.domain ?? normalizeDomain(structured?.domain) ?? null;
  const executionMeta = getExecutionMeta(structured);
  const snapshotMeta = getSnapshotMeta(structured);
  const diffMeta = getDiffMeta(structured);

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
    hasStructuredContent:
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
      diffMeta.hasDiffs,
  };
}

export function shouldPreferStructuredOverPlainText(
  structured?: CodexForgeStructuredReply | null,
  text?: string | null
) {
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
  structured?: CodexForgeStructuredReply | null
) {
  if (!structured) return null;
  return <StructuredReplyBlock structured={structured} />;
}
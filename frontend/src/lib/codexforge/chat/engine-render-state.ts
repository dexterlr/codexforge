// src/lib/codexforge/chat/engine-render-state.ts

import type {
  CodexForgeChatContext,
} from "../types";

import type {
  CodexForgeEngineAnalysis,
  CodexForgeEnginePlan,
} from "./contracts";

import {
  LIMITS,
  clampList,
  clampOptionalList,
  clampText,
  getExecutionDiffCount,
  getExecutionRequest,
  getExecutionSnapshotFileCount,
  isExecutionMode,
  resolveExecutionPhase,
} from "./engine-shared";

import {
  buildPlanStatus,
} from "./engine-analysis";

/* ================= TYPES ================= */

type MaybeString = string | undefined | null | false;

/* ================= CONSTANTS ================= */

const MAX_VISIBLE_DIFF_PREVIEWS = 8;

/* ================= GENERIC HELPERS ================= */

function compact(values: MaybeString[]): string[] {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => value.length > 0);
}

function clampItems<T>(items: T[] | undefined, max: number): T[] {
  return Array.isArray(items) ? items.slice(0, max) : [];
}
/* ================= SUMMARY ================= */

function buildExecutionSummary(context: CodexForgeChatContext): string {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const pendingDiffPreviews = context.pendingDiffPreviews?.length ?? 0;
  const pendingApprovals = context.pendingApprovals?.length ?? 0;

  const parts = compact([
    request?.stepText
      ? `Processed step "${request.stepText}"`
      : "Processed execution step",
    `phase ${phase}`,
    typeof diffCount === "number"
      ? `${diffCount} diff preview${diffCount === 1 ? "" : "s"}`
      : "",
    pendingDiffPreviews > 0
      ? `${pendingDiffPreviews} pending preview${
          pendingDiffPreviews === 1 ? "" : "s"
        }`
      : "",
    pendingApprovals > 0
      ? `${pendingApprovals} pending approval${
          pendingApprovals === 1 ? "" : "s"
        }`
      : "",
    typeof snapshotFileCount === "number"
      ? `${snapshotFileCount} snapshot file${
          snapshotFileCount === 1 ? "" : "s"
        }`
      : "",
  ]);

  return clampText(parts.join(" • "), LIMITS.maxSummaryText);
}

export function buildSummary(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): string {
  if (isExecutionMode(context)) {
    return buildExecutionSummary(context);
  }

  return clampText(
    plan.goal ?? `Generated ${analysis.intent} response.`,
    LIMITS.maxSummaryText
  );
}

/* ================= EXECUTION ================= */

export function buildExecution(context: CodexForgeChatContext) {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const pendingApprovalCount = context.pendingApprovals?.length ?? 0;
  const diffPreviewCount = context.pendingDiffPreviews?.length ?? 0;

  const hasExecution =
    request?.mode === "execute-task-step" ||
    !!context.execution?.enginePhase ||
    typeof diffCount === "number" ||
    typeof snapshotFileCount === "number" ||
    pendingApprovalCount > 0 ||
    diffPreviewCount > 0;

  if (!hasExecution) {
    return undefined;
  }

  const logs =
    request?.mode === "execute-task-step"
      ? clampList(
          compact([
            "Execution request interpreted locally.",
            request.stepText ? `Processed step: ${request.stepText}` : "",
            typeof diffCount === "number" ? `Diff count: ${diffCount}` : "",
            diffPreviewCount > 0 ? `Diff previews: ${diffPreviewCount}` : "",
            pendingApprovalCount > 0
              ? `Pending approvals: ${pendingApprovalCount}`
              : "",
            typeof snapshotFileCount === "number"
              ? `Snapshot files: ${snapshotFileCount}`
              : "",
          ]),
          6
        )
      : undefined;

  return {
    ...(typeof request?.stepIndex === "number"
      ? { stepIndex: request.stepIndex }
      : {}),
    ...(request?.stepText ? { stepText: request.stepText } : {}),
    phase,
    ...(typeof diffCount === "number" ? { diffCount } : {}),
    ...(typeof snapshotFileCount === "number" ? { snapshotFileCount } : {}),
    ...(pendingApprovalCount > 0 ? { pendingApprovalCount } : {}),
    ...(diffPreviewCount > 0 ? { diffPreviewCount } : {}),
    resultSummary: buildExecutionSummary(context),
    ...(logs?.length ? { logs } : {}),
  };
}

/* ================= PLAN ================= */

export function buildStructuredPlan(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
) {
  const request = getExecutionRequest(context);
  const activeSteps = clampList(
    context.activePlan?.steps ?? [],
    LIMITS.maxPlanSteps
  );

  const steps =
    activeSteps.length > 0
      ? activeSteps
      : clampList(plan.nextSteps, LIMITS.maxPlanSteps);

  return {
    goal: plan.goal,
    steps,
    nextAction:
      request?.mode === "execute-task-step"
        ? plan.nextSteps[0] ?? "Review result"
        : context.activePlan?.nextAction ?? plan.nextSteps[0] ?? "Continue",
    risks: clampOptionalList(plan.risks, LIMITS.maxRisks),
    files: clampOptionalList(plan.files, LIMITS.maxFiles),
    commands: clampOptionalList(plan.commands, LIMITS.maxCommands),
    status: buildPlanStatus(analysis.intent, context),
    intent: analysis.intent,
    domain: plan.domain,
    tags: clampOptionalList(plan.tags, LIMITS.maxTags),
    ...(context.pendingApprovals?.length
      ? {
          approvals: clampItems(
            context.pendingApprovals,
            MAX_VISIBLE_DIFF_PREVIEWS
          ),
        }
      : {}),
    ...(context.pendingDiffPreviews?.length
      ? {
          diffPreviews: clampItems(
            context.pendingDiffPreviews,
            MAX_VISIBLE_DIFF_PREVIEWS
          ),
        }
      : {}),
  };
}

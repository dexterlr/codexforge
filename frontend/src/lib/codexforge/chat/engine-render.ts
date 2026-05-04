// src/lib/codexforge/chat/engine-render.ts

import type {
  CodexForgeChatContext,
  CodexForgeStructuredReply,
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
  buildUnderstandingItems,
} from "./engine-analysis";
import { buildDiffPreviewBundle, getDiffs } from "./engine-render-diff-preview";
import { buildCleanSections } from "./engine-render-sections";

/* ================= TYPES ================= */

type MaybeString = string | undefined | null | false;

type TextSection = {
  title: string;
  items: string[];
};

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

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeKey(value: string): string {
  return normalizeWhitespace(value).toLowerCase();
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = normalizeKey(trimmed);
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(trimmed);
  }

  return output;
}

function normalizeVisibleText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\\\/]+/g, "/")
    .replace(/\s+/g, " ")
    .replace(/[â€¢\-â€“â€”:;.]+$/g, "")
    .trim();
}

function safeSlug(value: string): string {
  const slug = value
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);

  return slug || "target";
}

function getFileName(filePath: string): string {
  const parts = filePath.replace(/\\/g, "/").split("/").filter(Boolean);
  return parts[parts.length - 1] ?? filePath;
}

function createStableId(prefix: string, filePath: string, index: number): string {
  return `${prefix}-${index + 1}-${safeSlug(filePath)}`;
}

function countPatchChanges(patch: string): { additions: number; deletions: number } {
  let additions = 0;
  let deletions = 0;

  for (const line of patch.split(/\r?\n/)) {
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    if (line.startsWith("+")) additions += 1;
    if (line.startsWith("-")) deletions += 1;
  }

  return { additions, deletions };
}

function summarizePatch(filePath: string, patch: string): string {
  const { additions, deletions } = countPatchChanges(patch);
  const fileName = getFileName(filePath);

  if (additions === 0 && deletions === 0) {
    return `Reviewable diff preview for ${fileName}.`;
  }

  return `Reviewable diff preview for ${fileName}: +${additions} / -${deletions}.`;
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

  return clampText(parts.join(" â€¢ "), LIMITS.maxSummaryText);
}

function buildSummary(
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

function buildExecution(context: CodexForgeChatContext) {
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

function buildStructuredPlan(
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

/* ================= STRUCTURED ================= */

export function buildStructured(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): CodexForgeStructuredReply {
  const now = Date.now();
  const execution = buildExecution(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const sections = buildCleanSections(plan);
  const diffPreviewBundle = buildDiffPreviewBundle(context, now);

  const contextItems = clampOptionalList(
    dedupeStrings(plan.contextNotes ?? []),
    LIMITS.maxContextItems
  );

  const understandingItems = clampOptionalList(
    dedupeStrings(buildUnderstandingItems(analysis, context, plan)),
    LIMITS.maxUnderstandingItems
  );

  const statusItems = clampOptionalList(
    dedupeStrings([
      ...(plan.status ?? []),
      ...(diffPreviewBundle.diffPreviews?.length
        ? [
            "Approval-required diff previews are available.",
            "Diff previews are dry-run by default.",
          ]
        : []),
    ]),
    LIMITS.maxStatusItems
  );

  return {
    mode: isExecutionMode(context) ? "local-execution" : "local",

    title: isExecutionMode(context)
      ? `${analysis.projectName} execution update`
      : `${analysis.projectName} ${analysis.intent}`,

    summary: buildSummary(analysis, plan, context),
    goal: plan.goal,
    context: contextItems,
    understanding: understandingItems,
    sections,

    files: clampOptionalList(dedupeStrings(plan.files ?? []), LIMITS.maxFiles),
    commands: clampOptionalList(
      dedupeStrings(plan.commands ?? []),
      LIMITS.maxCommands
    ),
    risks: clampOptionalList(dedupeStrings(plan.risks ?? []), LIMITS.maxRisks),
    nextSteps: clampOptionalList(
      dedupeStrings(plan.nextSteps ?? []),
      LIMITS.maxNextSteps
    ),

    status: statusItems,
    tools: plan.recommendedTools,
    plan: buildStructuredPlan(analysis, plan, context),
    domain: plan.domain,
    tags: clampOptionalList(dedupeStrings(plan.tags ?? []), LIMITS.maxTags),
    execution,

    snapshot:
      typeof snapshotFileCount === "number"
        ? {
            fileCount: snapshotFileCount,
            sampledPaths: [],
          }
        : undefined,

    diffs: getDiffs(context),

    ...(diffPreviewBundle.diffPreviews?.length
      ? { diffPreviews: diffPreviewBundle.diffPreviews }
      : {}),
    ...(diffPreviewBundle.diffPreviewBatch
      ? { diffPreviewBatch: diffPreviewBundle.diffPreviewBatch }
      : {}),
    ...(diffPreviewBundle.approvals?.length
      ? { approvals: diffPreviewBundle.approvals }
      : {}),
  };
}

/* ================= GROUNDED TEXT RENDERING ================= */
/* ================= TEXT RENDER EXPORT ================= */

export { structuredToText } from "./engine-render-text";







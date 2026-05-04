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
  clampOptionalList,
  getExecutionSnapshotFileCount,
  isExecutionMode,
} from "./engine-shared";

import {
  buildUnderstandingItems,
} from "./engine-analysis";
import { buildDiffPreviewBundle, getDiffs } from "./engine-render-diff-preview";
import { buildCleanSections } from "./engine-render-sections";
import { buildExecution, buildStructuredPlan, buildSummary } from "./engine-render-state";

/* ================= TYPES ================= */

/* ================= CONSTANTS ================= */


/* ================= GENERIC HELPERS ================= */

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











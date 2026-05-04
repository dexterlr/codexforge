// src/lib/codexforge/chat/engine-render-diff-preview.ts

import type {
  CodexForgeApprovalGate,
  CodexForgeChatContext,
  CodexForgeDiff,
  CodexForgeDiffPreview,
  CodexForgeDiffPreviewBatch,
} from "../types";

import {
  LIMITS,
} from "./engine-shared";

/* ================= TYPES ================= */

type DiffPreviewBuildResult = {
  diffPreviews?: CodexForgeDiffPreview[];
  diffPreviewBatch?: CodexForgeDiffPreviewBatch;
  approvals?: CodexForgeApprovalGate[];
};

/* ================= GENERIC HELPERS ================= */

function clampItems<T>(items: T[] | undefined, max: number): T[] {
  return Array.isArray(items) ? items.slice(0, max) : [];
}

const MAX_VISIBLE_DIFF_PREVIEWS = 8;
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
/* ================= APPROVAL / DIFF PREVIEWS ================= */

function buildDiffApprovalGate(args: {
  filePath: string;
  index: number;
  now: number;
}): CodexForgeApprovalGate {
  return {
    id: createStableId("approval", args.filePath, args.index),
    kind: "diff",
    state: "pending",
    label: `Approve diff for ${getFileName(args.filePath)}`,
    reason:
      "Diff previews must be explicitly approved before apply-diff can mutate files. Dry-run preview generated from chat.",
    createdAt: args.now,
    updatedAt: args.now,
    requiresExplicitUserAction: true,
  };
}

function buildBatchApprovalGate(args: {
  previewCount: number;
  now: number;
}): CodexForgeApprovalGate {
  return {
    id: `approval-batch-${args.now}`,
    kind: "diff",
    state: "pending",
    label: "Approve diff preview batch",
    reason: `${args.previewCount} pending diff preview${
      args.previewCount === 1 ? "" : "s"
    } require explicit approval before apply-diff can run.`,
    createdAt: args.now,
    updatedAt: args.now,
    requiresExplicitUserAction: true,
  };
}

function buildDiffPreviewStatus(
  diff: CodexForgeDiff
): CodexForgeDiffPreview["status"] {
  if (diff.approvalState === "approved") return "approved";
  if (diff.approvalState === "rejected") return "rejected";
  return "awaiting-approval";
}

function buildDiffPreviewFromDiff(args: {
  diff: CodexForgeDiff;
  index: number;
  now: number;
}): CodexForgeDiffPreview {
  const approval = buildDiffApprovalGate({
    filePath: args.diff.filePath,
    index: args.index,
    now: args.now,
  });

  return {
    id: createStableId("diff-preview-node", args.diff.filePath, args.index),
    previewId:
      args.diff.previewId ??
      createStableId("diff-preview", args.diff.filePath, args.index),
    source: "chat",
    status: buildDiffPreviewStatus(args.diff),
    filePath: args.diff.filePath,
    patch: args.diff.patch,
    summary: summarizePatch(args.diff.filePath, args.diff.patch),
    createdAt: args.now,
    updatedAt: args.now,
    dryRun: args.diff.dryRun ?? true,
    approvalRequired: true,
    approval,
    relatedToolName: "generate-diff",
    metadata: {
      generatedBy: "engine-render",
      sourceDiffIndex: args.index,
      approvalTool: "apply-diff",
      previewTool: "generate-diff",
      staleDiffGuard: true,
    },
  };
}

function normalizeExistingApprovalGate(
  approval: CodexForgeApprovalGate,
  now: number
): CodexForgeApprovalGate {
  return {
    ...approval,
    createdAt: approval.createdAt ?? now,
    updatedAt: approval.updatedAt ?? now,
    requiresExplicitUserAction: approval.requiresExplicitUserAction !== false,
  };
}

function normalizeExistingDiffPreview(
  preview: CodexForgeDiffPreview,
  index: number,
  now: number
): CodexForgeDiffPreview {
  const filePath = preview.filePath.trim();
  const status = preview.status ?? "awaiting-approval";
  const approvalRequired = preview.approvalRequired !== false;
  const dryRun = preview.dryRun !== false;

  const approval =
    preview.approval ??
    (approvalRequired
      ? buildDiffApprovalGate({
          filePath,
          index,
          now,
        })
      : undefined);

  return {
    ...preview,
    filePath,
    status,
    approvalRequired,
    dryRun,
    ...(approval ? { approval: normalizeExistingApprovalGate(approval, now) } : {}),
    createdAt: preview.createdAt ?? now,
    updatedAt: preview.updatedAt ?? now,
  };
}

function getContextDiffPreviews(
  context: CodexForgeChatContext,
  now: number
): CodexForgeDiffPreview[] | undefined {
  const previews = context.pendingDiffPreviews;

  if (!Array.isArray(previews) || previews.length === 0) {
    return undefined;
  }

  const normalized = previews
    .filter(
      (preview): preview is CodexForgeDiffPreview =>
        !!preview &&
        typeof preview.filePath === "string" &&
        preview.filePath.trim().length > 0 &&
        typeof preview.patch === "string"
    )
    .map((preview, index) => normalizeExistingDiffPreview(preview, index, now))
    .slice(0, MAX_VISIBLE_DIFF_PREVIEWS);

  return normalized.length > 0 ? normalized : undefined;
}

function dedupeApprovalGates(
  approvals: CodexForgeApprovalGate[]
): CodexForgeApprovalGate[] {
  const seen = new Set<string>();
  const output: CodexForgeApprovalGate[] = [];

  for (const approval of approvals) {
    const key = `${approval.kind}:${approval.label}:${approval.state}`;
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(approval);
  }

  return output.slice(0, MAX_VISIBLE_DIFF_PREVIEWS + 1);
}

export function buildDiffPreviewBundle(
  context: CodexForgeChatContext,
  now: number
): DiffPreviewBuildResult {
  const existingPreviews = getContextDiffPreviews(context, now);
  const diffs = getDiffs(context);

  const diffPreviews =
    existingPreviews ??
    diffs?.map((diff, index) =>
      buildDiffPreviewFromDiff({
        diff,
        index,
        now,
      })
    );

  if (!diffPreviews?.length) {
    const approvals = clampItems(
      context.pendingApprovals,
      MAX_VISIBLE_DIFF_PREVIEWS
    ).map((approval) => normalizeExistingApprovalGate(approval, now));

    return {
      ...(approvals.length ? { approvals } : {}),
    };
  }

  const previewApprovals = diffPreviews.flatMap((preview) =>
    preview.approval ? [preview.approval] : []
  );

  const batchApproval = buildBatchApprovalGate({
    previewCount: diffPreviews.length,
    now,
  });

  const approvals = dedupeApprovalGates([
    batchApproval,
    ...previewApprovals,
    ...clampItems(context.pendingApprovals, MAX_VISIBLE_DIFF_PREVIEWS).map(
      (approval) => normalizeExistingApprovalGate(approval, now)
    ),
  ]);

  const diffPreviewBatch: CodexForgeDiffPreviewBatch = {
    id: `diff-preview-batch-node-${now}`,
    batchId: `diff-preview-batch-${now}`,
    status: "awaiting-approval",
    title: "Pending diff previews",
    summary: `${diffPreviews.length} diff preview${
      diffPreviews.length === 1 ? "" : "s"
    } awaiting approval.`,
    previews: diffPreviews,
    createdAt: now,
    updatedAt: now,
    approvalRequired: true,
    approval: batchApproval,
    metadata: {
      source: "chat",
      dryRun: true,
      previewTool: "generate-diff",
      applyTool: "apply-diff",
      staleDiffGuard: true,
    },
  };

  return {
    diffPreviews,
    diffPreviewBatch,
    approvals,
  };
}

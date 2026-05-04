import React, { useCallback, useMemo, useState } from "react";
import {
  getDiffMeta,
  getExecutionMeta,
  getExecutionPhaseLabel,
  getSourceLabel,
  getStructuredPlan,
  getStructuredSummaryMeta,
  renderStructuredReply,
  shouldPreferStructuredOverPlainText,
} from "@/lib/codexforge/chat/client-renderers";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type {
  CodexForgeApprovalGate,
  CodexForgeDiffPreview,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgeRole,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

type ChatMessageProps = {
  message: CodexForgeMessage;
  copiedId: string;
  formatTime: (ts: number) => string;
  onCopy: (message: CodexForgeMessage) => void | Promise<void>;
  onUseAsDraft: (message: CodexForgeMessage) => void;

  enginePhase?: CodexForgeExecutionPhase | string;
  diffCount?: number;
  snapshotFileCount?: number;
  isExecuting?: boolean;

  canApprovePlan?: boolean;
  canRejectPlan?: boolean;
  canApproveDiffs?: boolean;
  canRejectDiffs?: boolean;
  canResetEngine?: boolean;

  onApprovePlan?: () => void;
  onRejectPlan?: () => void;
  onApproveDiffs?: () => void;
  onRejectDiffs?: () => void;
  onResetEngine?: () => void;
};

/* ================= ROLE ================= */

function getRoleLabel(role: CodexForgeRole): string {
  if (role === "user") return "You";
  if (role === "assistant") return "CodexForge";
  return "System";
}

function getBubbleStyle(role: CodexForgeRole): React.CSSProperties {
  if (role === "user") return styles.userBubble;
  if (role === "system") return styles.systemBubble;
  return styles.assistantBubble;
}

function getRowStyle(role: CodexForgeRole): React.CSSProperties {
  return {
    display: "grid",
    justifyItems: role === "user" ? "end" : "start",
  };
}

/* ================= GENERIC HELPERS ================= */

function normalizeText(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEnginePhase(
  phase?: CodexForgeExecutionPhase | string
): CodexForgeExecutionPhase | null {
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

  return null;
}

function isEngineCheckpointPhase(
  phase?: CodexForgeExecutionPhase | string
): boolean {
  return (
    phase === "awaiting_plan_approval" || phase === "awaiting_diff_approval"
  );
}

function getMessageToneBadge(
  meta: ReturnType<typeof getStructuredSummaryMeta>
): string | null {
  if (meta.isExecution) return "Execution";
  if (meta.isFallback) return "Fallback";
  if (meta.hasPlan) return "Plan";
  return null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getMetaNumber(
  meta: ReturnType<typeof getStructuredSummaryMeta>,
  key: string
): number {
  const value = (meta as Record<string, unknown>)[key];
  return asNumber(value) ?? 0;
}

function plural(value: number, singular: string, pluralLabel?: string): string {
  return `${value} ${value === 1 ? singular : pluralLabel ?? `${singular}s`}`;
}

function getStructuredDiffPreviews(
  structured?: CodexForgeStructuredReply | null
): CodexForgeDiffPreview[] {
  return Array.isArray(structured?.diffPreviews)
    ? structured.diffPreviews.filter(
        (preview): preview is CodexForgeDiffPreview =>
          !!preview &&
          typeof preview.filePath === "string" &&
          typeof preview.patch === "string"
      )
    : [];
}

function getStructuredApprovals(
  structured?: CodexForgeStructuredReply | null
): CodexForgeApprovalGate[] {
  return Array.isArray(structured?.approvals)
    ? structured.approvals.filter(
        (approval): approval is CodexForgeApprovalGate =>
          !!approval &&
          typeof approval.label === "string" &&
          typeof approval.state === "string"
      )
    : [];
}

function getPendingApprovalCount(
  structured?: CodexForgeStructuredReply | null
): number {
  return getStructuredApprovals(structured).filter(
    (approval) => approval.state === "pending"
  ).length;
}

function getDiffPreviewCount(
  structured?: CodexForgeStructuredReply | null
): number {
  const previewCount = getStructuredDiffPreviews(structured).length;
  const batchCount = structured?.diffPreviewBatch?.previews?.length ?? 0;
  return Math.max(previewCount, batchCount);
}

function getApprovalStateLabel(state?: string): string {
  if (state === "approved") return "Approved";
  if (state === "rejected") return "Rejected";
  if (state === "stale") return "Stale";
  if (state === "failed") return "Failed";
  if (state === "not-required") return "Not required";
  return "Pending";
}

function getPreviewStatusLabel(status?: string): string {
  if (status === "ready") return "Ready";
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  if (status === "stale") return "Stale";
  if (status === "applying") return "Applying";
  if (status === "applied") return "Applied";
  if (status === "failed") return "Failed";
  if (status === "draft") return "Draft";
  return "Awaiting approval";
}

function getStatusStyle(status?: string): React.CSSProperties {
  if (status === "approved" || status === "applied") return approvedBadge;
  if (status === "rejected" || status === "failed") return rejectedBadge;
  if (status === "stale") return staleBadge;
  if (status === "applying") return applyingBadge;
  return pendingBadge;
}

function summarizePatch(patch: string): {
  additions: number;
  deletions: number;
  hunks: number;
} {
  let additions = 0;
  let deletions = 0;
  let hunks = 0;

  for (const line of patch.split(/\r?\n/)) {
    if (line.startsWith("@@")) hunks += 1;
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    if (line.startsWith("+")) additions += 1;
    if (line.startsWith("-")) deletions += 1;
  }

  return { additions, deletions, hunks };
}

function clampPatchForPreview(patch: string, maxLines = 120): string {
  const lines = patch.split(/\r?\n/);
  if (lines.length <= maxLines) return patch;
  return `${lines.slice(0, maxLines).join("\n")}\n\n... truncated ${
    lines.length - maxLines
  } more line${lines.length - maxLines === 1 ? "" : "s"}`;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function shouldShowApprovalActions(args: {
  isAssistant: boolean;
  canApprovePlan: boolean;
  canRejectPlan: boolean;
  canApproveDiffs: boolean;
  canRejectDiffs: boolean;
  canResetEngine: boolean;
}): boolean {
  if (!args.isAssistant) return false;

  return (
    args.canApprovePlan ||
    args.canRejectPlan ||
    args.canApproveDiffs ||
    args.canRejectDiffs ||
    args.canResetEngine
  );
}

/* ================= SMALL UI PIECES ================= */

function CountChip({
  label,
  value,
  style,
}: {
  label: string;
  value: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={style ?? hintBadge}>
      {value} {label}
      {value === 1 ? "" : "s"}
    </span>
  );
}

function ActionButton({
  visible,
  label,
  onClick,
  disabled,
  style,
}: {
  visible?: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  style: React.CSSProperties;
}) {
  if (!visible || !onClick) return null;

  return (
    <button type="button" onClick={onClick} disabled={disabled} style={style}>
      {label}
    </button>
  );
}

function renderPlainTextBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => (
      <div key={`text-block-${index}`} style={plainTextBlock}>
        {block}
      </div>
    ));
}

/* ================= DIFF / APPROVAL UI ================= */

function ApprovalGateRow({ approval }: { approval: CodexForgeApprovalGate }) {
  return (
    <div style={approvalGateRow}>
      <div style={approvalGateMain}>
        <span style={approvalGateLabel}>{approval.label}</span>
        <span style={getStatusStyle(approval.state)}>
          {getApprovalStateLabel(approval.state)}
        </span>
      </div>

      {approval.reason ? (
        <div style={approvalGateReason}>{approval.reason}</div>
      ) : null}
    </div>
  );
}

function DiffPreviewCard({
  preview,
  copiedPreviewId,
  onCopyPatch,
}: {
  preview: CodexForgeDiffPreview;
  copiedPreviewId: string | null;
  onCopyPatch: (preview: CodexForgeDiffPreview) => void;
}) {
  const patchStats = summarizePatch(preview.patch);
  const approvalState = preview.approval?.state ?? "pending";
  const isCopied = copiedPreviewId === preview.previewId;

  return (
    <div style={diffPreviewCard}>
      <div style={diffPreviewHeader}>
        <div style={diffPreviewPathWrap}>
          <div style={diffPreviewFile}>{preview.filePath}</div>
          {preview.summary ? (
            <div style={diffPreviewSummary}>{preview.summary}</div>
          ) : null}
        </div>

        <div style={diffPreviewBadges}>
          <span style={getStatusStyle(preview.status)}>
            {getPreviewStatusLabel(preview.status)}
          </span>
          <span style={getStatusStyle(approvalState)}>
            Approval: {getApprovalStateLabel(approvalState)}
          </span>
          <span style={preview.dryRun ? dryRunBadge : mutationBadge}>
            {preview.dryRun ? "Dry run" : "Mutation"}
          </span>
        </div>
      </div>

      <div style={diffStatsRow}>
        <span style={diffStatChip}>+{patchStats.additions}</span>
        <span style={diffStatChip}>-{patchStats.deletions}</span>
        <span style={diffStatChip}>{plural(patchStats.hunks, "hunk")}</span>
        {preview.validation?.status ? (
          <span style={diffStatChip}>Validation: {preview.validation.status}</span>
        ) : null}
        {preview.applyResult ? (
          <span style={preview.applyResult.ok ? approvedBadge : rejectedBadge}>
            Apply: {preview.applyResult.ok ? "ok" : "failed"}
          </span>
        ) : null}
      </div>

      {preview.approval ? <ApprovalGateRow approval={preview.approval} /> : null}

      <details style={patchDetails}>
        <summary style={patchSummary}>Review patch</summary>
        <pre style={diffPatch}>{clampPatchForPreview(preview.patch)}</pre>
      </details>

      <div style={diffPreviewActions}>
        <button
          type="button"
          onClick={() => onCopyPatch(preview)}
          style={styles.tinyGhostButton}
        >
          {isCopied ? "Patch copied" : "Copy patch"}
        </button>
      </div>
    </div>
  );
}

function DiffPreviewPanel({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const [copiedPreviewId, setCopiedPreviewId] = useState<string | null>(null);

  const previews = getStructuredDiffPreviews(structured);
  const approvals = getStructuredApprovals(structured);
  const batch = structured?.diffPreviewBatch;

  const visibleApprovals = approvals.filter(
    (approval) =>
      !previews.some(
        (preview) =>
          preview.approval?.label === approval.label &&
          preview.approval?.state === approval.state
      )
  );

  const hasDiffUi =
    previews.length > 0 || visibleApprovals.length > 0 || !!batch;

  const copyPatch = useCallback(async (preview: CodexForgeDiffPreview) => {
    const ok = await copyTextToClipboard(preview.patch);
    if (!ok) return;

    setCopiedPreviewId(preview.previewId);
    window.setTimeout(() => setCopiedPreviewId(null), 1600);
  }, []);

  if (!hasDiffUi) return null;

  return (
    <div style={diffPreviewPanel}>
      <div style={diffPreviewPanelHeader}>
        <div>
          <div style={diffPreviewPanelTitle}>Approval diff preview</div>
          <div style={diffPreviewPanelSubtext}>
            Review the generated patch. Applying should stay blocked until an
            explicit approval action is recorded.
          </div>
        </div>

        <div style={diffPreviewPanelBadges}>
          {previews.length > 0 ? (
            <span style={pendingBadge}>{plural(previews.length, "preview")}</span>
          ) : null}

          {getPendingApprovalCount(structured) > 0 ? (
            <span style={pendingBadge}>
              {plural(getPendingApprovalCount(structured), "pending approval")}
            </span>
          ) : null}

          {batch?.status ? (
            <span style={getStatusStyle(batch.status)}>
              Batch: {getPreviewStatusLabel(batch.status)}
            </span>
          ) : null}
        </div>
      </div>

      {batch?.summary ? <div style={batchSummary}>{batch.summary}</div> : null}

      {previews.length > 0 ? (
        <div style={diffPreviewList}>
          {previews.map((preview, index) => (
            <DiffPreviewCard
              key={`${preview.previewId}-${preview.filePath}-${index}`}
              preview={preview}
              copiedPreviewId={copiedPreviewId}
              onCopyPatch={copyPatch}
            />
          ))}
        </div>
      ) : null}

      {visibleApprovals.length > 0 ? (
        <div style={approvalGateList}>
          {visibleApprovals.map((approval, index) => (
            <ApprovalGateRow
              key={`${approval.kind}-${approval.label}-${approval.state}-${index}`}
              approval={approval}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ================= COMPONENT ================= */

export function ChatMessage({
  message,
  copiedId,
  formatTime,
  onCopy,
  onUseAsDraft,
  enginePhase = "idle",
  diffCount = 0,
  snapshotFileCount = 0,
  isExecuting = false,
  canApprovePlan = false,
  canRejectPlan = false,
  canApproveDiffs = false,
  canRejectDiffs = false,
  canResetEngine = false,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: ChatMessageProps) {
  const roleLabel = getRoleLabel(message.role);
  const sourceLabel = getSourceLabel(message);
  const timeLabel = formatTime(message.ts);

  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";
  const isUser = message.role === "user";
  const canUseAsDraft = message.role !== "user";
  const isCopied = copiedId === message.id;

  const bubbleStyle = getBubbleStyle(message.role);
  const rowStyle = getRowStyle(message.role);

  const hasStructured = !!message.structured;
  const plan = getStructuredPlan(message.structured);
  const summaryMeta = getStructuredSummaryMeta(message.structured);
  const toneBadge = getMessageToneBadge(summaryMeta);
  const executionMeta = getExecutionMeta(message.structured);
  const diffMeta = getDiffMeta(message.structured);

  const approvalCount = getMetaNumber(summaryMeta, "approvalCount");
  const pendingApprovalCount =
    getMetaNumber(summaryMeta, "pendingApprovalCount") ||
    getPendingApprovalCount(message.structured);
  const diffPreviewCount =
    getMetaNumber(summaryMeta, "diffPreviewCount") ||
    getDiffPreviewCount(message.structured);

  const normalizedEnginePhase = normalizeEnginePhase(enginePhase);
  const enginePhaseLabel = getExecutionPhaseLabel(normalizedEnginePhase);

  const effectiveDiffCount =
    diffMeta.count > 0 ? diffMeta.count : Math.max(0, diffCount);

  const effectiveSnapshotFileCount =
    summaryMeta.snapshotFileCount !== null
      ? summaryMeta.snapshotFileCount
      : Math.max(0, snapshotFileCount);

  const effectivePhaseLabel =
    executionMeta.phaseLabel ?? enginePhaseLabel ?? null;

  const trimmedText = useMemo(() => normalizeText(message.text), [message.text]);

  const shouldShowPlainText = useMemo(() => {
    if (!trimmedText) return false;
    if (!isAssistant) return true;
    if (!hasStructured) return true;
    return !shouldPreferStructuredOverPlainText(message.structured, trimmedText);
  }, [trimmedText, isAssistant, hasStructured, message.structured]);

  const showApprovalActions = shouldShowApprovalActions({
    isAssistant,
    canApprovePlan,
    canRejectPlan,
    canApproveDiffs,
    canRejectDiffs,
    canResetEngine,
  });

  const showExecutionCard =
    isAssistant &&
    (executionMeta.hasExecution ||
      executionMeta.hasCounts ||
      !!executionMeta.stepText ||
      !!executionMeta.resultSummary);

  const showEngineSummary =
    isAssistant &&
    (isEngineCheckpointPhase(normalizedEnginePhase ?? undefined) ||
      effectiveDiffCount > 0 ||
      effectiveSnapshotFileCount > 0 ||
      diffPreviewCount > 0 ||
      pendingApprovalCount > 0 ||
      !!effectivePhaseLabel);

  const showStructuredBlock = isAssistant && hasStructured;
  const showStructuredOnly = showStructuredBlock && !shouldShowPlainText;

  const leadingSummary =
    isAssistant && trimmedText
      ? trimmedText.split(/\n+/).map((line) => line.trim()).find(Boolean) ?? ""
      : "";

  function handleCopy() {
    void onCopy(message);
  }

  function handleUseAsDraft() {
    onUseAsDraft(message);
  }

  return (
    <div style={rowStyle}>
      <div
        style={{
          ...styles.messageBubble,
          ...bubbleStyle,
          ...(isAssistant ? assistantBubbleEnhanced : {}),
          ...(isUser ? userBubbleEnhanced : {}),
          ...(isSystem ? systemBubbleEnhanced : {}),
        }}
      >
        <div style={styles.messageMeta}>
          <span style={styles.messageRole}>{roleLabel}</span>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={styles.messageSource}>{sourceLabel}</span>
            <span style={styles.messageTime}>{timeLabel}</span>
          </div>
        </div>

        {isAssistant && hasStructured ? (
          <div style={messageMetaChips}>
            {summaryMeta.modeLabel ? (
              <span style={modeBadge}>{summaryMeta.modeLabel}</span>
            ) : null}

            {toneBadge ? <span style={typeBadge}>{toneBadge}</span> : null}

            {summaryMeta.domainLabel ? (
              <span style={domainBadge}>{summaryMeta.domainLabel}</span>
            ) : null}

            {summaryMeta.statusLabel ? (
              <span style={statusBadge}>{summaryMeta.statusLabel}</span>
            ) : plan?.status ? (
              <span style={statusBadge}>{plan.status}</span>
            ) : null}

            {summaryMeta.hasPlan ? (
              <CountChip label="step" value={summaryMeta.stepCount} />
            ) : null}

            {summaryMeta.toolCount > 0 ? (
              <CountChip label="tool" value={summaryMeta.toolCount} />
            ) : null}

            {summaryMeta.sectionCount > 0 ? (
              <CountChip label="section" value={summaryMeta.sectionCount} />
            ) : null}

            {summaryMeta.tagCount > 0 ? (
              <CountChip label="tag" value={summaryMeta.tagCount} />
            ) : null}

            {summaryMeta.diffCount > 0 ? (
              <CountChip label="diff" value={summaryMeta.diffCount} />
            ) : null}

            {diffPreviewCount > 0 ? (
              <CountChip label="preview" value={diffPreviewCount} />
            ) : null}

            {approvalCount > 0 ? (
              <CountChip label="approval" value={approvalCount} />
            ) : null}

            {pendingApprovalCount > 0 ? (
              <CountChip
                label="pending approval"
                value={pendingApprovalCount}
                style={pendingBadge}
              />
            ) : null}

            {summaryMeta.snapshotFileCount !== null ? (
              <CountChip
                label="snapshot file"
                value={summaryMeta.snapshotFileCount}
              />
            ) : null}

            {summaryMeta.logCount > 0 ? (
              <CountChip label="log" value={summaryMeta.logCount} />
            ) : null}
          </div>
        ) : null}

        {isAssistant && leadingSummary && showStructuredOnly ? (
          <div style={assistantHeadlineCard}>
            <div style={assistantHeadlineLabel}>Outcome</div>
            <div style={assistantHeadlineText}>{leadingSummary}</div>
          </div>
        ) : null}

        {showExecutionCard ? (
          <div style={executionCard}>
            <div style={executionTitle}>Execution context</div>

            <div style={executionGrid}>
              {executionMeta.stepNumber !== null ? (
                <div style={executionChip}>Step {executionMeta.stepNumber}</div>
              ) : null}

              {executionMeta.phaseLabel ? (
                <div style={executionChip}>
                  Phase: {executionMeta.phaseLabel}
                </div>
              ) : null}

              {executionMeta.diffCount !== null ? (
                <div style={executionChip}>
                  Diffs: {executionMeta.diffCount}
                </div>
              ) : null}

              {executionMeta.snapshotFileCount !== null ? (
                <div style={executionChip}>
                  Snapshot files: {executionMeta.snapshotFileCount}
                </div>
              ) : null}

              {executionMeta.logCount > 0 ? (
                <div style={executionChip}>Logs: {executionMeta.logCount}</div>
              ) : null}

              {summaryMeta.domainLabel ? (
                <div style={executionChip}>{summaryMeta.domainLabel}</div>
              ) : null}
            </div>

            {executionMeta.stepText ? (
              <div style={executionText}>{executionMeta.stepText}</div>
            ) : null}

            {executionMeta.resultSummary ? (
              <div style={executionResult}>{executionMeta.resultSummary}</div>
            ) : null}

            {executionMeta.logs.length > 0 ? (
              <div style={executionLogsWrap}>
                {executionMeta.logs.map((logLine, index) => (
                  <div key={`${message.id}-log-${index}`} style={executionLogLine}>
                    {logLine}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {showEngineSummary ? (
          <div style={engineSummaryCard}>
            <div style={engineSummaryTitle}>Engine checkpoint</div>

            <div style={engineSummaryGrid}>
              {effectivePhaseLabel ? (
                <div style={engineStatChip}>Phase: {effectivePhaseLabel}</div>
              ) : null}

              {effectiveDiffCount > 0 ? (
                <div style={engineStatChip}>Diffs: {effectiveDiffCount}</div>
              ) : null}

              {diffPreviewCount > 0 ? (
                <div style={engineStatChip}>Previews: {diffPreviewCount}</div>
              ) : null}

              {pendingApprovalCount > 0 ? (
                <div style={engineStatChip}>
                  Pending approvals: {pendingApprovalCount}
                </div>
              ) : null}

              {effectiveSnapshotFileCount > 0 ? (
                <div style={engineStatChip}>
                  Snapshot files: {effectiveSnapshotFileCount}
                </div>
              ) : null}

              {diffMeta.filePaths.length > 0 ? (
                <div style={engineStatChip}>
                  Files touched: {diffMeta.filePaths.length}
                </div>
              ) : null}
            </div>

            {diffMeta.filePaths.length > 0 ? (
              <div style={engineTouchedFiles}>
                {diffMeta.filePaths.map((filePath) => (
                  <span
                    key={`${message.id}-${filePath}`}
                    style={engineTouchedFileChip}
                  >
                    {filePath}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {shouldShowPlainText ? (
          <div style={plainTextWrap}>{renderPlainTextBlocks(trimmedText)}</div>
        ) : null}

        {isAssistant && hasStructured ? (
          <DiffPreviewPanel structured={message.structured} />
        ) : null}

        {showStructuredBlock ? (
          <div style={structuredWrap}>{renderStructuredReply(message.structured)}</div>
        ) : null}

        {showApprovalActions ? (
          <div style={approvalWrap}>
            <div style={approvalHeader}>
              <span style={approvalHeaderLabel}>Available actions</span>
              {isExecuting ? (
                <span style={approvalBusyBadge}>Engine busy</span>
              ) : null}
            </div>

            <div style={approvalBar}>
              <ActionButton
                visible={canApprovePlan}
                label="Approve plan"
                onClick={onApprovePlan}
                disabled={isExecuting}
                style={primaryActionButton}
              />

              <ActionButton
                visible={canRejectPlan}
                label="Reject plan"
                onClick={onRejectPlan}
                disabled={isExecuting}
                style={secondaryActionButton}
              />

              <ActionButton
                visible={canApproveDiffs}
                label="Approve diffs"
                onClick={onApproveDiffs}
                disabled={isExecuting}
                style={primaryActionButton}
              />

              <ActionButton
                visible={canRejectDiffs}
                label="Reject diffs"
                onClick={onRejectDiffs}
                disabled={isExecuting}
                style={secondaryActionButton}
              />

              <ActionButton
                visible={canResetEngine}
                label="Reset engine"
                onClick={onResetEngine}
                disabled={isExecuting}
                style={dangerActionButton}
              />
            </div>
          </div>
        ) : null}

        <div style={styles.messageActions}>
          <button
            type="button"
            onClick={handleCopy}
            style={styles.tinyGhostButton}
            aria-label={`Copy ${roleLabel} message`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>

          {canUseAsDraft ? (
            <button
              type="button"
              onClick={handleUseAsDraft}
              style={styles.tinyGhostButton}
              aria-label={`Use ${roleLabel} message as draft`}
            >
              Use as draft
            </button>
          ) : null}

          {isAssistant && hasStructured ? (
            <span style={hintBadge}>Structured</span>
          ) : null}

          {isSystem ? <span style={systemBadge}>Workspace note</span> : null}
        </div>
      </div>
    </div>
  );
}

/* ================= EXTRA STYLES ================= */

const assistantBubbleEnhanced: React.CSSProperties = {
  boxShadow: "0 14px 40px rgba(2, 6, 23, 0.22)",
};

const userBubbleEnhanced: React.CSSProperties = {
  boxShadow: "0 10px 24px rgba(2, 6, 23, 0.14)",
};

const systemBubbleEnhanced: React.CSSProperties = {
  boxShadow: "0 10px 24px rgba(2, 6, 23, 0.10)",
};

const structuredWrap: React.CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 10,
};

const plainTextWrap: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 8,
};

const plainTextBlock: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  opacity: 0.96,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const assistantHeadlineCard: React.CSSProperties = {
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(59,130,246,0.18)",
  background: "rgba(59,130,246,0.08)",
  display: "grid",
  gap: 6,
};

const assistantHeadlineLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.74,
  fontWeight: 800,
};

const assistantHeadlineText: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 700,
};

const messageMetaChips: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  marginTop: 6,
  marginBottom: 2,
};

const hintBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(16,185,129,0.12)",
  border: "1px solid rgba(16,185,129,0.35)",
  fontWeight: 700,
};

const modeBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(99,102,241,0.12)",
  border: "1px solid rgba(99,102,241,0.35)",
  fontWeight: 700,
};

const typeBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(59,130,246,0.12)",
  border: "1px solid rgba(59,130,246,0.35)",
  fontWeight: 700,
};

const domainBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(168,85,247,0.12)",
  border: "1px solid rgba(168,85,247,0.35)",
  fontWeight: 700,
};

const statusBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(245,158,11,0.12)",
  border: "1px solid rgba(245,158,11,0.35)",
  fontWeight: 700,
};

const systemBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  background: "rgba(148,163,184,0.12)",
  border: "1px solid rgba(148,163,184,0.35)",
  fontWeight: 700,
};

const executionCard: React.CSSProperties = {
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.20)",
  background: "rgba(99,102,241,0.08)",
  display: "grid",
  gap: 8,
};

const executionTitle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.78,
  fontWeight: 800,
};

const executionGrid: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const executionChip: React.CSSProperties = {
  fontSize: 11,
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.24)",
  background: "rgba(255,255,255,0.04)",
  fontWeight: 700,
};

const executionText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  fontWeight: 700,
};

const executionResult: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
};

const executionLogsWrap: React.CSSProperties = {
  display: "grid",
  gap: 6,
  marginTop: 2,
};

const executionLogLine: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.5,
  opacity: 0.82,
  padding: "6px 8px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  wordBreak: "break-word",
};

const engineSummaryCard: React.CSSProperties = {
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  display: "grid",
  gap: 8,
};

const engineSummaryTitle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.75,
  fontWeight: 800,
};

const engineSummaryGrid: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const engineStatChip: React.CSSProperties = {
  fontSize: 11,
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(255,255,255,0.04)",
  fontWeight: 700,
};

const engineTouchedFiles: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
};

const engineTouchedFileChip: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 6,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(255,255,255,0.04)",
  fontWeight: 700,
  wordBreak: "break-word",
};

const diffPreviewPanel: React.CSSProperties = {
  marginTop: 12,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(59,130,246,0.20)",
  background:
    "linear-gradient(180deg, rgba(59,130,246,0.10), rgba(15,23,42,0.14))",
  display: "grid",
  gap: 10,
};

const diffPreviewPanelHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const diffPreviewPanelTitle: React.CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 900,
};

const diffPreviewPanelSubtext: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.78,
};

const diffPreviewPanelBadges: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 6,
  flexWrap: "wrap",
};

const batchSummary: React.CSSProperties = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  lineHeight: 1.55,
};

const diffPreviewList: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

const diffPreviewCard: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(2,6,23,0.24)",
};

const diffPreviewHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const diffPreviewPathWrap: React.CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
};

const diffPreviewFile: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  wordBreak: "break-word",
};

const diffPreviewSummary: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.78,
  lineHeight: 1.45,
};

const diffPreviewBadges: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const diffStatsRow: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
};

const diffStatChip: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 7px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontWeight: 800,
};

const patchDetails: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const patchSummary: React.CSSProperties = {
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  opacity: 0.86,
};

const diffPatch: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.28)",
  fontSize: 12,
  lineHeight: 1.55,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const diffPreviewActions: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const approvalGateList: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const approvalGateRow: React.CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
};

const approvalGateMain: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const approvalGateLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
};

const approvalGateReason: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.45,
  opacity: 0.72,
};

const pendingBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(245,158,11,0.28)",
  background: "rgba(245,158,11,0.12)",
  fontWeight: 800,
};

const approvedBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(16,185,129,0.28)",
  background: "rgba(16,185,129,0.12)",
  fontWeight: 800,
};

const rejectedBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(239,68,68,0.28)",
  background: "rgba(239,68,68,0.12)",
  fontWeight: 800,
};

const staleBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.24)",
  background: "rgba(148,163,184,0.12)",
  fontWeight: 800,
};

const applyingBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.28)",
  background: "rgba(99,102,241,0.12)",
  fontWeight: 800,
};

const dryRunBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(59,130,246,0.28)",
  background: "rgba(59,130,246,0.12)",
  fontWeight: 800,
};

const mutationBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(239,68,68,0.28)",
  background: "rgba(239,68,68,0.12)",
  fontWeight: 800,
};

const approvalWrap: React.CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 8,
  paddingTop: 10,
  borderTop: "1px solid rgba(148,163,184,0.12)",
};

const approvalHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const approvalHeaderLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.72,
  fontWeight: 800,
};

const approvalBusyBadge: React.CSSProperties = {
  fontSize: 10,
  padding: "4px 6px",
  borderRadius: 999,
  border: "1px solid rgba(245,158,11,0.24)",
  background: "rgba(245,158,11,0.12)",
  fontWeight: 800,
};

const approvalBar: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const primaryActionButton: React.CSSProperties = {
  ...styles.pillGhostButton,
  fontWeight: 800,
};

const secondaryActionButton: React.CSSProperties = {
  ...styles.tinyGhostButton,
};

const dangerActionButton: React.CSSProperties = {
  ...styles.pillDanger,
};
import React, { useMemo } from "react";
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
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgeRole,
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
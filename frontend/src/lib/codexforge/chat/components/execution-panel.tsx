import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type ExecutionPanelProps = {
  activeTaskDomainLabel: string;
  completedSteps: number;
  totalSteps: number;
  enginePhaseLabel: string;
  snapshotFileCount: number;
  diffCount: number;
  tagCount: number;
  tags: string[];
  lastRunLabel: string;
  busy: boolean;
  isExecuting: boolean;
  canApprovePlan: boolean;
  canRejectPlan: boolean;
  canApproveDiffs: boolean;
  canRejectDiffs: boolean;
  canResetEngine: boolean;
  onRunCurrentTaskStep: () => void;
  onApprovePlan: () => void;
  onRejectPlan: () => void;
  onApproveDiffs: () => void;
  onRejectDiffs: () => void;
  onResetEngine: () => void;
};

type MetaCardProps = {
  label: string;
  value: React.ReactNode;
};

type ActionButtonProps = {
  visible: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
};

function MetaCard({ label, value }: MetaCardProps) {
  return (
    <div style={compactMetaCardStyle}>
      <div style={compactMetaLabelStyle}>{label}</div>
      <div style={compactMetaValueStyle}>{value}</div>
    </div>
  );
}

function ActionButton({
  visible,
  onClick,
  disabled,
  children,
  style,
}: ActionButtonProps) {
  if (!visible) return null;

  return (
    <button type="button" onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

export function ExecutionPanel({
  activeTaskDomainLabel,
  completedSteps,
  totalSteps,
  enginePhaseLabel,
  snapshotFileCount,
  diffCount,
  tagCount,
  tags,
  lastRunLabel,
  busy,
  isExecuting,
  canApprovePlan,
  canRejectPlan,
  canApproveDiffs,
  canRejectDiffs,
  canResetEngine,
  onRunCurrentTaskStep,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: ExecutionPanelProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Execution</div>

      <div style={compactMetaGridStyle}>
        <MetaCard label="Domain" value={activeTaskDomainLabel} />
        <MetaCard label="Completed" value={`${completedSteps}/${totalSteps}`} />
        <MetaCard label="Engine phase" value={enginePhaseLabel} />
        <MetaCard label="Snapshot" value={snapshotFileCount} />
        <MetaCard label="Diff previews" value={diffCount} />
        <MetaCard label="Tags" value={tagCount} />
      </div>

      <div style={styles.panelText}>
        Last run: <b>{lastRunLabel || "Nothing run yet"}</b>
      </div>

      {tags.length > 0 ? (
        <div style={styles.panelText}>
          Tags: <b>{tags.join(", ")}</b>
        </div>
      ) : null}

      <div style={executionActionsStyle}>
        <button
          type="button"
          onClick={onRunCurrentTaskStep}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting || totalSteps === 0}
        >
          {isExecuting ? "Running…" : "Run current step"}
        </button>

        <ActionButton
          visible={canApprovePlan}
          onClick={onApprovePlan}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting}
        >
          Approve plan
        </ActionButton>

        <ActionButton
          visible={canRejectPlan}
          onClick={onRejectPlan}
          style={styles.tinyGhostButton}
          disabled={busy || isExecuting}
        >
          Reject plan
        </ActionButton>

        <ActionButton
          visible={canApproveDiffs}
          onClick={onApproveDiffs}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting}
        >
          Approve diffs
        </ActionButton>

        <ActionButton
          visible={canRejectDiffs}
          onClick={onRejectDiffs}
          style={styles.tinyGhostButton}
          disabled={busy || isExecuting}
        >
          Reject diffs
        </ActionButton>

        <ActionButton
          visible={canResetEngine}
          onClick={onResetEngine}
          style={styles.pillDanger}
          disabled={busy || isExecuting}
        >
          Reset engine
        </ActionButton>
      </div>
    </div>
  );
}

const compactMetaGridStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 10,
};

const compactMetaCardStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  borderRadius: 12,
  padding: 10,
  display: "grid",
  gap: 4,
};

const compactMetaLabelStyle: React.CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.7,
};

const compactMetaValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
};

const executionActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 8,
};
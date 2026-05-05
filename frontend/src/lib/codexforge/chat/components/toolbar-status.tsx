import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type { CodexForgeExecutionPhase } from "@/lib/codexforge/types";

type ToolbarStatusProps = {
  busy: boolean;
  statusText: string;
  conversationState: string;
  isExecuting: boolean;
  executionLabel: string;
  enginePhase: CodexForgeExecutionPhase;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  activeTaskDomain?: string;
  repoLabel: string;
};

export function ToolbarStatus({
  busy,
  statusText,
  conversationState,
  isExecuting,
  executionLabel,
  enginePhase,
  enginePhaseLabel,
  diffCount,
  snapshotFileCount,
  activeTaskDomain,
  repoLabel,
}: ToolbarStatusProps) {
  return (
    <div style={styles.toolbar}>
      <div style={statusRowStyle}>
        <span style={styles.badge}>
          <span
            aria-hidden="true"
            style={{
              ...statusDotStyle,
              background:
                busy || isExecuting
                  ? "rgba(245,158,11,0.95)"
                  : "rgba(16,185,129,0.95)",
              boxShadow:
                busy || isExecuting
                  ? "0 0 0 4px rgba(245,158,11,0.15)"
                  : "0 0 0 4px rgba(16,185,129,0.15)",
            }}
          />
          {statusText}
        </span>

        <span style={styles.subtleText}>{conversationState}</span>

        {isExecuting ? (
          <span style={executionChipStyle}>
            Running: {executionLabel || "task step"}
          </span>
        ) : null}

        <span style={styles.subtleText}>
          Engine: {enginePhaseLabel || enginePhase}
        </span>
        <span style={styles.subtleText}>Diffs: {diffCount}</span>
        <span style={styles.subtleText}>
          Snapshot files: {snapshotFileCount}
        </span>
        <span style={styles.subtleText}>Repo: {repoLabel}</span>

        {activeTaskDomain ? (
          <span style={styles.subtleText}>Task domain: {activeTaskDomain}</span>
        ) : null}
      </div>

      <div style={styles.subtleText}>
        Main workspace surface for CodexForge planning, memory, conversation,
        and controlled execution guidance.
      </div>
    </div>
  );
}

const statusRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const statusDotStyle: React.CSSProperties = {
  display: "inline-block",
  width: 8,
  height: 8,
  borderRadius: 999,
  marginRight: 8,
};

const executionChipStyle: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.22)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 11,
  fontWeight: 800,
};
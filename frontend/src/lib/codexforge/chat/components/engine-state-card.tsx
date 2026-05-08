import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { ToolExecutionResultPanel } from "./tool-execution-result-panel";
import type { CodexForgeToolExecutionEvent } from "@/lib/codexforge/chat/tool-execution-events";
import type { CodexForgeExecutionPhase } from "@/lib/codexforge/types";

type EngineStateCardProps = {
  enginePhase: CodexForgeExecutionPhase;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  recentLogs: string[];
  sampledPaths: string[];
  diffPaths: string[];
  testOutput?: string;
  engineError?: string;
  canApprovePlan: boolean;
  canRejectPlan: boolean;
  canApproveDiffs: boolean;
  canRejectDiffs: boolean;
  canResetEngine: boolean;
  isExecuting: boolean;
  onApprovePlan: () => void;
  onRejectPlan: () => void;
  onApproveDiffs: () => void;
  onRejectDiffs: () => void;
  onResetEngine: () => void;
  latestToolExecutionEvent?: CodexForgeToolExecutionEvent | null;
  toolExecutionEventCount?: number;
};

type ActionButtonProps = {
  visible: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
};

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

export function EngineStateCard({
  enginePhase,
  enginePhaseLabel,
  diffCount,
  snapshotFileCount,
  recentLogs,
  sampledPaths,
  diffPaths,
  testOutput,
  engineError,
  canApprovePlan,
  canRejectPlan,
  canApproveDiffs,
  canRejectDiffs,
  canResetEngine,
  isExecuting,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
  latestToolExecutionEvent,
  toolExecutionEventCount = 0,
}: EngineStateCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Execution engine</div>

      <div style={engineGridStyle}>
        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Phase</div>
          <div style={engineStatValueStyle}>
            {enginePhaseLabel || enginePhase}
          </div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Diff count</div>
          <div style={engineStatValueStyle}>{diffCount}</div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Snapshot files</div>
          <div style={engineStatValueStyle}>{snapshotFileCount}</div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Recent logs</div>
          <div style={engineStatValueStyle}>{recentLogs.length}</div>
        </div>

        <div style={engineStatCardStyle} data-codexforge-tool-execution-event-count>
          <div style={engineStatLabelStyle}>Tool results</div>
          <div style={engineStatValueStyle}>{toolExecutionEventCount}</div>
        </div>
      </div>

      <div style={approvalBarStyle}>
        <ActionButton
          visible={canApprovePlan}
          onClick={onApprovePlan}
          style={styles.pillGhostButton}
          disabled={isExecuting}
        >
          Approve plan
        </ActionButton>

        <ActionButton
          visible={canRejectPlan}
          onClick={onRejectPlan}
          style={styles.tinyGhostButton}
          disabled={isExecuting}
        >
          Reject plan
        </ActionButton>

        <ActionButton
          visible={canApproveDiffs}
          onClick={onApproveDiffs}
          style={styles.pillGhostButton}
          disabled={isExecuting}
        >
          Approve diffs
        </ActionButton>

        <ActionButton
          visible={canRejectDiffs}
          onClick={onRejectDiffs}
          style={styles.tinyGhostButton}
          disabled={isExecuting}
        >
          Reject diffs
        </ActionButton>

        <ActionButton
          visible={canResetEngine}
          onClick={onResetEngine}
          style={styles.pillDanger}
          disabled={isExecuting}
        >
          Reset engine
        </ActionButton>
      </div>

      {testOutput ? (
        <div style={{ marginTop: 12 }}>
          <div style={styles.panelText}>
            Result: <b>{testOutput}</b>
          </div>
        </div>
      ) : null}

      {engineError ? (
        <div style={alertCardStyle}>
          <div style={styles.panelTitle}>Engine error</div>
          <div style={styles.panelText}>{engineError}</div>
        </div>
      ) : null}

      {latestToolExecutionEvent ? (
        <div style={{ marginTop: 14 }} data-codexforge-persisted-tool-execution-result>
          <ToolExecutionResultPanel executionEvent={latestToolExecutionEvent} />
        </div>
      ) : null}

      {recentLogs.length > 0 ? (
        <div style={logListStyle}>
          {recentLogs.map((entry, index) => (
            <div key={`${entry}-${index}`} style={logItemStyle}>
              {entry}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div style={styles.panelText}>No engine logs yet.</div>
        </div>
      )}

      {diffPaths.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <div style={styles.panelTitle}>Diff targets</div>

          <div style={diffListStyle}>
            {diffPaths.map((path) => (
              <div key={path} style={diffPathStyle}>
                {path}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {sampledPaths.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <div style={styles.panelTitle}>Snapshot sample</div>

          <div style={sampledPathsListStyle}>
            {sampledPaths.map((path) => (
              <div key={path} style={sampledPathStyle}>
                {path}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const engineGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const engineStatCardStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.24)",
  borderRadius: 16,
  padding: 12,
  display: "grid",
  gap: 4,
};

const engineStatLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.7,
};

const engineStatValueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 800,
};

const logListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 8,
};

const logItemStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.2)",
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const sampledPathsListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 6,
};

const sampledPathStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(15,23,42,0.16)",
  fontSize: 12,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: "auto",
};

const diffListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 6,
};

const diffPathStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(15,23,42,0.16)",
  fontSize: 12,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: "auto",
};

const alertCardStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(239,68,68,0.24)",
  background: "rgba(127,29,29,0.18)",
  color: "rgba(254,226,226,0.96)",
  display: "grid",
  gap: 6,
};

const approvalBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 12,
};

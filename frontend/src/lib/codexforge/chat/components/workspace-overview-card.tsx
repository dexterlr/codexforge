import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type WorkspaceOverviewCardProps = {
  hasMessages: boolean;
  messageCount: number;
  activeTaskGoal?: string;
  completedSteps: number;
  totalSteps: number;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  tags: string[];
  isExecuting: boolean;
};

function getConversationDescriptor(messageCount: number, busy: boolean) {
  if (busy) return "Working on your latest request";
  if (messageCount === 0) return "Ready for a real task";
  if (messageCount < 4) return "Conversation just started";
  if (messageCount < 10) return "Context building";
  return "Deep workspace context";
}

function getExecutionDescriptor(params: {
  isExecuting: boolean;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
}) {
  const { isExecuting, enginePhaseLabel, diffCount, snapshotFileCount } = params;

  if (isExecuting) {
    return `Engine is active in ${enginePhaseLabel}.`;
  }

  if (diffCount > 0 || snapshotFileCount > 0) {
    return `Engine is idle with ${diffCount} diff preview${
      diffCount === 1 ? "" : "s"
    } and ${snapshotFileCount} snapshot file${
      snapshotFileCount === 1 ? "" : "s"
    }.`;
  }

  return "Engine is idle and ready for planning, approvals, and execution.";
}

export function WorkspaceOverviewCard({
  hasMessages,
  messageCount,
  activeTaskGoal,
  completedSteps,
  totalSteps,
  enginePhaseLabel,
  diffCount,
  snapshotFileCount,
  tags,
  isExecuting,
}: WorkspaceOverviewCardProps) {
  const conversationDescriptor = getConversationDescriptor(
    messageCount,
    isExecuting
  );

  const executionDescriptor = getExecutionDescriptor({
    isExecuting,
    enginePhaseLabel,
    diffCount,
    snapshotFileCount,
  });

  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Workspace overview</div>

      <div style={primaryWorkspaceCardStyle}>
        <div style={primaryWorkspaceTitleStyle}>
          {activeTaskGoal || "No active task yet"}
        </div>

        <div style={primaryWorkspaceTextStyle}>
          {hasMessages
            ? conversationDescriptor
            : "This workspace should stay useful even before a full task exists. Start with planning, repo inspection, product design, or execution-safe research."}
        </div>

        <div style={panelSubtleTextStyle}>{executionDescriptor}</div>

        {totalSteps > 0 ? (
          <div style={panelSubtleTextStyle}>
            Task progress: <b>{completedSteps}</b> of <b>{totalSteps}</b> steps
            completed.
          </div>
        ) : null}

        {tags.length > 0 ? (
          <div style={miniTagRowStyle}>
            {tags.slice(0, 6).map((tag) => (
              <div key={tag} style={miniTagStyle}>
                {tag}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const primaryWorkspaceCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(99,102,241,0.18)",
  background:
    "linear-gradient(180deg, rgba(99,102,241,0.10), rgba(15,23,42,0.16))",
  display: "grid",
  gap: 10,
};

const primaryWorkspaceTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
};

const primaryWorkspaceTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.92,
};

const miniTagRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const miniTagStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.18)",
  fontSize: 11,
  fontWeight: 700,
};

const panelSubtleTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.55,
  opacity: 0.8,
};
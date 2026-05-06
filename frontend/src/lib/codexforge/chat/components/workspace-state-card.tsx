import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type WorkspaceStateCardProps = {
  repoLabel: string;
  backendLabel: string;
  conversationState: string;
  activeTaskLabel: string;
  memoryCount: number;
  pinnedMemoryCount: number;
  diffCount: number;
  snapshotFileCount: number;
  enginePhaseLabel: string;
  isExecuting: boolean;
};

type MetaCardProps = {
  label: string;
  value: React.ReactNode;
};

function MetaCard({ label, value }: MetaCardProps) {
  return (
    <div style={compactMetaCardStyle}>
      <div style={compactMetaLabelStyle}>{label}</div>
      <div style={compactMetaValueStyle}>{value}</div>
    </div>
  );
}

export function WorkspaceStateCard({
  repoLabel,
  backendLabel,
  conversationState,
  activeTaskLabel,
  memoryCount,
  pinnedMemoryCount,
  diffCount,
  snapshotFileCount,
  enginePhaseLabel,
  isExecuting,
}: WorkspaceStateCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Current workspace</div>

      <div style={workspaceStateGridStyle}>
        <MetaCard label="Repo" value={repoLabel} />
        <MetaCard label="Backend" value={backendLabel} />
        <MetaCard label="Conversation" value={conversationState} />
        <MetaCard label="Task" value={activeTaskLabel} />
        <MetaCard label="Memory" value={memoryCount} />
        <MetaCard label="Pinned" value={pinnedMemoryCount} />
        <MetaCard label="Engine" value={enginePhaseLabel} />
        <MetaCard label="Executing" value={isExecuting ? "Yes" : "No"} />
        <MetaCard label="Diffs" value={diffCount} />
        <MetaCard label="Snapshot files" value={snapshotFileCount} />
      </div>
    </div>
  );
}

const workspaceStateGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 10,
  marginTop: 12,
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
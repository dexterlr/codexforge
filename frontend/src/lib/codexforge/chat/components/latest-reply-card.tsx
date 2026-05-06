import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type LatestReplySnapshot = {
  textLength: number;
  sourceLabel: string;
  structured: boolean;
  toolCount: number;
  domainLabel: string;
  tagCount: number;
  modeLabel: string;
  stepCount: number;
  diffCount: number;
  snapshotFileCount: number | null;
  executionPhaseLabel: string;
  logCount: number;
};

type LatestReplyCardProps = {
  snapshot: LatestReplySnapshot;
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

export function LatestReplyCard({ snapshot }: LatestReplyCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Latest assistant reply</div>

      <div style={compactMetaGridStyle}>
        <MetaCard label="Length" value={snapshot.textLength} />
        <MetaCard label="Source" value={snapshot.sourceLabel} />
        <MetaCard
          label="Structured"
          value={snapshot.structured ? "On" : "Text only"}
        />
        <MetaCard label="Tools" value={snapshot.toolCount} />
        <MetaCard label="Domain" value={snapshot.domainLabel} />
        <MetaCard label="Tags" value={snapshot.tagCount} />
        <MetaCard label="Mode" value={snapshot.modeLabel} />
        <MetaCard label="Steps" value={snapshot.stepCount} />
        <MetaCard label="Diffs" value={snapshot.diffCount} />
        <MetaCard label="Snapshot" value={snapshot.snapshotFileCount ?? "—"} />
        <MetaCard
          label="Execution phase"
          value={snapshot.executionPhaseLabel}
        />
        <MetaCard label="Logs" value={snapshot.logCount} />
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
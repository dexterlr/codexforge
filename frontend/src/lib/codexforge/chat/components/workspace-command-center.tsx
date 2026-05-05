import React from "react";
import type { WorkspaceCard } from "@/lib/codexforge/chat/components/workspace-hero";

type MetaCardProps = {
  label: string;
  value: React.ReactNode;
};

type WorkspaceCommandCenterProps = {
  workspaceCards: WorkspaceCard[];
  repoLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  enginePhaseLabel: string;
  memoryCount: number;
  activeTaskLabel: string;
  backendLabel: string;
};

function MetaCard({ label, value }: MetaCardProps) {
  return (
    <div style={compactMetaCardStyle}>
      <div style={compactMetaLabelStyle}>{label}</div>
      <div style={compactMetaValueStyle}>{value}</div>
    </div>
  );
}

export function WorkspaceCommandCenter({
  workspaceCards,
  repoLabel,
  diffCount,
  snapshotFileCount,
  enginePhaseLabel,
  memoryCount,
  activeTaskLabel,
  backendLabel,
}: WorkspaceCommandCenterProps) {
  return (
    <section style={commandCenterShellStyle}>
      <div style={commandCenterHeaderStyle}>
        <div style={commandCenterKickerStyle}>Workspace command center</div>

        <h2 style={commandCenterTitleStyle}>
          The operational cockpit for memory, planning, chat, and controlled execution.
        </h2>

        <p style={commandCenterTextStyle}>
          CodexForge starts with product-level intent at the top of the page,
          then drops into the live workspace here: current state, context,
          backend posture, task focus, and execution readiness.
        </p>
      </div>

      <div style={commandCenterGridStyle}>
        <div style={commandCenterPrimaryCardStyle}>
          <div style={commandCenterLabelStyle}>Current task</div>
          <div style={commandCenterValueStyle}>{activeTaskLabel}</div>
          <div style={commandCenterSubtextStyle}>
            Keep latest-message authority clear: this workspace should use
            memory and active tasks without letting stale context override the
            newest user request.
          </div>
        </div>

        <div style={commandCenterStatsStyle}>
          <MetaCard label="Repo" value={repoLabel} />
          <MetaCard label="Backend" value={backendLabel} />
          <MetaCard label="Engine" value={enginePhaseLabel} />
          <MetaCard label="Memory" value={memoryCount} />
          <MetaCard label="Diffs" value={diffCount} />
          <MetaCard label="Snapshot files" value={snapshotFileCount} />
        </div>
      </div>

      <div style={commandCenterCardRowStyle}>
        {workspaceCards.map((card) => (
          <div key={card.label} style={commandCenterMiniCardStyle}>
            <div style={commandCenterMiniLabelStyle}>{card.label}</div>
            <div style={commandCenterMiniValueStyle}>{card.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const commandCenterShellStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.82), rgba(2,6,23,0.74))",
  borderRadius: 26,
  padding: 18,
  display: "grid",
  gap: 16,
  boxShadow:
    "0 22px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const commandCenterHeaderStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
  maxWidth: 980,
};

const commandCenterKickerStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(45,212,191,0.92)",
  fontWeight: 950,
};

const commandCenterTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 3vw, 34px)",
  letterSpacing: -0.8,
};

const commandCenterTextStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: 980,
  color: "rgba(226,232,240,0.78)",
  fontSize: 14,
  lineHeight: 1.7,
};

const commandCenterGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  gap: 12,
  alignItems: "stretch",
};

const commandCenterPrimaryCardStyle: React.CSSProperties = {
  border: "1px solid rgba(99,102,241,0.2)",
  background:
    "linear-gradient(180deg, rgba(99,102,241,0.13), rgba(15,23,42,0.30))",
  borderRadius: 20,
  padding: 14,
  display: "grid",
  gap: 8,
};

const commandCenterLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.72,
  fontWeight: 950,
};

const commandCenterValueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 950,
  lineHeight: 1.35,
};

const commandCenterSubtextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  color: "rgba(226,232,240,0.76)",
};

const commandCenterStatsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 10,
};

const commandCenterCardRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
  gap: 10,
};

const commandCenterMiniCardStyle: React.CSSProperties = {
  padding: 11,
  borderRadius: 15,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.22)",
  display: "grid",
  gap: 4,
};

const commandCenterMiniLabelStyle: React.CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.68,
  fontWeight: 900,
};

const commandCenterMiniValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
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
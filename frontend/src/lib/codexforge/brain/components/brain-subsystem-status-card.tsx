import type { CSSProperties } from "react";
import type { CodexForgeRuntimeSubsystemReadiness } from "@/lib/codexforge/brain/runtime";

type BrainSubsystemStatusCardProps = {
  subsystem: CodexForgeRuntimeSubsystemReadiness;
  onInspect?: (subsystem: CodexForgeRuntimeSubsystemReadiness) => void;
};

export function BrainSubsystemStatusCard({
  subsystem,
  onInspect,
}: BrainSubsystemStatusCardProps) {
  const content = (
    <>
      <div style={headerStyle}>
        <strong>{subsystem.label}</strong>
        <span data-codexforge-brain-subsystem-status style={badgeStyle(subsystem.status)}>
          {subsystem.status}
        </span>
      </div>
      <div data-codexforge-brain-subsystem-readiness style={scoreStyle}>
        Readiness {(subsystem.readinessScore * 100).toFixed(0)} percent
      </div>
      <div style={evidenceStyle}>
        {subsystem.evidence.slice(0, 2).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div data-codexforge-brain-subsystem-next-action style={nextStyle}>
        Next safe action: {subsystem.nextSafeAction.label}
      </div>
    </>
  );

  if (onInspect) {
    return (
      <button
        type="button"
        data-codexforge-brain-subsystem-status-card
        onClick={() => onInspect(subsystem)}
        style={{ ...cardStyle, textAlign: "left", color: "inherit", cursor: "pointer" }}
      >
        {content}
      </button>
    );
  }

  return (
    <article data-codexforge-brain-subsystem-status-card style={cardStyle}>
      {content}
    </article>
  );
}

function badgeStyle(status: string): CSSProperties {
  const color =
    status === "blocked"
      ? "rgba(248,113,113,0.95)"
      : status === "degraded"
        ? "rgba(251,146,60,0.95)"
        : status === "partial"
          ? "rgba(250,204,21,0.95)"
          : "rgba(134,239,172,0.95)";

  return {
    borderRadius: 999,
    padding: "3px 7px",
    border: "1px solid rgba(255,255,255,0.10)",
    color,
    background: "rgba(255,255,255,0.04)",
    fontSize: 10,
    fontWeight: 900,
  };
}

const cardStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
};

const headerStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  alignItems: "start",
  fontSize: 12,
};

const scoreStyle: CSSProperties = {
  fontSize: 11,
  color: "rgba(186,230,253,0.86)",
};

const evidenceStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  color: "rgba(226,232,240,0.74)",
  fontSize: 11,
  lineHeight: 1.4,
};

const nextStyle: CSSProperties = {
  color: "rgba(187,247,208,0.88)",
  fontSize: 11,
  lineHeight: 1.45,
};

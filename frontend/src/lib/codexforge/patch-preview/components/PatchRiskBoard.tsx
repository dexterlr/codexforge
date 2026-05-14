"use client";

import type { CSSProperties } from "react";
import type { CodexForgePatchRiskBoard } from "../patch-preview-types";

export function PatchRiskBoard({ board }: { board: CodexForgePatchRiskBoard }) {
  return (
    <section data-codexforge-patch-risk-board style={panel}>
      <div style={header}>
        <div style={textGuard}>
          <div style={eyebrow}>Risk Board</div>
          <strong>{board.level}</strong>
        </div>
        <span style={score}>{board.score}/100</span>
      </div>
      <p style={body}>{board.summary}</p>
      <div style={grid}>
        {board.signals.map((signal, index) => (
          <div key={`${signal.id}-${index}`} style={signalCard(signal.level)}>
            <strong>{signal.label}</strong>
            <span style={status}>{signal.level} / {signal.score}</span>
            <span>{signal.summary}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  ...textGuard,
};

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  alignItems: "flex-start",
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

const score: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.32)",
  background: "rgba(251,191,36,0.11)",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 12,
  fontWeight: 900,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
  ...textGuard,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
  gap: 8,
  ...textGuard,
};

function signalCard(level: string): CSSProperties {
  return {
    border:
      level === "critical" || level === "high"
        ? "1px solid rgba(248,113,113,0.32)"
        : level === "medium"
          ? "1px solid rgba(251,191,36,0.30)"
          : "1px solid rgba(52,211,153,0.25)",
    background:
      level === "critical" || level === "high"
        ? "rgba(248,113,113,0.10)"
        : level === "medium"
          ? "rgba(251,191,36,0.10)"
          : "rgba(52,211,153,0.08)",
    borderRadius: 8,
    padding: 10,
    display: "grid",
    gap: 5,
    fontSize: 12,
    lineHeight: 1.4,
    ...textGuard,
  };
}

const status: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

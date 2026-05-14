"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import type { CodexForgeFileReadinessBoard } from "../file-readiness";

export function FileReadinessBoard({ board }: { board: CodexForgeFileReadinessBoard }) {
  return (
    <section data-codexforge-file-readiness-board style={panel}>
      <div style={header}>
        <div>
          <div style={eyebrow}>Readiness</div>
          <strong>{board.status}</strong>
        </div>
        <span style={score}>{board.score}/100</span>
      </div>
      <p style={body}>{board.summary}</p>
      <div style={grid}>
        {board.items.map((item, index) => (
          <div
            key={buildCodexForgeFileReactKey("readiness", [board.filePath, item.id], index)}
            style={itemCard(item.status)}
          >
            <span style={itemTop}>
              <strong>{item.label}</strong>
              <span>{item.score}</span>
            </span>
            <span style={status}>{item.status}</span>
            <span style={detail}>{item.summary}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  minWidth: 0,
  flexWrap: "wrap",
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const score: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.12)",
  borderRadius: 8,
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 900,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
  gap: 8,
  minWidth: 0,
};

function itemCard(state: string): CSSProperties {
  return {
    border:
      state === "preview-only"
        ? "1px solid rgba(251,191,36,0.34)"
        : state === "review-required"
          ? "1px solid rgba(248,113,113,0.30)"
          : "1px solid rgba(255,255,255,0.10)",
    background:
      state === "preview-only"
        ? "rgba(251,191,36,0.10)"
        : state === "review-required"
          ? "rgba(248,113,113,0.09)"
          : "rgba(0,0,0,0.18)",
    borderRadius: 8,
    padding: 10,
    display: "grid",
    gap: 5,
    minWidth: 0,
  };
}

const itemTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  fontSize: 12,
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const status: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const detail: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.4,
  opacity: 0.76,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

"use client";

import type { CSSProperties } from "react";
import type { BrainRecallResult } from "../brain-recall-types";

type BrainRecallResultCardProps = {
  result: BrainRecallResult;
  selected: boolean;
  onSelect: (resultId: string) => void;
};

export function BrainRecallResultCard({ result, selected, onSelect }: BrainRecallResultCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(result.id)}
      style={card(selected)}
      data-codexforge-brain-recall-result-card
    >
      <div style={top}>
        <strong style={title}>{result.title}</strong>
        <span style={score}>{result.score}</span>
      </div>
      <p style={snippet}>{result.snippet}</p>
      <div style={metaRow}>
        <span>{result.kind}</span>
        <span>{result.status}</span>
        <span>{result.importance}</span>
        <span>{result.relatedContext.files.length} files</span>
      </div>
      <ul style={reasons}>
        {result.reasons.slice(0, 3).map((reason) => (
          <li key={`${result.id}:${reason}`} style={reasonItem}>{reason}</li>
        ))}
      </ul>
    </button>
  );
}

function card(selected: boolean): CSSProperties {
  return {
    width: "100%",
    textAlign: "left",
    color: "inherit",
    border: selected ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.18)",
    background: selected ? "rgba(59,130,246,0.14)" : "rgba(15,23,42,0.58)",
    borderRadius: 8,
    padding: 12,
    display: "grid",
    gap: 8,
    cursor: "pointer",
    minWidth: 0,
  };
}

const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", minWidth: 0 };
const title: CSSProperties = { fontSize: 14, lineHeight: 1.35, overflowWrap: "anywhere" };
const score: CSSProperties = { border: "1px solid rgba(147,197,253,0.28)", borderRadius: 8, padding: "4px 7px", fontSize: 12, fontWeight: 900 };
const snippet: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.78, overflowWrap: "anywhere" };
const metaRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, fontSize: 11, opacity: 0.72, overflowWrap: "anywhere" };
const reasons: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 3 };
const reasonItem: CSSProperties = { fontSize: 11, lineHeight: 1.35, opacity: 0.76, overflowWrap: "anywhere" };

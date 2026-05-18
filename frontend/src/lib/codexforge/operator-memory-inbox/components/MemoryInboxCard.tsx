"use client";

import type { CSSProperties } from "react";
import type { OperatorMemoryInboxCard } from "../operator-memory-inbox-types";

export function MemoryInboxCard({ card, selected, onSelect }: { card: OperatorMemoryInboxCard; selected?: boolean; onSelect?: (id: string) => void }) {
  return (
    <article
      style={{ ...panel, borderColor: selected ? "rgba(45,212,191,0.42)" : "rgba(148,163,184,0.16)" }}
      data-codexforge-memory-inbox-card="MemoryInboxCard renders stable key helper review required before promotion no auto-promotion"
    >
      <button type="button" onClick={() => onSelect?.(card.id)} style={button}>
        <span style={eyebrow}>{card.sourceSurface}</span>
        <strong style={title}>{card.title}</strong>
      </button>
      <p style={memoryText}>{card.proposedMemoryText}</p>
      <div style={pills}>
        <span style={pill}>{card.memoryKind}</span>
        <span style={pill}>{card.priorityClass}</span>
        <span style={pill}>risk {card.risk}</span>
        <span style={pill}>review {card.reviewState}</span>
      </div>
      <div style={meta}>
        <span>confidence {(card.confidence * 100).toFixed(0)}%</span>
        <span>importance {(card.importance * 100).toFixed(0)}%</span>
        <span>duplicate {(card.duplicateRisk * 100).toFixed(0)}%</span>
        <span>contradiction {(card.contradictionRisk * 100).toFixed(0)}%</span>
      </div>
      {card.relatedFiles.length > 0 ? <p style={pathText}>{card.relatedFiles.join(", ")}</p> : null}
    </article>
  );
}

const safe: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.62))", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const button: CSSProperties = { all: "unset", cursor: "pointer", display: "grid", gap: 5, ...safe };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safe };
const title: CSSProperties = { color: "#f8fafc", fontSize: 16, lineHeight: 1.25, ...safe };
const memoryText: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const pills: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "5px 8px", color: "#dbeafe", fontSize: 11, fontWeight: 850, ...safe };
const meta: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 7, color: "#94a3b8", fontSize: 12, ...safe };
const pathText: CSSProperties = { margin: 0, color: "#93c5fd", fontSize: 12, fontFamily: "var(--font-geist-mono), ui-monospace, monospace", ...safe };

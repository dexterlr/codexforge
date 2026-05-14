"use client";

import type { CSSProperties } from "react";
import type { MemoryReviewItem } from "../memory-review-types";
import { buildMemoryReviewStableKey } from "../memory-review-types";

type MemoryCandidateCardProps = {
  item: MemoryReviewItem;
  selected: boolean;
  onSelect: (itemId: string) => void;
};

export function MemoryCandidateCard({ item, selected, onSelect }: MemoryCandidateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      style={selected ? selectedCard : card}
      data-codexforge-memory-candidate-card="MemoryCandidateCard renders review required contradiction risk low confidence"
    >
      <div style={topRow}>
        <div style={titleBlock}>
          <strong style={title}>{item.title}</strong>
          <span style={meta}>{item.sourceSurface} / {item.sourceType}</span>
        </div>
        <span style={statePill}>{item.reviewState}</span>
      </div>
      <p style={content}>{item.content}</p>
      <div style={metricGrid}>
        <Metric label="Confidence" value={`${Math.round(item.confidence * 100)}%`} />
        <Metric label="Contradiction risk" value={`${Math.round(item.contradictionRisk * 100)}%`} />
        <Metric label="Importance" value={item.importance} />
        <Metric label="Next action" value={item.nextAction} />
      </div>
      <div style={tagWrap}>
        {item.tags.slice(0, 6).map((tag, index) => (
          <span key={buildMemoryReviewStableKey("candidate-tag", item.id, tag, index)} style={tagPill}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </span>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const cardBase: CSSProperties = {
  textAlign: "left",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
  color: "inherit",
  cursor: "pointer",
  minWidth: 0,
  width: "100%",
};
const card: CSSProperties = {
  ...cardBase,
  border: "1px solid rgba(125,211,252,0.16)",
  background: "rgba(15,23,42,0.64)",
};
const selectedCard: CSSProperties = {
  ...cardBase,
  border: "1px solid rgba(45,212,191,0.45)",
  background: "linear-gradient(135deg, rgba(20,184,166,0.18), rgba(15,23,42,0.74))",
  boxShadow: "0 18px 48px rgba(20,184,166,0.12)",
};
const topRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", minWidth: 0 };
const titleBlock: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, ...safeText };
const meta: CSSProperties = { color: "#94a3b8", fontSize: 12, ...safeText };
const statePill: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", background: "rgba(251,191,36,0.1)", color: "#fde68a", borderRadius: 999, padding: "5px 8px", fontSize: 11, fontWeight: 800, ...safeText };
const content: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.32)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const metricValue: CSSProperties = { fontSize: 12, ...safeText };
const tagWrap: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const tagPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 999, padding: "4px 7px", color: "#ccfbf1", fontSize: 11, ...safeText };

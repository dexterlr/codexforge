"use client";

import type { CSSProperties } from "react";
import type { EvidenceChatSelection } from "../evidence-grounded-chat-types";

type EvidenceSelectionPanelProps = {
  selection: EvidenceChatSelection;
};

export function EvidenceSelectionPanel({ selection }: EvidenceSelectionPanelProps) {
  return (
    <section data-codexforge-evidence-selection-panel="EvidenceSelectionPanel renders" style={panel}>
      <div style={top}>
        <strong>Evidence selection</strong>
        <span style={pill}>{selection.selectedItems.length}/{selection.items.length} selected</span>
      </div>
      <p style={body}>Only selected evidence can be injected. No hidden context injection.</p>
      <div style={list}>
        {selection.items.length === 0 ? (
          <span style={empty}>No reviewed evidence selected.</span>
        ) : (
          selection.items.map((item) => (
            <article key={item.id} style={card}>
              <div style={top}>
                <strong style={safeText}>{item.title}</strong>
                <span style={item.selected ? selectedPill : blockedPill}>{item.selected ? "selected" : "blocked"}</span>
              </div>
              <span style={meta}>{item.sourceFilePath ?? item.sourceTool}</span>
              <p style={body}>{item.snippet}</p>
              <span style={meta}>Trust {item.trustLevel} / confidence {(item.confidence * 100).toFixed(0)}%</span>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", borderRadius: 8, padding: "4px 7px", fontSize: 11, fontWeight: 850 };
const selectedPill: CSSProperties = { ...pill, color: "#bbf7d0", background: "rgba(34,197,94,0.12)" };
const blockedPill: CSSProperties = { ...pill, color: "#fecaca", background: "rgba(239,68,68,0.1)" };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.48)", borderRadius: 8, padding: 9, display: "grid", gap: 6, minWidth: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.78, overflowWrap: "anywhere" };
const meta: CSSProperties = { fontSize: 11, opacity: 0.68, overflowWrap: "anywhere" };
const empty: CSSProperties = { fontSize: 12, opacity: 0.72 };
const safeText: CSSProperties = { overflowWrap: "anywhere", minWidth: 0 };

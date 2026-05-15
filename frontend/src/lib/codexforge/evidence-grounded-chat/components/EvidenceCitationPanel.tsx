"use client";

import type { CSSProperties } from "react";
import type { EvidenceCitationModel } from "../evidence-grounded-chat-types";

type EvidenceCitationPanelProps = {
  model: EvidenceCitationModel;
};

export function EvidenceCitationPanel({ model }: EvidenceCitationPanelProps) {
  return (
    <section data-codexforge-evidence-citation-panel="EvidenceCitationPanel renders citation model includes file/path/line/match/evidence id" style={panel}>
      <strong>Local citations</strong>
      <div style={list}>
        {model.citations.length === 0 ? (
          <span style={empty}>No local citations available.</span>
        ) : (
          model.citations.map((citation) => (
            <div key={citation.id} style={row}>
              <span style={label}>{citation.citationId}</span>
              <span style={value}>{citation.displayText}</span>
              <span style={value}>file/path/line/match/evidence id: {citation.filePath ?? "none"} / {citation.line ?? "none"} / {citation.match ?? "none"} / {citation.evidenceId}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const list: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0 };
const label: CSSProperties = { fontSize: 11, fontWeight: 850, color: "#bfdbfe", overflowWrap: "anywhere" };
const value: CSSProperties = { fontSize: 11, opacity: 0.76, overflowWrap: "anywhere" };
const empty: CSSProperties = { fontSize: 12, opacity: 0.72 };

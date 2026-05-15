import type { CSSProperties } from "react";
import type { EvidenceBrainMergeCandidate } from "../evidence-memory-types";

export function EvidenceBrainMergePanel({ candidate }: { candidate: EvidenceBrainMergeCandidate }) {
  return (
    <section
      style={panel}
      data-codexforge-evidence-brain-merge-panel="EvidenceBrainMergePanel renders Brain merge candidate is preview-only Brain merge review required no graph mutation memory.promoted"
    >
      <div style={header}>
        <div>
          <span style={eyebrow}>Brain merge preview</span>
          <h2 style={title}>Preview-only memory.promoted events</h2>
        </div>
        <span style={badge}>{candidate.approvalBoundary}</span>
      </div>
      <p style={copy}>{candidate.safetyNote}</p>
      <div style={cards}>
        {candidate.events.slice(0, 5).map((event) => (
          <article key={event.id} style={card}>
            <div style={row}>
              <strong style={cardTitle}>{event.eventId}</strong>
              <span style={pill}>{event.type}</span>
            </div>
            <p style={copy}>Candidate {event.candidateId}; review state {event.reviewState}; approved {String(event.approved)}.</p>
            <p style={muted}>Preview only: {String(event.previewOnly)}; applied {String(event.applied)}.</p>
          </article>
        ))}
      </div>
      <ul style={list}>
        {candidate.summary.map((line) => (
          <li key={line} style={listItem}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 20, ...safeText };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "7px 9px", color: "#ccfbf1", fontSize: 12, fontWeight: 850, ...safeText };
const cards: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.32)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap", minWidth: 0 };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const pill: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, lineHeight: 1.35, ...safeText };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };

import type { CSSProperties } from "react";
import type { EvidenceMemoryCandidate } from "../evidence-memory-types";

export function EvidenceMemoryCandidatePanel({
  candidates,
  compact = false,
}: {
  candidates: readonly EvidenceMemoryCandidate[];
  compact?: boolean;
}) {
  const visible = compact ? candidates.slice(0, 3) : candidates.slice(0, 8);

  return (
    <section
      style={panel}
      data-codexforge-evidence-memory-candidate-panel="EvidenceMemoryCandidatePanel renders memory candidates Review required before memory promotion"
    >
      <div style={header}>
        <div>
          <span style={eyebrow}>Memory candidates</span>
          <h2 style={title}>{candidates.length} review-gated candidate(s)</h2>
        </div>
        <span style={badge}>promotion blocked until review</span>
      </div>
      <div style={cards}>
        {visible.length > 0 ? (
          visible.map((candidate) => (
            <article key={candidate.id} style={card}>
              <div style={row}>
                <strong style={cardTitle}>{candidate.title}</strong>
                <span style={pill}>{candidate.kind}</span>
              </div>
              <p style={copy}>{candidate.content}</p>
              <div style={meta}>
                <span>{candidate.reviewState}</span>
                <span>{Math.round(candidate.confidence * 100)}% confidence</span>
                <span>{candidate.importance}</span>
              </div>
              <p style={muted}>Sources: {candidate.sourceEvidenceIds.join(", ")}</p>
            </article>
          ))
        ) : (
          <p style={copy}>No evidence memory candidates were built.</p>
        )}
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,23,42,0.64)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 20, ...safeText };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(251,191,36,0.1)", borderRadius: 8, padding: "7px 9px", color: "#fde68a", fontSize: 12, fontWeight: 850, ...safeText };
const cards: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap", minWidth: 0 };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.35, ...safeText };
const pill: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, whiteSpace: "pre-wrap", ...safeText };
const meta: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap", color: "#ccfbf1", fontSize: 11, fontWeight: 850, ...safeText };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, lineHeight: 1.35, ...safeText };

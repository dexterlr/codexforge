import type { CSSProperties } from "react";
import { explainEvidenceConfidence, type EvidenceMemoryCandidate, type NormalizedEvidenceItem } from "../index";

export function EvidenceConfidencePanel({
  evidence,
  candidates,
}: {
  evidence: readonly NormalizedEvidenceItem[];
  candidates: readonly EvidenceMemoryCandidate[];
}) {
  const topEvidence = evidence.slice(0, 5);

  return (
    <section
      style={panel}
      data-codexforge-evidence-confidence-panel="EvidenceConfidencePanel renders confidence source specificity repeated evidence warning error stale contradiction"
    >
      <span style={eyebrow}>Evidence confidence</span>
      <h2 style={title}>Confidence and importance scoring</h2>
      <div style={grid}>
        {candidates.slice(0, 4).map((candidate) => (
          <div key={candidate.id} style={fact}>
            <span style={factLabel}>{candidate.kind}</span>
            <strong style={factValue}>{Math.round(candidate.confidence * 100)}%</strong>
            <span style={muted}>{candidate.importance} importance</span>
          </div>
        ))}
      </div>
      <div style={cards}>
        {topEvidence.map((item) => (
          <article key={item.id} style={card}>
            <strong style={cardTitle}>{item.label}</strong>
            {explainEvidenceConfidence(item, evidence).slice(0, 3).map((line) => (
              <p key={line} style={copy}>{line}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const fact: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const factLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const factValue: CSSProperties = { color: "#f8fafc", fontSize: 19, lineHeight: 1.1, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.35, ...safeText };
const cards: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };

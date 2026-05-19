import type { SnapshotRestoreComparisonEvidence } from "../index";

export function RestoreComparisonEvidencePanel({ evidence }: { evidence: SnapshotRestoreComparisonEvidence }) {
  return (
    <section style={panel} data-codexforge-restore-comparison-evidence-panel="RestoreComparisonEvidencePanel renders comparison evidence review required evidence is context, not authority">
      <h2 style={heading}>Comparison Evidence</h2>
      <p style={muted}>{evidence.reviewRequiredCount} review-required item(s). Top severity: {evidence.topSeverity}.</p>
      <div style={list}>
        {evidence.items.map((item) => (
          <article key={item.id} style={itemStyle}>
            <div style={row}>
              <strong style={title}>{item.title}</strong>
              <span style={pill}>{item.severity}</span>
            </div>
            <p style={text}>{item.detail}</p>
            <p style={muted}>{item.beforeSummary} to {item.afterSummary}. {item.restoreConcern}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const panel = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(2,6,23,0.56)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 } as const;
const heading = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText } as const;
const list = { display: "grid", gap: 10, minWidth: 0 } as const;
const itemStyle = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 } as const;
const row = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 } as const;
const title = { color: "#e0f2fe", fontSize: 13, ...safeText } as const;
const pill = { border: "1px solid rgba(125,211,252,0.2)", borderRadius: 8, color: "#bae6fd", fontSize: 11, fontWeight: 900, padding: "4px 7px", ...safeText } as const;
const text = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0, ...safeText } as const;
const muted = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText } as const;

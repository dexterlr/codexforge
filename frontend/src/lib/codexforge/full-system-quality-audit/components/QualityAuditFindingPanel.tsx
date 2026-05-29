import type { CSSProperties } from "react";
import type { QualityAuditFinding } from "../full-system-quality-audit-types";

type Props = { findings: QualityAuditFinding[] };

export function QualityAuditFindingPanel({ findings }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-finding-panel="QualityAuditFindingPanel renders bugs found bugs fixed UX route smoke safety findings">
      <h2 style={title}>Findings</h2>
      <div style={list}>
        {findings.map((finding) => (
          <article key={finding.id} style={item}>
            <div style={row}>
              <strong>{finding.title}</strong>
              <span style={risk}>{finding.risk}</span>
            </div>
            <p style={body}>{finding.evidence}</p>
            <p style={fix}>{finding.fixedBy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const list: CSSProperties = { display: "grid", gap: 8 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, display: "grid", gap: 5, padding: 10 };
const row: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between" };
const risk: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "break-word" };
const fix: CSSProperties = { color: "#ccfbf1", fontSize: 12, lineHeight: 1.5, margin: 0 };

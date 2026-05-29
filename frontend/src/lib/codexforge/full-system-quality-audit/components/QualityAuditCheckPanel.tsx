import type { CSSProperties } from "react";
import type { QualityAuditCheck } from "../full-system-quality-audit-types";

type Props = { checks: QualityAuditCheck[] };

export function QualityAuditCheckPanel({ checks }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-check-panel="QualityAuditCheckPanel renders bugs build routes smokes safety">
      <h2 style={title}>Audit checks</h2>
      <div style={list}>
        {checks.map((check) => (
          <article key={check.id} style={item}>
            <div style={row}>
              <strong>{check.label}</strong>
              <span style={status}>{check.status}</span>
            </div>
            <p style={body}>{check.evidence}</p>
            <span style={meta}>{check.nextAction}</span>
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
const status: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "break-word" };
const meta: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4 };

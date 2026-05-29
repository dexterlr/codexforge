import type { CSSProperties } from "react";

export function QualityAuditEmptyState() {
  return (
    <section style={empty} data-codexforge-quality-audit-empty-state="QualityAuditEmptyState renders unclear empty states fixed no giant raw JSON above fold">
      <strong style={title}>No blocker selected</strong>
      <p style={body}>Start with the audit summary, then inspect findings only when a route, smoke, or safety check needs attention.</p>
    </section>
  );
}

const empty: CSSProperties = {
  background: "rgba(14,165,233,0.08)",
  border: "1px solid rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "grid",
  gap: 4,
  padding: "10px 12px",
};
const title: CSSProperties = { fontSize: 13, lineHeight: 1.25 };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0 };

import type { CSSProperties } from "react";
import type { QualityAuditUpgradeSummary } from "../full-system-quality-audit-types";

type Props = { summary: QualityAuditUpgradeSummary };

export function QualityAuditUpgradeSummaryPanel({ summary }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-upgrade-summary-panel="QualityAuditUpgradeSummaryPanel renders UX upgrades route navigation fixes smoke fixes safety boundaries preserved">
      <h2 style={title}>Upgrade summary</h2>
      <p style={headline}>{summary.headline}</p>
      <div style={grid}>
        <List title="UX" items={summary.uxUpgrades} />
        <List title="Routes" items={summary.routeFixes} />
        <List title="Smokes" items={summary.smokeFixes} />
      </div>
      <strong style={safety}>{summary.safetyResult}</strong>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={list}>
      <strong style={listTitle}>{title}</strong>
      {items.map((item) => <span key={item} style={line}>{item}</span>)}
    </div>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const headline: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" };
const list: CSSProperties = { display: "grid", gap: 5 };
const listTitle: CSSProperties = { color: "#5eead4", fontSize: 12 };
const line: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const safety: CSSProperties = { color: "#ccfbf1", fontSize: 12 };

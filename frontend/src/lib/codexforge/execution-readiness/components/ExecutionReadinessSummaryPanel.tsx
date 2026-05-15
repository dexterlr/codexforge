import type { CSSProperties } from "react";
import type { ExecutionReadinessSummary } from "../execution-readiness-types";

export function ExecutionReadinessSummaryPanel({
  summary,
}: {
  summary: ExecutionReadinessSummary;
}) {
  return (
    <section style={panel} data-codexforge-execution-readiness-summary-panel="ExecutionReadinessSummaryPanel renders">
      <div style={eyebrow}>Readiness Summary</div>
      <h2 style={heading}>Execution remains blocked</h2>
      <div style={grid}>
        <Metric label="Readiness" value={summary.readinessAllowed ? "reviewable" : "blocked"} />
        <Metric label="Execution" value={summary.executionAllowed ? "allowed" : "blocked"} />
        <Metric label="Risk" value={summary.riskReadiness.status} />
        <Metric label="Approval" value={summary.approvalReadiness.currentState} />
      </div>
      <ul style={list}>
        {summary.summary.map((line) => (
          <li key={line} style={item}>
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#ccfbf1", fontSize: 13, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 5 };
const item: CSSProperties = { color: "#d1fae5", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };

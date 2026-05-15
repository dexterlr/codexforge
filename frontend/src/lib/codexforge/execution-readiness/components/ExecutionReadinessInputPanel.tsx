import type { CSSProperties } from "react";
import type { ExecutionReadinessInput } from "../execution-readiness-types";

export function ExecutionReadinessInputPanel({
  input,
}: {
  input: ExecutionReadinessInput;
}) {
  return (
    <section style={panel} data-codexforge-execution-readiness-input-panel="ExecutionReadinessInputPanel renders">
      <div style={eyebrow}>Readiness Input</div>
      <h2 style={heading}>{input.taskGoal}</h2>
      <div style={grid}>
        <Metric label="Activated task" value={input.activatedTaskId} />
        <Metric label="Domain" value={input.taskDomain} />
        <Metric label="Execution intent" value={input.executionIntent} />
        <Metric label="Mutation intent" value={input.mutationIntent} />
        <Metric label="Command intent" value={input.commandIntent} />
        <Metric label="Steps" value={String(input.steps.length)} />
      </div>
      <div style={sectionGrid}>
        <ListBlock label="Impacted files" values={input.impactedFiles} empty="No impacted files declared." />
        <ListBlock label="Risk notes" values={input.riskNotes} empty="No risk notes declared." />
        <ListBlock label="Approval gates" values={input.approvalGates} empty="No approval gates declared." />
      </div>
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

function ListBlock({
  label,
  values,
  empty,
}: {
  label: string;
  values: string[];
  empty: string;
}) {
  return (
    <div style={listBlock}>
      <strong style={blockTitle}>{label}</strong>
      <ul style={list}>
        {(values.length > 0 ? values : [empty]).map((value) => (
          <li key={value} style={item}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.18)",
  background: "rgba(15,23,42,0.62)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
  minWidth: 0,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, lineHeight: 1.25, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#e0f2fe", fontSize: 13, overflowWrap: "anywhere" };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };

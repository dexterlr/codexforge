import type { CSSProperties } from "react";
import type { StepRunnerPolicy } from "../step-runner-preview-types";

export function StepRunnerPolicyPanel({ policy }: { policy: StepRunnerPolicy }) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-policy-panel="StepRunnerPolicyPanel renders broker-execution blocked Future run requires approval"
    >
      <div style={eyebrow}>Step Runner Policy</div>
      <h2 style={heading}>Policy posture</h2>
      <div style={grid}>
        <Metric label="Preview" value={policy.previewAllowed ? "allowed" : "blocked"} />
        <Metric label="Execution" value="blocked" />
        <Metric label="Approval" value="required" />
        <Metric label="Missing readiness" value={policy.missingReadinessBlocksFutureRun ? "blocks future run" : "clear"} />
      </div>
      <div style={rules}>
        {policy.rules.map((rule) => (
          <article key={rule.id} style={ruleCard}>
            <div style={rowTop}>
              <strong style={ruleTitle}>{rule.label}</strong>
              <span style={state}>{rule.state}</span>
            </div>
            <p style={body}>{rule.detail}</p>
          </article>
        ))}
      </div>
      <ListBlock label="Future run blockers" values={policy.futureRunBlockedReasons} empty="No additional blocker beyond approval." />
      <ListBlock label="Required approvals" values={policy.requiredApprovals} empty="No approvals declared." />
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

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#e0f2fe", fontSize: 13, overflowWrap: "anywhere" };
const rules: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const ruleCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 6, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "flex-start" };
const ruleTitle: CSSProperties = { fontSize: 13, color: "#f8fafc", overflowWrap: "anywhere" };
const state: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };

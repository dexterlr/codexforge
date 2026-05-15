import type { CSSProperties } from "react";
import type { ReadOnlyExecutionPolicy } from "../read-only-execution-types";

export function ReadOnlyExecutionPolicyPanel({
  policy,
}: {
  policy: ReadOnlyExecutionPolicy;
}) {
  return (
    <section
      style={panel}
      data-codexforge-read-only-execution-policy-panel="ReadOnlyExecutionPolicyPanel renders read-file list-files search-project snapshot-project write-file apply-diff run-command run-tests build-web-app broker-execution external-api explicit approval required no file mutation"
    >
      <div style={eyebrow}>Read-Only Execution Policy</div>
      <h2 style={heading}>Policy posture: {policy.allowed ? "allowed" : "blocked"}</h2>
      <div style={grid}>
        <Metric label="Allowed" value={policy.allowed ? "yes" : "no"} />
        <Metric label="Approval" value="explicit required" />
        <Metric label="File mutation" value="blocked" />
        <Metric label="Graph mutation" value="blocked" />
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
      <ListBlock label="Blocked reasons" values={policy.blockedReasons} empty="No blocker." />
      <ListBlock label="Eligible tools" values={policy.eligibleTools} empty="No eligible tools." />
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
  values: readonly string[];
  empty: string;
}) {
  return (
    <div style={listBlock}>
      <strong style={blockTitle}>{label}</strong>
      <ul style={list}>
        {(values.length > 0 ? values : [empty]).map((value) => (
          <li key={value} style={item}>{value}</li>
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

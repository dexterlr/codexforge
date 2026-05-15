import type { CSSProperties } from "react";
import type { StepRunnerDryRunPlan } from "../step-runner-preview-types";

export function StepRunnerDryRunPanel({ plan }: { plan: StepRunnerDryRunPlan }) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-dry-run-panel="StepRunnerDryRunPanel renders dry run plan stop conditions"
    >
      <div style={eyebrow}>Dry Run Plan</div>
      <h2 style={heading}>dry run plan only</h2>
      <div style={checks}>
        {plan.checksBeforeExecution.map((check) => (
          <article key={check.id} style={checkCard}>
            <strong style={checkTitle}>{check.label}</strong>
            <p style={body}>{check.detail}</p>
          </article>
        ))}
      </div>
      <div style={sectionGrid}>
        <ListBlock label="Files to inspect" values={plan.filesToInspect} empty="No files declared." />
        <ListBlock label="Memories to verify" values={plan.memoriesToVerify} empty="No memories declared." />
        <ListBlock label="Policies to verify" values={plan.policiesToVerify} empty="No policies declared." />
        <ListBlock label="Tests after future execution" values={plan.testsToRunAfterFutureExecution} empty="No tests declared." />
        <ListBlock label="Stop conditions" values={plan.stopConditions} empty="No stop conditions declared." />
      </div>
      <p style={body}>{plan.rollbackNote}</p>
    </section>
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
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const checks: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 9, minWidth: 0 };
const checkCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const checkTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, overflowWrap: "anywhere" };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };

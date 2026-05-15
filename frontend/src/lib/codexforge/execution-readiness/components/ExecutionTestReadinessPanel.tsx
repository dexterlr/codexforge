import type { CSSProperties } from "react";
import type { ExecutionTestReadiness } from "../execution-readiness-types";

export function ExecutionTestReadinessPanel({
  readiness,
}: {
  readiness: ExecutionTestReadiness;
}) {
  return (
    <section style={panel} data-codexforge-execution-test-readiness-panel="ExecutionTestReadinessPanel renders npm run build git diff --check">
      <div style={eyebrow}>Test Readiness</div>
      <h2 style={heading}>Suggested checks only</h2>
      <div style={stack}>
        {readiness.tests.map((test) => (
          <article key={test.id} style={testRow}>
            <div style={rowTop}>
              <strong style={label}>{test.label}</strong>
              <span style={approval}>approval required</span>
            </div>
            <code style={command}>{test.command}</code>
            <p style={body}>{test.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const testRow: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const label: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const approval: CSSProperties = { color: "#c7d2fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const command: CSSProperties = { color: "#ccfbf1", fontSize: 11, lineHeight: 1.4, whiteSpace: "pre-wrap", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };

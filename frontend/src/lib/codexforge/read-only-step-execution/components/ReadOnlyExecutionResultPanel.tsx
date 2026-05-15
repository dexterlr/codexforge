import type { CSSProperties } from "react";
import type { ReadOnlyExecutionResult } from "../read-only-execution-types";

export function ReadOnlyExecutionResultPanel({
  result,
}: {
  result: ReadOnlyExecutionResult;
}) {
  return (
    <section
      style={panel}
      data-codexforge-read-only-execution-result-panel="ReadOnlyExecutionResultPanel renders pending skipped blocked failed completed visible evidence"
    >
      <div style={eyebrow}>Read-Only Execution Result</div>
      <h2 style={heading}>Status: {result.status}</h2>
      <p style={body}>{result.summary}</p>
      <div style={grid}>
        <Metric label="Tool" value={result.toolName} />
        <Metric label="OK" value={result.ok ? "yes" : "no"} />
        <Metric label="Paths" value={String(result.filePaths.length)} />
        <Metric label="Matches" value={String(result.matchedLines.length)} />
      </div>
      <ListBlock label="Evidence snippets" values={result.evidenceSnippets} empty="No snippets captured." />
      <ListBlock label="File paths" values={result.filePaths} empty="No file paths captured." />
      <ListBlock label="Warnings" values={result.warnings} empty="No warnings." />
      {result.errorMessage ? (
        <div style={errorBox}>
          <strong>Error</strong>
          <span>{result.errorMessage}</span>
        </div>
      ) : null}
      <p style={muted}>Next safe action: {result.nextSafeAction}</p>
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
    <div style={block}>
      <strong style={blockTitle}>{label}</strong>
      <ul style={list}>
        {(values.length > 0 ? values.slice(0, 12) : [empty]).map((value) => (
          <li key={value} style={item}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#a7f3d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#e0f2fe", fontSize: 13, overflowWrap: "anywhere" };
const block: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const errorBox: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "rgba(127,29,29,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 4, color: "#fecaca", fontSize: 12, overflowWrap: "anywhere" };

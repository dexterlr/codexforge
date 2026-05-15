import type { CSSProperties } from "react";
import type { ReadOnlyExecutionRequest } from "../read-only-execution-types";

export function ReadOnlyExecutionRequestPanel({
  request,
}: {
  request: ReadOnlyExecutionRequest;
}) {
  return (
    <section
      style={panel}
      data-codexforge-read-only-execution-request-panel="ReadOnlyExecutionRequestPanel renders request id approval state selected read-only tool expected evidence"
    >
      <div style={eyebrow}>Read-Only Execution Request</div>
      <h2 style={heading}>{request.stepLabel}</h2>
      <div style={grid}>
        <Metric label="Tool" value={request.selectedReadOnlyTool} />
        <Metric label="Approval" value={request.approvalState} />
        <Metric label="Input" value={request.toolInputPreview.fingerprint} />
        <Metric label="Source" value={request.source} />
      </div>
      <div style={block}>
        <strong style={blockTitle}>Request id</strong>
        <code style={code}>{request.requestId}</code>
      </div>
      <ListBlock label="Tool input preview" values={request.toolInputPreview.previewLines} empty="No visible tool input." />
      <ListBlock label="Expected evidence" values={request.expectedEvidence} empty="No expected evidence." />
      <div style={block}>
        <strong style={blockTitle}>No-mutation guarantee</strong>
        <p style={body}>{request.noMutationGuarantee}</p>
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
  const visible = values.length > 0 ? values : [empty];
  return (
    <div style={block}>
      <strong style={blockTitle}>{label}</strong>
      <ul style={list}>
        {visible.map((value) => (
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
const block: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const code: CSSProperties = { color: "#ccfbf1", fontSize: 11, overflowWrap: "anywhere", whiteSpace: "pre-wrap" };

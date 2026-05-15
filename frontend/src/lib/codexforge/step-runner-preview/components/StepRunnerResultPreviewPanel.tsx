import type { CSSProperties } from "react";
import type { StepRunnerResultPreview } from "../step-runner-preview-types";

export function StepRunnerResultPreviewPanel({
  preview,
}: {
  preview: StepRunnerResultPreview;
}) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-result-preview-panel="StepRunnerResultPreviewPanel renders preview-only expected output"
    >
      <div style={eyebrow}>Result Preview</div>
      <h2 style={heading}>Expected output only</h2>
      <p style={highlight}>{preview.expectedSuccessfulOutput}</p>
      <div style={sectionGrid}>
        <ListBlock label="Expected failure modes" values={preview.expectedFailureModes} empty="No failure modes declared." />
        <ListBlock label="Expected artifacts" values={preview.expectedArtifacts} empty="No artifacts declared." />
        <ListBlock label="Expected graph and memory notes" values={preview.expectedGraphMemoryNotes} empty="No notes declared." />
        <ListBlock label="Expected test evidence" values={preview.expectedTestEvidence} empty="No test evidence declared." />
        <ListBlock label="After future execution show" values={preview.postExecutionDisplay} empty="No display notes declared." />
      </div>
      <p style={notice}>{preview.previewOnlyNotice}</p>
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
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const highlight: CSSProperties = { border: "1px solid rgba(125,211,252,0.20)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 10, margin: 0, color: "#dbeafe", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
const listBlock: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const notice: CSSProperties = { margin: 0, color: "#fecaca", border: "1px solid rgba(248,113,113,0.25)", background: "rgba(127,29,29,0.12)", borderRadius: 8, padding: 10, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };

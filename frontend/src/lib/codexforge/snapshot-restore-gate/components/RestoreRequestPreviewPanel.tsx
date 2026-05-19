import type { SnapshotRestoreRequestPreview } from "../index";

export function RestoreRequestPreviewPanel({ preview }: { preview: SnapshotRestoreRequestPreview }) {
  return (
    <section style={panel} data-codexforge-restore-request-preview-panel="RestoreRequestPreviewPanel renders request preview says request preview only future guarded snapshot executor required no graph mutation">
      <h2 style={heading}>Request Preview</h2>
      <div style={grid}>
        <Stat label="State" value={preview.state} />
        <Stat label="Scope" value={preview.restoreScope} />
        <Stat label="Source" value={preview.sourceSnapshotId} />
        <Stat label="Target" value={preview.targetSnapshotId} />
      </div>
      <p style={text}>{preview.futureExecutorBoundary}</p>
      <div style={list}>
        {preview.expectedAffectedGraphAreas.map((area) => <span key={area} style={pill}>{area}</span>)}
      </div>
      <ul style={checklist}>
        {preview.verificationChecklist.map((item) => <li key={item} style={muted}>{item}</li>)}
      </ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const panel = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(2,6,23,0.56)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 } as const;
const heading = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText } as const;
const grid = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", minWidth: 0 } as const;
const stat = { border: "1px solid rgba(148,163,184,0.15)", background: "rgba(15,23,42,0.6)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10 } as const;
const labelStyle = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText } as const;
const valueStyle = { color: "#ccfbf1", fontSize: 14, lineHeight: 1.25, ...safeText } as const;
const text = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0, ...safeText } as const;
const list = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 } as const;
const pill = { border: "1px solid rgba(125,211,252,0.2)", borderRadius: 8, color: "#bae6fd", fontSize: 12, fontWeight: 850, padding: "6px 8px", ...safeText } as const;
const checklist = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, minWidth: 0 } as const;
const muted = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText } as const;

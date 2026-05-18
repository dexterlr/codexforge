import type { CSSProperties } from "react";
import type {
  RuntimeEventReplayInput,
  RuntimeEventReplayInputValidation,
} from "../runtime-event-replay-types";

export function ReplayInputPanel({
  input,
  validation,
}: {
  input: RuntimeEventReplayInput;
  validation: RuntimeEventReplayInputValidation;
}) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-input-panel="ReplayInputPanel renders replay input preview-only no graph mutation no appendEvent no event execution"
    >
      <div style={heading}>
        <span style={eyebrow}>Replay Input</span>
        <h2 style={title}>Selection contract</h2>
        <p style={muted}>Replay id is deterministic from selected event ids, snapshot id, and mode.</p>
      </div>
      <div style={grid}>
        <Stat label="Mode" value={input.replayMode} />
        <Stat label="Scope" value={input.replayScope} />
        <Stat label="Events" value={String(input.selectedEventIds.length)} />
        <Stat label="Validation" value={validation.valid ? "valid" : "blocked"} />
      </div>
      <div style={lineList}>
        <Line label="Replay id" value={input.id} />
        <Line label="Snapshot" value={input.selectedGraphSnapshotId} />
        <Line label="Journal ids" value={input.sourceJournalIds.join(", ") || "none supplied"} />
        <Line label="Request ids" value={input.sourceRequestIds.join(", ") || "none supplied"} />
        <Line label="Event types" value={input.eventTypes.join(", ") || "from supplied sequence"} />
        <Line label="No-mutation guarantee" value={input.noMutationGuarantee ? "active" : "missing"} />
      </div>
      {input.operatorNote ? <p style={note}>Operator note: {input.operatorNote}</p> : null}
      <ul style={list}>
        {validation.summary.map((item) => (
          <li key={item} style={listItem}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div style={line}>
      <span style={lineLabel}>{label}</span>
      <span style={lineValue}>{value}</span>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 16, lineHeight: 1.2, ...safeText };
const lineList: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const line: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const lineLabel: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 850, textTransform: "uppercase", ...safeText };
const lineValue: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, ...safeText };
const note: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, padding: 10, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };

import type { CSSProperties } from "react";
import type { RuntimeReplaySnapshot } from "../runtime-event-replay-types";

export function ReplaySnapshotPanel({ snapshot }: { snapshot: RuntimeReplaySnapshot }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-snapshot-panel="ReplaySnapshotPanel renders canonical graph schema preview-only no graph mutation"
    >
      <div style={heading}>
        <span style={eyebrow}>Replay Snapshot</span>
        <h2 style={title}>Canonical graph schema</h2>
        <p style={muted}>{snapshot.canonicalSchemaPath}</p>
      </div>
      <div style={grid}>
        <Stat label="Nodes" value={String(snapshot.nodeCount)} />
        <Stat label="Edges" value={String(snapshot.edgeCount)} />
        <Stat label="Version" value={String(snapshot.graphVersion)} />
        <Stat label="Source" value={snapshot.source} />
      </div>
      <div style={sectionBlock}>
        <strong style={sectionTitle}>Node kinds</strong>
        <PillList values={Object.entries(snapshot.nodeKindCounts).map(([kind, count]) => `${kind}: ${count}`)} empty="No nodes in preview snapshot." />
      </div>
      <div style={sectionBlock}>
        <strong style={sectionTitle}>Edge kinds</strong>
        <PillList values={Object.entries(snapshot.edgeKindCounts).map(([kind, count]) => `${kind}: ${count}`)} empty="No edges in preview snapshot." />
      </div>
      <ul style={list}>
        {snapshot.summary.map((item) => (
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

function PillList({ values, empty }: { values: string[]; empty: string }) {
  return (
    <div style={pills}>
      {(values.length > 0 ? values : [empty]).map((value) => (
        <span key={value} style={pill}>{value}</span>
      ))}
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.46)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#e0f2fe", fontSize: 16, lineHeight: 1.2, ...safeText };
const sectionBlock: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const sectionTitle: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.3, ...safeText };
const pills: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 820, padding: "6px 8px", ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };

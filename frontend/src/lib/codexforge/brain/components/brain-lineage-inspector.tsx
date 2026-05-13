import type { CSSProperties } from "react";
import type {
  CodexForgeBrainLineageEdge,
  CodexForgeBrainLineageNode,
} from "@/lib/codexforge/brain/runtime";

type BrainLineageInspectorProps = {
  selectedNode?: CodexForgeBrainLineageNode | null;
  selectedEdge?: CodexForgeBrainLineageEdge | null;
};

export function BrainLineageInspector({
  selectedNode,
  selectedEdge,
}: BrainLineageInspectorProps) {
  const rows = selectedNode
    ? [
        ["Type", selectedNode.kind],
        ["Label", selectedNode.label],
        ["Status", selectedNode.status],
        ["Severity", selectedNode.severity],
        ["Timestamp", selectedNode.timestamp ?? "n/a"],
        ["Source", selectedNode.source],
      ]
    : selectedEdge
      ? [
          ["Type", selectedEdge.relation],
          ["Label", selectedEdge.label],
          ["Status", "edge"],
          ["Severity", selectedEdge.severity],
          ["Timestamp", selectedEdge.timestamp ?? "n/a"],
          ["Source", selectedEdge.source],
        ]
      : [];

  return (
    <aside data-codexforge-brain-lineage-inspector style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Lineage inspector</div>
        <h3 style={titleStyle}>Selected signal</h3>
      </div>
      {rows.length > 0 ? (
        <div style={rowGridStyle}>
          {rows.map(([label, value]) => (
            <div key={String(label)} style={rowStyle}>
              <span style={eyebrowStyle}>{label}</span>
              <strong>{String(value)}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStyle}>Select a lineage node or edge to inspect read-only details.</div>
      )}
      {selectedNode?.summary || selectedEdge ? (
        <div style={summaryStyle}>
          {selectedNode?.summary ?? `${selectedEdge?.from} to ${selectedEdge?.to}`}
        </div>
      ) : null}
    </aside>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  alignContent: "start",
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.80)",
};

const rowGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))",
  gap: 8,
};

const rowStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  minWidth: 0,
};

const summaryStyle: CSSProperties = {
  padding: 10,
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.80)",
  fontSize: 12,
  lineHeight: 1.5,
};

const emptyStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 12,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 16,
  lineHeight: 1.2,
};

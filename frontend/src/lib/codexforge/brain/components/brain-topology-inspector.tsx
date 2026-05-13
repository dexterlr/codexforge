import type { CSSProperties } from "react";
import type {
  CodexForgeKnowledgeClusterNode,
  CodexForgeSemanticHeatmapCell,
} from "@/lib/codexforge/brain/runtime";
import { recommendTopologyNextAction } from "@/lib/codexforge/brain/runtime";
import { topologySignalColor } from "./brain-topology-legend";

type Selection = CodexForgeSemanticHeatmapCell | CodexForgeKnowledgeClusterNode | null;

type BrainTopologyInspectorProps = {
  selection: Selection;
};

export function BrainTopologyInspector({ selection }: BrainTopologyInspectorProps) {
  const intensity = selection
    ? "intensity" in selection
      ? selection.intensity
      : selection.weight
    : 0;
  const supportingSignals = selection
    ? "supportingSignals" in selection
      ? selection.supportingSignals
      : []
    : [];
  const nextSafeAction = selection
    ? "nextSafeAction" in selection
      ? selection.nextSafeAction
      : recommendTopologyNextAction({
          generatedAt: 0,
          layers: [{ id: "memory-density", label: "Selected", description: "", cells: [selection] }],
          summary: {
            status: "ready",
            text: "",
            hotspotCount: 1,
            densestMemoryRegions: [],
            highestRiskHotspots: [],
            strongestConceptClusters: [],
            staleOrContradictoryAreas: [],
            executionHotspots: [],
            agentActivityHotspots: [],
            architectureHotspots: [],
            nextSafeAction: "",
          },
        })
    : "Select a topology cell or cluster to inspect supporting signals.";

  return (
    <aside data-codexforge-brain-topology-inspector style={inspectorStyle}>
      <div>
        <div style={eyebrowStyle}>Topology inspector</div>
        <h3 style={titleStyle}>{selection?.label ?? "No selection"}</h3>
      </div>

      {selection ? (
        <>
          <div style={metricGridStyle}>
            <Metric label="Kind" value={selection.kind} accent={topologySignalColor(selection.kind)} />
            <Metric label="Intensity" value={intensity.toFixed(2)} />
            <Metric label="Risk" value={selection.risk.toFixed(2)} />
            <Metric label="Confidence" value={selection.confidence.toFixed(2)} />
          </div>
          <List title="Supporting signals" items={supportingSignals} />
          <List title="Reasons" items={selection.reasons} />
          <div style={actionStyle}>
            <strong>Next safe action</strong>
            <span>{nextSafeAction}</span>
          </div>
        </>
      ) : (
        <p style={emptyStyle}>Select a heatmap cell or topology node to inspect label, risk, confidence, reasons, and safe next action.</p>
      )}
    </aside>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong style={{ color: accent ?? "rgba(241,245,249,0.94)" }}>{value}</strong>
    </div>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div style={listStyle}>
      <div style={eyebrowStyle}>{title}</div>
      {items.length > 0 ? (
        items.slice(0, 8).map((item) => (
          <div key={item} style={rowStyle}>
            {item}
          </div>
        ))
      ) : (
        <div style={emptyStyle}>No supporting signals yet.</div>
      )}
    </div>
  );
}

const inspectorStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.42)",
  alignContent: "start",
};

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 7,
};

const rowStyle: CSSProperties = {
  padding: 8,
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.84)",
  fontSize: 12,
  lineHeight: 1.45,
};

const actionStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.45,
};

const emptyStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 12,
  lineHeight: 1.5,
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
  lineHeight: 1.25,
};

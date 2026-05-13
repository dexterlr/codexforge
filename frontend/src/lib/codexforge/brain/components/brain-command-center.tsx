"use client";

import { useState, type CSSProperties } from "react";
import { BrainGraphView } from "./brain-graph-view";
import { BrainAgentActivityPanel } from "./brain-agent-activity-panel";
import { BrainMemoryClustersPanel } from "./brain-memory-clusters-panel";
import { BrainModeTabs } from "./brain-mode-tabs";
import { BrainPredictionPanel } from "./brain-prediction-panel";
import { BrainLineagePanel } from "./brain-lineage-panel";
import { BrainKnowledgeTopologyPanel } from "./brain-knowledge-topology-panel";
import { BrainReplayPanel } from "./brain-replay-panel";
import { BrainRecommendationsPanel } from "./brain-recommendations-panel";
import { BrainInsightQueuePanel } from "./brain-insight-queue-panel";
import { BrainRiskPanel } from "./brain-risk-panel";
import { BrainRuntimeHealthPanel } from "./brain-runtime-health-panel";
import { BrainSemanticHeatmapPanel } from "./brain-semantic-heatmap-panel";
import { BrainTimelinePanel } from "./brain-timeline-panel";
import type {
  CodexForgeBrainCommandCenterProps,
  CodexForgeBrainCommandMode,
} from "./brain-command-center-types";

export function BrainCommandCenter({
  graph,
  selectedNode,
  selectedNodeId,
  onSelectNode,
}: CodexForgeBrainCommandCenterProps) {
  const [activeMode, setActiveMode] =
    useState<CodexForgeBrainCommandMode>("runtime-health");

  return (
    <section data-codexforge-brain-command-center style={shellStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Cognitive command center</div>
          <h2 style={titleStyle}>CodexForge brain runtime</h2>
          <p style={copyStyle}>
            A read-only command layer for runtime health, memory, agents,
            prediction, risks, replay, lineage, timeline, and the preserved graph inspector flow.
          </p>
        </div>
        <div style={statusGridStyle}>
          <Status label="Nodes" value={String(graph.nodes.length)} />
          <Status label="Edges" value={String(graph.edges.length)} />
          <Status label="Mode" value={activeMode} />
        </div>
      </div>

      <BrainModeTabs activeMode={activeMode} onModeChange={setActiveMode} />

      <div style={panelGridStyle}>
        <BrainRuntimeHealthPanel graph={graph} />
        <BrainMemoryClustersPanel graph={graph} />
        <BrainAgentActivityPanel />
        <BrainPredictionPanel graph={graph} selectedNode={selectedNode} />
        <BrainRiskPanel graph={graph} />
        <BrainTimelinePanel graph={graph} />
        <BrainReplayPanel graph={graph} />
        <BrainLineagePanel graph={graph} />
        <BrainSemanticHeatmapPanel graph={graph} />
        <BrainKnowledgeTopologyPanel graph={graph} />
        <BrainRecommendationsPanel graph={graph} />
        <BrainInsightQueuePanel graph={graph} />
      </div>

      <div style={modePanelStyle} data-codexforge-brain-active-mode={activeMode}>
        <ModeSummary mode={activeMode} />
      </div>

      <div data-codexforge-brain-graph-preserved style={graphFrameStyle}>
        <BrainGraphView
          graph={graph}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
        />
      </div>

      <div data-codexforge-brain-inspector-preserved style={inspectorNoteStyle}>
        Graph Inspector remains below with the existing selection, pin, archive,
        copy, export, and raw JSON workflows.
      </div>
    </section>
  );
}

function ModeSummary({ mode }: { mode: CodexForgeBrainCommandMode }) {
  const label = mode
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

  return (
    <div>
      <div style={eyebrowStyle}>Active mode</div>
      <strong style={{ fontSize: 15 }}>{label}</strong>
    </div>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div style={statusStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const shellStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  marginBottom: 18,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.24)",
  background:
    "radial-gradient(circle at 35% 0%, rgba(14,165,233,0.22), transparent 34%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.92))",
  color: "rgba(241,245,249,0.96)",
  boxShadow: "0 22px 80px rgba(2,6,23,0.30)",
};

const headerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 0.42fr)",
  gap: 14,
  alignItems: "start",
};

const statusGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
};

const statusStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
  minWidth: 0,
};

const panelGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))",
  gap: 12,
  alignItems: "start",
};

const modePanelStyle: CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const graphFrameStyle: CSSProperties = {
  display: "grid",
};

const inspectorNoteStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
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
  fontSize: 24,
  lineHeight: 1.1,
};

const copyStyle: CSSProperties = {
  margin: "8px 0 0",
  maxWidth: 880,
  color: "rgba(226,232,240,0.76)",
  fontSize: 13,
  lineHeight: 1.55,
};

export default BrainCommandCenter;

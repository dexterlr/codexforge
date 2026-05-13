"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  buildAgentLineageView,
  buildBrainReplayFixtureEvents,
  buildBrainReplayFixtureGraph,
  buildBrainReplayFixtureLineage,
  buildBrainRuntimeLineage,
  buildExecutionLineageView,
  buildMemoryLineageView,
  summarizeBrainRuntimeLineage,
  type CodexForgeBrainLineageEdge,
  type CodexForgeBrainLineageGraph,
  type CodexForgeBrainLineageNode,
  type CodexForgeBrainReplayBuildInput,
} from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import { buildAgentRuntimeFixturePlan } from "@/lib/codexforge/agents/runtime";
import { BrainLineageInspector } from "./brain-lineage-inspector";

type BrainLineagePanelProps = {
  graph: CodexForgeBrainGraph;
  lineageInput?: Omit<CodexForgeBrainReplayBuildInput, "graph">;
};

type Selection =
  | { kind: "node"; id: string }
  | { kind: "edge"; id: string }
  | null;

export function BrainLineagePanel({ graph, lineageInput }: BrainLineagePanelProps) {
  const effectiveInput = useMemo<CodexForgeBrainReplayBuildInput>(() => {
    const events = lineageInput?.events ?? [];
    if (events.length > 0) return { graph, ...lineageInput, events };
    return {
      graph: buildBrainReplayFixtureGraph(),
      events: buildBrainReplayFixtureEvents(),
      agentPlan: buildAgentRuntimeFixturePlan("high-risk-mutation"),
    };
  }, [graph, lineageInput]);

  const runtimeLineage = useMemo(() => {
    const live = buildBrainRuntimeLineage(effectiveInput);
    return live.nodes.length > 0 ? live : buildBrainReplayFixtureLineage();
  }, [effectiveInput]);
  const executionLineage = useMemo(() => buildExecutionLineageView(effectiveInput), [effectiveInput]);
  const memoryLineage = useMemo(() => buildMemoryLineageView(effectiveInput), [effectiveInput]);
  const agentLineage = useMemo(() => buildAgentLineageView(effectiveInput), [effectiveInput]);
  const [selection, setSelection] = useState<Selection>(() => runtimeLineage.nodes[0] ? { kind: "node", id: runtimeLineage.nodes[0].id } : null);

  const selectedNode = selection?.kind === "node" ? runtimeLineage.nodes.find((node) => node.id === selection.id) ?? null : null;
  const selectedEdge = selection?.kind === "edge" ? runtimeLineage.edges.find((edge) => edge.id === selection.id) ?? null : null;

  return (
    <section data-codexforge-brain-lineage-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Runtime lineage</div>
          <h2 style={titleStyle}>Execution, memory, and agent handoffs</h2>
        </div>
        <span style={pillStyle}>read-only topology</span>
      </div>

      <div style={summaryStyle}>{summarizeBrainRuntimeLineage(runtimeLineage)}</div>

      <div style={layoutStyle}>
        <div style={sectionsStyle}>
          <LineageSection kind="execution" graph={executionLineage} onSelect={setSelection} />
          <LineageSection kind="memory" graph={memoryLineage} onSelect={setSelection} />
          <LineageSection kind="agent" graph={agentLineage} onSelect={setSelection} />
        </div>
        <BrainLineageInspector selectedNode={selectedNode} selectedEdge={selectedEdge} />
      </div>
    </section>
  );
}

function LineageSection({
  graph,
  kind,
  onSelect,
}: {
  graph: CodexForgeBrainLineageGraph;
  kind: "execution" | "memory" | "agent";
  onSelect: (selection: Selection) => void;
}) {
  return (
    <section
      data-codexforge-brain-execution-lineage={kind === "execution" ? "true" : undefined}
      data-codexforge-brain-memory-lineage={kind === "memory" ? "true" : undefined}
      data-codexforge-brain-agent-lineage={kind === "agent" ? "true" : undefined}
      style={sectionStyle}
    >
      <div style={sectionHeaderStyle}>
        <div>
          <div style={eyebrowStyle}>{graph.label}</div>
          <strong>{graph.summary}</strong>
        </div>
      </div>
      <div style={topologyStyle}>
        <div style={listStyle}>
          {graph.nodes.slice(0, 10).map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect({ kind: "node", id: node.id })}
              data-codexforge-brain-lineage-node
              style={nodeStyle}
            >
              <strong>{node.kind}: {node.label}</strong>
              <span>{node.status} / {node.severity}</span>
            </button>
          ))}
        </div>
        <div style={listStyle}>
          {graph.edges.slice(0, 10).map((edge) => (
            <button
              key={edge.id}
              type="button"
              onClick={() => onSelect({ kind: "edge", id: edge.id })}
              data-codexforge-brain-lineage-edge
              style={edgeStyle}
            >
              <strong>{edge.relation}</strong>
              <span>{edge.from} to {edge.to}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.82)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 0.34fr)",
  gap: 12,
  alignItems: "start",
};

const sectionsStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const sectionHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
};

const topologyStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
  gap: 8,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 7,
};

const nodeStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  textAlign: "left",
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  color: "inherit",
  cursor: "pointer",
  fontSize: 12,
};

const edgeStyle: CSSProperties = {
  ...nodeStyle,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.07)",
};

const summaryStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 10,
  fontWeight: 900,
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
  fontSize: 18,
  lineHeight: 1.2,
};

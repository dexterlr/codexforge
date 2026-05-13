"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildKnowledgeTopology,
  buildSemanticTopologyFixtureContext,
  buildSemanticTopologyFixtureEvents,
  buildSemanticTopologyFixtureGraph,
  buildSemanticTopologyFixtureMemory,
  selectTopologyHotspots,
  type CodexForgeKnowledgeClusterNode,
} from "@/lib/codexforge/brain/runtime";
import { BrainTopologyInspector } from "./brain-topology-inspector";
import { BrainTopologyLegend, topologySignalColor } from "./brain-topology-legend";
import { BrainReadOnlyBadge, BrainSectionHeader } from "./ui";

type BrainKnowledgeTopologyPanelProps = {
  graph: CodexForgeBrainGraph;
};

export function BrainKnowledgeTopologyPanel({ graph }: BrainKnowledgeTopologyPanelProps) {
  const topology = useMemo(() => {
    const useFixture = graph.nodes.length === 0;
    return buildKnowledgeTopology({
      graph: useFixture ? buildSemanticTopologyFixtureGraph() : graph,
      events: useFixture ? buildSemanticTopologyFixtureEvents() : [],
      cognitiveMemory: useFixture ? buildSemanticTopologyFixtureMemory() : undefined,
      predictiveContext: useFixture ? buildSemanticTopologyFixtureContext() : undefined,
      now: useFixture ? 1767225600000 : graph.meta.updatedAt,
    });
  }, [graph]);
  const hotspots = useMemo(
    () => selectTopologyHotspots(topology, 6) as CodexForgeKnowledgeClusterNode[],
    [topology]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = topology.clusters.find((cluster) => cluster.id === selectedId) ?? hotspots[0] ?? null;
  const layoutLookup = Object.fromEntries(topology.layout.map((point) => [point.id, point]));

  return (
    <section data-codexforge-brain-knowledge-topology-panel style={panelStyle}>
      <BrainSectionHeader
        eyebrow="Knowledge topology"
        title="Cluster graph and cognitive lanes"
        description="Read-only cluster topology with deterministic layout and weighted relations."
        status={<BrainReadOnlyBadge label="read-only deterministic" />}
      />

      <div data-codexforge-brain-topology-summary style={summaryStyle}>
        {topology.summary.text} Next safe action: {topology.summary.nextSafeAction}
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <BrainTopologyLegend />

          <div style={mapStyle}>
            <svg viewBox="0 0 480 340" role="img" aria-label="CodexForge knowledge topology" style={svgStyle}>
              {topology.edges.map((edge) => {
                const from = layoutLookup[edge.from];
                const to = layoutLookup[edge.to];
                if (!from || !to) return null;
                return (
                  <line
                    key={edge.id}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(125,211,252,0.26)"
                    strokeWidth={1 + edge.weight * 3}
                    data-codexforge-brain-topology-edge
                  />
                );
              })}

              {topology.layout.map((point) => {
                const cluster = topology.clusters.find((item) => item.id === point.id);
                if (!cluster) return null;
                const active = selected?.id === cluster.id;
                return (
                  <g key={point.id} data-codexforge-brain-topology-node>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={point.radius + (active ? 7 : 3)}
                      fill={topologySignalColor(cluster.kind)}
                      opacity={active ? 0.28 : 0.14}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={point.radius}
                      fill={topologySignalColor(cluster.kind)}
                      stroke={active ? "#e0f2fe" : "rgba(255,255,255,0.44)"}
                      strokeWidth={active ? 2.4 : 1}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedId(cluster.id)}
                    />
                    {active ? (
                      <text x={point.x} y={point.y + point.radius + 16} textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="700">
                        {point.label.length > 28 ? `${point.label.slice(0, 25)}...` : point.label}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>

          <section style={clusterGridStyle}>
            {topology.clusters.map((cluster) => (
              <button
                key={cluster.id}
                type="button"
                data-codexforge-brain-topology-hotspot
                onClick={() => setSelectedId(cluster.id)}
                style={{
                  ...clusterStyle,
                  borderColor: selected?.id === cluster.id ? "rgba(125,211,252,0.58)" : "rgba(255,255,255,0.09)",
                }}
              >
                <strong>{cluster.label}</strong>
                <span>{cluster.kind} / weight {cluster.weight.toFixed(2)} / density {cluster.density.toFixed(2)}</span>
              </button>
            ))}
          </section>
        </div>

        <BrainTopologyInspector selection={selected} />
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
  background: "radial-gradient(circle at 25% 0%, rgba(20,184,166,0.18), transparent 30%), rgba(15,23,42,0.84)",
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
  gap: 12,
  alignItems: "start",
};

const mainStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const mapStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 8,
  background: "radial-gradient(circle at center, rgba(14,165,233,0.12), transparent 34%), rgba(2,6,23,0.52)",
  overflow: "hidden",
};

const svgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  minHeight: 300,
};

const clusterGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 8,
};

const clusterStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  textAlign: "left",
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "inherit",
  cursor: "pointer",
  fontSize: 12,
  lineHeight: 1.45,
};

const summaryStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
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

"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildSemanticHeatmap,
  buildSemanticTopologyFixtureContext,
  buildSemanticTopologyFixtureEvents,
  buildSemanticTopologyFixtureGraph,
  buildSemanticTopologyFixtureMemory,
  selectTopologyHotspots,
  type CodexForgeSemanticHeatmapCell,
} from "@/lib/codexforge/brain/runtime";
import { BrainTopologyInspector } from "./brain-topology-inspector";
import { BrainTopologyLegend, topologySignalColor } from "./brain-topology-legend";
import { BrainReadOnlyBadge, BrainSectionHeader } from "./ui";

type BrainSemanticHeatmapPanelProps = {
  graph: CodexForgeBrainGraph;
};

export function BrainSemanticHeatmapPanel({ graph }: BrainSemanticHeatmapPanelProps) {
  const heatmap = useMemo(() => {
    const useFixture = graph.nodes.length === 0;
    return buildSemanticHeatmap({
      graph: useFixture ? buildSemanticTopologyFixtureGraph() : graph,
      events: useFixture ? buildSemanticTopologyFixtureEvents() : [],
      cognitiveMemory: useFixture ? buildSemanticTopologyFixtureMemory() : undefined,
      predictiveContext: useFixture ? buildSemanticTopologyFixtureContext() : undefined,
      now: useFixture ? 1767225600000 : graph.meta.updatedAt,
    });
  }, [graph]);
  const hotspots = useMemo(
    () => selectTopologyHotspots(heatmap, 8) as CodexForgeSemanticHeatmapCell[],
    [heatmap]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = heatmap.layers
    .flatMap((layer) => layer.cells)
    .find((cell) => cell.id === selectedId) ?? hotspots[0] ?? null;

  return (
    <section data-codexforge-brain-semantic-heatmap-panel style={panelStyle}>
      <BrainSectionHeader
        eyebrow="Semantic heatmap"
        title="Cognitive weight radar"
        description="Deterministic topology intensity, risk, and relevance map."
        status={<BrainReadOnlyBadge label="read-only topology" />}
      />

      <div data-codexforge-brain-heatmap-summary style={summaryStyle}>
        {heatmap.summary.text} Next safe action: {heatmap.summary.nextSafeAction}
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <BrainTopologyLegend />

          <div style={layerGridStyle}>
            {heatmap.layers.map((layer) => (
              <section key={layer.id} data-codexforge-brain-heatmap-layer style={layerStyle}>
                <div>
                  <div style={eyebrowStyle}>{layer.label}</div>
                  <p style={descriptionStyle}>{layer.description}</p>
                </div>
                <div style={cellGridStyle}>
                  {layer.cells.length > 0 ? (
                    layer.cells.slice(0, 9).map((cell) => (
                      <button
                        key={cell.id}
                        type="button"
                        data-codexforge-brain-heatmap-cell
                        onClick={() => setSelectedId(cell.id)}
                        style={{
                          ...cellStyle,
                          borderColor: selected?.id === cell.id ? "rgba(125,211,252,0.58)" : "rgba(255,255,255,0.09)",
                          background: `linear-gradient(180deg, ${topologySignalColor(cell.kind)}33, rgba(255,255,255,0.035))`,
                        }}
                      >
                        <span style={cellLabelStyle}>{cell.label}</span>
                        <span style={cellBarWrapStyle}>
                          <span
                            style={{
                              ...cellBarStyle,
                              width: `${Math.round(cell.intensity * 100)}%`,
                              background: topologySignalColor(cell.kind),
                            }}
                          />
                        </span>
                        <span style={cellMetaStyle}>
                          {cell.kind} / {cell.intensity.toFixed(2)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div style={emptyStyle}>No cells for this layer yet.</div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <section style={hotspotStyle}>
            <div style={eyebrowStyle}>Top hotspots</div>
            <div style={hotspotGridStyle}>
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  type="button"
                  data-codexforge-brain-heatmap-hotspot
                  onClick={() => setSelectedId(hotspot.id)}
                  style={hotspotButtonStyle}
                >
                  <strong>{hotspot.label}</strong>
                  <span>{hotspot.kind} / intensity {hotspot.intensity.toFixed(2)} / risk {hotspot.risk.toFixed(2)}</span>
                </button>
              ))}
            </div>
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
  background: "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.18), transparent 32%), rgba(15,23,42,0.84)",
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

const layerGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 10,
};

const layerStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const cellGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 6,
};

const cellStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  minHeight: 74,
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  color: "inherit",
  cursor: "pointer",
  textAlign: "left",
  minWidth: 0,
};

const cellLabelStyle: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.25,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};

const cellBarWrapStyle: CSSProperties = {
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,0.10)",
  overflow: "hidden",
};

const cellBarStyle: CSSProperties = {
  display: "block",
  height: "100%",
  borderRadius: 999,
};

const cellMetaStyle: CSSProperties = {
  color: "rgba(226,232,240,0.70)",
  fontSize: 10,
};

const hotspotStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const hotspotGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 8,
};

const hotspotButtonStyle: CSSProperties = {
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

const descriptionStyle: CSSProperties = {
  margin: "5px 0 0",
  color: "rgba(226,232,240,0.68)",
  fontSize: 12,
  lineHeight: 1.4,
};

const emptyStyle: CSSProperties = {
  gridColumn: "1 / -1",
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

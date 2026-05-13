"use client";

import { useMemo, type CSSProperties } from "react";
import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import { buildStableReactKey } from "./brain-react-key";

type BrainGraphViewProps = {
  graph: CodexForgeBrainGraph;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

type LayoutNode = {
  node: CodexForgeBrainNode;
  x: number;
  y: number;
  radius: number;
  neighborCount: number;
  color: string;
};

const WIDTH = 980;
const HEIGHT = 520;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const OUTER_RADIUS = 205;
const INNER_RADIUS = 74;
const MAX_VISIBLE_NODES = 72;
const MAX_VISIBLE_EDGES = 160;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getNodeLabel(node: CodexForgeBrainNode): string {
  if (isRecord(node.data)) {
    const label = asString((node.data as Record<string, unknown>).label);
    if (label) return label;
  }

  return `${node.kind} ${node.id}`;
}

function getNodeSummary(node: CodexForgeBrainNode): string {
  if (!isRecord(node.data)) return "";

  for (const key of ["summary", "whyItMatters", "goal", "content", "text", "description", "nextAction"]) {
    const value = asString((node.data as Record<string, unknown>)[key]);
    if (value) return value.length > 140 ? `${value.slice(0, 137)}...` : value;
  }

  return "";
}

function getNodeImportanceRank(node: CodexForgeBrainNode): number {
  switch (node.meta.importance) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}

function getNodeKindColor(kind: string): string {
  let hash = 0;

  for (let index = 0; index < kind.length; index += 1) {
    hash = (hash * 31 + kind.charCodeAt(index)) >>> 0;
  }

  const hue = hash % 360;
  return `hsl(${hue} 84% 62%)`;
}

function buildNeighborCounts(edges: CodexForgeBrainEdge[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const edge of edges) {
    counts[edge.from] = (counts[edge.from] ?? 0) + 1;
    counts[edge.to] = (counts[edge.to] ?? 0) + 1;
  }

  return counts;
}

function buildVisibleNodes(graph: CodexForgeBrainGraph, selectedNodeId: string | null): CodexForgeBrainNode[] {
  return [...graph.nodes]
    .sort((a, b) => {
      if (a.id === selectedNodeId) return -1;
      if (b.id === selectedNodeId) return 1;

      const pinnedDiff = Number(b.meta.pinned === true) - Number(a.meta.pinned === true);
      if (pinnedDiff !== 0) return pinnedDiff;

      const importanceDiff = getNodeImportanceRank(b) - getNodeImportanceRank(a);
      if (importanceDiff !== 0) return importanceDiff;

      return (b.meta.updatedAt ?? 0) - (a.meta.updatedAt ?? 0);
    })
    .slice(0, MAX_VISIBLE_NODES);
}

function buildLayout(graph: CodexForgeBrainGraph, selectedNodeId: string | null): LayoutNode[] {
  const visibleNodes = buildVisibleNodes(graph, selectedNodeId);
  const neighborCounts = buildNeighborCounts(graph.edges);
  const kindCounts = new Map<string, number>();

  return visibleNodes.map((node, index) => {
    const kindIndex = kindCounts.get(node.kind) ?? 0;
    kindCounts.set(node.kind, kindIndex + 1);

    const selected = node.id === selectedNodeId;
    const angle = (index / Math.max(1, visibleNodes.length)) * Math.PI * 2;
    const importanceRank = getNodeImportanceRank(node);
    const ringOffset = (kindIndex % 4) * 22;
    const radius = selected
      ? 22
      : 8 + Math.min(10, (neighborCounts[node.id] ?? 0) * 1.2) + importanceRank;

    const orbit = selected
      ? 0
      : INNER_RADIUS + OUTER_RADIUS - importanceRank * 22 + ringOffset;

    return {
      node,
      x: selected ? CENTER_X : CENTER_X + Math.cos(angle) * orbit,
      y: selected ? CENTER_Y : CENTER_Y + Math.sin(angle) * orbit,
      radius,
      neighborCount: neighborCounts[node.id] ?? 0,
      color: getNodeKindColor(node.kind),
    };
  });
}

function buildVisibleEdges(graph: CodexForgeBrainGraph, layoutNodes: LayoutNode[]): CodexForgeBrainEdge[] {
  const visibleNodeIds = new Set(layoutNodes.map((entry) => entry.node.id));

  return graph.edges
    .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
    .slice(0, MAX_VISIBLE_EDGES);
}

function getLayoutLookup(layoutNodes: LayoutNode[]): Record<string, LayoutNode> {
  const lookup: Record<string, LayoutNode> = {};

  for (const item of layoutNodes) {
    lookup[item.node.id] = item;
  }

  return lookup;
}

function getSelectedNode(graph: CodexForgeBrainGraph, selectedNodeId: string | null): CodexForgeBrainNode | null {
  if (!selectedNodeId) return graph.nodes[0] ?? null;
  return graph.nodes.find((node) => node.id === selectedNodeId) ?? graph.nodes[0] ?? null;
}

function panelStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125, 211, 252, 0.28)",
    background:
      "radial-gradient(circle at 50% 0%, rgba(14,165,233,0.26), transparent 36%), radial-gradient(circle at 8% 22%, rgba(99,102,241,0.16), transparent 26%), linear-gradient(135deg, rgba(2,6,23,0.94), rgba(15,23,42,0.72))",
    borderRadius: 28,
    padding: 20,
    boxShadow: "0 30px 100px rgba(2, 6, 23, 0.42), inset 0 1px 0 rgba(255,255,255,0.05)",
    overflow: "hidden",
    minWidth: 0,
  };
}

function statStyle(): CSSProperties {
  return {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035))",
    borderRadius: 18,
    padding: "12px 14px",
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  };
}

const safeWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const pillTextStyle: CSSProperties = {
  ...safeWrapStyle,
  whiteSpace: "normal",
};

export function BrainGraphView({ graph, selectedNodeId, onSelectNode }: BrainGraphViewProps) {
  const layoutNodes = useMemo(() => buildLayout(graph, selectedNodeId), [graph, selectedNodeId]);
  const visibleEdges = useMemo(() => buildVisibleEdges(graph, layoutNodes), [graph, layoutNodes]);
  const layoutLookup = useMemo(() => getLayoutLookup(layoutNodes), [layoutNodes]);
  const selectedNode = useMemo(() => getSelectedNode(graph, selectedNodeId), [graph, selectedNodeId]);

  const selectedSummary = selectedNode ? getNodeSummary(selectedNode) : "";
  const visibleKinds = [...new Set(layoutNodes.map((entry) => entry.node.kind))].slice(0, 8);

  return (
    <section
      style={panelStyle()}
      data-codexforge-brain-graph-view="true"
      data-codexforge-brain-neural-canvas="true"
      data-codexforge-brain-graph-node-count={graph.nodes.length}
      data-codexforge-brain-graph-edge-count={graph.edges.length}
      data-codexforge-brain-responsive-grid
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 14,
              color: "#e0f2fe",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                }}
              >
                Neural memory net
              </p>
              <h2 style={{ margin: "6px 0 0", fontSize: 24, lineHeight: 1.1, ...safeWrapStyle }}>
                CodexForge neural constellation
              </h2>
              <p style={{ margin: "8px 0 0", maxWidth: 720, color: "rgba(224,242,254,0.78)", fontSize: 13, lineHeight: 1.55, ...safeWrapStyle }}>
                Click a memory, task, run, repo, message, or tag node to focus the inspector. Node size reflects connectivity and importance. The focus halo, cluster map, and signal panel make the brain usable as an operator-grade memory topology.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "flex-start",
                minWidth: 0,
              }}
              data-codexforge-brain-graph-stats="true"
              data-codexforge-brain-signal-panel="true"
            >
              <div style={statStyle()}>
                <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Synaptic nodes
                </div>
                <strong style={{ fontSize: 20 }}>{layoutNodes.length}</strong>
              </div>
              <div style={statStyle()}>
                <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Synaptic links
                </div>
                <strong style={{ fontSize: 20 }}>{visibleEdges.length}</strong>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(125,211,252,0.16)",
                background:
                "radial-gradient(circle at center, rgba(14,165,233,0.20), transparent 31%), radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12), transparent 48%), rgba(2,6,23,0.54)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "inset 0 0 80px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              role="img"
              aria-label="CodexForge brain graph"
              style={{ width: "100%", minHeight: 380, display: "block" }}
              data-codexforge-brain-graph-svg="true"
            >
              <defs>
                <radialGradient id="brain-node-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(125,211,252,0.28)" />
                </radialGradient>
              </defs>

              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={OUTER_RADIUS + 92}
                fill="none"
                stroke="rgba(125,211,252,0.08)"
                strokeWidth="1"
                data-codexforge-brain-graph-orbit="outer"
              />
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={OUTER_RADIUS + 26}
                fill="none"
                stroke="rgba(125,211,252,0.12)"
                strokeWidth="1"
                data-codexforge-brain-graph-orbit="middle"
              />
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={INNER_RADIUS}
                fill="rgba(14,165,233,0.08)"
                stroke="rgba(125,211,252,0.16)"
                strokeWidth="1"
                data-codexforge-brain-graph-focus="true"
              />

              {visibleEdges.map((edge) => {
                const from = layoutLookup[edge.from];
                const to = layoutLookup[edge.to];

                if (!from || !to) return null;

                const selectedEdge = edge.from === selectedNode?.id || edge.to === selectedNode?.id;

                return (
                  <line
                    key={edge.id}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={selectedEdge ? "rgba(125,211,252,0.58)" : "rgba(148,163,184,0.18)"}
                    strokeWidth={selectedEdge ? 2.2 : 1}
                    data-codexforge-brain-graph-edge="true"
                  />
                );
              })}

              {layoutNodes.map((entry) => {
                const selected = entry.node.id === selectedNode?.id;
                const label = getNodeLabel(entry.node);

                return (
                  <g
                    key={entry.node.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectNode(entry.node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        onSelectNode(entry.node.id);
                      }
                    }}
                    style={{ cursor: "pointer", outline: "none" }}
                    data-codexforge-brain-graph-node="true"
                    data-codexforge-brain-graph-node-kind={entry.node.kind}
                    data-codexforge-brain-graph-node-selected={selected ? "true" : "false"}
                  >
                    {selected ? (
                      <circle
                        cx={entry.x}
                        cy={entry.y}
                        r={entry.radius + 13}
                        fill="none"
                        stroke="rgba(125,211,252,0.74)"
                        strokeWidth="2"
                      />
                    ) : null}
                    <circle
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius + 7}
                      fill={entry.color}
                      opacity="0.16"
                    />
                    <circle
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius}
                      fill={selected ? "url(#brain-node-glow)" : entry.color}
                      stroke={selected ? "#e0f2fe" : "rgba(255,255,255,0.45)"}
                      strokeWidth={selected ? 2.4 : 1}
                    />
                    {selected ? (
                      <text
                        x={entry.x}
                        y={entry.y + entry.radius + 24}
                        textAnchor="middle"
                        fill="#e0f2fe"
                        fontSize="13"
                        fontWeight="700"
                      >
                        {label.length > 34 ? `${label.slice(0, 31)}...` : label}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <aside
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.78), rgba(2,6,23,0.64))",
            borderRadius: 24,
            padding: 16,
            color: "#e0f2fe",
            minWidth: 0,
            maxHeight: 520,
            overflow: "auto",
          }}
          data-codexforge-brain-graph-insight-panel="true"
          data-codexforge-brain-focus-node="true"
          data-codexforge-brain-overflow-guard
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7dd3fc",
            }}
          >
            Focus node
          </p>

          {selectedNode ? (
            <div style={{ display: "grid", gap: 14, marginTop: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.15, ...safeWrapStyle }}>
                  {getNodeLabel(selectedNode)}
                </h3>
                <p style={{ margin: "8px 0 0", color: "rgba(224,242,254,0.7)", fontSize: 13, lineHeight: 1.5, ...safeWrapStyle }}>
                  {selectedSummary || "No summary available yet."}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 10 }}>
                <div style={statStyle()} data-codexforge-brain-graph-focus-kind="true">
                  <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)" }}>Kind</div>
                  <strong style={safeWrapStyle}>{selectedNode.kind}</strong>
                </div>
                <div style={statStyle()} data-codexforge-brain-graph-focus-importance="true">
                  <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)" }}>Importance</div>
                  <strong style={safeWrapStyle}>{selectedNode.meta.importance ?? "low"}</strong>
                </div>
                <div style={statStyle()} data-codexforge-brain-graph-focus-status="true">
                  <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)" }}>Status</div>
                  <strong style={safeWrapStyle}>{selectedNode.meta.status ?? "idle"}</strong>
                </div>
                <div style={statStyle()} data-codexforge-brain-graph-focus-neighbors="true">
                  <div style={{ fontSize: 11, color: "rgba(224,242,254,0.64)" }}>Neighbors</div>
                  <strong>{layoutLookup[selectedNode.id]?.neighborCount ?? 0}</strong>
                </div>
              </div>

              <div data-codexforge-brain-graph-legend="true"
                data-codexforge-brain-cluster-map="true">
                <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 800, color: "#bae6fd" }}>
                  Visible node kinds
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {visibleKinds.map((kind, index) => (
                    <span
                      key={buildStableReactKey("visible-node-kind", [kind], index)}
                      style={{
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 999,
                        padding: "6px 9px",
                        background: "rgba(255,255,255,0.06)",
                        fontSize: 11,
                        ...pillTextStyle,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: getNodeKindColor(kind),
                        }}
                      />
                      <span style={pillTextStyle}>{kind}</span>
                    </span>
                  ))}
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  border: "1px solid rgba(125,211,252,0.18)",
                  background: "rgba(14,165,233,0.10)",
                  borderRadius: 16,
                  padding: 12,
                  fontSize: 12,
                  color: "rgba(224,242,254,0.82)",
                  ...safeWrapStyle,
                }}
                data-codexforge-brain-graph-next-action="true"
                data-codexforge-brain-action-queue="true"
              >
                Next: use the existing inspector below for pin/archive/export actions, or copy the workspace prompt to route this node back into the AI workspace.
              </p>
            </div>
          ) : (
            <p style={{ color: "rgba(224,242,254,0.72)" }}>
              No graph nodes yet. Use the AI workspace to generate tasks, memory, research, and execution events.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default BrainGraphView;

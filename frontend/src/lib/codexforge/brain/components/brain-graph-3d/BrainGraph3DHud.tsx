"use client";

import type { CSSProperties } from "react";
import type { BrainGraph3DLayout, BrainGraph3DSignalDensity } from "./brain-graph-3d-types";

type BrainGraph3DHudProps = {
  layout: BrainGraph3DLayout;
  realNodeCount: number;
  realEdgeCount: number;
  signalDensity: BrainGraph3DSignalDensity;
  activeNeighborLabel: string;
  selectedNeighborCount: number;
  onSwitchTo2D: () => void;
  onResetCamera: () => void;
  onFocusSelected: () => void;
  onFitGraph: () => void;
  onPreviousNode: () => void;
  onNextNode: () => void;
  onPreviousNeighbor: () => void;
  onNextNeighbor: () => void;
  onFocusNeighbors: () => void;
  onToggleDensity: () => void;
};

const safeWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

function buttonStyle(active = false): CSSProperties {
  return {
    appearance: "none",
    border: active ? "1px solid rgba(224,242,254,0.56)" : "1px solid rgba(125,211,252,0.22)",
    background: active
      ? "linear-gradient(180deg, rgba(224,242,254,0.22), rgba(14,165,233,0.12))"
      : "linear-gradient(180deg, rgba(14,165,233,0.16), rgba(14,165,233,0.07))",
    color: "#e0f2fe",
    borderRadius: 10,
    padding: "8px 10px",
    fontSize: 11,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: active ? "0 0 24px rgba(125,211,252,0.16)" : "none",
    ...safeWrapStyle,
  };
}

function statStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125,211,252,0.16)",
    background: "rgba(2,6,23,0.50)",
    borderRadius: 10,
    padding: "8px 10px",
    minWidth: 82,
  };
}

export function BrainGraph3DHud(props: BrainGraph3DHudProps) {
  const selectedLabel = props.layout.selectedNode
    ? `${props.layout.selectedNode.node.kind} / ${props.layout.selectedNode.node.id}`
    : "No focus";

  return (
    <div
      className="codexforge-brain-graph-3d-hud"
      data-codexforge-brain-graph-3d-hud="true"
      style={{
        position: "absolute",
        zIndex: 8,
        inset: 12,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        pointerEvents: "none",
        color: "#e0f2fe",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
          flexWrap: "wrap",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            alignItems: "center",
            padding: 8,
            border: "1px solid rgba(125,211,252,0.18)",
            background: "rgba(2,6,23,0.58)",
            borderRadius: 14,
            backdropFilter: "blur(14px)",
            boxShadow: "0 18px 50px rgba(2,6,23,0.34), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <button type="button" style={buttonStyle(true)} aria-label="3D graph mode active">
            3D
          </button>
          <button type="button" onClick={props.onSwitchTo2D} style={buttonStyle()} aria-label="Switch to 2D graph">
            2D
          </button>
          <button type="button" onClick={props.onResetCamera} style={buttonStyle()} aria-label="Reset camera">
            Reset camera
          </button>
          <button type="button" onClick={props.onFocusSelected} style={buttonStyle(Boolean(props.layout.selectedNode))} aria-label="Focus selected">
            Focus selected
          </button>
          <button type="button" onClick={props.onFitGraph} style={buttonStyle()} aria-label="Fit graph">
            Fit graph
          </button>
          <button type="button" onClick={props.onPreviousNode} style={buttonStyle()} aria-label="Previous node">
            Previous node
          </button>
          <button type="button" onClick={props.onNextNode} style={buttonStyle()} aria-label="Next node">
            Next node
          </button>
          <button type="button" onClick={props.onPreviousNeighbor} style={buttonStyle(props.selectedNeighborCount > 0)} aria-label="Previous neighbor">
            Previous neighbor
          </button>
          <button type="button" onClick={props.onNextNeighbor} style={buttonStyle(props.selectedNeighborCount > 0)} aria-label="Next neighbor">
            Next neighbor
          </button>
          <button type="button" onClick={props.onFocusNeighbors} style={buttonStyle(props.selectedNeighborCount > 0)} aria-label="Focus neighbors">
            Focus neighbors
          </button>
          <button type="button" onClick={props.onToggleDensity} style={buttonStyle(props.signalDensity === "rich")} aria-label="Toggle signal field density">
            Density {props.signalDensity}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, auto))",
            gap: 7,
            pointerEvents: "auto",
          }}
        >
          <div style={statStyle()}>
            <div style={{ fontSize: 9, color: "rgba(186,230,253,0.68)", fontWeight: 900, textTransform: "uppercase" }}>Real nodes</div>
            <strong style={{ fontSize: 18 }}>{props.realNodeCount}</strong>
          </div>
          <div style={statStyle()}>
            <div style={{ fontSize: 9, color: "rgba(186,230,253,0.68)", fontWeight: 900, textTransform: "uppercase" }}>Real links</div>
            <strong style={{ fontSize: 18 }}>{props.realEdgeCount}</strong>
          </div>
        </div>
      </div>

      <div />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          alignItems: "end",
          flexWrap: "wrap",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            border: "1px solid rgba(125,211,252,0.16)",
            background: "rgba(2,6,23,0.54)",
            borderRadius: 14,
            padding: 12,
            backdropFilter: "blur(14px)",
            boxShadow: "0 18px 55px rgba(2,6,23,0.34)",
          }}
        >
          <div style={{ fontSize: 10, color: "rgba(186,230,253,0.72)", fontWeight: 900, textTransform: "uppercase" }}>
            Selected memory
          </div>
          <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.35, ...safeWrapStyle }}>{selectedLabel}</div>
          <div style={{ marginTop: 7, fontSize: 11, color: "rgba(224,242,254,0.58)", ...safeWrapStyle }}>
            Neighbor cue: {props.activeNeighborLabel}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            border: "1px solid rgba(125,211,252,0.14)",
            background: "rgba(2,6,23,0.50)",
            borderRadius: 14,
            padding: 10,
            backdropFilter: "blur(14px)",
          }}
          data-codexforge-brain-graph-3d-legend="true"
        >
          {props.layout.clusters.slice(0, 6).map((cluster) => (
            <span
              key={cluster.key}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "rgba(224,242,254,0.78)",
                ...safeWrapStyle,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: cluster.color,
                  boxShadow: `0 0 16px ${cluster.color}`,
                  flex: "0 0 auto",
                }}
              />
              {cluster.label} {cluster.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

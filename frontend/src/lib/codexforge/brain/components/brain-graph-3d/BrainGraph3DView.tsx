"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { buildBrainGraph3DLayout } from "./brain-graph-3d-layout";
import { BrainGraph3DFallback, BrainGraph3DErrorBoundary } from "./BrainGraph3DFallback";
import { BrainGraph3DHud } from "./BrainGraph3DHud";
import { BrainGraph3DScene } from "./BrainGraph3DScene";
import type {
  BrainGraph3DSceneCommand,
  BrainGraph3DSignalDensity,
  BrainGraph3DViewProps,
} from "./brain-graph-3d-types";

function getCommand(kind: BrainGraph3DSceneCommand["kind"], sequence: number): BrainGraph3DSceneCommand {
  return { kind, sequence };
}

const wrapStyle: CSSProperties = {
  position: "relative",
  minHeight: 620,
  overflow: "hidden",
  borderRadius: 22,
  border: "1px solid rgba(125,211,252,0.24)",
  background:
    "radial-gradient(circle at 50% 35%, rgba(14,165,233,0.24), transparent 34%), radial-gradient(circle at 18% 24%, rgba(45,212,191,0.13), transparent 24%), linear-gradient(145deg, rgba(2,6,23,0.98), rgba(15,23,42,0.92))",
  boxShadow: "inset 0 0 150px rgba(14,165,233,0.12), 0 26px 95px rgba(2,6,23,0.34)",
};

export function BrainGraph3DView(props: BrainGraph3DViewProps) {
  const [signalDensity, setSignalDensity] = useState<BrainGraph3DSignalDensity>("lean");
  const [commandSequence, setCommandSequence] = useState(0);
  const [commandKind, setCommandKind] = useState<BrainGraph3DSceneCommand["kind"]>("fit-graph");
  const layout = useMemo(
    () => buildBrainGraph3DLayout(props.graph, props.selectedNodeId, signalDensity),
    [props.graph, props.selectedNodeId, signalDensity]
  );
  const command = useMemo(() => getCommand(commandKind, commandSequence), [commandKind, commandSequence]);

  function sendCommand(kind: BrainGraph3DSceneCommand["kind"]): void {
    setCommandKind(kind);
    setCommandSequence((current) => current + 1);
  }

  return (
    <BrainGraph3DErrorBoundary fallback={<BrainGraph3DFallback onSwitchTo2D={props.onSwitchTo2D} />}>
      <div
        style={wrapStyle}
        data-codexforge-brain-graph-real-3d="true"
        data-codexforge-brain-graph-real-node-count={props.graph.nodes.length}
        data-codexforge-brain-graph-real-edge-count={props.graph.edges.length}
        data-codexforge-brain-graph-layout-hash={layout.layoutHash}
      >
        <BrainGraph3DScene layout={layout} command={command} onSelectNode={props.onSelectNode} />
        <BrainGraph3DHud
          layout={layout}
          realNodeCount={props.graph.nodes.length}
          realEdgeCount={props.graph.edges.length}
          signalDensity={signalDensity}
          activeNeighborLabel={props.activeNeighborLabel}
          selectedNeighborCount={props.selectedNeighborCount}
          onSwitchTo2D={props.onSwitchTo2D}
          onResetCamera={() => sendCommand("reset")}
          onFocusSelected={() => sendCommand("focus-selected")}
          onFitGraph={() => sendCommand("fit-graph")}
          onZoomIn={() => sendCommand("zoom-in")}
          onZoomOut={() => sendCommand("zoom-out")}
          onRotateLeft={() => sendCommand("rotate-left")}
          onRotateRight={() => sendCommand("rotate-right")}
          onTiltUp={() => sendCommand("tilt-up")}
          onTiltDown={() => sendCommand("tilt-down")}
          onPreviousNode={props.onPreviousNode}
          onNextNode={props.onNextNode}
          onPreviousNeighbor={props.onPreviousNeighbor}
          onNextNeighbor={props.onNextNeighbor}
          onFocusNeighbors={props.onFocusNeighbors}
          onToggleDensity={() => setSignalDensity((current) => (current === "lean" ? "rich" : "lean"))}
        />
      </div>
    </BrainGraph3DErrorBoundary>
  );
}

export default BrainGraph3DView;

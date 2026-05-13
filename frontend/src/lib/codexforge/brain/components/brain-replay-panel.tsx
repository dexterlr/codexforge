"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  buildBrainReplayFixtureEvents,
  buildBrainReplayFixtureGraph,
  buildBrainRuntimeLineage,
  buildBrainRuntimeReplay,
  selectReplayHighlights,
  summarizeBrainRuntimeReplay,
  type CodexForgeBrainReplayBuildInput,
  type CodexForgeBrainReplayFrame,
  type CodexForgeBrainReplayLane,
} from "@/lib/codexforge/brain/runtime";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import { buildAgentRuntimeFixturePlan } from "@/lib/codexforge/agents/runtime";
import { BrainReplayControls } from "./brain-replay-controls";
import { buildStableReactKey } from "./brain-react-key";

type BrainReplayPanelProps = {
  graph: CodexForgeBrainGraph;
  replayInput?: Omit<CodexForgeBrainReplayBuildInput, "graph">;
};

export function BrainReplayPanel({ graph, replayInput }: BrainReplayPanelProps) {
  const effectiveInput = useMemo<CodexForgeBrainReplayBuildInput>(() => {
    const events = replayInput?.events ?? [];
    if (events.length > 0) return { graph, ...replayInput, events };
    return {
      graph: buildBrainReplayFixtureGraph(),
      events: buildBrainReplayFixtureEvents(),
      agentPlan: buildAgentRuntimeFixturePlan("high-risk-mutation"),
    };
  }, [graph, replayInput]);

  const replay = useMemo(() => buildBrainRuntimeReplay(effectiveInput), [effectiveInput]);
  const lineage = useMemo(() => buildBrainRuntimeLineage(effectiveInput), [effectiveInput]);
  const summary = useMemo(() => summarizeBrainRuntimeReplay(replay), [replay]);
  const highlights = useMemo(
    () => selectReplayHighlights({ lanes: replay.lanes, lineage, limit: 6 }),
    [lineage, replay.lanes]
  );
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const selectedFrame = replay.frames[Math.min(selectedFrameIndex, Math.max(0, replay.frames.length - 1))] ?? null;

  return (
    <section data-codexforge-brain-replay-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Runtime replay</div>
          <h2 style={titleStyle}>Event replay and graph frames</h2>
        </div>
        <span style={pillStyle}>{summary.status === "ready" ? "read-only ready" : "fixture fallback"}</span>
      </div>

      <div data-codexforge-brain-replay-summary style={summaryStyle}>
        {summary.text}
      </div>

      <BrainReplayControls
        currentFrameIndex={selectedFrame ? selectedFrame.index : 0}
        frameCount={replay.frames.length}
        activeLaneId={selectedFrame?.activeLaneId ?? "messages"}
        playbackStatusText="Paused read-only replay"
        onPreviousFrame={() => setSelectedFrameIndex((value) => Math.max(0, value - 1))}
        onNextFrame={() => setSelectedFrameIndex((value) => Math.min(replay.frames.length - 1, value + 1))}
      />

      <div style={gridStyle}>
        <div style={columnStyle}>
          <div style={sectionTitleStyle}>Replay lanes</div>
          <div style={laneGridStyle}>
            {replay.lanes.map((lane) => (
              <LaneCard key={lane.id} lane={lane} activeFrame={selectedFrame} />
            ))}
          </div>
        </div>

        <div style={columnStyle}>
          <div style={sectionTitleStyle}>Replay highlights</div>
          <div style={listStyle}>
            {highlights.length > 0 ? (
              highlights.map((highlight, index) => (
                <div
                  key={buildStableReactKey("replay-highlight", [highlight], index)}
                  data-codexforge-brain-replay-highlight
                  style={rowStyle}
                >
                  {highlight}
                </div>
              ))
            ) : (
              <div style={emptyStyle}>No high-signal replay highlights yet.</div>
            )}
          </div>

          <div style={sectionTitleStyle}>Frames</div>
          <div style={frameListStyle}>
            {replay.frames.map((frame) => {
              const active = selectedFrame?.id === frame.id;
              return (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => setSelectedFrameIndex(frame.index)}
                  data-codexforge-brain-replay-frame
                  style={{
                    ...frameStyle,
                    borderColor: active ? "rgba(125,211,252,0.54)" : "rgba(255,255,255,0.09)",
                    background: active ? "rgba(14,165,233,0.16)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <strong>{frame.index + 1}. {frame.label}</strong>
                  <span>{frame.timestamp}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={detailStyle}>
        <div style={sectionTitleStyle}>Selected frame detail</div>
        {selectedFrame ? (
          <div style={detailGridStyle}>
            <Detail label="Lane" value={selectedFrame.activeLaneId} />
            <Detail label="Timestamp" value={String(selectedFrame.timestamp)} />
            <Detail label="Nodes" value={selectedFrame.highlightedNodeIds.join(", ") || "none"} />
            <Detail label="Edges" value={selectedFrame.highlightedEdgeIds.join(", ") || "none"} />
            <div style={wideDetailStyle}>{selectedFrame.summary}</div>
          </div>
        ) : (
          <div style={emptyStyle}>No frame selected.</div>
        )}
      </div>
    </section>
  );
}

function LaneCard({ lane, activeFrame }: { lane: CodexForgeBrainReplayLane; activeFrame: CodexForgeBrainReplayFrame | null }) {
  const active = activeFrame?.activeLaneId === lane.id;
  return (
    <div
      data-codexforge-brain-replay-lane
      style={{
        ...laneStyle,
        borderColor: active ? "rgba(125,211,252,0.42)" : "rgba(255,255,255,0.09)",
      }}
    >
      <div style={laneHeaderStyle}>
        <strong>{lane.label}</strong>
        <span style={pillStyle}>{lane.items.length}</span>
      </div>
      {lane.items.slice(0, 4).map((item) => (
        <div key={item.id} style={miniRowStyle}>
          <span>{item.label}</span>
          <span style={mutedStyle}>{item.status} / {item.severity}</span>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={detailItemStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
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

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.1fr) minmax(280px, 0.9fr)",
  gap: 12,
};

const columnStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  alignContent: "start",
  minWidth: 0,
};

const laneGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
  gap: 8,
};

const laneStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
};

const laneHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
};

const summaryStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 7,
};

const rowStyle: CSSProperties = {
  padding: 9,
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
  lineHeight: 1.45,
};

const miniRowStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: 8,
  borderRadius: 8,
  background: "rgba(15,23,42,0.72)",
  fontSize: 12,
};

const frameListStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  maxHeight: 260,
  overflow: "auto",
};

const frameStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  textAlign: "left",
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  color: "inherit",
  cursor: "pointer",
  fontSize: 12,
};

const detailStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const detailGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
  gap: 8,
};

const detailItemStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
};

const wideDetailStyle: CSSProperties = {
  gridColumn: "1 / -1",
  color: "rgba(226,232,240,0.80)",
  fontSize: 12,
  lineHeight: 1.5,
};

const mutedStyle: CSSProperties = {
  color: "rgba(226,232,240,0.70)",
};

const emptyStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 12,
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

const sectionTitleStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "rgba(226,232,240,0.78)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};

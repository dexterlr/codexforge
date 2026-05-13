"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainReplayLaneId } from "@/lib/codexforge/brain/runtime";

type BrainReplayControlsProps = {
  currentFrameIndex: number;
  frameCount: number;
  activeLaneId: CodexForgeBrainReplayLaneId;
  playbackStatusText?: string;
  onPreviousFrame?: () => void;
  onNextFrame?: () => void;
};

export function BrainReplayControls({
  currentFrameIndex,
  frameCount,
  activeLaneId,
  playbackStatusText = "Paused read-only replay",
  onPreviousFrame,
  onNextFrame,
}: BrainReplayControlsProps) {
  return (
    <div data-codexforge-brain-replay-controls style={controlsStyle}>
      <div style={metricStyle}>
        <span style={labelStyle}>Frame</span>
        <strong>{frameCount > 0 ? `${currentFrameIndex + 1} / ${frameCount}` : "0 / 0"}</strong>
      </div>
      <div style={metricStyle}>
        <span style={labelStyle}>Active lane</span>
        <strong>{activeLaneId}</strong>
      </div>
      <div style={metricStyle}>
        <span style={labelStyle}>Playback</span>
        <strong>{playbackStatusText}</strong>
      </div>
      <div style={buttonGroupStyle} aria-label="Read-only replay navigation">
        <button type="button" onClick={onPreviousFrame} disabled={!onPreviousFrame || currentFrameIndex <= 0} style={buttonStyle}>
          Previous
        </button>
        <button type="button" onClick={onNextFrame} disabled={!onNextFrame || currentFrameIndex >= frameCount - 1} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}

const controlsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
  minWidth: 0,
};

const labelStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const buttonGroupStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
};

const buttonStyle: CSSProperties = {
  appearance: "none",
  border: "1px solid rgba(125,211,252,0.28)",
  borderRadius: 8,
  background: "rgba(14,165,233,0.12)",
  color: "rgba(240,249,255,0.94)",
  padding: "9px 10px",
  fontSize: 12,
  fontWeight: 850,
  cursor: "pointer",
};

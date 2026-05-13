"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeBrainEmptyStateGateResult } from "@/lib/codexforge/brain/runtime";

type BrainGraphEmptyStateProps = {
  emptyState: CodexForgeBrainEmptyStateGateResult;
  onRefreshGraph: () => void;
  onResetGraph?: () => void;
};

export function BrainGraphEmptyState({
  emptyState,
  onRefreshGraph,
  onResetGraph,
}: BrainGraphEmptyStateProps) {
  return (
    <section data-codexforge-brain-graph-empty-state style={panelStyle}>
      <div>
        <span style={eyebrowStyle}>Loaded empty graph</span>
        <h2 style={titleStyle}>Brain graph is empty</h2>
      </div>
      <p style={copyStyle}>
        The graph loaded successfully with {emptyState.nodeCount} nodes and{" "}
        {emptyState.edgeCount} edges. This is a valid loaded state, not a
        loading state.
      </p>
      <div style={actionRowStyle}>
        <button
          type="button"
          onClick={onRefreshGraph}
          data-codexforge-brain-empty-recovery-action="refresh-graph"
          style={buttonStyle}
        >
          Refresh graph
        </button>
        <Link
          href="/"
          data-codexforge-brain-empty-recovery-action="open-workspace"
          style={linkButtonStyle}
        >
          Open workspace
        </Link>
        <span
          data-codexforge-brain-empty-recovery-action="use-fixture-fallback"
          style={pillStyle}
        >
          Keep fixture fallback
        </span>
        {onResetGraph ? (
          <button
            type="button"
            onClick={onResetGraph}
            data-codexforge-brain-empty-recovery-action="reset-graph"
            style={dangerButtonStyle}
          >
            Reset graph
          </button>
        ) : null}
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.24)",
  background: "rgba(251,191,36,0.08)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 20,
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(254,243,199,0.92)",
  fontSize: 13,
  lineHeight: 1.55,
};

const actionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const buttonStyle: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.24)",
  background: "rgba(14,165,233,0.12)",
  color: "inherit",
  borderRadius: 8,
  padding: "9px 10px",
  fontSize: 12,
  fontWeight: 800,
  cursor: "pointer",
};

const dangerButtonStyle: CSSProperties = {
  ...buttonStyle,
  border: "1px solid rgba(239,68,68,0.30)",
  background: "rgba(239,68,68,0.12)",
};

const linkButtonStyle: CSSProperties = {
  ...buttonStyle,
  textDecoration: "none",
};

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 8,
  padding: "9px 10px",
  border: "1px solid rgba(251,191,36,0.24)",
  background: "rgba(251,191,36,0.10)",
  fontSize: 12,
  fontWeight: 800,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(254,243,199,0.94)",
};

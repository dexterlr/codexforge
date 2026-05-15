"use client";

import { Component, type CSSProperties, type ErrorInfo, type ReactNode } from "react";

type BrainGraph3DErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type BrainGraph3DErrorBoundaryState = {
  failed: boolean;
};

export class BrainGraph3DErrorBoundary extends Component<
  BrainGraph3DErrorBoundaryProps,
  BrainGraph3DErrorBoundaryState
> {
  state: BrainGraph3DErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): BrainGraph3DErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    this.setState({ failed: true });
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const safeWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export function BrainGraph3DFallback(props: { onSwitchTo2D: () => void }) {
  return (
    <div
      data-codexforge-brain-graph-3d-fallback="true"
      style={{
        minHeight: 520,
        display: "grid",
        placeItems: "center",
        padding: 24,
        color: "#e0f2fe",
        background:
          "radial-gradient(circle at 50% 35%, rgba(56,189,248,0.14), transparent 34%), linear-gradient(145deg, rgba(2,6,23,0.96), rgba(15,23,42,0.88))",
      }}
    >
      <div style={{ display: "grid", gap: 12, maxWidth: 520, textAlign: "center", ...safeWrapStyle }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase", color: "#7dd3fc" }}>
          3D renderer unavailable
        </p>
        <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.1 }}>WebGL graph fell back safely</h3>
        <p style={{ margin: 0, color: "rgba(224,242,254,0.72)", lineHeight: 1.5 }}>
          The SVG graph remains available with the same selected-node inspector and graph actions.
        </p>
        <button
          type="button"
          onClick={props.onSwitchTo2D}
          style={{
            justifySelf: "center",
            border: "1px solid rgba(125,211,252,0.32)",
            background: "rgba(14,165,233,0.14)",
            color: "inherit",
            borderRadius: 10,
            padding: "10px 14px",
            cursor: "pointer",
            fontWeight: 760,
          }}
        >
          Open 2D graph
        </button>
      </div>
    </div>
  );
}

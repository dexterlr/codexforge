"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeBrainGraphLoadGateResult } from "@/lib/codexforge/brain/runtime";

type BrainGraphErrorStateProps = {
  loadState: CodexForgeBrainGraphLoadGateResult;
  onRetryLoad: () => void;
  onCopyDiagnostic?: () => void;
};

export function BrainGraphErrorState({
  loadState,
  onRetryLoad,
  onCopyDiagnostic,
}: BrainGraphErrorStateProps) {
  const diagnostic = loadState.errorMessage ?? loadState.gate.reason;

  return (
    <section data-codexforge-brain-graph-error-state style={panelStyle}>
      <div>
        <span style={eyebrowStyle}>Recoverable graph load error</span>
        <h2 style={titleStyle}>Brain graph could not load</h2>
      </div>
      <p data-codexforge-brain-graph-load-error style={copyStyle}>
        {diagnostic}
      </p>
      <div style={actionRowStyle}>
        <button
          type="button"
          onClick={onRetryLoad}
          data-codexforge-brain-error-recovery-action="retry-load"
          style={buttonStyle}
        >
          Retry load
        </button>
        <Link
          href="/"
          data-codexforge-brain-error-recovery-action="open-workspace"
          style={linkButtonStyle}
        >
          Open workspace
        </Link>
        {onCopyDiagnostic ? (
          <button
            type="button"
            onClick={onCopyDiagnostic}
            data-codexforge-brain-error-recovery-action="copy-diagnostic"
            style={buttonStyle}
          >
            Copy diagnostic
          </button>
        ) : null}
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  border: "1px solid rgba(239,68,68,0.35)",
  background: "rgba(239,68,68,0.12)",
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
  color: "rgba(254,226,226,0.94)",
  fontSize: 13,
  lineHeight: 1.55,
  wordBreak: "break-word",
};

const actionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const buttonStyle: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.32)",
  background: "rgba(127,29,29,0.18)",
  color: "inherit",
  borderRadius: 8,
  padding: "9px 10px",
  fontSize: 12,
  fontWeight: 800,
  cursor: "pointer",
};

const linkButtonStyle: CSSProperties = {
  ...buttonStyle,
  textDecoration: "none",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(254,202,202,0.94)",
};

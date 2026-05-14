"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import type { CodexForgeFileBrainContext } from "../file-brain-context";
import { FileOpenInBrainLink } from "./FileOpenInBrainLink";

export function FileBrainContextPanel({
  context,
}: {
  context: CodexForgeFileBrainContext;
}) {
  return (
    <section data-codexforge-file-brain-context-panel style={panel}>
      <div style={top}>
        <div style={safeWrap}>
          <div style={eyebrow}>Brain context</div>
          <strong style={title}>File memory match</strong>
        </div>
        <div style={actions}>
          <span style={score}>{context.confidenceScore}/100</span>
          <FileOpenInBrainLink filePath={context.filePath} />
        </div>
      </div>

      <p style={body}>{context.summary}</p>

      {context.emptyState ? (
        <div style={emptyState}>
          <strong>{context.emptyState.title}</strong>
          <span>{context.emptyState.detail}</span>
          <span>{context.emptyState.nextAction}</span>
        </div>
      ) : (
        <div style={nodeGrid}>
          {context.relatedNodes.slice(0, 6).map((item, index) => (
            <div
              key={buildCodexForgeFileReactKey("brain-context-node", [context.filePath, item.id], index)}
              style={nodeCard}
            >
              <span style={nodeMeta}>{item.kind} / {item.importance}</span>
              <strong style={safeWrap}>{item.label}</strong>
              <span style={nodeSummary}>{item.summary}</span>
              <span style={nodeScore}>{item.score} match / {item.reasons.join(", ")}</span>
            </div>
          ))}
        </div>
      )}

      <div style={miniGrid}>
        <MiniList label="Concepts" values={context.topConcepts} fallback="No concepts inferred." />
        <MiniList label="Risks" values={context.topRisks} fallback="No elevated risks found." />
        <MiniList label="Smoke tests" values={context.relatedSmokeScripts} fallback="No direct smoke relation found." />
        <MiniList label="Sources" values={context.sourceExplanation} fallback="Deterministic local Brain seed." />
      </div>
    </section>
  );
}

function MiniList({
  label,
  values,
  fallback,
}: {
  label: string;
  values: string[];
  fallback: string;
}) {
  return (
    <div style={miniPanel}>
      <strong>{label}</strong>
      {(values.length ? values.slice(0, 4) : [fallback]).map((value, index) => (
        <span
          key={buildCodexForgeFileReactKey("brain-context-mini", [label, value], index)}
          style={miniItem}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

const safeWrap: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background:
    "linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.76)), radial-gradient(circle at 12% 0%, rgba(14,165,233,0.14), transparent 38%)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  minWidth: 0,
  boxShadow: "0 16px 48px rgba(2,6,23,0.26), inset 0 1px 0 rgba(255,255,255,0.04)",
};

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  flexWrap: "wrap",
  minWidth: 0,
};

const actions: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const title: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontSize: 16,
  lineHeight: 1.25,
};

const score: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.12)",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 12,
  fontWeight: 900,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
  ...safeWrap,
};

const emptyState: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.28)",
  background: "rgba(251,191,36,0.10)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.45,
  ...safeWrap,
};

const nodeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
  gap: 8,
  minWidth: 0,
};

const nodeCard: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.13)",
  background: "rgba(0,0,0,0.22)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const nodeMeta: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.58,
  ...safeWrap,
};

const nodeSummary: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.42,
  opacity: 0.76,
  ...safeWrap,
};

const nodeScore: CSSProperties = {
  fontSize: 10,
  lineHeight: 1.35,
  opacity: 0.62,
  ...safeWrap,
};

const miniGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
  gap: 8,
  minWidth: 0,
};

const miniPanel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 11,
  lineHeight: 1.35,
  minWidth: 0,
};

const miniItem: CSSProperties = {
  opacity: 0.76,
  ...safeWrap,
};

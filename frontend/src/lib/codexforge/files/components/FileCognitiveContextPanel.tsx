"use client";

import type { CSSProperties } from "react";
import { buildCodexForgeFileReactKey } from "../file-search";
import type { CodexForgeFileCognitiveContext } from "../file-cognitive-context";

export function FileCognitiveContextPanel({
  context,
}: {
  context: CodexForgeFileCognitiveContext;
}) {
  return (
    <section data-codexforge-file-cognitive-context-panel style={panel}>
      <div style={eyebrow}>Cognitive context</div>
      <p style={body}>{context.summary}</p>
      <div style={metricGrid}>
        <Metric label="signals" value={String(context.signals.length)} />
        <Metric label="runtime" value={String(context.runtimeSignalCount)} />
        <Metric label="memory" value={String(context.memoryClusterCount)} />
      </div>
      <div style={list}>
        {context.signals.slice(0, 6).map((signal, index) => (
          <div
            key={buildCodexForgeFileReactKey("context-signal", [context.filePath, signal.id], index)}
            style={card}
          >
            <span style={kind}>{signal.kind}</span>
            <strong>{signal.label}</strong>
            <span style={detail}>{signal.detail}</span>
          </div>
        ))}
      </div>
      <div style={tinyBlock}>
        <strong>Related concepts</strong>
        <span>{context.relatedConcepts.length ? context.relatedConcepts.join(", ") : "No related concepts"}</span>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};

const metricGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
};

const metric: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 8,
  display: "grid",
  gap: 4,
  fontSize: 11,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
  maxHeight: 360,
  overflow: "auto",
};

const card: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const kind: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const detail: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.4,
  opacity: 0.76,
  overflowWrap: "anywhere",
};

const tinyBlock: CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.08)",
  paddingTop: 8,
  display: "grid",
  gap: 4,
  fontSize: 11,
  lineHeight: 1.4,
};

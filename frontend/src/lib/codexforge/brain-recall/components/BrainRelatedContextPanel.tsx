"use client";

import type { CSSProperties } from "react";
import type { BrainRelatedContext } from "../brain-recall-types";

type BrainRelatedContextPanelProps = {
  context: BrainRelatedContext | null;
};

export function BrainRelatedContextPanel({ context }: BrainRelatedContextPanelProps) {
  return (
    <section style={panel}>
      <strong>Related context</strong>
      {!context ? (
        <p style={body}>Select a recall card to inspect neighboring nodes, source refs, files, artifacts, and runs.</p>
      ) : (
        <div style={grid}>
          <TinyList label="Neighbors" values={context.neighbors.map((item) => `${item.kind}: ${item.label}`)} />
          <TinyList label="Files" values={context.files.map((item) => item.path)} />
          <TinyList label="Artifacts" values={context.artifacts.map((item) => item.label)} />
          <TinyList label="Runs" values={context.runs.map((item) => item.label)} />
          <TinyList label="Memory review refs" values={context.memoryReviewReferences} />
          <TinyList label="Production pack refs" values={context.productionPackReferences} />
        </div>
      )}
    </section>
  );
}

function TinyList({ label, values }: { label: string; values: string[] }) {
  return (
    <div style={tiny}>
      <span style={tinyLabel}>{label}</span>
      <span style={body}>{values.length ? values.slice(0, 5).join(", ") : "none"}</span>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 };
const tiny: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.24)", borderRadius: 8, padding: 9, display: "grid", gap: 4, minWidth: 0 };
const tinyLabel: CSSProperties = { fontSize: 11, textTransform: "uppercase", fontWeight: 900, opacity: 0.62, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.78, overflowWrap: "anywhere" };

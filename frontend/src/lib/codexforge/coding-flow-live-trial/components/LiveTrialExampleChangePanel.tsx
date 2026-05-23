"use client";

import type { CSSProperties } from "react";
import type { LiveTrialExampleChange } from "../coding-flow-live-trial-types";

export function LiveTrialExampleChangePanel({ examples }: { examples: LiveTrialExampleChange[] }) {
  return (
    <section style={panel} data-codexforge-live-trial-example-change-panel="LiveTrialExampleChangePanel renders copy-only wording change small UI label change">
      <h2 style={title}>Example change requests</h2>
      <div style={grid}>
        {examples.slice(0, 4).map((example) => (
          <article key={`live-trial-example-${example.exampleId}`} style={box}>
            <h3 style={itemTitle}>{example.title}</h3>
            <p style={copy}>{example.changeText}</p>
            <span style={meta}>{example.suggestedFileType} | risk {example.riskLevel}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))" };
const box: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const itemTitle: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const meta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 800 };

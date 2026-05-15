"use client";

import type { CSSProperties } from "react";
import type { DiffIntentModel } from "../preview-diff-composer-types";

type Props = {
  intent: DiffIntentModel;
};

export function DiffIntentPanel({ intent }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-intent="DiffIntentPanel renders">
      <span style={eyebrow}>Diff Intent</span>
      <h3 style={title}>{intent.goal}</h3>
      <div style={stack}>
        {intent.changes.map((change) => (
          <article key={change.id} style={item}>
            <div style={row}>
              <strong>{change.category}</strong>
              <span>{change.expectedRisk}</span>
            </div>
            <code style={path}>{change.targetFile}</code>
            <p style={copy}>{change.whatShouldChange}</p>
            <p style={muted}>{change.whyItShouldChange}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const item: CSSProperties = { border: "1px solid rgba(94,234,212,0.14)", background: "rgba(2,6,23,0.35)", borderRadius: 8, padding: 9, display: "grid", gap: 5, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, color: "#ccfbf1", fontSize: 12, textTransform: "uppercase" };
const path: CSSProperties = { color: "#bae6fd", fontSize: 12, whiteSpace: "pre-wrap", overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };

"use client";

import type { CSSProperties } from "react";
import type { BrainRecallHandoff } from "../brain-recall-types";

export function BrainRecallHandoffPanel({ handoff }: { handoff: BrainRecallHandoff }) {
  return (
    <section style={panel}>
      <strong>Safe handoff prompt</strong>
      <p style={body}>
        No automatic chat submission. Use this prompt only after reviewing the recall cards.
      </p>
      <pre style={pre}>{handoff.chatPrompt}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pre: CSSProperties = {
  margin: 0,
  maxHeight: 240,
  overflow: "auto",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(2,6,23,0.34)",
  borderRadius: 8,
  padding: 10,
  fontSize: 11,
  lineHeight: 1.45,
};

"use client";

import type { CSSProperties } from "react";
import type { CreativeBridgeHandoff } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

type Props = {
  handoff: CreativeBridgeHandoff;
  onCopy?: (label: string, text: string) => void;
};

export function CreativeBridgeHandoffPanel({ handoff, onCopy }: Props) {
  return (
    <section style={card} data-codexforge-creative-bridge-handoff-panel="CreativeBridgeHandoffPanel renders handoff says inspect first handoff says no render execution without future guarded executor copy bridge handoff allowed copy future executor prompt allowed">
      <span style={eyebrow}>Handoff</span>
      <strong>Creative Bridge Handoff</strong>
      <div style={buttons}>
        <button type="button" style={button} onClick={() => onCopy?.("creative bridge handoff", handoff.reviewPrompt)}>Copy bridge handoff</button>
        <button type="button" style={button} onClick={() => onCopy?.("future executor prompt", handoff.executionPrompt)}>Copy future executor prompt</button>
      </div>
      <div style={list}>
        {handoff.summary.map((line) => (
          <p key={buildCreativeLocalBridgeReactKey("handoff", line)} style={copy}>{line}</p>
        ))}
      </div>
      <pre style={prompt}>{handoff.executionPrompt}</pre>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(96,165,250,0.24)", background: "rgba(9,16,35,0.84)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { border: "1px solid rgba(96,165,250,0.35)", background: "rgba(37,99,235,0.18)", color: "#dbeafe", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const list: CSSProperties = { display: "grid", gap: 4 };
const copy: CSSProperties = { margin: 0, color: "#bfdbfe", lineHeight: 1.45 };
const prompt: CSSProperties = { margin: 0, border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.72)", color: "#dbeafe", padding: 12, whiteSpace: "pre-wrap", overflowWrap: "anywhere", fontSize: 12, lineHeight: 1.45 };

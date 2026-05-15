"use client";

import type { CSSProperties } from "react";
import type { ChatRecallHandoff } from "../chat-recall-types";

type ChatRecallHandoffPanelProps = {
  handoff: ChatRecallHandoff;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
};

export function ChatRecallHandoffPanel({
  handoff,
  onCopyPrompt,
  onUsePrompt,
}: ChatRecallHandoffPanelProps) {
  return (
    <section data-codexforge-chat-recall-handoff-panel style={panel}>
      <div style={top}>
        <strong>Chat handoff</strong>
        <div style={actions}>
          {onCopyPrompt ? (
            <button type="button" onClick={() => onCopyPrompt(handoff.promptPrefix)} style={button}>
              Copy chat context
            </button>
          ) : null}
          {onUsePrompt ? (
            <button type="button" onClick={() => onUsePrompt(handoff.promptPrefix)} style={button}>
              Use in chat
            </button>
          ) : null}
        </div>
      </div>
      <p style={body}>
        Handoff says context not proof and inspect current files. No prompt is sent automatically.
      </p>
      <pre style={pre}>{handoff.promptPrefix}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap", minWidth: 0 };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const button: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.12)", color: "inherit", borderRadius: 8, padding: "7px 9px", fontSize: 11, fontWeight: 900, cursor: "pointer" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pre: CSSProperties = {
  margin: 0,
  maxHeight: 260,
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

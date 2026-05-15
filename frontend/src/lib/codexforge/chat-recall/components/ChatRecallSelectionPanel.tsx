"use client";

import type { CSSProperties } from "react";
import type { ChatRecallSelection } from "../chat-recall-types";

type ChatRecallSelectionPanelProps = {
  selection: ChatRecallSelection;
};

export function ChatRecallSelectionPanel({ selection }: ChatRecallSelectionPanelProps) {
  return (
    <section data-codexforge-chat-recall-selection-panel style={panel}>
      <strong>Recall selection</strong>
      <p style={body}>
        Selected items are explicit and visible. No hidden context injection.
      </p>
      <div style={list}>
        {selection.items.length === 0 ? (
          <span style={empty}>No recall selection loaded.</span>
        ) : (
          selection.items.map((item) => (
            <div key={item.id} style={row(item.selected)}>
              <span style={label}>{item.title}</span>
              <span style={pill}>{item.selected ? "selected" : "not selected"}</span>
              <span style={pill}>{item.injectionReadiness}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const empty: CSSProperties = { fontSize: 12, opacity: 0.7 };
const label: CSSProperties = { fontSize: 12, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: "3px 6px", fontSize: 10, textTransform: "uppercase", fontWeight: 900 };
function row(selected: boolean): CSSProperties {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    border: selected ? "1px solid rgba(34,197,94,0.28)" : "1px solid rgba(148,163,184,0.12)",
    background: selected ? "rgba(34,197,94,0.1)" : "rgba(2,6,23,0.24)",
    borderRadius: 8,
    padding: 8,
    minWidth: 0,
  };
}

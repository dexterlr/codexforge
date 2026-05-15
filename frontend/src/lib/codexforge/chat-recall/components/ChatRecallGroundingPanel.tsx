"use client";

import type { CSSProperties } from "react";
import type { ChatRecallGroundingPolicy } from "../chat-recall-types";

export function ChatRecallGroundingPanel({ policy }: { policy: ChatRecallGroundingPolicy }) {
  return (
    <section data-codexforge-chat-recall-grounding-panel style={panel}>
      <strong>Grounding policy</strong>
      <p style={body}>
        Policy only allows selected recall items. Low-score recall is weak and stale memory is marked stale.
      </p>
      <ul style={list}>
        {policy.rules.map((rule) => (
          <li key={rule} style={item}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { fontSize: 11, lineHeight: 1.4, opacity: 0.78, overflowWrap: "anywhere" };

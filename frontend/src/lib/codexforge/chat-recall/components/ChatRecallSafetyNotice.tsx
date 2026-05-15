"use client";

import type { CSSProperties } from "react";
import type { ChatRecallSafetyBoundary } from "../chat-recall-types";

export function ChatRecallSafetyNotice({ safety }: { safety: ChatRecallSafetyBoundary }) {
  return (
    <section data-codexforge-chat-recall-safety-notice style={notice}>
      <strong>Chat recall safety</strong>
      <p style={body}>
        Recalled memory may be stale. Verify current files before editing. Memory is context, not authority.
      </p>
      <p style={body}>
        No hidden context injection. No file mutation without safe preview.
      </p>
      <ul style={list}>
        {safety.rules.slice(0, 4).map((rule) => (
          <li key={rule} style={item}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}

const notice: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 7, minWidth: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.86, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 3 };
const item: CSSProperties = { fontSize: 11, lineHeight: 1.35, opacity: 0.78, overflowWrap: "anywhere" };

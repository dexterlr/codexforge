"use client";

import type { CSSProperties } from "react";
import type {
  ChatRecallContext,
  ChatRecallGroundingPolicy,
  ChatRecallHandoff,
  ChatRecallSafetyBoundary,
  ChatRecallSelection,
} from "../chat-recall-types";
import { ChatRecallContextCard } from "./ChatRecallContextCard";
import { ChatRecallGroundingPanel } from "./ChatRecallGroundingPanel";
import { ChatRecallHandoffPanel } from "./ChatRecallHandoffPanel";
import { ChatRecallSafetyNotice } from "./ChatRecallSafetyNotice";
import { ChatRecallSelectionPanel } from "./ChatRecallSelectionPanel";

type ChatRecallContextPanelProps = {
  selection: ChatRecallSelection;
  context: ChatRecallContext;
  policy: ChatRecallGroundingPolicy;
  safety: ChatRecallSafetyBoundary;
  handoff: ChatRecallHandoff;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
};

export function ChatRecallContextPanel({
  selection,
  context,
  policy,
  safety,
  handoff,
  onCopyPrompt,
  onUsePrompt,
}: ChatRecallContextPanelProps) {
  return (
    <section
      data-codexforge-chat-recall-context-panel
      data-codexforge-chat-recall-visible-context="visible context no hidden context injection"
      style={panel}
    >
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Chat Recall</span>
          <h2 style={title}>Visible memory context</h2>
          <p style={body}>
            Selected Brain recall cards can be copied into chat. Recalled memory may be stale.
          </p>
        </div>
        <span style={pill}>{context.blocks.length} selected</span>
      </div>

      <ChatRecallSafetyNotice safety={safety} />

      <div style={grid}>
        <ChatRecallSelectionPanel selection={selection} />
        <ChatRecallGroundingPanel policy={policy} />
      </div>

      <div style={cards}>
        {context.blocks.length === 0 ? (
          <p style={empty}>
            No selected visible context. No hidden context injection will be used.
          </p>
        ) : (
          context.blocks.map((block) => (
            <ChatRecallContextCard key={block.id} block={block} />
          ))
        )}
      </div>

      <ChatRecallHandoffPanel
        handoff={handoff}
        onCopyPrompt={onCopyPrompt}
        onUsePrompt={onUsePrompt}
      />
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "linear-gradient(145deg, rgba(15,23,42,0.82), rgba(2,6,23,0.68))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { fontSize: 11, textTransform: "uppercase", color: "#93c5fd", fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "6px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const cards: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const empty: CSSProperties = { margin: 0, border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 10, fontSize: 12, opacity: 0.76, overflowWrap: "anywhere" };

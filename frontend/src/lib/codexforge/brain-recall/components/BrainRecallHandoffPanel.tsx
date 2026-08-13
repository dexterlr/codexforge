"use client";

import { useState, type CSSProperties } from "react";
import type { BrainRecallHandoff } from "../brain-recall-types";
import { writeChatRecallHandoffToBrowserStorage } from "@/lib/codexforge/chat-recall/chat-recall-browser-storage";

type BrainRecallHandoffPanelProps = {
  handoff: BrainRecallHandoff;
  chatRecallPayload?: string;
};

async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function BrainRecallHandoffPanel({
  handoff,
  chatRecallPayload,
}: BrainRecallHandoffPanelProps) {
  const [handoffError, setHandoffError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopyChatContext = async () => {
    const copied = await copyText(chatRecallPayload ?? handoff.chatPrompt);
    setCopyStatus(
      copied
        ? "The visible chat context was copied."
        : "Clipboard access was unavailable. Select and copy the visible context manually."
    );
  };

  const handleUseInChat = () => {
    if (!writeChatRecallHandoffToBrowserStorage(chatRecallPayload)) {
      setHandoffError("Browser-local recall storage is unavailable. Copy the visible context and paste it into Jarvis manually.");
      return;
    }
    setHandoffError(null);
    setCopyStatus(null);
    window.location.assign("/jarvis#jarvis-advanced-tools");
  };

  return (
    <section style={panel} data-codexforge-chat-recall-handoff>
      <strong>Safe handoff prompt</strong>
      <p style={body}>
        No automatic chat submission. Use this prompt only after reviewing the recall cards.
        chat recall handoff is visible context and no hidden context injection is used.
      </p>
      <div style={actions}>
        <button type="button" onClick={handleUseInChat} style={button}>
          Use in chat
        </button>
        <button type="button" onClick={handleCopyChatContext} style={button}>
          Copy chat context
        </button>
      </div>
      {handoffError ? <p role="status" style={error}>{handoffError}</p> : null}
      {copyStatus ? <p role="status" style={status}>{copyStatus}</p> : null}
      <pre style={pre}>{handoff.chatPrompt}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const button: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.12)", color: "inherit", borderRadius: 8, padding: "7px 9px", fontSize: 11, fontWeight: 900, cursor: "pointer" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const error: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#fecaca", overflowWrap: "anywhere" };
const status: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#bae6fd", overflowWrap: "anywhere" };
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

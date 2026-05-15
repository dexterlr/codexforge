"use client";

import type { CSSProperties } from "react";
import type { ChatRecallContextBlock } from "../chat-recall-types";

type ChatRecallContextCardProps = {
  block: ChatRecallContextBlock;
};

export function ChatRecallContextCard({ block }: ChatRecallContextCardProps) {
  return (
    <article data-codexforge-chat-recall-context-card style={card}>
      <div style={top}>
        <strong style={title}>{block.memoryTitle}</strong>
        <span style={score}>{block.score} {block.confidence}</span>
      </div>
      <p style={snippet}>{block.snippet}</p>
      {block.staleWarning.stale ? (
        <p style={warning}>{block.staleWarning.label}</p>
      ) : null}
      <div style={metaRow}>
        <span>{block.nodeId}</span>
        <span>{block.relatedFiles.length} files</span>
        <span>{block.relatedArtifacts.length} artifacts</span>
        <span>{block.relatedRuns.length} runs</span>
      </div>
      <p style={instruction}>{block.instruction}</p>
    </article>
  );
}

const card: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(15,23,42,0.58)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 8,
  minWidth: 0,
};
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", minWidth: 0 };
const title: CSSProperties = { fontSize: 13, lineHeight: 1.35, overflowWrap: "anywhere" };
const score: CSSProperties = { border: "1px solid rgba(125,211,252,0.25)", borderRadius: 8, padding: "4px 7px", fontSize: 11, fontWeight: 900, whiteSpace: "nowrap" };
const snippet: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.78, overflowWrap: "anywhere" };
const warning: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, color: "#fde68a", overflowWrap: "anywhere" };
const metaRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, fontSize: 11, opacity: 0.72, overflowWrap: "anywhere" };
const instruction: CSSProperties = { margin: 0, fontSize: 11, lineHeight: 1.45, color: "#bfdbfe", overflowWrap: "anywhere" };

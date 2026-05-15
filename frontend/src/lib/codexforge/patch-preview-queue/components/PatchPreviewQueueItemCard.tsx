"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueueItem } from "../patch-preview-queue-types";
import { summarizePatchPreviewQueueItem } from "../queue-item-builder";

type Props = {
  item: PatchPreviewQueueItem;
  selected?: boolean;
  onSelect?: (id: string) => void;
};

export function PatchPreviewQueueItemCard({ item, selected = false, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      style={{ ...card, ...(selected ? selectedCard : null) }}
      data-codexforge-patch-preview-queue-item-card="PatchPreviewQueueItemCard renders stable key Safe Patch Preview preview diff only"
    >
      <span style={topline}>
        <strong>{item.priority}</strong>
        <span>{item.queueState}</span>
      </span>
      <span style={title}>{item.sourceRecommendationTitle}</span>
      <span style={meta}>{item.primaryFile}</span>
      <span style={body}>{summarizePatchPreviewQueueItem(item).join(" ")}</span>
    </button>
  );
}

const card: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.16)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  color: "#f8fafc",
  cursor: "pointer",
  display: "grid",
  gap: 7,
  padding: 12,
  textAlign: "left",
  width: "100%",
  minWidth: 0,
};
const selectedCard: CSSProperties = {
  borderColor: "rgba(94,234,212,0.48)",
  background: "rgba(20,184,166,0.14)",
};
const topline: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, fontSize: 11, textTransform: "uppercase", color: "#93c5fd", fontWeight: 900 };
const title: CSSProperties = { fontSize: 13, fontWeight: 900, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#cbd5e1", fontSize: 12, overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.45, overflowWrap: "anywhere" };

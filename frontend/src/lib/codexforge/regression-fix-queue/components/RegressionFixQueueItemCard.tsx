"use client";

import type { CSSProperties } from "react";
import type { RegressionFixQueueItem } from "../regression-fix-queue-types";
import { summarizeRegressionFixQueueItem } from "../fix-queue-item-builder";

type Props = {
  item: RegressionFixQueueItem;
  selected?: boolean;
  onSelect?: (id: string) => void;
};

export function RegressionFixQueueItemCard({ item, selected = false, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      style={{ ...card, ...(selected ? selectedCard : null) }}
      data-codexforge-regression-fix-queue-item-card="RegressionFixQueueItemCard renders stable key no auto-fix Safe Patch Preview Preview Diff Composer"
    >
      <span style={topline}>
        <strong>{item.priority}</strong>
        <span>{item.queueState}</span>
      </span>
      <span style={title}>{item.title}</span>
      <span style={meta}>{item.primaryFile}</span>
      <span style={body}>{summarizeRegressionFixQueueItem(item).join(" ")}</span>
    </button>
  );
}

const card: CSSProperties = {
  background: "rgba(15,23,42,0.72)",
  border: "1px solid rgba(125,211,252,0.16)",
  borderRadius: 8,
  color: "#f8fafc",
  cursor: "pointer",
  display: "grid",
  gap: 7,
  minWidth: 0,
  padding: 12,
  textAlign: "left",
  width: "100%",
};
const selectedCard: CSSProperties = {
  background: "rgba(20,184,166,0.14)",
  borderColor: "rgba(94,234,212,0.48)",
};
const topline: CSSProperties = { color: "#93c5fd", display: "flex", fontSize: 11, fontWeight: 900, gap: 8, justifyContent: "space-between", textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 13, fontWeight: 900, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#cbd5e1", fontSize: 12, overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.45, overflowWrap: "anywhere" };

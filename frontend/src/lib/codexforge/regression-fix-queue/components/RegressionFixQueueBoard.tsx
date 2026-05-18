"use client";

import type { CSSProperties } from "react";
import { rankRegressionFixQueueItems } from "../fix-queue-priority";
import type { RegressionFixQueueItem } from "../regression-fix-queue-types";
import { RegressionFixQueueItemCard } from "./RegressionFixQueueItemCard";

type Props = {
  items: readonly RegressionFixQueueItem[];
  selectedItemId?: string;
  onSelectItem?: (id: string) => void;
};

export function RegressionFixQueueBoard({ items, selectedItemId, onSelectItem }: Props) {
  const ranked = rankRegressionFixQueueItems(items);

  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-board="RegressionFixQueueBoard renders prioritized repair queue deterministic priority ranking"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Prioritized Repair Queue</span>
          <h3 style={title}>Regression Fix Queue board</h3>
        </div>
        <span style={badge}>{ranked.length} items</span>
      </div>
      <div style={list}>
        {ranked.map((item) => (
          <RegressionFixQueueItemCard
            key={item.id}
            item={item}
            selected={item.id === selectedItemId}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(2,6,23,0.34)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 12 };
const header: CSSProperties = { alignItems: "flex-start", display: "flex", gap: 10, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere", textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 16, letterSpacing: 0, margin: "3px 0 0", overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 900, padding: "6px 8px" };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };

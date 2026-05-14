"use client";

import type { CSSProperties } from "react";
import type { MemoryReviewItem, MemoryReviewQueue as MemoryReviewQueueModel } from "../memory-review-types";
import { buildMemoryReviewStableKey } from "../memory-review-types";
import { MemoryCandidateCard } from "./MemoryCandidateCard";

type MemoryReviewQueueProps = {
  queue: MemoryReviewQueueModel;
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
};

export function MemoryReviewQueue({ queue, selectedItemId, onSelectItem }: MemoryReviewQueueProps) {
  return (
    <section style={panel} data-codexforge-memory-review-queue="MemoryReviewQueue renders review required no auto-promotion stable keys">
      <div style={header}>
        <div style={titleBlock}>
          <span style={eyebrow}>Review queue</span>
          <h2 style={title}>Memory candidates</h2>
        </div>
        <span style={count}>{queue.items.length}</span>
      </div>
      <div style={summaryGrid}>
        {queue.summary.map((line, index) => (
          <span key={buildMemoryReviewStableKey("queue-summary", line, index)} style={summaryLine}>{line}</span>
        ))}
      </div>
      <div style={list}>
        {queue.items.map((item: MemoryReviewItem) => (
          <MemoryCandidateCard
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

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", minWidth: 0 };
const titleBlock: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 24, ...safeText };
const count: CSSProperties = { color: "#ccfbf1", fontSize: 34, fontWeight: 900 };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8, minWidth: 0 };
const summaryLine: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
const list: CSSProperties = { display: "grid", gap: 10, maxHeight: 760, overflow: "auto", minWidth: 0 };

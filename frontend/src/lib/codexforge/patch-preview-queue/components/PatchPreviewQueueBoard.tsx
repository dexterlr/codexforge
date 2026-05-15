"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueueItem } from "../patch-preview-queue-types";
import { rankPatchPreviewQueueItems } from "../queue-priority";
import { PatchPreviewQueueItemCard } from "./PatchPreviewQueueItemCard";

type Props = {
  items: readonly PatchPreviewQueueItem[];
  selectedItemId?: string;
  onSelectItem?: (id: string) => void;
};

export function PatchPreviewQueueBoard({ items, selectedItemId, onSelectItem }: Props) {
  const ranked = rankPatchPreviewQueueItems(items);

  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-board="PatchPreviewQueueBoard renders Queue for Safe Patch Preview deterministic priority ranking"
    >
      <div style={header}>
        <div>
          <span style={eyebrow}>Queue for Safe Patch Preview</span>
          <h3 style={title}>Patch Preview Queue board</h3>
        </div>
        <span style={badge}>{ranked.length} items</span>
      </div>
      <div style={list}>
        {ranked.map((item) => (
          <PatchPreviewQueueItemCard
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

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "3px 0 0", fontSize: 16, letterSpacing: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, padding: "6px 8px", fontSize: 11, fontWeight: 900, color: "#dbeafe" };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };

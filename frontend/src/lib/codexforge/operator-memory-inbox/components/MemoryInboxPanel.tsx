"use client";

import type { CSSProperties } from "react";
import type { OperatorMemoryInboxCard } from "../operator-memory-inbox-types";
import { buildMemoryInboxStableKey } from "../operator-memory-inbox-types";
import { MemoryInboxCard } from "./MemoryInboxCard";
import { MemoryInboxEmptyState } from "./MemoryInboxEmptyState";

export function MemoryInboxPanel({ cards, selectedCardId, onSelectCard }: { cards: OperatorMemoryInboxCard[]; selectedCardId?: string; onSelectCard: (id: string) => void }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-panel="MemoryInboxPanel renders buildMemoryInboxStableKey stable key patterns">
      <div style={header}>
        <strong>Inbox cards</strong>
        <span>{cards.length} candidates</span>
      </div>
      {cards.length === 0 ? <MemoryInboxEmptyState /> : (
        <div style={grid}>
          {cards.map((card, index) => <MemoryInboxCard key={buildMemoryInboxStableKey("card", card.id, index)} card={card} selected={card.id === selectedCardId} onSelect={onSelectCard} />)}
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, color: "#cbd5e1", fontSize: 13, minWidth: 0, flexWrap: "wrap" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 12, minWidth: 0 };

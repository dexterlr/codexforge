"use client";

import type { CSSProperties } from "react";
import type { GlobalActivityEvent } from "../global-activity-types";
import { classifyGlobalActivityPriority, rankGlobalActivityEvents } from "../activity-feed-priority";
import { GlobalActivityPanel } from "./GlobalActivityPanel";

export function GlobalActivityPriorityBoard({ events }: { events: readonly GlobalActivityEvent[] }) {
  const ranked = rankGlobalActivityEvents(events).slice(0, 5);
  return (
    <GlobalActivityPanel title="Priority Board" subtitle="Priority ranks blockers first and uses event ids as deterministic tie-breakers.">
      <div style={list} data-codexforge-global-activity-priority-board="GlobalActivityPriorityBoard renders priority ranks blockers first">
        {ranked.map((event) => (
          <div key={event.id} style={row}>
            <strong style={name}>{event.title}</strong>
            <span style={pill}>{classifyGlobalActivityPriority(event)}</span>
          </div>
        ))}
      </div>
    </GlobalActivityPanel>
  );
}

const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 8, alignItems: "center", borderBottom: "1px solid rgba(148,163,184,0.1)", paddingBottom: 8, minWidth: 0 };
const name: CSSProperties = { color: "#e2e8f0", fontSize: 13, overflowWrap: "anywhere" };
const pill: CSSProperties = { color: "#fde68a", border: "1px solid rgba(251,191,36,0.22)", borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 850 };

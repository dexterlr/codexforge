"use client";

import type { CSSProperties } from "react";
import { summarizeActivitySources } from "../activity-source-adapters";
import type { GlobalActivityEvent } from "../global-activity-types";
import { GlobalActivityPanel } from "./GlobalActivityPanel";

export function GlobalActivitySourcePanel({ events }: { events: readonly GlobalActivityEvent[] }) {
  const sources = summarizeActivitySources(events);
  return (
    <GlobalActivityPanel title="Sources" subtitle="Source adapters accept supplied summaries and return typed events without UI imports or state mutation.">
      <div style={list} data-codexforge-global-activity-source-panel="GlobalActivitySourcePanel renders">
        {sources.map((source) => (
          <div key={source.source} style={row}>
            <strong style={name}>{source.source}</strong>
            <span style={meta}>{source.eventCount} events</span>
            <span style={meta}>{source.reviewRequiredCount} review</span>
          </div>
        ))}
      </div>
    </GlobalActivityPanel>
  );
}

const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 10, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto auto", gap: 8, minWidth: 0 };
const name: CSSProperties = { color: "#f8fafc", fontSize: 13, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#94a3b8", fontSize: 12, whiteSpace: "nowrap" };

"use client";

import type { CSSProperties } from "react";
import type { GlobalActivityTimeline as Timeline } from "../global-activity-types";
import { GlobalActivityPanel } from "./GlobalActivityPanel";

export function GlobalActivityTimeline({ timeline }: { timeline: Timeline }) {
  return (
    <GlobalActivityPanel title="Timeline" subtitle="Deterministic grouping by review workflow.">
      <div style={list} data-codexforge-global-activity-timeline="GlobalActivityTimeline renders timeline includes Needs attention timeline includes Regression workflow timeline includes Patch workflow">
        {timeline.groups.map((group) => (
          <div key={group.id} style={row}>
            <strong style={label}>{group.label}</strong>
            <span style={count}>{group.events.length}</span>
            <p style={summary}>{group.summary}</p>
          </div>
        ))}
      </div>
    </GlobalActivityPanel>
  );
}

const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 10, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 6, minWidth: 0 };
const label: CSSProperties = { color: "#e2e8f0", fontSize: 13, overflowWrap: "anywhere" };
const count: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const summary: CSSProperties = { gridColumn: "1 / -1", margin: 0, color: "#94a3b8", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };

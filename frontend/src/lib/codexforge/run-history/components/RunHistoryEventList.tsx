"use client";

import type { RunHistoryEvent } from "../run-history-types";
import { summarizeRunHistoryEvent } from "../run-history-event";
import { rhCopy, rhList, rhMeta, rhPanel, rhPill, rhTitle } from "./RunHistoryStyles";

export function RunHistoryEventList({ events }: { events: readonly RunHistoryEvent[] }) {
  return (
    <section style={rhPanel} data-codexforge-run-history-event-list="RunHistoryEventList renders event kinds include preview-created validation-output-reviewed result-captured stable order deterministic event ids no real persistence claims">
      <h2 style={rhTitle}>Timeline events</h2>
      <div style={rhList}>
        {events.map((event) => (
          <article key={event.eventId} style={{ borderTop: "1px solid rgba(148,163,184,0.12)", display: "grid", gap: 4, paddingTop: 8 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span style={rhPill}>{String(event.order).padStart(2, "0")}</span>
              <span style={rhPill}>{event.eventKind}</span>
              <span style={rhPill}>{event.status}</span>
            </div>
            <p style={rhMeta}>{event.label}</p>
            <p style={rhCopy}>{summarizeRunHistoryEvent(event)}</p>
            <p style={rhCopy}>{event.safetyNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

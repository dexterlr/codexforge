"use client";

import type { CSSProperties } from "react";
import type { BrainEventQueue } from "../brain-merge-types";

export function BrainEventQueuePanel({ queue }: { queue: BrainEventQueue }) {
  return (
    <section style={panel} data-codexforge-brain-event-queue-panel>
      <h3 style={title}>Persisted Event Queue Preview</h3>
      <p style={copy}>Only approved memory.promoted persisted memory events are eligible.</p>
      <div style={stats}>
        <Metric label="Events" value={queue.eventCount} />
        <Metric label="Eligible" value={queue.validEventCount} />
        <Metric label="Blocked" value={queue.blockedEventCount} />
      </div>
      {queue.events.map((event) => (
        <article key={event.id} style={item}>
          <strong style={safe}>{event.eventId}</strong>
          <span style={safe}>{event.type} / {event.state}</span>
          <span style={safe}>{event.blockedReasons.length ? event.blockedReasons.join(", ") : "ready for graph diff preview"}</span>
        </article>
      ))}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0 };
const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0, fontSize: 12 };

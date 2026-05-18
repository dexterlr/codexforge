"use client";

import type { CSSProperties } from "react";
import type { GlobalActivityEvent } from "../global-activity-types";
import { classifyGlobalActivityPriority } from "../activity-feed-priority";

export function GlobalActivityEventCard({ event }: { event: GlobalActivityEvent }) {
  return (
    <article style={card} data-codexforge-global-activity-event-card="GlobalActivityEventCard renders stable key helper stable key patterns">
      <div style={topline}>
        <span style={badge}>{event.type}</span>
        <span style={severity}>{event.severity}</span>
        <span style={priority}>{classifyGlobalActivityPriority(event)}</span>
      </div>
      <h3 style={title}>{event.title}</h3>
      <p style={detail}>{event.detail}</p>
      <div style={metaGrid}>
        <Meta label="Source" value={event.source} />
        <Meta label="Surface" value={event.surface} />
        <Meta label="Status" value={event.status} />
        <Meta label="Next" value={event.nextActionLabel} />
      </div>
      {event.relatedFiles.length > 0 ? <p style={paths}>Files: {event.relatedFiles.join(", ")}</p> : null}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span style={metaItem}>
      <span style={metaLabel}>{label}</span>
      <strong style={metaValue}>{value}</strong>
    </span>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "linear-gradient(135deg, rgba(15,23,42,0.86), rgba(2,6,23,0.72))", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const topline: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", color: "#bae6fd", background: "rgba(14,165,233,0.1)", borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 850, overflowWrap: "anywhere" };
const severity: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", color: "#fde68a", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 850 };
const priority: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", color: "#ccfbf1", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 850 };
const title: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, minWidth: 0 };
const metaItem: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.52)", borderRadius: 8, padding: 9, display: "grid", gap: 3, minWidth: 0 };
const metaLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase" };
const metaValue: CSSProperties = { color: "#e2e8f0", fontSize: 12, lineHeight: 1.35, overflowWrap: "anywhere" };
const paths: CSSProperties = { margin: 0, color: "#bae6fd", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };

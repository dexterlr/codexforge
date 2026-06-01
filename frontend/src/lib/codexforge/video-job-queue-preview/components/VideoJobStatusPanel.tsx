"use client";

import type { CSSProperties } from "react";
import type { VideoJobStatus } from "../video-job-queue-types";

export function VideoJobStatusPanel({ statuses }: { statuses: VideoJobStatus[] }) {
  return <section style={card}><h2 style={title}>Statuses</h2><div style={chips}>{statuses.map((status) => <span key={status.id} style={chip} title={status.plainEnglish}>{status.label}</span>)}</div><p style={copy}>Every status in this preview has execution allowed: no.</p></section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const chip: CSSProperties = { background: "rgba(14,116,144,0.22)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "6px 8px" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

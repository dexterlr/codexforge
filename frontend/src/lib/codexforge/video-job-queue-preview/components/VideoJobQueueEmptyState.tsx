"use client";

import type { CSSProperties } from "react";

export function VideoJobQueueEmptyState() {
  return <section style={card}><h2 style={title}>What remains manual</h2><p style={copy}>The operator still reviews the request, confirms local setup, approves execution later, and supplies results through a separate safe boundary. This preview does not queue or render anything.</p></section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: "0 0 8px" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

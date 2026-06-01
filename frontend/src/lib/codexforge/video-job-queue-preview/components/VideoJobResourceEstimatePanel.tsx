"use client";

import type { CSSProperties } from "react";
import type { VideoJobResourceEstimate } from "../video-job-queue-types";

export function VideoJobResourceEstimatePanel({ estimates }: { estimates: VideoJobResourceEstimate[] }) {
  return <section style={card}><h2 style={title}>Resource estimate</h2>{estimates.map((estimate) => <p key={estimate.id} style={copy}>{estimate.gpuPosture} {estimate.timePosture} {estimate.costPosture}</p>)}</section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

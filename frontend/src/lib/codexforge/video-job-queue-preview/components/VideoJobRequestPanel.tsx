"use client";

import type { CSSProperties } from "react";
import type { VideoJobRequest } from "../video-job-queue-types";

export function VideoJobRequestPanel({ request }: { request: VideoJobRequest }) {
  return <article style={card}><h2 style={title}>{request.workflowType}</h2><p style={copy}>Prompt for review: {request.prompt}</p><p style={copy}>Provider: {request.provider}. Posture: {request.localCloudPosture}. Mode: {request.mode}.</p><p style={copy}>Resolution: {request.resolutionTarget}. Duration: {request.durationTarget}.</p><p style={copy}>Approval required: yes. No-auto-run guarantee: yes.</p></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

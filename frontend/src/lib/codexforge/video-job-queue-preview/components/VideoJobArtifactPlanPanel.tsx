"use client";

import type { CSSProperties } from "react";
import type { VideoJobArtifactPlan } from "../video-job-queue-types";

export function VideoJobArtifactPlanPanel({ plans }: { plans: VideoJobArtifactPlan[] }) {
  return <section style={card}><h2 style={title}>Artifact plan</h2>{plans.map((plan) => <div key={plan.id} style={item}><p style={copy}>Destination: {plan.destination}</p><p style={copy}>Artifacts: {plan.expectedArtifacts.join(", ")}.</p><p style={copy}>{plan.writeBoundary}</p></div>)}</section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const item: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 5, paddingTop: 8 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

"use client";

import type { CSSProperties } from "react";
import type { LocalAiWorkloadFit } from "../local-machine-capability-types";

export function LocalAiWorkloadFitPanel({ workloads }: { workloads: LocalAiWorkloadFit[] }) {
  return <article style={card}><span style={tag}>Workloads</span><h2 style={title}>AI workload fit</h2>{workloads.map((workload) => <div key={workload.id} style={row}><strong>{workload.workload}</strong><span>{workload.fit}</span><p style={copy}>{workload.guidance}</p></div>)}</article>;
}
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 10 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const row: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", display: "grid", gap: 4, paddingTop: 8 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };

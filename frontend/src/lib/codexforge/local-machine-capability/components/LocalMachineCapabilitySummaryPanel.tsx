"use client";

import type { CSSProperties } from "react";
import type { LocalMachineCapabilitySummary } from "../local-machine-capability-types";

export function LocalMachineCapabilitySummaryPanel({ summary }: { summary: LocalMachineCapabilitySummary }) {
  return <section style={notice}><strong>Capability summary</strong><span>{summary.summary}</span><span>{summary.nextAction}</span></section>;
}
const notice: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, padding: 12, background: "rgba(20,83,45,0.16)", color: "#dcfce7", display: "grid", gap: 4, fontSize: 13 };

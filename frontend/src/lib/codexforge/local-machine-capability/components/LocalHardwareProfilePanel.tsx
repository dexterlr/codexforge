"use client";

import type { CSSProperties } from "react";
import type { LocalHardwareProfile } from "../local-machine-capability-types";

export function LocalHardwareProfilePanel({ hardware }: { hardware: LocalHardwareProfile }) {
  return <article style={card}><span style={tag}>Manual profile</span><h2 style={title}>Hardware</h2><p style={copy}>{hardware.label}</p><p style={copy}>{hardware.memoryGb}GB RAM, {hardware.cpuClass}, {hardware.motherboard}, {hardware.powerSupply}.</p><div style={pills}>{hardware.tags.map((tagValue) => <span key={tagValue} style={pill}>{tagValue}</span>)}</div></article>;
}
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const pills: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", borderRadius: 999, color: "#ccfbf1", fontSize: 11, padding: "4px 8px" };

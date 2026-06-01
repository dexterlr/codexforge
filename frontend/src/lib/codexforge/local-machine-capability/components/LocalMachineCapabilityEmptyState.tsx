"use client";

import type { CSSProperties } from "react";

export function LocalMachineCapabilityEmptyState() {
  return <section style={empty}><strong>No automatic scan needed</strong><span>This page starts with a safe manual workstation profile. Edit the profile in code later if the hardware changes.</span></section>;
}
const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.28)", borderRadius: 8, color: "#cbd5e1", display: "grid", gap: 4, padding: 12, fontSize: 13 };

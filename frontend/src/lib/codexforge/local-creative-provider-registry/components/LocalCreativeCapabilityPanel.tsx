"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeCapability } from "../local-creative-provider-types";

export function LocalCreativeCapabilityPanel({ capabilities }: { capabilities: LocalCreativeCapability[] }) {
  return <div style={wrap}>{capabilities.map((capability) => <span key={capability.id} style={chip} title={capability.noviceMeaning}>{capability.label}</span>)}</div>;
}

const wrap: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const chip: CSSProperties = { background: "rgba(14,116,144,0.22)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "6px 8px" };

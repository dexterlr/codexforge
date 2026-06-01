"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeProvider } from "../local-creative-provider-types";
import { LocalCreativeCapabilityPanel } from "./LocalCreativeCapabilityPanel";
import { LocalCreativeCostProfilePanel } from "./LocalCreativeCostProfilePanel";
import { LocalCreativeProviderKindPanel } from "./LocalCreativeProviderKindPanel";
import { LocalCreativeRoutingProfilePanel } from "./LocalCreativeRoutingProfilePanel";

export function LocalCreativeProviderPanel({ provider }: { provider: LocalCreativeProvider }) {
  return <article style={card}><h2 style={title}>{provider.name}</h2><LocalCreativeProviderKindPanel kind={provider.kind} /><LocalCreativeCapabilityPanel capabilities={provider.capabilities} /><p style={copy}>Manual setup required: {provider.setupRequired}</p><p style={copy}>{provider.safetyNote}</p><LocalCreativeCostProfilePanel profile={provider.costProfile} /><LocalCreativeRoutingProfilePanel profile={provider.routingProfile} /></article>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };

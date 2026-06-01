"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeCostProfile } from "../local-creative-provider-types";

export function LocalCreativeCostProfilePanel({ profile }: { profile: LocalCreativeCostProfile }) {
  return <div style={box}><strong>Cost posture</strong><p style={copy}>{profile.localFirstReason}</p><p style={copy}>{profile.operatorCost}</p><p style={meta}>Cloud posture: {profile.cloudCreditPosture}</p></div>;
}

const box: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 6, paddingTop: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const meta: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 800, margin: 0 };

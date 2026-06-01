"use client";

import type { CSSProperties } from "react";
import type { LocalCreativeRoutingProfile } from "../local-creative-provider-types";

export function LocalCreativeRoutingProfilePanel({ profile }: { profile: LocalCreativeRoutingProfile }) {
  return <div style={box}><strong>Routing</strong><ul style={list}>{profile.recommendedFor.map((item) => <li key={`routing-${profile.id}-${item}`}>{item}</li>)}</ul><p style={copy}>{profile.fallbackRule}</p><p style={copy}>{profile.approvalBoundary}</p></div>;
}

const box: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 6, paddingTop: 10 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };

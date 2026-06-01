import type { CSSProperties } from "react";
import type { ProviderHealthCheck } from "../provider-health-types";

export function ProviderHealthCheckPanel({ check }: { check: ProviderHealthCheck }) {
  return <article style={card}><h2 style={title}>{check.name}</h2><p style={copy}>Status: {check.status}</p><p style={copy}>{check.requirement}</p><p style={copy}>{check.guidance}</p></article>;
}
const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };

import type { CSSProperties } from "react";
import type { ProviderHealthCheck } from "../provider-health-types";
export function ProviderHealthStatusPanel({ checks }: { checks: ProviderHealthCheck[] }) { return <section style={panel}><h2 style={title}>Status groups</h2><p style={copy}>Configured, missing key, manual only, local server expected, planned, unavailable, and unknown are shown in plain English.</p><p style={copy}>Configured count: {checks.filter((check) => check.configured).length}</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "6px 0 0" };

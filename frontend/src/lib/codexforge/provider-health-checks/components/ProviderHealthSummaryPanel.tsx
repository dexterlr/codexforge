import type { CSSProperties } from "react";
import type { ProviderHealthSummary } from "../provider-health-types";
export function ProviderHealthSummaryPanel({ summary }: { summary: ProviderHealthSummary }) { return <section style={panel}><h2 style={title}>Health summary</h2><p style={copy}>{summary.summary}</p><p style={copy}>Blocked or needs setup: {summary.blockedCount}. Manual profiles: {summary.manualCount}.</p></section>; }
const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "6px 0 0" };

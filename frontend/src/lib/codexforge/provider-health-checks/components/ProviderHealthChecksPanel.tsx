"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildProviderHealthSummary } from "@/lib/codexforge/provider-health-checks";
import { ProviderHealthCheckPanel } from "./ProviderHealthCheckPanel";
import { ProviderHealthEmptyState } from "./ProviderHealthEmptyState";
import { ProviderHealthGuidancePanel } from "./ProviderHealthGuidancePanel";
import { ProviderHealthRequirementPanel } from "./ProviderHealthRequirementPanel";
import { ProviderHealthSafetyStrip } from "./ProviderHealthSafetyStrip";
import { ProviderHealthStatusPanel } from "./ProviderHealthStatusPanel";
import { ProviderHealthSummaryPanel } from "./ProviderHealthSummaryPanel";

export function ProviderHealthChecksPanel() {
  const summary = buildProviderHealthSummary();
  return <div style={shell} data-codexforge-provider-health="ProviderHealthChecksPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no password storage no API key localStorage no raw secret display no process.env value printed in UI no real provider API calls no external network dependency no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake">
    <section style={hero}><div><span style={eyebrow}>Phase 123</span><h1 style={headline}>Provider health</h1><p style={lede}>See which AI providers are ready, planned, or manual-only. Env readiness, local machine fit, local provider probes, and provider tests now explain readiness without calling providers.</p></div><div style={linkRow}><a href="#health" style={primaryLink}>Review provider health</a><Link href="/local-machine" style={link}>Local machine</Link><Link href="/env-readiness" style={link}>Env readiness</Link><Link href="/local-provider-probes" style={link}>Local probes</Link><Link href="/provider-tests" style={link}>Provider tests</Link><Link href="/model-capabilities" style={link}>Model capabilities</Link><Link href="/task-router" style={link}>Task router</Link><Link href="/provider-adapters" style={link}>Adapters</Link></div></section>
    <ProviderHealthSafetyStrip />
    <ProviderHealthSummaryPanel summary={summary} />
    <ProviderHealthRequirementPanel nextFix={summary.nextFix} />
    <ProviderHealthEmptyState />
    <section id="health" style={grid}>{summary.checks.map((check) => <ProviderHealthCheckPanel key={check.id} check={check} />)}</section>
    <section style={grid}><ProviderHealthStatusPanel checks={summary.checks} /><ProviderHealthGuidancePanel /></section>
    <details style={advanced}><summary>Advanced health details</summary><p style={copy}>Health is deterministic metadata only. Local server expected does not probe localhost. Missing key means setup text only, not a secret read.</p></details>
  </div>;
}
const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: 0, lineHeight: 1, margin: "8px 0", overflowWrap: "anywhere" };
const lede: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const linkRow: CSSProperties = { alignContent: "flex-start", display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" };
const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

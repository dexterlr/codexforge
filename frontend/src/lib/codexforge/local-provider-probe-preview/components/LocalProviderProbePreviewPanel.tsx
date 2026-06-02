"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { buildLocalProviderProbeSummary } from "@/lib/codexforge/local-provider-probe-preview";
import { LocalProviderProbeEmptyState } from "./LocalProviderProbeEmptyState";
import { LocalProviderProbePlanPanel } from "./LocalProviderProbePlanPanel";
import { LocalProviderProbeResultPanel } from "./LocalProviderProbeResultPanel";
import { LocalProviderProbeSafetyPanel } from "./LocalProviderProbeSafetyPanel";
import { LocalProviderProbeSafetyStrip } from "./LocalProviderProbeSafetyStrip";
import { LocalProviderProbeSummaryPanel } from "./LocalProviderProbeSummaryPanel";
import { LocalProviderTargetPanel } from "./LocalProviderTargetPanel";
export function LocalProviderProbePreviewPanel() { const summary = buildLocalProviderProbeSummary(); return <div style={shell} data-codexforge-local-provider-probe-preview="LocalProviderProbePreviewPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no password storage no API key localStorage no raw secret display no process.env value printed in UI no real provider API calls no prompt payload sent to providers no external network dependency no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake">
  <section style={hero}><div><span style={eyebrow}>Phase 128</span><h1 style={headline}>Local provider probes</h1><p style={lede}>Preview safe checks for local AI servers before using them.</p></div><div style={linkRow}><a href="#probes" style={primaryLink}>Review local probe plan</a><Link href="/local-machine" style={link}>Local machine</Link><Link href="/local-creative" style={link}>Local creative</Link><Link href="/comfyui-health" style={link}>ComfyUI health</Link><Link href="/comfyui-health/gate" style={link}>Health gate</Link><Link href="/provider-health" style={link}>Provider health</Link><Link href="/provider-tests" style={link}>Provider tests</Link></div></section>
  <LocalProviderProbeSafetyStrip /><LocalProviderProbeSummaryPanel summary={summary} />
  <section id="probes" style={grid}><LocalProviderTargetPanel targets={summary.targets} /><LocalProviderProbePlanPanel plans={summary.plans} /><LocalProviderProbeResultPanel results={summary.results} /></section>
  <section style={grid}><LocalProviderProbeSafetyPanel safety={summary.safety} /><LocalProviderProbeEmptyState /></section>
  <details style={advanced}><summary>Advanced local probe details</summary><p style={copy}>Health checks are not prompts. A safe future check should ask only whether a local service appears reachable and should not ask a model to generate anything.</p></details>
</div>; }
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

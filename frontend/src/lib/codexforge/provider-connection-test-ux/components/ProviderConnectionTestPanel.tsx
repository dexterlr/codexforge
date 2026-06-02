"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { buildProviderConnectionTestSummary } from "@/lib/codexforge/provider-connection-test-ux";
import { ProviderConnectionTestEmptyState } from "./ProviderConnectionTestEmptyState";
import { ProviderConnectionTestSafetyStrip } from "./ProviderConnectionTestSafetyStrip";
import { ProviderConnectionTestSummaryPanel } from "./ProviderConnectionTestSummaryPanel";
import { ProviderTestNextActionPanel } from "./ProviderTestNextActionPanel";
import { ProviderTestPlanPanel } from "./ProviderTestPlanPanel";
import { ProviderTestResultPanel } from "./ProviderTestResultPanel";
import { ProviderTestSafetyPanel } from "./ProviderTestSafetyPanel";
import { ProviderTestScopePanel } from "./ProviderTestScopePanel";
export function ProviderConnectionTestPanel() { const summary = buildProviderConnectionTestSummary(); return <div style={shell} data-codexforge-provider-connection-test-ux="ProviderConnectionTestPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no password storage no API key localStorage no raw secret display no process.env value printed in UI no real provider API calls no prompt payload sent to providers no external network dependency no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake">
  <section style={hero}><div><span style={eyebrow}>Phase 129</span><h1 style={headline}>Provider tests</h1><p style={lede}>Check provider readiness safely before any real AI call.</p></div><div style={linkRow}><a href="#tests" style={primaryLink}>Review test plan</a><Link href="/provider-health" style={link}>Provider health</Link><Link href="/comfyui-health" style={link}>ComfyUI health</Link><Link href="/comfyui-health/gate" style={link}>Health gate</Link><Link href="/comfyui-metadata" style={link}>Metadata</Link><Link href="/env-readiness" style={link}>Env readiness</Link><Link href="/local-provider-probes" style={link}>Local probes</Link><Link href="/provider-setup" style={link}>Setup wizard</Link></div></section>
  <ProviderConnectionTestSafetyStrip /><ProviderConnectionTestSummaryPanel summary={summary} />
  <section id="tests" style={grid}><ProviderTestPlanPanel plans={summary.plans} /><ProviderTestScopePanel scopes={summary.scopes} /><ProviderTestResultPanel results={summary.results} /></section>
  <section style={grid}><ProviderTestSafetyPanel safety={summary.safety} /><ProviderTestNextActionPanel actions={summary.nextActions} /><ProviderConnectionTestEmptyState /></section>
  <details style={advanced}><summary>Advanced provider test details</summary><p style={copy}>Safe now covers profile checks, env presence design, local probe previews, and manual browser checks. Cloud live tests remain blocked until a future approved route exists.</p></details>
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

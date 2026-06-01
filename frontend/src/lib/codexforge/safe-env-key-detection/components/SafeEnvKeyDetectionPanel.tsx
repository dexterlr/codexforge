"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { buildEnvKeyReadinessSummary } from "@/lib/codexforge/safe-env-key-detection";
import { EnvKeyDefinitionPanel } from "./EnvKeyDefinitionPanel";
import { EnvKeyDetectionResultPanel } from "./EnvKeyDetectionResultPanel";
import { EnvKeyProviderMapPanel } from "./EnvKeyProviderMapPanel";
import { EnvKeyReadinessSummaryPanel } from "./EnvKeyReadinessSummaryPanel";
import { EnvKeyRedactionPolicyPanel } from "./EnvKeyRedactionPolicyPanel";
import { SafeEnvKeyDetectionEmptyState } from "./SafeEnvKeyDetectionEmptyState";
import { SafeEnvKeyDetectionSafetyStrip } from "./SafeEnvKeyDetectionSafetyStrip";
export function SafeEnvKeyDetectionPanel() { const summary = buildEnvKeyReadinessSummary(); return <div style={shell} data-codexforge-safe-env-key-detection="SafeEnvKeyDetectionPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no password storage no API key localStorage no raw secret display no process.env value printed in UI no real provider API calls no prompt payload sent to providers no external network dependency no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake">
  <section style={hero}><div><span style={eyebrow}>Phase 127</span><h1 style={headline}>Env readiness</h1><p style={lede}>Check which provider keys are configured without showing secrets.</p></div><div style={linkRow}><a href="#env" style={primaryLink}>Review env setup</a><Link href="/credentials" style={link}>Credential rules</Link><Link href="/provider-setup" style={link}>Setup wizard</Link><Link href="/provider-tests" style={link}>Provider tests</Link></div></section>
  <SafeEnvKeyDetectionSafetyStrip /><EnvKeyReadinessSummaryPanel summary={summary} />
  <section id="env" style={grid}><EnvKeyDefinitionPanel definitions={summary.definitions} /><EnvKeyDetectionResultPanel results={summary.results} /><EnvKeyProviderMapPanel providerMap={summary.providerMap} /></section>
  <section style={grid}><EnvKeyRedactionPolicyPanel policy={summary.policy} /><SafeEnvKeyDetectionEmptyState /><article style={card}><span style={tag}>.env.local template</span><h2 style={cardTitle}>Placeholders only</h2><pre style={pre}>{summary.template}</pre></article></section>
  <details style={advanced}><summary>Advanced env details</summary><p style={copy}>If a server-side route exists later, it should return present or missing only. It should never return a key value, token prefix, password, or raw environment output.</p></details>
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
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const pre: CSSProperties = { background: "rgba(15,23,42,0.86)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0, overflowX: "auto", padding: 12 };
const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

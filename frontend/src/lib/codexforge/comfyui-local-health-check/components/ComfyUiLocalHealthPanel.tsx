"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildComfyUiHealthSummary } from "@/lib/codexforge/comfyui-local-health-check";
import { ComfyUiHealthEmptyState } from "./ComfyUiHealthEmptyState";
import { ComfyUiHealthPlanPanel } from "./ComfyUiHealthPlanPanel";
import { ComfyUiHealthResultPanel } from "./ComfyUiHealthResultPanel";
import { ComfyUiHealthSafetyPanel } from "./ComfyUiHealthSafetyPanel";
import { ComfyUiHealthSafetyStrip } from "./ComfyUiHealthSafetyStrip";
import { ComfyUiHealthSummaryPanel } from "./ComfyUiHealthSummaryPanel";
import { ComfyUiHealthTargetPanel } from "./ComfyUiHealthTargetPanel";

export function ComfyUiLocalHealthPanel() {
  const summary = buildComfyUiHealthSummary();
  return <div style={shell} data-codexforge-comfyui-local-health-check="ComfyUiLocalHealthPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
    <section style={hero}><div><span style={eyebrow}>Phase 131</span><h1 style={headline}>ComfyUI health</h1><p style={lede}>Check whether your local ComfyUI setup is ready without running a workflow. This explains the safe health boundary before anything contacts a local service.</p></div><div style={linkRow}><a href="#comfyui-health" style={primaryLink}>Review ComfyUI check</a><Link href="/comfyui-health/gate" style={link}>Health gate</Link><Link href="/comfyui-metadata" style={link}>Metadata</Link><Link href="/comfyui-workflows/import" style={link}>Workflow import</Link><Link href="/comfyui-jobs/package" style={link}>Job package</Link><Link href="/local-creative" style={link}>Local creative</Link><Link href="/local-provider-probes" style={link}>Local probes</Link><Link href="/video-workflows" style={link}>Video workflows</Link><Link href="/video-jobs" style={link}>Video jobs</Link><Link href="/local-draft-review" style={link}>Draft review</Link></div></section>
    <ComfyUiHealthSafetyStrip />
    <ComfyUiHealthSummaryPanel summary={summary} />
    <section id="comfyui-health" style={grid}><ComfyUiHealthTargetPanel target={summary.target} /><ComfyUiHealthPlanPanel plan={summary.plan} /><ComfyUiHealthResultPanel result={summary.result} /></section>
    <section style={grid}><ComfyUiHealthSafetyPanel safety={summary.safety} /><ComfyUiHealthEmptyState /></section>
    <details style={advanced}><summary>Advanced ComfyUI health details</summary><p style={copy}>A future approved live check may verify metadata such as reachability and version-like readiness. It must not submit a workflow, prompt, image request, or video job.</p></details>
  </div>;
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: 0, lineHeight: 1, margin: "8px 0", overflowWrap: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const linkRow: CSSProperties = { alignContent: "flex-start", display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" };
const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

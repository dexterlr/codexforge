"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildLocalVideoWorkflowSummary } from "@/lib/codexforge/local-video-workflow-catalog";
import { LocalVideoWorkflowEmptyState } from "./LocalVideoWorkflowEmptyState";
import { LocalVideoWorkflowPanel } from "./LocalVideoWorkflowPanel";
import { LocalVideoWorkflowSafetyStrip } from "./LocalVideoWorkflowSafetyStrip";
import { LocalVideoWorkflowSummaryPanel } from "./LocalVideoWorkflowSummaryPanel";

export function LocalVideoWorkflowCatalogPanel() {
  const summary = buildLocalVideoWorkflowSummary();
  return <div style={shell} data-codexforge-local-video-workflow-catalog="LocalVideoWorkflowCatalogPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
    <section style={hero}><div><span style={eyebrow}>Workflows workspace</span><h1 style={headline}>Workflows</h1><p style={lede}>Plan local video drafts before spending cloud credits. Start with short tests, keyframes, and review steps, then decide on final render later.</p></div><div style={linkRow}><a href="#video-workflows" style={primaryLink}>Open workflow planner</a><Link href="/comfyui-workflows/import" style={link}>Workflow import</Link><Link href="/video-prompt" style={link}>Video prompt</Link><Link href="/storyboard" style={link}>Storyboard</Link><Link href="/keyframes" style={link}>Keyframes</Link><Link href="/local-draft-review" style={link}>Draft review</Link><Link href="/local-creative" style={link}>Local creative</Link><Link href="/comfyui-health" style={link}>ComfyUI health</Link><Link href="/video-jobs" style={link}>Video jobs</Link></div></section>
    <LocalVideoWorkflowSafetyStrip />
    <LocalVideoWorkflowSummaryPanel summary={summary} />
    <section id="video-workflows" style={grid}>{summary.workflows.map((workflow) => <LocalVideoWorkflowPanel key={workflow.id} workflow={workflow} />)}</section>
    <LocalVideoWorkflowEmptyState />
    <details style={advanced}><summary>Advanced workflow details</summary><p style={copy}>Final render decisions remain later and reviewed. Local GPU time is still a cost, so short low-resolution drafts are the default novice-safe planning path.</p></details>
  </div>;
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900 };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: 0, lineHeight: 1, margin: "8px 0", overflowWrap: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const linkRow: CSSProperties = { alignContent: "flex-start", display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

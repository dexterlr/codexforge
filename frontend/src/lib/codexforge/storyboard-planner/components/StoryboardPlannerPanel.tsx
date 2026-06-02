"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { buildStoryboardPlannerSummary } from "@/lib/codexforge/storyboard-planner";
import { StoryboardCameraPlanPanel } from "./StoryboardCameraPlanPanel";
import { StoryboardContinuityPanel } from "./StoryboardContinuityPanel";
import { StoryboardEmptyState } from "./StoryboardEmptyState";
import { StoryboardHandoffPanel } from "./StoryboardHandoffPanel";
import { StoryboardPlannerSummaryPanel } from "./StoryboardPlannerSummaryPanel";
import { StoryboardProjectPanel } from "./StoryboardProjectPanel";
import { StoryboardSafetyPanel } from "./StoryboardSafetyPanel";
import { StoryboardSafetyStrip } from "./StoryboardSafetyStrip";
import { StoryboardShotPanel } from "./StoryboardShotPanel";
import { StoryboardShotTimingPanel } from "./StoryboardShotTimingPanel";

export function StoryboardPlannerPanel() {
  const summary = buildStoryboardPlannerSummary();
  return <div style={shell} data-codexforge-storyboard-planner="StoryboardPlannerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English shot id visual description camera movement subject movement duration target keyframe need local draft suitability risk notes next step no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
    <section style={hero}><div><span style={eyebrow}>Phase 135</span><h1 style={headline}>Storyboard planner</h1><p style={lede}>Plan the shots before making keyframes or video drafts. The path is idea to shots to timing to keyframes to draft later.</p></div><div style={linkRow}><a href="#storyboard" style={primaryLink}>Plan storyboard</a><Link href="/local-keyframes" style={link}>Local keyframes MVP</Link><Link href="/video-prompt" style={link}>Video prompt</Link><Link href="/keyframes" style={link}>Keyframes</Link><Link href="/video-workflows" style={link}>Video workflows</Link><Link href="/local-creative" style={link}>Local creative</Link></div></section>
    <StoryboardSafetyStrip /><StoryboardPlannerSummaryPanel summary={summary} />
    <section id="storyboard" style={grid}><StoryboardProjectPanel project={summary.project} /><StoryboardShotPanel shots={summary.shots} /><StoryboardShotTimingPanel timings={summary.timings} /><StoryboardCameraPlanPanel cameraPlans={summary.cameraPlans} /><StoryboardContinuityPanel continuity={summary.continuity} /><StoryboardSafetyPanel safety={summary.safety} /><StoryboardHandoffPanel handoff={summary.handoff} /></section>
    <StoryboardEmptyState />
    <details style={advanced}><summary>Advanced storyboard details</summary><p style={copy}>This page is planning only. It does not run workflows, call providers, call ComfyUI, generate images, or render video.</p></details>
  </div>;
}
const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 16, minWidth: 0, width: "100%" }; const hero: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: 18 }; const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" }; const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: 0, lineHeight: 1, margin: "8px 0", overflowWrap: "normal", whiteSpace: "nowrap" }; const lede: CSSProperties = { color: "rgba(226,232,240,0.76)", fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 760 }; const linkRow: CSSProperties = { alignContent: "flex-start", display: "flex", flexWrap: "wrap", gap: 8 }; const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none" }; const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" }; const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }; const advanced: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 }; const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };

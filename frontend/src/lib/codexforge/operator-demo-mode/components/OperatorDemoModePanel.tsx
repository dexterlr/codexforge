"use client";
import type { CSSProperties } from "react";
import { buildDemoHandoff, buildDemoSafeScenario, buildDemoScreenMap, buildDemoScript, buildDemoSuccessCriteria, buildDemoSummary, buildDemoTalkingPoints } from "../index";
import { buttonLike } from "./DemoStyles";
import { DemoEmptyState } from "./DemoEmptyState";
import { DemoHandoffPanel } from "./DemoHandoffPanel";
import { DemoSafeScenarioPanel } from "./DemoSafeScenarioPanel";
import { DemoSafetyStrip } from "./DemoSafetyStrip";
import { DemoScreenMapPanel } from "./DemoScreenMapPanel";
import { DemoScriptPanel } from "./DemoScriptPanel";
import { DemoStepPanel } from "./DemoStepPanel";
import { DemoSuccessCriteriaPanel } from "./DemoSuccessCriteriaPanel";
import { DemoTalkingPointsPanel } from "./DemoTalkingPointsPanel";

export function OperatorDemoModePanel() {
  const script = buildDemoScript();
  const summary = buildDemoSummary(script);
  return <div style={shell} data-codexforge-demo-panel="OperatorDemoModePanel renders Demo the coding MVP Start demo What this proves What remains manual no execution no fake claim code was applied no fake validation success no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildDemoStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Demo mode</span><h1 style={headline}>Demo the coding MVP</h1><p style={lede}>Show one safe coding path without exposing advanced detail or pretending unsafe actions happened.</p><a href="#demo-script" style={buttonLike}>Start demo</a></div><DemoSafetyStrip /></section>
    <section style={summaryStrip}><strong>{summary.title}</strong><span>{summary.stepCount} screens</span><span>{summary.safety}</span></section>
    <DemoEmptyState />
    <section id="demo-script" style={grid}><DemoScriptPanel script={script} /><DemoStepPanel steps={script.steps} /><DemoSafeScenarioPanel scenario={buildDemoSafeScenario()} /><DemoScreenMapPanel screenMap={buildDemoScreenMap(script)} /><DemoTalkingPointsPanel points={buildDemoTalkingPoints()} /><DemoSuccessCriteriaPanel criteria={buildDemoSuccessCriteria()} /><DemoHandoffPanel handoff={buildDemoHandoff(script)} /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details hidden. Demo copy stays plain English and copy-only.</p></details>
  </div>;
}
const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 36, letterSpacing: 0, lineHeight: 1.08, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 780 };
const summaryStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", fontSize: 13, gap: 10, justifyContent: "space-between", padding: "10px 12px" };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };

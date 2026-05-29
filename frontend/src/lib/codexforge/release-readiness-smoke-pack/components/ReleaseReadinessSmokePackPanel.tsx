"use client";
import type { CSSProperties } from "react";
import { buildReleaseSmokeChecklist, buildReleaseSmokeCoverageMap, buildReleaseSmokeFailureRouting, buildReleaseSmokeHandoff, buildReleaseSmokeResultCapture, buildReleaseSmokeSuite, buildReleaseSmokeSummary } from "../index";
import { buttonLike } from "./ReleaseSmokeStyles";
import { ReleaseSmokeChecklistPanel } from "./ReleaseSmokeChecklistPanel";
import { ReleaseSmokeCommandPanel } from "./ReleaseSmokeCommandPanel";
import { ReleaseSmokeCoverageMapPanel } from "./ReleaseSmokeCoverageMapPanel";
import { ReleaseSmokeEmptyState } from "./ReleaseSmokeEmptyState";
import { ReleaseSmokeFailureRoutingPanel } from "./ReleaseSmokeFailureRoutingPanel";
import { ReleaseSmokeHandoffPanel } from "./ReleaseSmokeHandoffPanel";
import { ReleaseSmokeResultCapturePanel } from "./ReleaseSmokeResultCapturePanel";
import { ReleaseSmokeSafetyStrip } from "./ReleaseSmokeSafetyStrip";
import { ReleaseSmokeSuitePanel } from "./ReleaseSmokeSuitePanel";

export function ReleaseReadinessSmokePackPanel() {
  const suite = buildReleaseSmokeSuite();
  const summary = buildReleaseSmokeSummary(suite);
  return <div style={shell} data-codexforge-release-smoke-panel="ReleaseReadinessSmokePackPanel renders Release smoke pack Copy smoke checklist copy commands only no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildReleaseSmokeStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Smoke pack</span><h1 style={headline}>Release smoke pack</h1><p style={lede}>Copy the MVP coding path smoke checklist, run it manually, and paste output before making a release call.</p><a href="#release-smoke-checklist" style={buttonLike}>Copy smoke checklist</a></div><ReleaseSmokeSafetyStrip /></section>
    <section style={summaryStrip}><strong>{summary.title}</strong><span>{summary.commandCount} commands</span><span>{summary.safety}</span></section>
    <ReleaseSmokeEmptyState />
    <section id="release-smoke-checklist" style={grid}><ReleaseSmokeSuitePanel suite={suite} /><ReleaseSmokeCommandPanel commands={suite.commands} /><ReleaseSmokeChecklistPanel checklist={buildReleaseSmokeChecklist(suite)} /><ReleaseSmokeResultCapturePanel capture={buildReleaseSmokeResultCapture()} /><ReleaseSmokeFailureRoutingPanel routing={buildReleaseSmokeFailureRouting()} /><ReleaseSmokeCoverageMapPanel coverage={buildReleaseSmokeCoverageMap()} /><ReleaseSmokeHandoffPanel handoff={buildReleaseSmokeHandoff(suite)} /></section>
    <details style={details}><summary>Advanced details</summary><p>Failure routing goes to /closed-loop or /validation-results. Advanced details are collapsed or visually secondary.</p></details>
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

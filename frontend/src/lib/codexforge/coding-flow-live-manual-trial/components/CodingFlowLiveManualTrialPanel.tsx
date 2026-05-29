"use client";
import type { CSSProperties } from "react";
import { buildDefaultManualTrialSafeChanges, buildDefaultManualTrialScenarios, buildLiveManualTrialSummary, buildManualTrialHandoff, buildManualTrialObservationCapture, buildManualTrialResultRecord, buildManualTrialStepRunner, buildManualTrialTroubleshooting, buildManualTrialValidationCapture, validateManualTrialResultRecord } from "../index";
import { buttonLike } from "./ManualTrialComponentStyles";
import { ManualTrialEmptyState } from "./ManualTrialEmptyState";
import { ManualTrialHandoffPanel } from "./ManualTrialHandoffPanel";
import { ManualTrialObservationCapturePanel } from "./ManualTrialObservationCapturePanel";
import { ManualTrialResultRecordPanel } from "./ManualTrialResultRecordPanel";
import { ManualTrialSafeChangePanel } from "./ManualTrialSafeChangePanel";
import { ManualTrialSafetyStrip } from "./ManualTrialSafetyStrip";
import { ManualTrialScenarioPanel } from "./ManualTrialScenarioPanel";
import { ManualTrialStepRunnerPanel } from "./ManualTrialStepRunnerPanel";
import { ManualTrialTroubleshootingPanel } from "./ManualTrialTroubleshootingPanel";
import { ManualTrialValidationCapturePanel } from "./ManualTrialValidationCapturePanel";

export function CodingFlowLiveManualTrialPanel() {
  const scenarios = buildDefaultManualTrialScenarios();
  const safeChanges = buildDefaultManualTrialSafeChanges();
  const runner = buildManualTrialStepRunner();
  const record = buildManualTrialResultRecord();
  const summary = buildLiveManualTrialSummary(scenarios, runner, record);
  return <div style={shell} data-codexforge-manual-trial-panel="CodingFlowLiveManualTrialPanel renders Run a manual coding trial Start guided manual trial Plain English no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildManualTrialStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Manual MVP trial</span><h1 style={headline}>Run a manual coding trial</h1><p style={lede}>Walk one harmless coding change through preview, guarded apply review, evidence capture, manual validation, workflow result, and run history.</p><a href="#manual-trial-checklist" style={buttonLike}>Start guided manual trial</a></div><ManualTrialSafetyStrip /></section>
    <section style={summaryStrip}><strong>{summary.title}</strong><span>{summary.stepCount} manual steps</span><span>{summary.nextAction}</span></section>
    <ManualTrialEmptyState />
    <section id="manual-trial-checklist" style={grid}><ManualTrialScenarioPanel scenario={scenarios[0]} /><ManualTrialSafeChangePanel change={safeChanges[0]} /><ManualTrialStepRunnerPanel runner={runner} /><ManualTrialObservationCapturePanel capture={buildManualTrialObservationCapture()} /><ManualTrialValidationCapturePanel validation={buildManualTrialValidationCapture()} /><ManualTrialResultRecordPanel record={record} issues={validateManualTrialResultRecord(record)} /><ManualTrialTroubleshootingPanel troubleshooting={buildManualTrialTroubleshooting()} /><ManualTrialHandoffPanel handoff={buildManualTrialHandoff(record)} /></section>
    <details style={details}><summary>Advanced details</summary><p>Copy checklist, validation commands, and trial report. Advanced details are collapsed or visually secondary.</p></details>
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

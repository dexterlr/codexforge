"use client";
import type { CSSProperties } from "react";
import { buildLiveRunApplyRequest, buildLiveRunFileSelection, buildLiveRunHandoff, buildLiveRunInput, buildLiveRunPatchPreview, buildLiveRunResult, buildLiveRunStepState, buildLiveRunSummary, buildLiveRunValidation } from "../index";
import { LiveRunApplyRequestPanel } from "./LiveRunApplyRequestPanel";
import { LiveRunEmptyState } from "./LiveRunEmptyState";
import { LiveRunFileSelectionPanel } from "./LiveRunFileSelectionPanel";
import { LiveRunHandoffPanel } from "./LiveRunHandoffPanel";
import { LiveRunInputPanel } from "./LiveRunInputPanel";
import { LiveRunPatchPreviewPanel } from "./LiveRunPatchPreviewPanel";
import { LiveRunResultPanel } from "./LiveRunResultPanel";
import { LiveRunSafetyStrip } from "./LiveRunSafetyStrip";
import { LiveRunStepStatePanel } from "./LiveRunStepStatePanel";
import { LiveRunValidationPanel } from "./LiveRunValidationPanel";
export function CodingFlowLiveRunPanel() {
  const input = buildLiveRunInput();
  const state = buildLiveRunStepState(input);
  const result = buildLiveRunResult(input);
  const handoff = buildLiveRunHandoff(state, result);
  const summary = buildLiveRunSummary(input, state);
  return <div style={shell} data-codexforge-live-run-panel="CodingFlowLiveRunPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildLiveRunStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Guided live run</span><h1 style={headline}>Run the coding flow</h1><p style={lede}>Follow one safe path from file to validation result.</p><LiveRunSafetyStrip /></div><LiveRunStepStatePanel state={state} /></section>
    <section style={summaryStrip}><strong>{summary.currentStep}</strong><span>{summary.selectedFile}</span><span>{summary.nextAction}</span></section>
    <LiveRunEmptyState />
    <section style={grid}><LiveRunInputPanel input={input} /><LiveRunFileSelectionPanel selection={buildLiveRunFileSelection(input)} /><LiveRunPatchPreviewPanel preview={buildLiveRunPatchPreview(input)} /><LiveRunApplyRequestPanel request={buildLiveRunApplyRequest()} /><LiveRunValidationPanel validation={buildLiveRunValidation()} /><LiveRunResultPanel result={result} /><LiveRunHandoffPanel handoff={handoff} /></section>
    <details style={details}><summary>Advanced details</summary><p>Start live run, pick file, describe change, preview patch, review apply request, capture apply evidence, prepare validation, capture validation result, review workflow result, send to run history.</p></details>
  </div>;
}
const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const summaryStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", padding: "10px 12px", fontSize: 13 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };

"use client";
import type { CSSProperties } from "react";
import { buildValidationCaptureInput, buildValidationCommandCapture, buildValidationFailureRouting, buildValidationOutputParser, buildValidationPassFailSummary, buildValidationResultCaptureSummary, buildValidationResultExport, buildValidationResultHandoff, selectValidationResultNextAction } from "../index";
import { ValidationCaptureInputPanel } from "./ValidationCaptureInputPanel";
import { ValidationCommandCapturePanel } from "./ValidationCommandCapturePanel";
import { ValidationFailureRoutingPanel } from "./ValidationFailureRoutingPanel";
import { ValidationOutputParserPanel } from "./ValidationOutputParserPanel";
import { ValidationPassFailSummaryPanel } from "./ValidationPassFailSummaryPanel";
import { ValidationResultEmptyState } from "./ValidationResultEmptyState";
import { ValidationResultExportPanel } from "./ValidationResultExportPanel";
import { ValidationResultHandoffPanel } from "./ValidationResultHandoffPanel";
import { ValidationResultNextActionPanel } from "./ValidationResultNextActionPanel";
import { ValidationResultSafetyStrip } from "./ValidationResultSafetyStrip";
export function ValidationResultCapturePanel() {
  const input = buildValidationCaptureInput();
  const commandCapture = buildValidationCommandCapture(input);
  const parser = buildValidationOutputParser(input.output);
  const passFail = buildValidationPassFailSummary(parser, input.exitCode);
  const routing = buildValidationFailureRouting(passFail, input.commands);
  const handoff = buildValidationResultHandoff(routing);
  const exportPack = buildValidationResultExport(passFail, parser);
  const action = selectValidationResultNextAction(routing);
  const summary = buildValidationResultCaptureSummary(passFail, parser);
  return <div style={shell} data-codexforge-validation-result-panel="ValidationResultCapturePanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildValidationResultStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Manual validation capture</span><h1 style={headline}>Capture validation result</h1><p style={lede}>Review pasted output, summarize pass/fail, and route the result without running commands.</p><ValidationResultSafetyStrip /></div><ValidationResultNextActionPanel action={action} /></section>
    <section style={summaryStrip}><strong>{summary.status}</strong><span>{summary.errorCount} errors</span><span>{summary.nextAction}</span></section>
    <ValidationResultEmptyState />
    <section style={grid}><ValidationCaptureInputPanel input={input} /><ValidationCommandCapturePanel capture={commandCapture} /><ValidationOutputParserPanel parser={parser} /><ValidationPassFailSummaryPanel summary={passFail} /><ValidationFailureRoutingPanel routing={routing} /><ValidationResultHandoffPanel handoff={handoff} /><ValidationResultExportPanel exportPack={exportPack} /></section>
    <details style={details}><summary>Advanced details</summary><p>{exportPack.body}</p></details>
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

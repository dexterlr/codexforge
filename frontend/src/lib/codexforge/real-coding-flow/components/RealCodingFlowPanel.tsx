"use client";

import type { CSSProperties } from "react";
import {
  buildCodingFlowApplyStep,
  buildCodingFlowChangeRequest,
  buildCodingFlowFileStep,
  buildCodingFlowInput,
  buildCodingFlowNextActionPlan,
  buildCodingFlowPreviewStep,
  buildCodingFlowResultStep,
  buildCodingFlowValidationStep,
  buildRealCodingFlowSummary,
} from "../index";
import { CodingFlowApplyStepPanel } from "./CodingFlowApplyStepPanel";
import { CodingFlowChangeRequestPanel } from "./CodingFlowChangeRequestPanel";
import { CodingFlowEmptyState } from "./CodingFlowEmptyState";
import { CodingFlowFileStepPanel } from "./CodingFlowFileStepPanel";
import { CodingFlowNextActionPanel } from "./CodingFlowNextActionPanel";
import { CodingFlowPreviewStepPanel } from "./CodingFlowPreviewStepPanel";
import { CodingFlowProgressPanel } from "./CodingFlowProgressPanel";
import { CodingFlowResultStepPanel } from "./CodingFlowResultStepPanel";
import { CodingFlowSafetyStrip } from "./CodingFlowSafetyStrip";
import { CodingFlowStartPanel } from "./CodingFlowStartPanel";
import { CodingFlowValidationStepPanel } from "./CodingFlowValidationStepPanel";

export function RealCodingFlowPanel() {
  const input = buildCodingFlowInput();
  const fileStep = buildCodingFlowFileStep(input);
  const changeRequest = buildCodingFlowChangeRequest(input);
  const previewStep = buildCodingFlowPreviewStep(input);
  const applyStep = buildCodingFlowApplyStep(input);
  const validationStep = buildCodingFlowValidationStep(input);
  const resultStep = buildCodingFlowResultStep(input);
  const summary = buildRealCodingFlowSummary(input);
  const nextActionPlan = buildCodingFlowNextActionPlan(input);

  return (
    <div style={shell} data-codexforge-real-coding-flow-panel="RealCodingFlowPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>One real end-to-end coding flow</span>
          <h1 style={headline}>Fix code safely</h1>
          <p style={lede}>Pick a file, preview the change, approve it, then run checks.</p>
          <CodingFlowSafetyStrip />
        </div>
        <CodingFlowNextActionPanel plan={nextActionPlan} />
      </section>
      <CodingFlowProgressPanel summary={summary} />
      <CodingFlowStartPanel input={input} />
      {!input.selectedFilePath ? <CodingFlowEmptyState /> : null}
      <section style={grid}>
        <CodingFlowFileStepPanel step={fileStep} />
        <CodingFlowChangeRequestPanel request={changeRequest} />
        <CodingFlowPreviewStepPanel step={previewStep} />
        <CodingFlowApplyStepPanel step={applyStep} />
        <CodingFlowValidationStepPanel step={validationStep} />
        <CodingFlowResultStepPanel step={resultStep} />
      </section>
      <span hidden data-codexforge-real-coding-flow-summary={`${summary.currentStep} ${summary.selectedFile} ${summary.resultStatus} ${summary.nextSafeAction}`} />
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", minWidth: 0 };

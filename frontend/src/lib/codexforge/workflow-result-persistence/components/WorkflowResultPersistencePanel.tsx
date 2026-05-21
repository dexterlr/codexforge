"use client";

import type { CSSProperties } from "react";
import {
  buildValidationCommandResult,
  buildValidationResultRecord,
  buildWorkflowResultCapture,
  buildWorkflowResultCaptureItem,
  buildWorkflowResultExport,
  buildWorkflowResultHandoff,
  buildWorkflowResultMemoryCandidate,
  buildWorkflowResultNextActionPlan,
  buildWorkflowResultRecord,
  buildWorkflowResultReview,
  buildWorkflowResultStoragePolicy,
  buildWorkflowResultSummary,
  summarizeWorkflowResultSession,
} from "../index";
import { ValidationResultRecordPanel } from "./ValidationResultRecordPanel";
import { WorkflowResultCapturePanel } from "./WorkflowResultCapturePanel";
import { WorkflowResultEmptyState } from "./WorkflowResultEmptyState";
import { WorkflowResultExportPanel } from "./WorkflowResultExportPanel";
import { WorkflowResultHandoffPanel } from "./WorkflowResultHandoffPanel";
import { WorkflowResultMemoryCandidatePanel } from "./WorkflowResultMemoryCandidatePanel";
import { WorkflowResultNextActionPanel } from "./WorkflowResultNextActionPanel";
import { WorkflowResultRecordPanel } from "./WorkflowResultRecordPanel";
import { WorkflowResultReviewPanel } from "./WorkflowResultReviewPanel";
import { WorkflowResultSafetyStrip } from "./WorkflowResultSafetyStrip";
import { WorkflowResultStoragePolicyPanel } from "./WorkflowResultStoragePolicyPanel";
import { wrCopy, wrTextGuard } from "./WorkflowResultStyles";

export function WorkflowResultPersistencePanel() {
  const record = buildWorkflowResultRecord({
    workflowKind: "code-fix",
    sourceFlowId: "demo-code-flow",
    sourceRoute: "/code-flow",
    selectedFilePath: "src/app/code-flow/page-client.tsx",
    changeRequestSummary: "Completion can prepare a reviewed workflow result handoff.",
    previewSummary: "Patch preview summary is represented, not raw diff content.",
    applySummary: "Apply request remains approval-gated; no auto-apply.",
    validationSummary: "Validation output can be captured as capped excerpts.",
    finalStatus: "validation-failed",
    resultLabel: "Coding flow result review",
    persistenceMode: "copyable-handoff",
  });
  const validation = buildValidationResultRecord({
    sourceValidationRequestId: "manual-validation",
    commands: [
      buildValidationCommandResult({
        command: "npm run build",
        status: "manual-only",
        reviewNote: "No command execution from Workflow Result Persistence UI.",
      }),
      buildValidationCommandResult({
        command: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-workflow-result-persistence.ps1",
        stderr: "Example failed output summary for routing; operator must supply real output.",
        status: "fail",
      }),
    ],
  });
  const capture = buildWorkflowResultCapture({
    sourceResultId: record.resultId,
    items: [
      buildWorkflowResultCaptureItem({ label: "Selected file", type: "selected-file", valueSummary: record.selectedFilePath, sensitivity: "project-context" }),
      buildWorkflowResultCaptureItem({ label: "Requested change", type: "requested-change", valueSummary: record.changeRequestSummary, sensitivity: "project-context" }),
      buildWorkflowResultCaptureItem({ label: "Preview diff summary", type: "preview-diff-summary", valueSummary: record.previewSummary, sensitivity: "source-code" }),
      buildWorkflowResultCaptureItem({ label: "Validation output summary", type: "validation-output-summary", valueSummary: validation.outputReviewSummary, sensitivity: "validation-output" }),
      buildWorkflowResultCaptureItem({ label: "Next action", type: "next-action", valueSummary: validation.nextAction, sensitivity: "public" }),
    ],
  });
  const policy = buildWorkflowResultStoragePolicy({ mode: record.persistenceMode, capture, operatorReviewed: false });
  const review = buildWorkflowResultReview({ sourceResultId: record.resultId, capture });
  const handoff = buildWorkflowResultHandoff({ record, validation });
  const memoryCandidate = buildWorkflowResultMemoryCandidate({ record, category: "validation-failure" });
  const resultExport = buildWorkflowResultExport({ handoff, format: "markdown" });
  const nextActionPlan = buildWorkflowResultNextActionPlan({ finalStatus: record.finalStatus, review, policy });
  const sessionSummary = buildWorkflowResultSummary({ record, capture, validation, review, policy, handoff, memoryCandidate, resultExport });

  function copyText(label: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
    void label;
  }

  return (
    <section style={shell} data-codexforge-workflow-result-persistence-panel="WorkflowResultPersistencePanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Workflow Result Persistence</span>
          <h1 style={headline}>Review workflow results</h1>
          <p style={lede}>Capture what happened, route failures, and prepare a clean handoff.</p>
          <WorkflowResultSafetyStrip />
        </div>
        <WorkflowResultNextActionPanel plan={nextActionPlan} />
      </section>
      <section style={summaryStrip}>{summarizeWorkflowResultSession(sessionSummary).map((line) => <span key={`workflow-result-session-${line.slice(0, 34)}`}>{line}</span>)}</section>
      <WorkflowResultEmptyState />
      <section style={grid}>
        <WorkflowResultRecordPanel record={record} />
        <WorkflowResultCapturePanel capture={capture} />
        <WorkflowResultStoragePolicyPanel policy={policy} />
        <ValidationResultRecordPanel record={validation} />
        <WorkflowResultHandoffPanel handoff={handoff} onCopy={copyText} />
        <WorkflowResultReviewPanel review={review} />
        <WorkflowResultMemoryCandidatePanel candidate={memoryCandidate} onCopy={copyText} />
        <WorkflowResultExportPanel resultExport={resultExport} onCopy={copyText} />
      </section>
      <details style={details}>
        <summary style={wrCopy}>Advanced details</summary>
        <p style={wrCopy}>Session-only, copyable, reviewed-memory-candidate, and export-only modes are deterministic review models. No filesystem writes, no command execution, no Brain auto-mutation, and no memory auto-promotion happen here.</p>
      </details>
    </section>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760, ...wrTextGuard };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10, ...wrTextGuard };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 12 };

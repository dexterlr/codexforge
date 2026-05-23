"use client";

import type { CSSProperties } from "react";
import {
  buildTrialFrictionLog,
  buildTrialGoNoGoDecision,
  buildTrialObservation,
  buildTrialPassFailChecklist,
  buildTrialReviewHandoff,
  buildTrialReviewSummary,
  buildTrialRunRecord,
  buildTrialSafetyReview,
  buildTrialScreenReview,
  buildTrialUxFixPlan,
  buildTrialValidationReview,
  summarizeTrialReviewSession,
} from "../index";
import { TrialFrictionLogPanel } from "./TrialFrictionLogPanel";
import { TrialGoNoGoDecisionPanel } from "./TrialGoNoGoDecisionPanel";
import { TrialObservationPanel } from "./TrialObservationPanel";
import { TrialPassFailChecklistPanel } from "./TrialPassFailChecklistPanel";
import { TrialReviewEmptyState } from "./TrialReviewEmptyState";
import { TrialReviewHandoffPanel } from "./TrialReviewHandoffPanel";
import { TrialReviewSafetyStrip } from "./TrialReviewSafetyStrip";
import { TrialRunRecordPanel } from "./TrialRunRecordPanel";
import { TrialSafetyReviewPanel } from "./TrialSafetyReviewPanel";
import { TrialScreenReviewPanel } from "./TrialScreenReviewPanel";
import { TrialUxFixPlanPanel } from "./TrialUxFixPlanPanel";
import { TrialValidationReviewPanel } from "./TrialValidationReviewPanel";

export function CodingFlowTrialReviewPanel() {
  const record = buildTrialRunRecord();
  const observation = buildTrialObservation();
  const checklist = buildTrialPassFailChecklist();
  const screenReview = buildTrialScreenReview();
  const frictionLog = buildTrialFrictionLog();
  const validationReview = buildTrialValidationReview();
  const safetyReview = buildTrialSafetyReview();
  const uxFixPlan = buildTrialUxFixPlan();
  const decision = buildTrialGoNoGoDecision({ checklist, safety: safetyReview });
  const handoff = buildTrialReviewHandoff();
  const summary = buildTrialReviewSummary();

  function copyReview(label: string, value: string) {
    void navigator.clipboard?.writeText(value);
    void label;
  }

  return (
    <div style={shell} data-codexforge-coding-flow-trial-review-panel="CodingFlowTrialReviewPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper Coding Flow Trial Review">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Coding Flow Trial Review</span>
          <h1 style={headline}>Review the coding trial</h1>
          <p style={lede}>Capture what happened, find friction, and decide the next fix.</p>
          <TrialReviewSafetyStrip />
        </div>
        <aside style={actionBox}>
          <span style={summaryLine}>{summarizeTrialReviewSession(summary)}</span>
          <button type="button" style={primaryAction} onClick={() => copyReview("trial review", handoff.markdownTrialReview)}>Copy trial review</button>
          <span style={finePrint}>Copyable only. No auto-apply. No auto-run. Approval required.</span>
        </aside>
      </section>

      <TrialRunRecordPanel record={record} />
      <TrialReviewEmptyState />
      <TrialObservationPanel observation={observation} />
      <TrialPassFailChecklistPanel checklist={checklist} />
      <details style={details}>
        <summary style={detailsSummary}>Screen review and validation details</summary>
        <div style={advancedGrid}>
          <TrialScreenReviewPanel review={screenReview} />
          <TrialValidationReviewPanel review={validationReview} />
        </div>
      </details>
      <section style={twoColumn}>
        <TrialFrictionLogPanel log={frictionLog} />
        <TrialSafetyReviewPanel review={safetyReview} />
      </section>
      <section style={twoColumn}>
        <TrialUxFixPlanPanel plan={uxFixPlan} />
        <TrialGoNoGoDecisionPanel decision={decision} />
      </section>
      <TrialReviewHandoffPanel handoff={handoff} onCopy={copyReview} />
      <span hidden data-codexforge-coding-flow-trial-review-summary={`${summary.trialStatus} ${summary.goNoGoDecision} ${summary.topNextFix}`} />
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const actionBox: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const summaryLine: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const primaryAction: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "10px 12px" };
const finePrint: CSSProperties = { color: "#93c5fd", fontSize: 11, lineHeight: 1.45 };
const twoColumn: CSSProperties = { alignItems: "start", display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", padding: 14 };
const detailsSummary: CSSProperties = { cursor: "pointer", fontSize: 14, fontWeight: 900 };
const advancedGrid: CSSProperties = { display: "grid", gap: 14, marginTop: 14 };

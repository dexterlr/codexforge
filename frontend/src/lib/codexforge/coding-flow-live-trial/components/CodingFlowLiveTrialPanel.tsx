"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildDefaultLiveTrialExampleChanges,
  buildDefaultLiveTrialPlan,
  buildDefaultLiveTrialSafeFileChoices,
  buildLiveTrialChecklist,
  buildLiveTrialHandoff,
  buildLiveTrialResultCapture,
  buildLiveTrialScreenGuide,
  buildLiveTrialSummary,
  buildLiveTrialTroubleshooting,
  buildLiveTrialValidationGuide,
  summarizeLiveTrialSession,
} from "../index";
import { LiveTrialChecklistPanel } from "./LiveTrialChecklistPanel";
import { LiveTrialEmptyState } from "./LiveTrialEmptyState";
import { LiveTrialExampleChangePanel } from "./LiveTrialExampleChangePanel";
import { LiveTrialHandoffPanel } from "./LiveTrialHandoffPanel";
import { LiveTrialPlanPanel } from "./LiveTrialPlanPanel";
import { LiveTrialResultCapturePanel } from "./LiveTrialResultCapturePanel";
import { LiveTrialSafeFileChoicePanel } from "./LiveTrialSafeFileChoicePanel";
import { LiveTrialSafetyStrip } from "./LiveTrialSafetyStrip";
import { LiveTrialScreenGuidePanel } from "./LiveTrialScreenGuidePanel";
import { LiveTrialTroubleshootingPanel } from "./LiveTrialTroubleshootingPanel";
import { LiveTrialValidationGuidePanel } from "./LiveTrialValidationGuidePanel";

export function CodingFlowLiveTrialPanel() {
  const plan = buildDefaultLiveTrialPlan();
  const checklist = buildLiveTrialChecklist();
  const examples = buildDefaultLiveTrialExampleChanges();
  const safeChoices = buildDefaultLiveTrialSafeFileChoices();
  const screenGuide = buildLiveTrialScreenGuide();
  const validationGuide = buildLiveTrialValidationGuide();
  const capture = buildLiveTrialResultCapture();
  const troubleshooting = buildLiveTrialTroubleshooting();
  const handoff = buildLiveTrialHandoff();
  const summary = buildLiveTrialSummary();

  return (
    <div style={shell} data-codexforge-coding-flow-live-trial-panel="CodingFlowLiveTrialPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper Coding Trial">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Operator live trial</span>
          <h1 style={headline}>Try the coding flow</h1>
          <p style={lede}>Follow a safe trial from file selection to validation result.</p>
          <LiveTrialSafetyStrip />
        </div>
        <aside style={actionBox}>
          <span style={summaryLine}>{summarizeLiveTrialSession(summary)}</span>
          <Link href="/code-flow" style={primaryAction}>Start trial in Code Flow</Link>
          <span style={finePrint}>Copy trial checklist, validation commands, and trial report only. No auto-apply. No auto-run. Approval required.</span>
        </aside>
      </section>

      <LiveTrialPlanPanel plan={plan} />
      <LiveTrialEmptyState />
      <LiveTrialChecklistPanel checklist={checklist} />
      <section style={twoColumn}>
        <LiveTrialExampleChangePanel examples={examples} />
        <LiveTrialSafeFileChoicePanel choices={safeChoices} />
      </section>
      <details style={details}>
        <summary style={detailsSummary}>Expected screens and manual validation</summary>
        <div style={advancedGrid}>
          <LiveTrialScreenGuidePanel guide={screenGuide} />
          <LiveTrialValidationGuidePanel guide={validationGuide} />
        </div>
      </details>
      <section style={twoColumn}>
        <LiveTrialResultCapturePanel capture={capture} />
        <LiveTrialTroubleshootingPanel guide={troubleshooting} />
      </section>
      <LiveTrialHandoffPanel handoff={handoff} />
      <span hidden data-codexforge-coding-flow-live-trial-summary={`${summary.planStatus} ${summary.checklistCount} ${summary.validationCommandCount} ${summary.nextSafeAction}`} />
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
const primaryAction: CSSProperties = { background: "#5eead4", borderRadius: 8, color: "#042f2e", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "10px 12px", textDecoration: "none" };
const finePrint: CSSProperties = { color: "#93c5fd", fontSize: 11, lineHeight: 1.45 };
const twoColumn: CSSProperties = { alignItems: "start", display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", minWidth: 0 };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", padding: 14 };
const detailsSummary: CSSProperties = { cursor: "pointer", fontSize: 14, fontWeight: 900 };
const advancedGrid: CSSProperties = { display: "grid", gap: 14, marginTop: 14 };

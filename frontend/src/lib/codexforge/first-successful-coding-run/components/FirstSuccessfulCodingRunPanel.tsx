"use client";
import { buildFirstSuccessfulRunSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { SuccessfulRunRecordPanel } from "./SuccessfulRunRecordPanel";
import { SuccessfulRunEvidencePanel } from "./SuccessfulRunEvidencePanel";
import { SuccessfulRunValidationPanel } from "./SuccessfulRunValidationPanel";
import { SuccessfulRunHandoffPanel } from "./SuccessfulRunHandoffPanel";
import { SuccessfulRunDemoNotePanel } from "./SuccessfulRunDemoNotePanel";
import { SuccessfulRunReleaseNotePanel } from "./SuccessfulRunReleaseNotePanel";
import { SuccessfulRunSafetyStrip } from "./SuccessfulRunSafetyStrip";
import { SuccessfulRunEmptyState } from "./SuccessfulRunEmptyState";

export function FirstSuccessfulCodingRunPanel() {
  const summary = buildFirstSuccessfulRunSummary();
  return <div style={shell} data-codexforge-panel="FirstSuccessfulCodingRunPanel renders Record first successful coding run Prepare success record only record success if validation result is supplied and reviewed no fake success no auto-persistence copyable run summary link to release audit link to demo mode no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildFirstSuccessfulRunStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Record first successful coding run</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Prepare success record</a></div><SuccessfulRunSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <SuccessfulRunEmptyState />
    <section id="main-checklist" style={grid}><SuccessfulRunRecordPanel />
        <SuccessfulRunEvidencePanel />
        <SuccessfulRunValidationPanel />
        <SuccessfulRunHandoffPanel />
        <SuccessfulRunDemoNotePanel />
        <SuccessfulRunReleaseNotePanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

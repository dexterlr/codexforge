"use client";
import { buildValidationCaptureHardeningSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { ValidationPasteGuidePanel } from "./ValidationPasteGuidePanel";
import { ValidationOutputSummarizerPanel } from "./ValidationOutputSummarizerPanel";
import { ValidationFailureClassifierPanel } from "./ValidationFailureClassifierPanel";
import { ValidationNextRoutePanel } from "./ValidationNextRoutePanel";
import { ValidationHandoffHardeningPanel } from "./ValidationHandoffHardeningPanel";
import { ValidationCopyGuidancePanel } from "./ValidationCopyGuidancePanel";
import { ValidationCaptureHardeningSafetyStrip } from "./ValidationCaptureHardeningSafetyStrip";
import { ValidationCaptureHardeningEmptyState } from "./ValidationCaptureHardeningEmptyState";

export function ValidationCaptureHardeningPanel() {
  const summary = buildValidationCaptureHardeningSummary();
  return <div style={shell} data-codexforge-panel="ValidationCaptureHardeningPanel renders Harden validation capture Review validation handoff Paste validation output to review it copy commands only passed / failed / unknown failures route to /closed-loop pass routes to /workflow-results and /run-history no fake pass no auto-run preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildValidationCaptureHardeningStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Harden validation capture</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Review validation handoff</a></div><ValidationCaptureHardeningSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <ValidationCaptureHardeningEmptyState />
    <section id="main-checklist" style={grid}><ValidationPasteGuidePanel />
        <ValidationOutputSummarizerPanel />
        <ValidationFailureClassifierPanel />
        <ValidationNextRoutePanel />
        <ValidationHandoffHardeningPanel />
        <ValidationCopyGuidancePanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

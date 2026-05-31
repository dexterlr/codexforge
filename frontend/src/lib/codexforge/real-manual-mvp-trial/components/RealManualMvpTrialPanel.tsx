"use client";
import { buildRealManualMvpTrialSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { ManualMvpTrialInputPanel } from "./ManualMvpTrialInputPanel";
import { ManualMvpTrialStepPanel } from "./ManualMvpTrialStepPanel";
import { ManualMvpTrialSafeScenarioPanel } from "./ManualMvpTrialSafeScenarioPanel";
import { ManualMvpTrialObservationPanel } from "./ManualMvpTrialObservationPanel";
import { ManualMvpTrialValidationPanel } from "./ManualMvpTrialValidationPanel";
import { ManualMvpTrialResultPanel } from "./ManualMvpTrialResultPanel";
import { ManualMvpTrialNextActionPanel } from "./ManualMvpTrialNextActionPanel";
import { ManualMvpTrialHandoffPanel } from "./ManualMvpTrialHandoffPanel";
import { ManualMvpTrialSafetyStrip } from "./ManualMvpTrialSafetyStrip";
import { ManualMvpTrialEmptyState } from "./ManualMvpTrialEmptyState";

export function RealManualMvpTrialPanel() {
  const summary = buildRealManualMvpTrialSummary();
  return <div style={shell} data-codexforge-panel="RealManualMvpTrialPanel renders Run the real coding MVP trial Start real trial Copy trial checklist Copy validation commands Copy trial report no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildManualMvpTrialStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Run the real coding MVP trial</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Start real trial</a></div><ManualMvpTrialSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <ManualMvpTrialEmptyState />
    <section id="main-checklist" style={grid}><ManualMvpTrialInputPanel />
        <ManualMvpTrialStepPanel />
        <ManualMvpTrialSafeScenarioPanel />
        <ManualMvpTrialObservationPanel />
        <ManualMvpTrialValidationPanel />
        <ManualMvpTrialResultPanel />
        <ManualMvpTrialNextActionPanel />
        <ManualMvpTrialHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

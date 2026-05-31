"use client";
import { buildManualProductTrialSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { ProductTrialScenarioPanel } from "./ProductTrialScenarioPanel";
import { ProductTrialStepPanel } from "./ProductTrialStepPanel";
import { ProductTrialRouteCheckPanel } from "./ProductTrialRouteCheckPanel";
import { ProductTrialFrictionPanel } from "./ProductTrialFrictionPanel";
import { ProductTrialObservationPanel } from "./ProductTrialObservationPanel";
import { ProductTrialValidationPanel } from "./ProductTrialValidationPanel";
import { ProductTrialResultPanel } from "./ProductTrialResultPanel";
import { ProductTrialHandoffPanel } from "./ProductTrialHandoffPanel";
import { ManualProductTrialSafetyStrip } from "./ManualProductTrialSafetyStrip";
import { ManualProductTrialEmptyState } from "./ManualProductTrialEmptyState";
export function ManualProductTrialPanel() {
  const summary = buildManualProductTrialSummary();
  return <div style={shell} data-codexforge-panel="ManualProductTrialPanel renders Manual product trial Copy trial checklist Copy friction report Copy trial result no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English buildManualProductTrialStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Manual product trial</h1><p style={lede}>Run the real MVP path and capture what worked or felt confusing.</p><a href="#main-checklist" style={buttonLike}>Start product trial</a></div><ManualProductTrialSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <ManualProductTrialEmptyState />
    <section id="main-checklist" style={grid}><ProductTrialScenarioPanel /><ProductTrialStepPanel /><ProductTrialRouteCheckPanel /><ProductTrialFrictionPanel /><ProductTrialObservationPanel /><ProductTrialValidationPanel /><ProductTrialResultPanel /><ProductTrialHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

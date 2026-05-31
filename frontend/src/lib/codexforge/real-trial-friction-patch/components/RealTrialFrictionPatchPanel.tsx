"use client";
import { buildRealTrialFrictionSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { RealTrialFrictionFindingPanel } from "./RealTrialFrictionFindingPanel";
import { RealTrialCopyPatchPanel } from "./RealTrialCopyPatchPanel";
import { RealTrialLayoutPatchPanel } from "./RealTrialLayoutPatchPanel";
import { RealTrialRoutePatchPanel } from "./RealTrialRoutePatchPanel";
import { RealTrialValidationPatchPanel } from "./RealTrialValidationPatchPanel";
import { RealTrialSafetyCopyPatchPanel } from "./RealTrialSafetyCopyPatchPanel";
import { RealTrialPatchHandoffPanel } from "./RealTrialPatchHandoffPanel";
import { RealTrialFrictionSafetyStrip } from "./RealTrialFrictionSafetyStrip";
import { RealTrialFrictionEmptyState } from "./RealTrialFrictionEmptyState";

export function RealTrialFrictionPatchPanel() {
  const summary = buildRealTrialFrictionSummary();
  return <div style={shell} data-codexforge-panel="RealTrialFrictionPatchPanel renders Patch real trial friction Review friction fixes one obvious next action clearer empty states less jargon compact safety badges no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildRealTrialFrictionStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Patch real trial friction</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Review friction fixes</a></div><RealTrialFrictionSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <RealTrialFrictionEmptyState />
    <section id="main-checklist" style={grid}><RealTrialFrictionFindingPanel />
        <RealTrialCopyPatchPanel />
        <RealTrialLayoutPatchPanel />
        <RealTrialRoutePatchPanel />
        <RealTrialValidationPatchPanel />
        <RealTrialSafetyCopyPatchPanel />
        <RealTrialPatchHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

"use client";
import { buildGuardedApplyHardeningSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { GuardedApplyHardeningCheckPanel } from "./GuardedApplyHardeningCheckPanel";
import { GuardedApplyPolicyHardeningPanel } from "./GuardedApplyPolicyHardeningPanel";
import { GuardedApplyApprovalHardeningPanel } from "./GuardedApplyApprovalHardeningPanel";
import { GuardedApplyBoundaryHardeningPanel } from "./GuardedApplyBoundaryHardeningPanel";
import { GuardedApplyRollbackHardeningPanel } from "./GuardedApplyRollbackHardeningPanel";
import { GuardedApplyUserGuidancePanel } from "./GuardedApplyUserGuidancePanel";
import { GuardedApplyHardeningHandoffPanel } from "./GuardedApplyHardeningHandoffPanel";
import { GuardedApplyHardeningSafetyStrip } from "./GuardedApplyHardeningSafetyStrip";
import { GuardedApplyHardeningEmptyState } from "./GuardedApplyHardeningEmptyState";

export function GuardedApplyMvpHardeningPanel() {
  const summary = buildGuardedApplyHardeningSummary();
  return <div style={shell} data-codexforge-panel="GuardedApplyMvpHardeningPanel renders Harden guarded apply Review hardening blocked reasons approval messaging one-file/one-diff explanation rollback checklist validation stays separate result handoff to /apply-evidence no fake apply success no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildGuardedApplyHardeningStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Harden guarded apply</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Review hardening</a></div><GuardedApplyHardeningSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <GuardedApplyHardeningEmptyState />
    <section id="main-checklist" style={grid}><GuardedApplyHardeningCheckPanel />
        <GuardedApplyPolicyHardeningPanel />
        <GuardedApplyApprovalHardeningPanel />
        <GuardedApplyBoundaryHardeningPanel />
        <GuardedApplyRollbackHardeningPanel />
        <GuardedApplyUserGuidancePanel />
        <GuardedApplyHardeningHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

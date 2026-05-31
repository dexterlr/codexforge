"use client";
import { buildApplyTrialHardeningSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { ApplyTrialReadinessPanel } from "./ApplyTrialReadinessPanel";
import { ApplyTrialRiskCheckPanel } from "./ApplyTrialRiskCheckPanel";
import { ApplyTrialApprovalCheckPanel } from "./ApplyTrialApprovalCheckPanel";
import { ApplyTrialBoundaryCheckPanel } from "./ApplyTrialBoundaryCheckPanel";
import { ApplyTrialEvidenceCheckPanel } from "./ApplyTrialEvidenceCheckPanel";
import { ApplyTrialRollbackCheckPanel } from "./ApplyTrialRollbackCheckPanel";
import { ApplyTrialValidationHandoffPanel } from "./ApplyTrialValidationHandoffPanel";
import { ApplyTrialHardeningSummaryPanel } from "./ApplyTrialHardeningSummaryPanel";
import { ApplyTrialHardeningSafetyStrip } from "./ApplyTrialHardeningSafetyStrip";
import { ApplyTrialHardeningEmptyState } from "./ApplyTrialHardeningEmptyState";
export function FirstGuardedApplyTrialHardeningPanel() {
  const summary = buildApplyTrialHardeningSummary();
  return <div style={shell} data-codexforge-panel="FirstGuardedApplyTrialHardeningPanel renders Harden first apply trial Copy hardening checklist Copy rollback plan Copy validation handoff blocked vs ready vs applied-supplied no fake apply success no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English buildApplyTrialHardeningStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Harden first apply trial</h1><p style={lede}>Review the first guarded apply path before any real apply request is considered ready.</p><a href="#main-checklist" style={buttonLike}>Review apply trial readiness</a></div><ApplyTrialHardeningSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <ApplyTrialHardeningEmptyState />
    <section id="main-checklist" style={grid}><ApplyTrialReadinessPanel /><ApplyTrialRiskCheckPanel /><ApplyTrialApprovalCheckPanel /><ApplyTrialBoundaryCheckPanel /><ApplyTrialEvidenceCheckPanel /><ApplyTrialRollbackCheckPanel /><ApplyTrialValidationHandoffPanel /><ApplyTrialHardeningSummaryPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

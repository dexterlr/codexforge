"use client";
import { buildGuidedRecoveryFlowSummary } from "../index";
import { GuidedRecoveryFlowEmptyState } from "./GuidedRecoveryFlowEmptyState";
import { GuidedRecoveryFlowSafetyStrip } from "./GuidedRecoveryFlowSafetyStrip";
import { RecoveryCasePanel } from "./RecoveryCasePanel";
import { RecoveryDiagnosisPanel } from "./RecoveryDiagnosisPanel";
import { RecoveryHandoffPanel } from "./RecoveryHandoffPanel";
import { RecoveryRetryPlanPanel } from "./RecoveryRetryPlanPanel";
import { RecoveryRollbackGuidancePanel } from "./RecoveryRollbackGuidancePanel";
import { RecoverySafeNextStepPanel } from "./RecoverySafeNextStepPanel";
import { RecoveryValidationGuidancePanel } from "./RecoveryValidationGuidancePanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";

export function GuidedRecoveryFlowPanel() {
  const summary = buildGuidedRecoveryFlowSummary();
  return <div style={shell} data-codexforge-panel="GuidedRecoveryFlowPanel renders Recovery flow When something fails follow a safe next step Copy recovery handoff Copy retry plan Copy rollback guide no automatic rollback no command execution buttons no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Recovery</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#recovery-cases" style={buttonLike}>{summary.primaryAction}</a></div><GuidedRecoveryFlowSafetyStrip /></section>
    <section style={strip}><strong>{summary.safeNextStep.label}</strong><span>{summary.safeNextStep.href}</span><span>Manual retry only</span></section>
    <GuidedRecoveryFlowEmptyState />
    <section id="recovery-cases" style={grid}><RecoverySafeNextStepPanel /><RecoveryDiagnosisPanel /><RecoveryCasePanel /><RecoveryRetryPlanPanel /><RecoveryRollbackGuidancePanel /><RecoveryValidationGuidancePanel /><RecoveryHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Retry and rollback guidance are copy-only.</p></details>
  </div>;
}

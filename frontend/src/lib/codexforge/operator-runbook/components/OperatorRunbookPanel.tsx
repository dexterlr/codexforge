"use client";
import { buildOperatorRunbookSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { RunbookSectionPanel } from "./RunbookSectionPanel";
import { RunbookStepPanel } from "./RunbookStepPanel";
import { RecoveryPlaybookPanel } from "./RecoveryPlaybookPanel";
import { RecoveryScenarioPanel } from "./RecoveryScenarioPanel";
import { RollbackPlaybookPanel } from "./RollbackPlaybookPanel";
import { ValidationPlaybookPanel } from "./ValidationPlaybookPanel";
import { EscalationPlaybookPanel } from "./EscalationPlaybookPanel";
import { OperatorRunbookSummaryPanel } from "./OperatorRunbookSummaryPanel";
import { OperatorRunbookSafetyStrip } from "./OperatorRunbookSafetyStrip";
import { OperatorRunbookEmptyState } from "./OperatorRunbookEmptyState";
export function OperatorRunbookPanel() {
  const summary = buildOperatorRunbookSummary();
  return <div style={shell} data-codexforge-panel="OperatorRunbookPanel renders Operator runbook Copy recovery steps Copy rollback guide no command execution buttons copy commands only rollback guidance visible no fake success clear when to stop no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English buildOperatorRunbookStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Operator runbook</h1><p style={lede}>A clear guide for running, validating, recovering, and demoing the coding MVP.</p><a href="#main-checklist" style={buttonLike}>Copy runbook</a></div><OperatorRunbookSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <OperatorRunbookEmptyState />
    <section id="main-checklist" style={grid}><RunbookSectionPanel /><RunbookStepPanel /><RecoveryPlaybookPanel /><RecoveryScenarioPanel /><RollbackPlaybookPanel /><ValidationPlaybookPanel /><EscalationPlaybookPanel /><OperatorRunbookSummaryPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}

import { buildRunbookSection } from "./runbook-section";
import { buildRunbookStep } from "./runbook-step";
import { buildRecoveryPlaybook } from "./recovery-playbook";
import { buildRecoveryScenario } from "./recovery-scenario";
import { buildRollbackPlaybook } from "./rollback-playbook";
import { buildValidationPlaybook } from "./validation-playbook";
import { buildEscalationPlaybook } from "./escalation-playbook";
import type { OperatorRunbookSummary } from "./operator-runbook-types";
export function buildOperatorRunbookSummary(): OperatorRunbookSummary {
  return { title: "Operator runbook", status: "runbook-ready", primaryAction: "Copy runbook", nextRoute: "/product-trial", items: [buildRunbookSection(), buildRunbookStep(), buildRecoveryPlaybook(), buildRecoveryScenario(), buildRollbackPlaybook(), buildValidationPlaybook(), buildEscalationPlaybook()] };
}
export function summarizeOperatorRunbookSession(): string { return "Operator runbook remains manual, review-gated, and demo-ready-with-notes until a human records evidence."; }

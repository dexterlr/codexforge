import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildRecoveryPlaybook(): OperatorRunbookItem {
  return buildOperatorRunbookItem("recovery", "Recovery playbook", "Use copy-only recovery steps. Do not execute commands from this page.");
}

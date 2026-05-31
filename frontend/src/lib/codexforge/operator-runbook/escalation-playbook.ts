import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildEscalationPlaybook(): OperatorRunbookItem {
  return buildOperatorRunbookItem("escalation", "Escalation", "Stop when evidence is incomplete, approval is ambiguous, or smoke/build fails.");
}

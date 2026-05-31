import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildRollbackPlaybook(): OperatorRunbookItem {
  return buildOperatorRunbookItem("rollback", "Rollback guide", "Copy rollback guide and recover manually with reviewed commands.");
}

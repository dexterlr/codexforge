import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildValidationPlaybook(): OperatorRunbookItem {
  return buildOperatorRunbookItem("validation", "Validation guide", "Validation is separate. Paste output and classify pass, fail, blocked, or unknown.");
}

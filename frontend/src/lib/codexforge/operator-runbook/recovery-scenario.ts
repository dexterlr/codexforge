import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildRecoveryScenario(): OperatorRunbookItem {
  return buildOperatorRunbookItem("scenario", "Recovery scenarios", "Wrong file selected, preview looks wrong, apply blocked, apply result unknown, validation failed, output too large, run history missing, Brain unavailable, nav issue, smoke failure, build failure.");
}

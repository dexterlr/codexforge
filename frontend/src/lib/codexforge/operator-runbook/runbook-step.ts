import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildRunbookStep(): OperatorRunbookItem {
  return buildOperatorRunbookItem("step", "Runbook steps", "Stop on wrong file, wrong preview, blocked apply, unknown apply result, failed validation, large output, missing history, Brain unavailable, layout issue, smoke failure, or build failure.");
}

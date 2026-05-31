import { buildOperatorRunbookItem, type OperatorRunbookItem } from "./operator-runbook-types";
export function buildRunbookSection(): OperatorRunbookItem {
  return buildOperatorRunbookItem("section", "Before you start", "Pick a safe file, preview first, review apply request, capture evidence, validate separately, capture result, handle failure, roll back safely, record run history, demo the result.");
}

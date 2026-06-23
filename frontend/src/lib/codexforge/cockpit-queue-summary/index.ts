import {
  buildBackendExecutionQueueRouteModel,
  summarizeBackendExecutionQueueRouteModel,
  type BackendExecutionQueueRouteModel,
} from "../backend-execution-queue";

export const COCKPIT_QUEUE_SUMMARY_LANGUAGE =
  "Cockpit queue summary | Cockpit queue summary keeps the cockpit as the normal user surface | Cockpit queue summary does not create queue jobs from the cockpit | Cockpit queue summary shows queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and transitions | Phase pages remain dev test diagnostics only | Cockpit queue summary checklist | Go to Cockpit Queue Summary";

export function buildCockpitQueueSummaryModel(): BackendExecutionQueueRouteModel {
  return buildBackendExecutionQueueRouteModel("cockpit-queue-summary");
}

export function summarizeCockpitQueueSummary(model = buildCockpitQueueSummaryModel()): string {
  return summarizeBackendExecutionQueueRouteModel(model);
}

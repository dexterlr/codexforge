import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_OPERATOR_RUNBOOK_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionOperatorRunbookStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_OPERATOR_RUNBOOK_LANGUAGE, buildAdapterExecutionOperatorRunbookStableKey };

const ADAPTER_EXECUTION_OPERATOR_RUNBOOK_SLUG = "adapter-execution-operator-runbook";

export function buildAdapterExecutionOperatorRunbook(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_OPERATOR_RUNBOOK_SLUG, input);
}

export function buildAdapterExecutionOperatorRunbookItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_OPERATOR_RUNBOOK_SLUG);
}

export function buildAdapterExecutionOperatorRunbookBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionOperatorRunbook(model: { adapterExecutionOperatorRunbookItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_OPERATOR_RUNBOOK_SLUG, model.adapterExecutionOperatorRunbookItems);
}

export function buildAdapterExecutionOperatorRunbookModel() {
  const adapterExecutionOperatorRunbookItems = buildAdapterExecutionOperatorRunbookItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_OPERATOR_RUNBOOK_SLUG, adapterExecutionOperatorRunbookItems);
  return { ...model, adapterExecutionOperatorRunbookItems };
}

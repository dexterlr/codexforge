import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildAdapterBackendOperatorTrialContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_LANGUAGE, buildAdapterBackendOperatorTrialContractStableKey };

const ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_SLUG = "adapter-backend-operator-trial-contract";

export function buildAdapterBackendOperatorTrialContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_SLUG, input);
}

export function buildAdapterBackendOperatorTrialContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_SLUG);
}

export function buildAdapterBackendOperatorTrialContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeAdapterBackendOperatorTrialContract(model: { adapterBackendOperatorTrialContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_SLUG, model.adapterBackendOperatorTrialContractItems);
}

export function buildAdapterBackendOperatorTrialContractModel() {
  const adapterBackendOperatorTrialContractItems = buildAdapterBackendOperatorTrialContractItems();
  const model = buildBackendAdapterContractModelForSlug(ADAPTER_BACKEND_OPERATOR_TRIAL_CONTRACT_SLUG, adapterBackendOperatorTrialContractItems);
  return { ...model, adapterBackendOperatorTrialContractItems };
}

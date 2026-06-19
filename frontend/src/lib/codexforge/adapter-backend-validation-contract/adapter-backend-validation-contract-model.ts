import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKEND_VALIDATION_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildAdapterBackendValidationContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { ADAPTER_BACKEND_VALIDATION_CONTRACT_LANGUAGE, buildAdapterBackendValidationContractStableKey };

const ADAPTER_BACKEND_VALIDATION_CONTRACT_SLUG = "adapter-backend-validation-contract";

export function buildAdapterBackendValidationContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(ADAPTER_BACKEND_VALIDATION_CONTRACT_SLUG, input);
}

export function buildAdapterBackendValidationContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(ADAPTER_BACKEND_VALIDATION_CONTRACT_SLUG);
}

export function buildAdapterBackendValidationContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeAdapterBackendValidationContract(model: { adapterBackendValidationContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(ADAPTER_BACKEND_VALIDATION_CONTRACT_SLUG, model.adapterBackendValidationContractItems);
}

export function buildAdapterBackendValidationContractModel() {
  const adapterBackendValidationContractItems = buildAdapterBackendValidationContractItems();
  const model = buildBackendAdapterContractModelForSlug(ADAPTER_BACKEND_VALIDATION_CONTRACT_SLUG, adapterBackendValidationContractItems);
  return { ...model, adapterBackendValidationContractItems };
}

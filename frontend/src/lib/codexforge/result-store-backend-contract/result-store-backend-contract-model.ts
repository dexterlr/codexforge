import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildResultStoreBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { RESULT_STORE_BACKEND_CONTRACT_LANGUAGE, buildResultStoreBackendContractStableKey };

const RESULT_STORE_BACKEND_CONTRACT_SLUG = "result-store-backend-contract";

export function buildResultStoreBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(RESULT_STORE_BACKEND_CONTRACT_SLUG, input);
}

export function buildResultStoreBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(RESULT_STORE_BACKEND_CONTRACT_SLUG);
}

export function buildResultStoreBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeResultStoreBackendContract(model: { resultStoreBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(RESULT_STORE_BACKEND_CONTRACT_SLUG, model.resultStoreBackendContractItems);
}

export function buildResultStoreBackendContractModel() {
  const resultStoreBackendContractItems = buildResultStoreBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(RESULT_STORE_BACKEND_CONTRACT_SLUG, resultStoreBackendContractItems);
  return { ...model, resultStoreBackendContractItems };
}

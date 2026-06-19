import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildPackagingBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { PACKAGING_BACKEND_CONTRACT_LANGUAGE, buildPackagingBackendContractStableKey };

const PACKAGING_BACKEND_CONTRACT_SLUG = "packaging-backend-contract";

export function buildPackagingBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(PACKAGING_BACKEND_CONTRACT_SLUG, input);
}

export function buildPackagingBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(PACKAGING_BACKEND_CONTRACT_SLUG);
}

export function buildPackagingBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizePackagingBackendContract(model: { packagingBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(PACKAGING_BACKEND_CONTRACT_SLUG, model.packagingBackendContractItems);
}

export function buildPackagingBackendContractModel() {
  const packagingBackendContractItems = buildPackagingBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(PACKAGING_BACKEND_CONTRACT_SLUG, packagingBackendContractItems);
  return { ...model, packagingBackendContractItems };
}

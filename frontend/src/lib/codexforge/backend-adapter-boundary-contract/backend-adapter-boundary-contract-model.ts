import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildBackendAdapterBoundaryContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { BACKEND_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE, buildBackendAdapterBoundaryContractStableKey };

const BACKEND_ADAPTER_BOUNDARY_CONTRACT_SLUG = "backend-adapter-boundary-contract";

export function buildBackendAdapterBoundaryContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(BACKEND_ADAPTER_BOUNDARY_CONTRACT_SLUG, input);
}

export function buildBackendAdapterBoundaryContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(BACKEND_ADAPTER_BOUNDARY_CONTRACT_SLUG);
}

export function buildBackendAdapterBoundaryContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeBackendAdapterBoundaryContract(model: { backendAdapterBoundaryContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(BACKEND_ADAPTER_BOUNDARY_CONTRACT_SLUG, model.backendAdapterBoundaryContractItems);
}

export function buildBackendAdapterBoundaryContractModel() {
  const backendAdapterBoundaryContractItems = buildBackendAdapterBoundaryContractItems();
  const model = buildBackendAdapterContractModelForSlug(BACKEND_ADAPTER_BOUNDARY_CONTRACT_SLUG, backendAdapterBoundaryContractItems);
  return { ...model, backendAdapterBoundaryContractItems };
}

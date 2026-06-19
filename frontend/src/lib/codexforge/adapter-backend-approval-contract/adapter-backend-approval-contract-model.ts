import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKEND_APPROVAL_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildAdapterBackendApprovalContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { ADAPTER_BACKEND_APPROVAL_CONTRACT_LANGUAGE, buildAdapterBackendApprovalContractStableKey };

const ADAPTER_BACKEND_APPROVAL_CONTRACT_SLUG = "adapter-backend-approval-contract";

export function buildAdapterBackendApprovalContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(ADAPTER_BACKEND_APPROVAL_CONTRACT_SLUG, input);
}

export function buildAdapterBackendApprovalContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(ADAPTER_BACKEND_APPROVAL_CONTRACT_SLUG);
}

export function buildAdapterBackendApprovalContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeAdapterBackendApprovalContract(model: { adapterBackendApprovalContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(ADAPTER_BACKEND_APPROVAL_CONTRACT_SLUG, model.adapterBackendApprovalContractItems);
}

export function buildAdapterBackendApprovalContractModel() {
  const adapterBackendApprovalContractItems = buildAdapterBackendApprovalContractItems();
  const model = buildBackendAdapterContractModelForSlug(ADAPTER_BACKEND_APPROVAL_CONTRACT_SLUG, adapterBackendApprovalContractItems);
  return { ...model, adapterBackendApprovalContractItems };
}

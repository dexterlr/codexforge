import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildLocalBridgeAdapterBoundaryContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_LANGUAGE, buildLocalBridgeAdapterBoundaryContractStableKey };

const LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_SLUG = "local-bridge-adapter-boundary-contract";

export function buildLocalBridgeAdapterBoundaryContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_SLUG, input);
}

export function buildLocalBridgeAdapterBoundaryContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_SLUG);
}

export function buildLocalBridgeAdapterBoundaryContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeLocalBridgeAdapterBoundaryContract(model: { localBridgeAdapterBoundaryContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_SLUG, model.localBridgeAdapterBoundaryContractItems);
}

export function buildLocalBridgeAdapterBoundaryContractModel() {
  const localBridgeAdapterBoundaryContractItems = buildLocalBridgeAdapterBoundaryContractItems();
  const model = buildBackendAdapterContractModelForSlug(LOCAL_BRIDGE_ADAPTER_BOUNDARY_CONTRACT_SLUG, localBridgeAdapterBoundaryContractItems);
  return { ...model, localBridgeAdapterBoundaryContractItems };
}

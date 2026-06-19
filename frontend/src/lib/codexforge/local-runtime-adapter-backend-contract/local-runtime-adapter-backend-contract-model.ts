import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildLocalRuntimeAdapterBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_LANGUAGE, buildLocalRuntimeAdapterBackendContractStableKey };

const LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_SLUG = "local-runtime-adapter-backend-contract";

export function buildLocalRuntimeAdapterBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_SLUG, input);
}

export function buildLocalRuntimeAdapterBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_SLUG);
}

export function buildLocalRuntimeAdapterBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeLocalRuntimeAdapterBackendContract(model: { localRuntimeAdapterBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_SLUG, model.localRuntimeAdapterBackendContractItems);
}

export function buildLocalRuntimeAdapterBackendContractModel() {
  const localRuntimeAdapterBackendContractItems = buildLocalRuntimeAdapterBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(LOCAL_RUNTIME_ADAPTER_BACKEND_CONTRACT_SLUG, localRuntimeAdapterBackendContractItems);
  return { ...model, localRuntimeAdapterBackendContractItems };
}

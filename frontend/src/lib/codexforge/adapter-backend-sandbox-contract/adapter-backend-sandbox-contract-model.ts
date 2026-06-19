import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKEND_SANDBOX_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildAdapterBackendSandboxContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { ADAPTER_BACKEND_SANDBOX_CONTRACT_LANGUAGE, buildAdapterBackendSandboxContractStableKey };

const ADAPTER_BACKEND_SANDBOX_CONTRACT_SLUG = "adapter-backend-sandbox-contract";

export function buildAdapterBackendSandboxContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(ADAPTER_BACKEND_SANDBOX_CONTRACT_SLUG, input);
}

export function buildAdapterBackendSandboxContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(ADAPTER_BACKEND_SANDBOX_CONTRACT_SLUG);
}

export function buildAdapterBackendSandboxContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeAdapterBackendSandboxContract(model: { adapterBackendSandboxContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(ADAPTER_BACKEND_SANDBOX_CONTRACT_SLUG, model.adapterBackendSandboxContractItems);
}

export function buildAdapterBackendSandboxContractModel() {
  const adapterBackendSandboxContractItems = buildAdapterBackendSandboxContractItems();
  const model = buildBackendAdapterContractModelForSlug(ADAPTER_BACKEND_SANDBOX_CONTRACT_SLUG, adapterBackendSandboxContractItems);
  return { ...model, adapterBackendSandboxContractItems };
}

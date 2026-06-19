import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKEND_AUDIT_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildAdapterBackendAuditContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { ADAPTER_BACKEND_AUDIT_CONTRACT_LANGUAGE, buildAdapterBackendAuditContractStableKey };

const ADAPTER_BACKEND_AUDIT_CONTRACT_SLUG = "adapter-backend-audit-contract";

export function buildAdapterBackendAuditContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(ADAPTER_BACKEND_AUDIT_CONTRACT_SLUG, input);
}

export function buildAdapterBackendAuditContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(ADAPTER_BACKEND_AUDIT_CONTRACT_SLUG);
}

export function buildAdapterBackendAuditContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeAdapterBackendAuditContract(model: { adapterBackendAuditContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(ADAPTER_BACKEND_AUDIT_CONTRACT_SLUG, model.adapterBackendAuditContractItems);
}

export function buildAdapterBackendAuditContractModel() {
  const adapterBackendAuditContractItems = buildAdapterBackendAuditContractItems();
  const model = buildBackendAdapterContractModelForSlug(ADAPTER_BACKEND_AUDIT_CONTRACT_SLUG, adapterBackendAuditContractItems);
  return { ...model, adapterBackendAuditContractItems };
}

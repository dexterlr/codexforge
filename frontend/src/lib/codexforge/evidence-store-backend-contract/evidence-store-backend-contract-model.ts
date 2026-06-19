import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildEvidenceStoreBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { EVIDENCE_STORE_BACKEND_CONTRACT_LANGUAGE, buildEvidenceStoreBackendContractStableKey };

const EVIDENCE_STORE_BACKEND_CONTRACT_SLUG = "evidence-store-backend-contract";

export function buildEvidenceStoreBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(EVIDENCE_STORE_BACKEND_CONTRACT_SLUG, input);
}

export function buildEvidenceStoreBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(EVIDENCE_STORE_BACKEND_CONTRACT_SLUG);
}

export function buildEvidenceStoreBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeEvidenceStoreBackendContract(model: { evidenceStoreBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(EVIDENCE_STORE_BACKEND_CONTRACT_SLUG, model.evidenceStoreBackendContractItems);
}

export function buildEvidenceStoreBackendContractModel() {
  const evidenceStoreBackendContractItems = buildEvidenceStoreBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(EVIDENCE_STORE_BACKEND_CONTRACT_SLUG, evidenceStoreBackendContractItems);
  return { ...model, evidenceStoreBackendContractItems };
}

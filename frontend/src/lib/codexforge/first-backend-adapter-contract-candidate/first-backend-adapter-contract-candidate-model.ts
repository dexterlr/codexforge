import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildFirstBackendAdapterContractCandidateStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_LANGUAGE, buildFirstBackendAdapterContractCandidateStableKey };

const FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_SLUG = "first-backend-adapter-contract-candidate";

export function buildFirstBackendAdapterContractCandidate(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_SLUG, input);
}

export function buildFirstBackendAdapterContractCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_SLUG);
}

export function buildFirstBackendAdapterContractCandidateBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeFirstBackendAdapterContractCandidate(model: { firstBackendAdapterContractCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_SLUG, model.firstBackendAdapterContractCandidateItems);
}

export function buildFirstBackendAdapterContractCandidateModel() {
  const firstBackendAdapterContractCandidateItems = buildFirstBackendAdapterContractCandidateItems();
  const model = buildBackendAdapterContractModelForSlug(FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_SLUG, firstBackendAdapterContractCandidateItems);
  return { ...model, firstBackendAdapterContractCandidateItems };
}

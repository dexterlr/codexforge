import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildRecoveryBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { RECOVERY_BACKEND_CONTRACT_LANGUAGE, buildRecoveryBackendContractStableKey };

const RECOVERY_BACKEND_CONTRACT_SLUG = "recovery-backend-contract";

export function buildRecoveryBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(RECOVERY_BACKEND_CONTRACT_SLUG, input);
}

export function buildRecoveryBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(RECOVERY_BACKEND_CONTRACT_SLUG);
}

export function buildRecoveryBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeRecoveryBackendContract(model: { recoveryBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(RECOVERY_BACKEND_CONTRACT_SLUG, model.recoveryBackendContractItems);
}

export function buildRecoveryBackendContractModel() {
  const recoveryBackendContractItems = buildRecoveryBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(RECOVERY_BACKEND_CONTRACT_SLUG, recoveryBackendContractItems);
  return { ...model, recoveryBackendContractItems };
}

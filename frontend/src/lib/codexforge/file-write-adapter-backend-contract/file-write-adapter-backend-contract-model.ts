import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildFileWriteAdapterBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { FILE_WRITE_ADAPTER_BACKEND_CONTRACT_LANGUAGE, buildFileWriteAdapterBackendContractStableKey };

const FILE_WRITE_ADAPTER_BACKEND_CONTRACT_SLUG = "file-write-adapter-backend-contract";

export function buildFileWriteAdapterBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(FILE_WRITE_ADAPTER_BACKEND_CONTRACT_SLUG, input);
}

export function buildFileWriteAdapterBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(FILE_WRITE_ADAPTER_BACKEND_CONTRACT_SLUG);
}

export function buildFileWriteAdapterBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeFileWriteAdapterBackendContract(model: { fileWriteAdapterBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(FILE_WRITE_ADAPTER_BACKEND_CONTRACT_SLUG, model.fileWriteAdapterBackendContractItems);
}

export function buildFileWriteAdapterBackendContractModel() {
  const fileWriteAdapterBackendContractItems = buildFileWriteAdapterBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(FILE_WRITE_ADAPTER_BACKEND_CONTRACT_SLUG, fileWriteAdapterBackendContractItems);
  return { ...model, fileWriteAdapterBackendContractItems };
}

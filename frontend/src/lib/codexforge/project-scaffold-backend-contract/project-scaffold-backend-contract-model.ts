import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_SCAFFOLD_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildProjectScaffoldBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { PROJECT_SCAFFOLD_BACKEND_CONTRACT_LANGUAGE, buildProjectScaffoldBackendContractStableKey };

const PROJECT_SCAFFOLD_BACKEND_CONTRACT_SLUG = "project-scaffold-backend-contract";

export function buildProjectScaffoldBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(PROJECT_SCAFFOLD_BACKEND_CONTRACT_SLUG, input);
}

export function buildProjectScaffoldBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(PROJECT_SCAFFOLD_BACKEND_CONTRACT_SLUG);
}

export function buildProjectScaffoldBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeProjectScaffoldBackendContract(model: { projectScaffoldBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(PROJECT_SCAFFOLD_BACKEND_CONTRACT_SLUG, model.projectScaffoldBackendContractItems);
}

export function buildProjectScaffoldBackendContractModel() {
  const projectScaffoldBackendContractItems = buildProjectScaffoldBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(PROJECT_SCAFFOLD_BACKEND_CONTRACT_SLUG, projectScaffoldBackendContractItems);
  return { ...model, projectScaffoldBackendContractItems };
}

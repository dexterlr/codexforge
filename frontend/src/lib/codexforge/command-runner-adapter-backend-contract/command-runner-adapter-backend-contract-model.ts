import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_LANGUAGE,
  buildBackendAdapterContract,
  buildBackendAdapterContractBoundary,
  buildBackendAdapterContractModelForSlug,
  buildBackendAdapterContractPackets,
  buildBackendAdapterContractStableKey as buildCommandRunnerAdapterBackendContractStableKey,
  summarizeBackendAdapterContractForSlug,
  type BackendAdapterContractPacketInput,
} from "../backend-adapter-boundary-contract-kit";

export { COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_LANGUAGE, buildCommandRunnerAdapterBackendContractStableKey };

const COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_SLUG = "command-runner-adapter-backend-contract";

export function buildCommandRunnerAdapterBackendContract(input: BackendAdapterContractPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterContract(COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_SLUG, input);
}

export function buildCommandRunnerAdapterBackendContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterContractPackets(COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_SLUG);
}

export function buildCommandRunnerAdapterBackendContractBoundary() {
  return buildBackendAdapterContractBoundary();
}

export function summarizeCommandRunnerAdapterBackendContract(model: { commandRunnerAdapterBackendContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterContractForSlug(COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_SLUG, model.commandRunnerAdapterBackendContractItems);
}

export function buildCommandRunnerAdapterBackendContractModel() {
  const commandRunnerAdapterBackendContractItems = buildCommandRunnerAdapterBackendContractItems();
  const model = buildBackendAdapterContractModelForSlug(COMMAND_RUNNER_ADAPTER_BACKEND_CONTRACT_SLUG, commandRunnerAdapterBackendContractItems);
  return { ...model, commandRunnerAdapterBackendContractItems };
}

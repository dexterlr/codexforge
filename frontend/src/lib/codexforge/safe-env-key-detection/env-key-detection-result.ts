import type { EnvKeyDefinition, EnvKeyDetectionResult, EnvKeyReadinessState } from "./safe-env-key-types";

export function buildEnvKeyDetectionResult(
  definition: EnvKeyDefinition,
  state: EnvKeyReadinessState = "not checked"
): EnvKeyDetectionResult {
  return {
    id: `${definition.id}-result`,
    keyName: definition.keyName,
    provider: definition.provider,
    state,
    valueVisible: false,
    guidance: state === "present" ? "Configured on the server side; value remains hidden." : "Add a placeholder locally when you are ready, then use a future boolean-only server check.",
  };
}

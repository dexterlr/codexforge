import type { EnvKeyDefinition, EnvKeyProviderMap } from "./safe-env-key-types";

export function buildEnvKeyProviderMap(definitions: EnvKeyDefinition[]): EnvKeyProviderMap[] {
  const providers = Array.from(new Set(definitions.map((definition) => definition.provider)));
  return providers.map((provider) => ({
    id: provider.toLowerCase().replaceAll(" ", "-"),
    provider,
    keys: definitions.filter((definition) => definition.provider === provider).map((definition) => definition.keyName),
    readiness: provider.includes("local server") ? "manual profile" : "not checked",
  }));
}

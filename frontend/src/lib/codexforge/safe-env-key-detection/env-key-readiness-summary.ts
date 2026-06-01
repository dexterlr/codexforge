import type { EnvKeyReadinessSummary } from "./safe-env-key-types";
import { buildDefaultEnvKeyDefinitions } from "./env-key-definition";
import { buildEnvKeyDetectionResult } from "./env-key-detection-result";
import { buildEnvKeyProviderMap } from "./env-key-provider-map";
import { buildEnvKeyRedactionPolicy } from "./env-key-redaction-policy";

export function summarizeEnvKeyReadiness(summary: EnvKeyReadinessSummary): string {
  return `${summary.definitions.length} env names defined, values hidden, browser check not performed, future route should return booleans only.`;
}

export function buildEnvKeyReadinessSummary(): EnvKeyReadinessSummary {
  const definitions = buildDefaultEnvKeyDefinitions();
  const results = definitions.map((definition) => buildEnvKeyDetectionResult(definition, definition.kind === "base-url" ? "manual profile" : "not checked"));
  const template = definitions.map((definition) => definition.placeholder).join("\n");
  const summary: EnvKeyReadinessSummary = {
    definitions,
    results,
    policy: buildEnvKeyRedactionPolicy(),
    providerMap: buildEnvKeyProviderMap(definitions),
    template,
    summary: "",
    nextAction: "Create .env.local with placeholders only, then use provider tests for safe readiness planning.",
  };
  return { ...summary, summary: summarizeEnvKeyReadiness(summary) };
}

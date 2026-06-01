import type { LocalProviderProbeResult, LocalProviderTarget } from "./local-provider-probe-types";

export function buildLocalProviderProbeResult(target: LocalProviderTarget): LocalProviderProbeResult {
  return {
    id: `${target.id}-probe-result`,
    targetId: target.id,
    status: "preview-only",
    meaning: `${target.name} has a safe probe plan, but no live local server check has run.`,
  };
}

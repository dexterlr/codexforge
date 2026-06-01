import type { LocalProviderProbeSummary } from "./local-provider-probe-types";
import { buildLocalProviderProbePlan } from "./local-provider-probe-plan";
import { buildLocalProviderProbeResult } from "./local-provider-probe-result";
import { buildLocalProviderProbeSafety } from "./local-provider-probe-safety";
import { buildDefaultLocalProviderTargets } from "./local-provider-target";

export function summarizeLocalProviderProbePreview(summary: LocalProviderProbeSummary): string {
  return `${summary.targets.length} local provider probe plans, preview-only, no live calls, no prompts, no secrets.`;
}

export function buildLocalProviderProbeSummary(): LocalProviderProbeSummary {
  const targets = buildDefaultLocalProviderTargets();
  const summary: LocalProviderProbeSummary = {
    targets,
    plans: targets.map(buildLocalProviderProbePlan),
    results: targets.map(buildLocalProviderProbeResult),
    safety: buildLocalProviderProbeSafety(),
    summary: "",
    nextAction: "Review the local probe plan, then use Provider tests to see what remains blocked.",
  };
  return { ...summary, summary: summarizeLocalProviderProbePreview(summary) };
}

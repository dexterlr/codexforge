import type { LocalVsCloudDecision, LocalVsCloudTradeoff } from "./local-vs-cloud-types";

export function buildLocalVsCloudTradeoff(
  decision: LocalVsCloudDecision,
  input: Partial<LocalVsCloudTradeoff> = {}
): LocalVsCloudTradeoff {
  return {
    id: input.id ?? `${decision.id}-tradeoff`,
    localBenefit: input.localBenefit ?? "Local saves money and keeps early creative work private.",
    cloudBenefit: input.cloudBenefit ?? "Cloud may help later if final quality needs a provider-only capability.",
    risk: input.risk ?? "Cloud can cost credits, expose reviewed prompt/assets, and fail after payment.",
    plainEnglish:
      input.plainEnglish ??
      "The safest path is local draft first, then review whether cloud quality is worth the cost.",
  };
}

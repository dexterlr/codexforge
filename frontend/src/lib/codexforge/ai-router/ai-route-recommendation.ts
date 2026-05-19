import { buildAiModelCatalog, rankAiModelsByCapability } from "./ai-model-catalog";
import { buildDefaultAiProviderProfiles } from "./ai-provider-profile";
import { isAiRouteAllowed } from "./ai-routing-policy";
import { buildDefaultAiSubscriptionTiers, scoreSubscriptionFit } from "./ai-subscription-tier";
import { buildAiTokenBudget, recommendTokenCompressionPlan } from "./ai-token-budget";
import type {
  AiCostPosture,
  AiModelCatalogEntry,
  AiProviderProfile,
  AiRouteRecommendation,
  AiRoutingPolicy,
  AiSubscriptionTier,
  AiTaskRequirements,
} from "./ai-router-types";

function costPosture(model: AiModelCatalogEntry | null, tier: AiSubscriptionTier | null): AiCostPosture {
  if (!model || !tier) return "unknown";
  if (model.supportsLocalOffline || tier.strategy === "local-hardware") return "local";
  if (tier.strategy === "free") return "free";
  if (model.qualityTier === "premium") return "high";
  if (model.qualityTier === "balanced") return "medium";
  if (model.qualityTier === "fast") return "low";
  return "unknown";
}

function findTierForModel(
  model: AiModelCatalogEntry,
  tiers: AiSubscriptionTier[],
  task: AiTaskRequirements
): AiSubscriptionTier | null {
  return [...tiers]
    .filter((tier) => tier.providerId === model.providerId || tier.providerId === "manual-subscription")
    .sort((a, b) => scoreSubscriptionFit(b, task) - scoreSubscriptionFit(a, task))[0] ?? null;
}

function scoreRoute(args: {
  model: AiModelCatalogEntry;
  provider: AiProviderProfile;
  tier: AiSubscriptionTier | null;
  task: AiTaskRequirements;
  policy: AiRoutingPolicy;
}): number {
  const modelRank = rankAiModelsByCapability([args.model], args.task).length > 0 ? 40 : 0;
  const providerReady = args.provider.status === "configured" ? 28 : args.provider.status === "local-unavailable" ? 10 : 0;
  const tierFit = args.tier ? scoreSubscriptionFit(args.tier, args.task) / 4 : 0;
  const localPreference =
    args.policy.localFirst && args.provider.supportsLocalOffline && args.policy.preferLocalTaskKinds.includes(args.task.taskKind)
      ? 20
      : 0;
  const premiumPreference =
    args.policy.preferPremiumTaskKinds.includes(args.task.taskKind) && args.model.qualityTier === "premium"
      ? 24
      : 0;

  return modelRank + providerReady + tierFit + localPreference + premiumPreference;
}

export function buildAiRouteRecommendation(args: {
  task: AiTaskRequirements;
  promptText: string;
  policy: AiRoutingPolicy;
  providers?: AiProviderProfile[];
  models?: AiModelCatalogEntry[];
  tiers?: AiSubscriptionTier[];
}): AiRouteRecommendation {
  const providers = args.providers ?? buildDefaultAiProviderProfiles();
  const models = args.models ?? buildAiModelCatalog();
  const tiers = args.tiers ?? buildDefaultAiSubscriptionTiers();
  const candidates = rankAiModelsByCapability(models, args.task)
    .map((model) => {
      const provider = providers.find((item) => item.id === model.providerId) ?? null;
      const tier = findTierForModel(model, tiers, args.task);
      return provider ? { model, provider, tier } : null;
    })
    .filter((item): item is { model: AiModelCatalogEntry; provider: AiProviderProfile; tier: AiSubscriptionTier | null } => !!item);

  const allowed = candidates.filter((candidate) =>
    isAiRouteAllowed({ policy: args.policy, task: args.task, provider: candidate.provider }).allowed
  );
  const ordered = (allowed.length > 0 ? allowed : candidates).sort(
    (a, b) =>
      scoreRoute({ ...b, task: args.task, policy: args.policy }) -
      scoreRoute({ ...a, task: args.task, policy: args.policy })
  );
  const selected = ordered[0] ?? null;
  const blockedReasons = selected
    ? isAiRouteAllowed({ policy: args.policy, task: args.task, provider: selected.provider }).reasons
    : ["No model candidate matched the task."];
  const budget = buildAiTokenBudget({
    promptText: args.promptText,
    task: args.task,
    model: selected?.model ?? null,
    tier: selected?.tier ?? null,
  });

  return {
    provider: selected?.provider ?? null,
    model: selected?.model ?? null,
    tier: selected?.tier ?? null,
    fallbackRoute: ordered.slice(1, args.policy.fallbackDepth + 1).map((route) => ({
      providerId: route.provider.id,
      modelId: route.model.id,
      tierId: route.tier?.id ?? "manual-review",
    })),
    reason: selected
      ? `${selected.model.label} fits ${args.task.taskKind} with ${selected.tier?.label ?? "manual review"} tier.`
      : "No route selected.",
    estimatedTokenBudget: budget,
    estimatedCostPosture: costPosture(selected?.model ?? null, selected?.tier ?? null),
    qualityPosture: selected?.model.qualityTier ?? "blocked",
    privacyPosture: selected?.provider.privacyPosture ?? "unknown",
    compressionSuggestions: recommendTokenCompressionPlan(budget),
    confidence: selected && blockedReasons.length === 0 ? Math.min(0.94, scoreRoute({ ...selected, task: args.task, policy: args.policy }) / 120) : 0.22,
    blockedReasons,
    warnings: [
      "Estimates are approximate.",
      "No API keys stored or displayed.",
      ...(selected?.provider.status === "local-unavailable" ? ["Local server availability needs operator configuration."] : []),
    ],
  };
}

export function rankAiRouteRecommendations(
  recommendations: AiRouteRecommendation[]
): AiRouteRecommendation[] {
  return [...recommendations].sort((a, b) => b.confidence - a.confidence);
}

export function selectBestAiRoute(
  recommendations: AiRouteRecommendation[]
): AiRouteRecommendation | null {
  return rankAiRouteRecommendations(recommendations)[0] ?? null;
}

export function summarizeAiRouteRecommendation(route: AiRouteRecommendation): string {
  if (!route.model || !route.provider) return `Blocked route: ${route.blockedReasons.join(" ")}`;
  return `${route.model.label} via ${route.provider.label}; ${route.estimatedCostPosture} cost posture; fallback route count ${route.fallbackRoute.length}.`;
}

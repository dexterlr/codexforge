import { buildAiModelCatalog, summarizeAiModelCatalog } from "./ai-model-catalog";
import { buildDefaultAiProviderProfiles, isAiProviderConfigured } from "./ai-provider-profile";
import { buildAiRouteRecommendation } from "./ai-route-recommendation";
import { buildAiRoutingPolicy, summarizeAiRoutingPolicy } from "./ai-routing-policy";
import { buildDefaultAiSubscriptionTiers } from "./ai-subscription-tier";
import { classifyAiTask } from "./ai-task-classifier";
import { buildAiUsageLedger, buildAiUsageLedgerItem } from "./ai-usage-ledger";

export function buildAiRouterSummary(promptText = "General CodexForge chat planning request.") {
  const providers = buildDefaultAiProviderProfiles();
  const models = buildAiModelCatalog();
  const tiers = buildDefaultAiSubscriptionTiers();
  const policy = buildAiRoutingPolicy();
  const task = classifyAiTask(promptText);
  const recommendation = buildAiRouteRecommendation({
    task,
    promptText,
    policy,
    providers,
    models,
    tiers,
  });
  const ledger = buildAiUsageLedger([
    buildAiUsageLedgerItem({
      requestId: "preview-generic-chat",
      task,
      route: recommendation,
      timestampLabel: "preview",
    }),
  ]);

  return {
    providerCount: providers.length,
    configuredProviderCount: providers.filter(isAiProviderConfigured).length,
    modelCount: models.length,
    tierCount: tiers.length,
    policySummary: summarizeAiRoutingPolicy(policy),
    catalogSummary: summarizeAiModelCatalog(models),
    task,
    recommendation,
    ledger,
    safety: [
      "No API keys stored in browser storage.",
      "No external provider calls are made by deterministic routing.",
      "Token and cost estimates are approximate.",
      "Fallback route stays visible before execution.",
    ],
  };
}

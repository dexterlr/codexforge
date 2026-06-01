import type { TokenEfficiencyRouterSummary, TokenRoutingRequest } from "./token-efficiency-router-types";
import { buildTokenRoutingDecision } from "./token-route-decision";

export function buildTokenEfficiencyRouterSummary(
  request: TokenRoutingRequest
): TokenEfficiencyRouterSummary {
  return {
    id: "token-efficiency-router",
    request: { ...request },
    decision: buildTokenRoutingDecision(request),
    rules: [
      "High sensitivity stays local-first or manual.",
      "Premium subscriptions are manual handoffs, not automated calls.",
      "Cheap profiles are for low-risk summaries and drafts.",
      "Token estimates are approximate and deterministic.",
    ],
  };
}

export function buildDefaultTokenRoutingRequest(): TokenRoutingRequest {
  return {
    id: "router-preview-request",
    title: "Summarize a reviewed implementation plan and ask for a careful final pass",
    estimatedInputTokens: 4200,
    estimatedOutputTokens: 1200,
    sensitivity: "medium",
    needsPremiumReasoning: false,
  };
}


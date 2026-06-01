import type { TokenRoutingDecision, TokenRoutingRequest } from "./token-efficiency-router-types";
import { estimateTokenTotal, selectTokenRouterFallback, selectTokenRouterLane } from "./token-routing-policy";

export function buildTokenRoutingDecision(request: TokenRoutingRequest): TokenRoutingDecision {
  const lane = selectTokenRouterLane(request);
  const estimatedTotalTokens = estimateTokenTotal(request);

  return {
    id: `${request.id}-decision`,
    lane,
    estimatedTotalTokens,
    fallbackLane: selectTokenRouterFallback(lane),
    reason:
      lane === "local-first"
        ? "Private or sensitive work should stay local or manual before any provider automation."
        : lane === "manual-premium"
          ? "Use a manual premium subscription handoff for larger or harder reasoning tasks."
          : "Use a cheaper planned profile for low-risk summaries and drafts.",
    handoff: "Copy the task to the selected lane manually; CodexForge does not call providers in this phase.",
  };
}


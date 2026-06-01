import type { TokenRouterLane, TokenRoutingRequest } from "./token-efficiency-router-types";

export function estimateTokenTotal(request: TokenRoutingRequest): number {
  return Math.max(0, request.estimatedInputTokens) + Math.max(0, request.estimatedOutputTokens);
}

export function selectTokenRouterLane(request: TokenRoutingRequest): TokenRouterLane {
  if (request.sensitivity === "high") return "local-first";
  if (request.needsPremiumReasoning || estimateTokenTotal(request) > 12000) return "manual-premium";
  return "cheap-cloud-profile";
}

export function selectTokenRouterFallback(lane: TokenRouterLane): TokenRouterLane {
  if (lane === "local-first") return "manual-premium";
  if (lane === "manual-premium") return "cheap-cloud-profile";
  return "local-first";
}


export type TokenRouterLane = "manual-premium" | "cheap-cloud-profile" | "local-first";
export type TokenRouterSensitivity = "low" | "medium" | "high";

export type TokenRoutingRequest = {
  id: string;
  title: string;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  sensitivity: TokenRouterSensitivity;
  needsPremiumReasoning: boolean;
};

export type TokenRoutingDecision = {
  id: string;
  lane: TokenRouterLane;
  reason: string;
  estimatedTotalTokens: number;
  handoff: string;
  fallbackLane: TokenRouterLane;
};

export type TokenEfficiencyRouterSummary = {
  id: "token-efficiency-router";
  request: TokenRoutingRequest;
  decision: TokenRoutingDecision;
  rules: string[];
};


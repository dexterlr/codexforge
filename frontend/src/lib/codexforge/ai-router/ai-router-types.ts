export type AiProviderKind =
  | "local"
  | "openai-compatible"
  | "anthropic-compatible"
  | "google-gemini-compatible"
  | "openrouter-compatible"
  | "ollama-local-server"
  | "lm-studio-local-server"
  | "custom-http-compatible"
  | "manual-subscription";

export type AiConnectionMode = "local" | "api" | "browser" | "manual" | "planned";
export type AiSecretStrategy = "env-only" | "local-server" | "manual" | "not-configured";
export type AiProviderStatus =
  | "configured"
  | "planned"
  | "disabled"
  | "missing-secret"
  | "local-unavailable";
export type AiPosture = "local" | "private" | "balanced" | "external" | "unknown";
export type AiExpectation = "low" | "medium" | "high" | "variable";
export type AiQualityTier = "fast" | "balanced" | "premium" | "specialist" | "local";
export type AiTaskStrength =
  | "coding"
  | "reasoning"
  | "summarization"
  | "extraction"
  | "vision"
  | "planning"
  | "cheap-draft"
  | "local-private";
export type AiSubscriptionStrategy =
  | "free"
  | "paid-subscription"
  | "api-usage-billing"
  | "local-hardware"
  | "organization-subscription"
  | "manual-unknown";
export type AiResetCadence = "none" | "daily" | "weekly" | "monthly" | "manual" | "unknown";
export type AiTaskKind =
  | "chat"
  | "code-inspection"
  | "code-generation"
  | "patch-planning"
  | "diff-review"
  | "summarization"
  | "extraction"
  | "memory-ingestion"
  | "brain-reasoning"
  | "creative-planning"
  | "research"
  | "tool-execution-review"
  | "low-risk-draft"
  | "high-risk-apply-review";
export type AiRequirementLevel = "low" | "medium" | "high";
export type AiContextSize = "small" | "medium" | "large" | "very-large";
export type AiPrivacyLevel = "public" | "internal" | "private" | "secret";
export type AiCostSensitivity = "low" | "medium" | "high";
export type AiLatencyPreference = "interactive" | "balanced" | "batch";
export type AiCostPosture = "local" | "free" | "low" | "medium" | "high" | "unknown";
export type AiUsageStatus = "planned" | "used" | "skipped" | "blocked";

export type AiProviderProfile = {
  id: string;
  label: string;
  kind: AiProviderKind;
  connectionMode: AiConnectionMode;
  secretStrategy: AiSecretStrategy;
  privacyPosture: AiPosture;
  latencyExpectation: AiExpectation;
  reliabilityExpectation: AiExpectation;
  supportsStreaming: boolean;
  supportsToolUse: boolean;
  supportsVision: boolean;
  supportsCode: boolean;
  supportsLongContext: boolean;
  supportsLocalOffline: boolean;
  notes: string[];
  status: AiProviderStatus;
};

export type AiModelCatalogEntry = {
  id: string;
  label: string;
  providerId: string;
  family: string;
  contextWindowEstimate: number;
  inputTokenCostEstimate?: number;
  outputTokenCostEstimate?: number;
  subscriptionIncludedUsageEstimate?: string;
  qualityTier: AiQualityTier;
  strengths: AiTaskStrength[];
  weaknesses: string[];
  maxOutputHint: number;
  supportsTools: boolean;
  supportsVision: boolean;
  supportsLocalOffline: boolean;
  enabled: boolean;
  estimateNote: string;
};

export type AiSubscriptionTier = {
  id: string;
  providerId: string;
  label: string;
  strategy: AiSubscriptionStrategy;
  monthlyBudget?: number;
  dailyTokenBudget?: number;
  requestBudget?: number;
  priority: number;
  includedUsageNote: string;
  manualCostNote: string;
  resetCadence: AiResetCadence;
  hardCap?: number;
  softCap?: number;
  preferForTasks: AiTaskKind[];
  avoidForTasks: AiTaskKind[];
};

export type AiTaskRequirements = {
  taskKind: AiTaskKind;
  requiredReasoningDepth: AiRequirementLevel;
  requiredContextSize: AiContextSize;
  privacyLevel: AiPrivacyLevel;
  latencyPreference: AiLatencyPreference;
  costSensitivity: AiCostSensitivity;
  qualitySensitivity: AiRequirementLevel;
  requiresToolUse: boolean;
  requiresVision: boolean;
  requiresCodeStrength: boolean;
  fallbackAllowed: boolean;
};

export type AiTaskClassification = AiTaskRequirements & {
  sourceText: string;
  summary: string;
};

export type AiTokenBudget = {
  approximate: true;
  promptChars: number;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  estimatedTotalTokens: number;
  expensiveContext: boolean;
  compressionRecommended: boolean;
  costScore: number;
  notes: string[];
};

export type AiRoutingPolicy = {
  id: string;
  localFirst: boolean;
  subscriptionEfficient: boolean;
  requireExplicitSecretApproval: boolean;
  allowExternalForPrivate: boolean;
  allowExternalForSecrets: boolean;
  preferLocalTaskKinds: AiTaskKind[];
  preferCheapTaskKinds: AiTaskKind[];
  preferPremiumTaskKinds: AiTaskKind[];
  longContextThresholdTokens: number;
  fallbackDepth: number;
  rules: string[];
};

export type AiRouteRecommendation = {
  provider: AiProviderProfile | null;
  model: AiModelCatalogEntry | null;
  tier: AiSubscriptionTier | null;
  fallbackRoute: Array<{
    providerId: string;
    modelId: string;
    tierId: string;
  }>;
  reason: string;
  estimatedTokenBudget: AiTokenBudget;
  estimatedCostPosture: AiCostPosture;
  qualityPosture: AiQualityTier | "blocked";
  privacyPosture: AiPosture;
  compressionSuggestions: string[];
  confidence: number;
  blockedReasons: string[];
  warnings: string[];
};

export type AiUsageLedgerItem = {
  requestId: string;
  taskKind: AiTaskKind;
  providerId: string;
  modelId: string;
  tierId: string;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  actualInputTokens?: number;
  actualOutputTokens?: number;
  costPosture: AiCostPosture;
  routeReason: string;
  timestampLabel?: string;
  status: AiUsageStatus;
  savingsNote: string;
};

export type AiUsageLedger = {
  items: AiUsageLedgerItem[];
  summary: string;
};

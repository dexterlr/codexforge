export type ProviderAdapterId =
  | "openai-compatible"
  | "claude-compatible"
  | "gemini"
  | "deepseek"
  | "ollama-local"
  | "lm-studio-local";

export type ProviderAdapterFamily =
  | "openai-compatible"
  | "claude-compatible"
  | "gemini"
  | "deepseek"
  | "local-model";

export type ProviderAdapterConnectionMode =
  | "api-key-env"
  | "openai-compatible-endpoint"
  | "local-server"
  | "manual-browser"
  | "planned";

export type ProviderAdapterCredentialStrategy =
  | "env-only"
  | "local-secret-proxy-design"
  | "no-secret-needed"
  | "manual-handoff";

export type ProviderAdapterPrivacyPosture =
  | "local-private"
  | "external-cloud"
  | "aggregator-cloud"
  | "manual-browser"
  | "custom-reviewed";

export type ProviderAdapterAutomationReadiness =
  | "not-implemented"
  | "definition-only"
  | "setup-ready"
  | "health-check-planned"
  | "manual-only";

export type ProviderAdapterReadinessState =
  | "definition-ready"
  | "needs-credential-strategy"
  | "needs-local-server"
  | "manual-handoff-only"
  | "blocked-unsafe-secret-storage"
  | "planned";

export type ProviderAdapterTaskType =
  | "coding"
  | "reasoning"
  | "summarizing"
  | "long-context"
  | "private-prepass"
  | "review"
  | "writing"
  | "vision"
  | "patch-planning"
  | "local-model-testing";

export type ProviderAdapterModelFamily = {
  id: string;
  label: string;
  plainEnglish: string;
  strengths: string[];
  cautions: string[];
};

export type ProviderAdapterCapabilityProfile = {
  chat: boolean;
  toolUse: "supported-by-some-models" | "planned" | "not-described";
  vision: "supported-by-some-models" | "planned" | "not-described";
  longContext: "supported-by-some-models" | "planned" | "not-described";
  localOnly: boolean;
  notes: string[];
};

export type ProviderAdapterRoutingHint = {
  id: string;
  label: string;
  bestUse: string;
  why: string;
  readiness: ProviderAdapterReadinessState;
};

export type ProviderAdapterSafetyProfile = {
  blocked: string[];
  allowed: string[];
  credentialGuidance: string[];
  operatorCopy: string[];
};

export type ProviderAdapterContract = {
  requestShape: string;
  connectionShape: string;
  safeSetupShape: string;
  controlPlaneOnly: boolean;
  noviceExplanation: string;
};

export type ProviderAdapterDefinition = {
  id: ProviderAdapterId;
  label: string;
  plainEnglishSummary: string;
  providerFamily: ProviderAdapterFamily;
  contract: ProviderAdapterContract;
  connectionModes: ProviderAdapterConnectionMode[];
  credentialStrategies: ProviderAdapterCredentialStrategy[];
  privacyPosture: ProviderAdapterPrivacyPosture;
  automationReadiness: ProviderAdapterAutomationReadiness;
  setupStatus: ProviderAdapterReadinessState;
  supportedTaskTypes: ProviderAdapterTaskType[];
  modelFamilies: ProviderAdapterModelFamily[];
  capabilityProfile: ProviderAdapterCapabilityProfile;
  routingHints: ProviderAdapterRoutingHint[];
  safetyProfile: ProviderAdapterSafetyProfile;
  limitationNotes: string[];
  nextSetupStep: string;
};

export type ProviderAdapterSummary = {
  id: "provider-adapter-summary";
  adapters: ProviderAdapterDefinition[];
  totalAdapters: number;
  definitionReadyCount: number;
  localPrivateCount: number;
  manualOnlyCount: number;
  safetyHighlights: string[];
  routingHighlights: string[];
};

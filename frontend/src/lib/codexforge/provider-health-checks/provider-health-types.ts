export type ProviderHealthState = "configured" | "missing-key" | "manual-only" | "local-server-expected" | "planned" | "unavailable" | "unknown";

export type ProviderHealthCheckInput = {
  id: string;
  name: string;
  kind: "api" | "local" | "manual" | "planned";
  needsEnvKey?: boolean;
  needsBaseUrl?: boolean;
  localServerLabel?: string;
  manualProfileOnly?: boolean;
  planned?: boolean;
};

export type ProviderHealthCheck = ProviderHealthCheckInput & {
  status: ProviderHealthState;
  requirement: string;
  guidance: string;
  configured: boolean;
  blocked: boolean;
};

export type ProviderHealthSummary = {
  checks: ProviderHealthCheck[];
  configuredCount: number;
  blockedCount: number;
  manualCount: number;
  plannedCount: number;
  nextFix: string;
  summary: string;
};

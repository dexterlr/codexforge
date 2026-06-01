export type ProviderTestScopeKind =
  | "profile-only"
  | "env-presence-only"
  | "local-probe-preview"
  | "local-live-health-check-planned"
  | "cloud-live-test-blocked"
  | "manual-browser-check";

export type ProviderTestStatus =
  | "ready-to-check"
  | "needs-env"
  | "manual-only"
  | "local-server-needed"
  | "blocked-until-approved"
  | "not-supported-yet"
  | "planned";

export type ProviderTestPlan = {
  id: string;
  provider: string;
  scope: ProviderTestScopeKind;
  status: ProviderTestStatus;
  plainEnglish: string;
};

export type ProviderTestScope = {
  id: string;
  scope: ProviderTestScopeKind;
  safeNow: boolean;
  explanation: string;
};

export type ProviderTestSafety = {
  id: string;
  rules: string[];
  blocked: string[];
};

export type ProviderTestResult = {
  id: string;
  planId: string;
  status: ProviderTestStatus;
  resultText: string;
};

export type ProviderTestNextAction = {
  id: string;
  label: string;
  route: string;
  reason: string;
};

export type ProviderConnectionTestSummary = {
  plans: ProviderTestPlan[];
  scopes: ProviderTestScope[];
  safety: ProviderTestSafety;
  results: ProviderTestResult[];
  nextActions: ProviderTestNextAction[];
  summary: string;
};

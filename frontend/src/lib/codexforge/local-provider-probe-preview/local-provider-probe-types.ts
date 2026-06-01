export type LocalProviderTarget = {
  id: string;
  name: string;
  baseUrlEnvKey: string;
  defaultLocalUrl: string;
  hostRule: string;
};

export type LocalProviderProbePlan = {
  id: string;
  targetId: string;
  checks: string[];
  safeBecause: string[];
  liveCallAllowed: false;
};

export type LocalProviderProbeResult = {
  id: string;
  targetId: string;
  status: "preview-only" | "not checked" | "planned";
  meaning: string;
};

export type LocalProviderProbeSafety = {
  id: string;
  rules: string[];
  blocked: string[];
};

export type LocalProviderProbeSummary = {
  targets: LocalProviderTarget[];
  plans: LocalProviderProbePlan[];
  results: LocalProviderProbeResult[];
  safety: LocalProviderProbeSafety;
  summary: string;
  nextAction: string;
};

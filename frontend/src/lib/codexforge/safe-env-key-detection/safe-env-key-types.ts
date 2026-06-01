export type EnvKeyReadinessState = "present" | "missing" | "not checked" | "manual profile";

export type EnvKeyDefinition = {
  id: string;
  keyName: string;
  provider: string;
  kind: "api-key" | "base-url";
  requiredFor: string;
  placeholder: string;
};

export type EnvKeyDetectionResult = {
  id: string;
  keyName: string;
  provider: string;
  state: EnvKeyReadinessState;
  valueVisible: false;
  guidance: string;
};

export type EnvKeyRedactionPolicy = {
  id: string;
  rules: string[];
  blocked: string[];
};

export type EnvKeyProviderMap = {
  id: string;
  provider: string;
  keys: string[];
  readiness: EnvKeyReadinessState;
};

export type EnvKeyReadinessSummary = {
  definitions: EnvKeyDefinition[];
  results: EnvKeyDetectionResult[];
  policy: EnvKeyRedactionPolicy;
  providerMap: EnvKeyProviderMap[];
  template: string;
  summary: string;
  nextAction: string;
};

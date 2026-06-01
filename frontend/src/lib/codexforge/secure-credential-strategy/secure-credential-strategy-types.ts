export type CredentialStrategyKind = "manual-handoff" | "external-secret-reference" | "local-runtime-profile";
export type CredentialStrategyStatus = "allowed-now" | "planned-only" | "blocked";

export type SecureCredentialStrategyItem = {
  id: string;
  label: string;
  kind: CredentialStrategyKind;
  status: CredentialStrategyStatus;
  operatorCopy: string;
  allowedData: string[];
  blockedData: string[];
  storageRule: string;
};

export type SecureCredentialStrategySummary = {
  id: "secure-credential-strategy";
  items: SecureCredentialStrategyItem[];
  blockedStorageRules: string[];
  summary: string[];
};


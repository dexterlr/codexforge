export type LiveHealthProbeApprovalPosture = "not-approved" | "approved-for-future-local-metadata-probe";

export type LiveHealthProbeDecisionStatus =
  | "preview-only"
  | "ready-for-future-approved-probe"
  | "blocked-nonlocal-url"
  | "blocked-missing-base-url"
  | "blocked-policy"
  | "unknown";

export type LiveHealthProbeRequest = {
  id: string;
  baseUrl: string;
  localOnlyBaseUrl: boolean;
  promptPayloadAllowed: false;
  workflowPayloadAllowed: false;
  queueMutationAllowed: false;
  fileWriteAllowed: false;
  apiCredentialSupplied: false;
  cloudUrlAllowed: false;
  approvalPosture: LiveHealthProbeApprovalPosture;
  metadataOnlyIntention: true;
  noAutoRunGuarantee: true;
};

export type LiveHealthProbePolicy = {
  id: string;
  requirements: string[];
  failures: string[];
  allRequirementsMet: boolean;
  allowed: boolean;
};

export type LiveHealthProbeSafety = {
  id: string;
  guarantees: string[];
  blocked: string[];
};

export type LiveHealthProbeReadiness = {
  id: string;
  checks: string[];
  readyChecks: string[];
  blockedChecks: string[];
  reviewed: boolean;
};

export type LiveHealthProbeDecision = {
  id: string;
  status: LiveHealthProbeDecisionStatus;
  label: string;
  explanation: string;
  futureProbeAllowed: boolean;
};

export type LiveHealthProbeHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type LiveHealthProbeSummary = {
  request: LiveHealthProbeRequest;
  policy: LiveHealthProbePolicy;
  safety: LiveHealthProbeSafety;
  readiness: LiveHealthProbeReadiness;
  decision: LiveHealthProbeDecision;
  handoff: LiveHealthProbeHandoff;
  summary: string;
};

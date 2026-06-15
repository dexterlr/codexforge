export type EndToEndWorkflowHardeningPassStatus = "ready-for-review" | "blocked";

export type EndToEndWorkflowHardeningPass = {
  id: string;
  endToEndWorkflowHardeningIdentity: string;
  hardeningGroups: string[];
  trialEvidenceResultRecoveryStatus: string[];
  boundaryReadinessStatus: string[];
  releaseCandidateReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  releaseCandidateRoute: string;
  unifiedExecutionGapReportRoute: string;
  nextRecommendedAction: string;
  status: EndToEndWorkflowHardeningPassStatus;
  advancedHardeningPassDetails: string;
};

export type EndToEndWorkflowHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  policyAutoApplyAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndWorkflowHardeningPassModel = {
  title: "End-to-end workflow hardening pass";
  summary: string;
  hardeningPasses: EndToEndWorkflowHardeningPass[];
  boundary: EndToEndWorkflowHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndWorkflowHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}

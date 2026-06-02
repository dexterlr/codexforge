export type CloudFinalRenderReadinessStatus =
  | "local-first-recommended"
  | "cloud-review-needed"
  | "ready-for-manual-cloud-handoff"
  | "blocked-needs-privacy-review"
  | "blocked-needs-budget-review"
  | "blocked-no-provider"
  | "blocked-policy"
  | "unknown";

export type CloudFinalRenderJustificationCheckId =
  | "local draft reviewed"
  | "local final attempt considered"
  | "cloud capability needed"
  | "budget/credit risk understood"
  | "privacy reviewed"
  | "prompt/assets reviewed"
  | "manual approval required"
  | "no-auto-submit guarantee";

export type CloudFinalRenderRequest = {
  id: string;
  projectName: string;
  providerOption: string;
  requestedCapability: string;
  localDraftStatus: string;
  promptAssetStatus: string;
  manualApprovalRequired: true;
  noAutoSubmitGuarantee: true;
};

export type CloudFinalRenderJustificationCheck = {
  id: string;
  check: CloudFinalRenderJustificationCheckId;
  status: "pass" | "warn" | "block";
  plainEnglish: string;
};

export type CloudFinalRenderJustification = {
  id: string;
  checks: CloudFinalRenderJustificationCheck[];
  justifiedForReview: boolean;
  plainEnglish: string;
};

export type CloudFinalRenderCostReview = {
  id: string;
  risk: "unknown" | "low" | "medium" | "high" | "credit-based";
  plainEnglish: string;
  requiredBeforeHandoff: string[];
};

export type CloudFinalRenderPrivacyReview = {
  id: string;
  risk: "unknown" | "reviewed" | "needs-review" | "blocked";
  plainEnglish: string;
  requiredBeforeHandoff: string[];
};

export type CloudFinalRenderReadiness = {
  id: string;
  status: CloudFinalRenderReadinessStatus;
  plainEnglish: string;
  blockers: string[];
  nextStep: string;
};

export type CloudFinalRenderHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type CloudFinalRenderSummary = {
  request: CloudFinalRenderRequest;
  justification: CloudFinalRenderJustification;
  costReview: CloudFinalRenderCostReview;
  privacyReview: CloudFinalRenderPrivacyReview;
  readiness: CloudFinalRenderReadiness;
  handoff: CloudFinalRenderHandoff;
  summary: string;
};

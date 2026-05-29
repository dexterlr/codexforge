export type ApplyEvidenceInputSource = {
  selectedFile?: string;
  diffLabel?: string;
  diffSummary?: string;
  approvalStatus?: "approved" | "missing" | "invalid";
  policyDecision?: "allowed" | "blocked";
  boundaryStatus?: "request-ready" | "blocked";
  operatorNote?: string;
};

export type ApplyEvidenceInput = {
  selectedFile: string;
  diffLabel: string;
  diffSummary: string;
  operatorNote: string;
  noSecrets: true;
  excerptCap: number;
};

export type ApplyEvidenceRecord = {
  recordId: string;
  input: ApplyEvidenceInput;
  policyDecision: ApplyEvidencePolicyDecision;
  approvalRecord: ApplyEvidenceApprovalRecord;
  diffRecord: ApplyEvidenceDiffRecord;
  boundaryRecord: ApplyEvidenceBoundaryRecord;
  rollbackRecord: ApplyEvidenceRollbackRecord;
  validationHandoff: ApplyEvidenceValidationHandoff;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
};

export type ApplyEvidenceValidation = { ok: boolean; blockedReasons: string[]; warnings: string[] };
export type ApplyEvidencePolicyDecision = { decision: "allowed" | "blocked"; allowedReasons: string[]; blockedReasons: string[] };
export type ApplyEvidenceApprovalRecord = { status: "approved" | "missing" | "invalid"; exactApprovalRequired: true; approvalInvalidatesOnChange: true };
export type ApplyEvidenceDiffRecord = { label: string; summary: string; rawDiffStoredByDefault: false; excerptCap: number };
export type ApplyEvidenceBoundaryRecord = { status: "request-ready" | "blocked"; executionAllowed: false; reasons: string[] };
export type ApplyEvidenceRollbackRecord = { guidance: string; copyAllowed: true };
export type ApplyEvidenceValidationHandoff = { targetRoute: "/validation-results"; summary: string; copyAllowed: true };
export type ApplyEvidenceExport = { format: "markdown"; title: string; body: string; redacted: true };
export type ApplyEvidenceSummary = { title: string; status: string; selectedFile: string; nextAction: string };

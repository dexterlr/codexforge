export type WorkflowSafetyDecisionStatus =
  | "safe-preview-only"
  | "ready-for-parameter-map"
  | "needs-review"
  | "blocked"
  | "unknown";

export type WorkflowSafetyCheck = {
  id: string;
  label: string;
  plainEnglish: string;
  status: WorkflowSafetyDecisionStatus;
};

export type WorkflowNodeRisk = {
  id: string;
  nodeType: string;
  riskLabel: string;
  plainEnglish: string;
};

export type WorkflowAssetRisk = {
  id: string;
  asset: string;
  riskLabel: string;
  plainEnglish: string;
};

export type WorkflowResourceRisk = {
  id: string;
  resource: string;
  riskLabel: string;
  plainEnglish: string;
};

export type WorkflowOutputRisk = {
  id: string;
  destination: string;
  riskLabel: string;
  plainEnglish: string;
};

export type WorkflowSafetyDecision = {
  id: string;
  status: WorkflowSafetyDecisionStatus;
  label: string;
  explanation: string;
  approvalRequired: true;
};

export type WorkflowSafetyHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type WorkflowSafetySummary = {
  checks: WorkflowSafetyCheck[];
  nodeRisks: WorkflowNodeRisk[];
  assetRisks: WorkflowAssetRisk[];
  resourceRisks: WorkflowResourceRisk[];
  outputRisks: WorkflowOutputRisk[];
  decision: WorkflowSafetyDecision;
  handoff: WorkflowSafetyHandoff;
  summary: string;
};
